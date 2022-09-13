import { check } from 'meteor/check';
import { patch } from '@mconf/bbb-diff';
import { PadsUpdates } from '/imports/api/pads';
import Logger from '/imports/startup/server/logger';
import sendPadPatch from './sendPadPatch';

export default function contentPad(meetingId, externalId, start, end, text) {
  try {
    check(meetingId, String);
    check(externalId, String);
    check(start, Number);
    check(end, Number);
    check(text, String);

    const selector = {
      meetingId,
      externalId,
    };

    const pad = PadsUpdates.findOne(selector);
    const content = (pad && pad.content) ? pad.content : '';
    const timestamp = Date.now();

    const modifier = {
      $set: {
        content: patch(content, { start, end, text }),
        contentLastUpdatedAt: timestamp,
      },
    };

    PadsUpdates.upsert(selector, modifier);
    Logger.debug(`Added pad content external=${externalId} meeting=${meetingId}`);

    sendPadPatch({
      meetingId,
      externalId,
      start,
      end,
      text,
      timestamp,
    });
  } catch (err) {
    Logger.error(`Adding pad content to the collection: ${err}`);
  }
}
