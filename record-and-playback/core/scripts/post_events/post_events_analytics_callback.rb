#!/usr/bin/ruby
# encoding: UTF-8

#
# BigBlueButton open source conferencing system - http://www.bigbluebutton.org/
#
# Copyright (c) 2020 BigBlueButton Inc. and by respective authors (see below).
#
# This program is free software; you can redistribute it and/or modify it under
# the terms of the GNU Lesser General Public License as published by the Free
# Software Foundation; either version 3.0 of the License, or (at your option)
# any later version.
#
# BigBlueButton is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
# details.
#
# You should have received a copy of the GNU Lesser General Public License along
# with BigBlueButton; if not, see <http://www.gnu.org/licenses/>.
#
# In order to use this script, you will have to install the following ruby gems
# in addition to the ones included with BigBlueButton:
# * bbbevents
# * jwt
#
# Running post_events scripts requires that you enable keepEvents=true in
# bbb-web's bigbluebutton.properties configuration.

require '../../core/lib/recordandplayback'
require 'bbbevents'
require "java_properties"
require "jwt"
require 'net/http'
require 'optparse'
require 'rubygems'
require 'socket'
require 'yaml'

require File.expand_path('../../../lib/recordandplayback', __FILE__)

file = File.open('/var/log/bigbluebutton/post_events_analytics_callback.log', File::WRONLY | File::APPEND | File::CREAT)
logger = Logger.new(file, 'weekly' )
logger.level = Logger::INFO
BigBlueButton.logger = logger

options = {}
OptionParser.new do |opts|
  opts.banner = 'Usage: ruby post_events/post_events_analytics_callback.rb -m <meeting_id>'

  opts.on('-m', '--meeting-id MEETING_ID', 'meeting_id (required)') do |m|
    options[:meeting_id] = m
  end
end.parse!

raise 'Missing required -m option.' if options[:meeting_id].nil?

meeting_id = options[:meeting_id]

# This script lives in scripts/post_events
# while properties.yaml lives in scripts/
props = YAML.safe_load(File.open('../../core/scripts/bigbluebutton.yml'))

recording_dir = props['recording_dir']
events_dir = props['events_dir']
meeting_events_dir = "#{events_dir}/#{meeting_id}"
process_dir = "#{recording_dir}/process/events/#{meeting_id}"

def send_data(analytics_url, secret, payload)
  # Setup a token that expires in 24hrs
  exp = Time.now.to_i + 24 * 3600
  exp_payload = { :exp => exp }
  token = JWT.encode exp_payload, secret, 'HS512', { typ: 'JWT' }

  uri = URI.parse(analytics_url)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = (uri.scheme == 'https')

  # Setup a request and attach our JWT token
  request = Net::HTTP::Post.new(uri.request_uri, {
    'Content-Type' => 'application/json',
    'Authorization' => "Bearer #{token}",
    'User-Agent' => 'BigBlueButton Analytics Callback'
  })

  # Send out data as json body
  request.body = payload.to_json

  # Display debug results
  #http.set_debug_output($stdout)

  response = http.request(request)
  code = response.code.to_i
  BigBlueButton.logger.info(response.body)

  if code < 200 || code >= 300
    BigBlueButton.logger.info("Failed when calling #{uri.request_uri}")
  else
    BigBlueButton.logger.info("Success")
  end
end

def format_analytics_data!(data)
  tmp_metadata = data["metadata"]
  array_keys = tmp_metadata.keys
  array_keys.each { |item|
    if item.start_with?("gl_")
      tmp_metadata = tmp_metadata.tap { |hs|
        hs.delete(item)
      }
    end
  }

  # Remove meeting id as we don't want it passed to 3rd party inside metadata
  tmp_metadata.delete("meeting_id")

  # Remove the internal meeting id generated by bbbevents gem
  data = data.tap { |hs|
    hs.delete("meeting_id")
  }

  # Convert CamelCase keys to snake_keys. This is done in bbbevents gem
  # but we do it here too anyways.
  tmp_metadata.deep_transform_keys! do |key|
    k = key.to_s.underscore rescue key
    k.to_sym rescue key
  end

  # Remove all internal user ids
  attendees = data["attendees"]
  attendees.each { |attendee|
    attendee.delete("id")
  }
end

#
# Main
#
BigBlueButton.logger.info("Analytics Post Events for [#{meeting_id}] starts")

begin
  raise 'events.xml file is missing from recording' unless File.exist?("#{meeting_events_dir}/events.xml")

  events_xml_path = "#{meeting_events_dir}/events.xml"
  data_json_path = "#{meeting_events_dir}/data.json"

  # Only process meetings that include analytics_callback_url
  events_xml = File.open(events_xml_path, 'r') { |io| Nokogiri::XML(io) }
  metadata = events_xml.at_xpath('/recording/metadata')

  analytics_callback_url = metadata.attributes['analytics-callback-url']&.content
  # analytics_callback_url = metadata.key?("analytics-callback-url") ? metadata["analytics-callback-url"].value : nil
  unless analytics_callback_url.nil?
    BigBlueButton.logger.info("Processing events for analytics...")
    filepathOverride = "/etc/bigbluebutton/bbb-web.properties"
    hasOverride = File.file?(filepathOverride)

    bbb_props = JavaProperties::Properties.new("/usr/share/bbb-web/WEB-INF/classes/bigbluebutton.properties")
    
    # If the file does exists: 
    if (hasOverride)
      bbbOverrideProps = JavaProperties::Properties.new(filepathOverride)
      # Override the props
      bbbOverrideProps.each do |key, prop|
        bbb_props[key]=prop
      end
    end

    secret = bbb_props[:securitySalt]
    external_meeting_id = metadata.attributes['meetingId']&.content

    # Parse the events.xml.
    events_data = BBBEvents.parse(events_xml_path)

    # Write JSON data to file.
    File.open(data_json_path, 'w') do |f|
      f.write(events_data.to_json)
    end

    json_file = File.open(data_json_path)
    data = JSON.load(json_file)

    format_analytics_data!(data)

    data_version_format = "1.0"

    payload = { version: data_version_format,
      meeting_id: external_meeting_id,
      internal_meeting_id: meeting_id,
      data: data
    }

    # Convert CamelCase keys to snake_keys for the whole payload.
    # This is a sledgehammer to force keys to be consistent.
    payload.deep_transform_keys! do |key|
      k = key.to_s.underscore rescue key
      k.to_sym rescue key
    end

    BigBlueButton.logger.info(payload.to_json)

    send_data(analytics_callback_url, secret, payload)
  end

rescue => e
    BigBlueButton.logger.info("Rescued")
    BigBlueButton.logger.info(e.to_s)
end

BigBlueButton.logger.info("Analytics Post Events for [#{meeting_id}] ends")

exit 0
