package org.bigbluebutton.common2.msgs

/* In Messages  */
object GetChatHistoryReqMsg { val NAME = "GetChatHistoryReqMsg" }
case class GetChatHistoryReqMsg(header: BbbClientMsgHeader, body: GetChatHistoryReqMsgBody) extends StandardMsg
case class GetChatHistoryReqMsgBody()

object SendPublicMessagePubMsg { val NAME = "SendPublicMessagePubMsg" }
case class SendPublicMessagePubMsg(header: BbbClientMsgHeader, body: SendPublicMessagePubMsgBody) extends StandardMsg
case class SendPublicMessagePubMsgBody(message: ChatMessageVO)

object SendPrivateMessagePubMsg { val NAME = "SendPrivateMessagePubMsg" }
case class SendPrivateMessagePubMsg(header: BbbClientMsgHeader, body: SendPrivateMessagePubMsgBody) extends StandardMsg
case class SendPrivateMessagePubMsgBody(message: ChatMessageVO)

object ClearPublicChatHistoryPubMsg { val NAME = "ClearPublicChatHistoryPubMsg" }
case class ClearPublicChatHistoryPubMsg(header: BbbClientMsgHeader, body: ClearPublicChatHistoryPubMsgBody) extends StandardMsg
case class ClearPublicChatHistoryPubMsgBody(chatId: String)

object AddMessageReactionReqMsg { val NAME = "AddMessageReactionReqMsg" }
case class AddMessageReactionReqMsg(header: BbbClientMsgHeader, body: AddMessageReactionReqMsgBody) extends StandardMsg
case class AddMessageReactionReqMsgBody(userId: String, chatId: String, messageId: String, emojiId: String)

object UndoMessageReactionReqMsg { val NAME = "UndoMessageReactionReqMsg" }
case class UndoMessageReactionReqMsg(header: BbbClientMsgHeader, body: UndoMessageReactionReqMsgBody) extends StandardMsg
case class UndoMessageReactionReqMsgBody(userId: String, chatId: String, messageId: String, emojiId: String)

/* Out Messages */
object GetChatHistoryRespMsg { val NAME = "GetChatHistoryRespMsg" }
case class GetChatHistoryRespMsg(header: BbbClientMsgHeader, body: GetChatHistoryRespMsgBody) extends StandardMsg
case class GetChatHistoryRespMsgBody(history: Array[ChatMessageVO])

object SendPublicMessageEvtMsg { val NAME = "SendPublicMessageEvtMsg" }
case class SendPublicMessageEvtMsg(header: BbbClientMsgHeader, body: SendPublicMessageEvtMsgBody) extends StandardMsg
case class SendPublicMessageEvtMsgBody(message: ChatMessageVO)

object SendPrivateMessageEvtMsg { val NAME = "SendPrivateMessageEvtMsg" }
case class SendPrivateMessageEvtMsg(header: BbbClientMsgHeader, body: SendPrivateMessageEvtMsgBody) extends StandardMsg
case class SendPrivateMessageEvtMsgBody(message: ChatMessageVO)

object ClearPublicChatHistoryEvtMsg { val NAME = "ClearPublicChatHistoryEvtMsg" }
case class ClearPublicChatHistoryEvtMsg(header: BbbClientMsgHeader, body: ClearPublicChatHistoryEvtMsgBody) extends StandardMsg
case class ClearPublicChatHistoryEvtMsgBody(chatId: String)

object UserTypingEvtMsg { val NAME = "UserTypingEvtMsg" }
case class UserTypingEvtMsg(header: BbbClientMsgHeader, body: UserTypingEvtMsgBody) extends StandardMsg
case class UserTypingEvtMsgBody(chatId: String, userId: String)

case class ChatMessageVO(fromUserId: String, fromUsername: String, fromColor: String, fromTime: Long, fromTimezoneOffset: Int,
                         toUserId: String, toUsername: String, message: String)

object AddMessageReactionEvtMsg { val NAME = "AddMessageReactionEvtMsg" }
case class AddMessageReactionEvtMsg(header: BbbClientMsgHeader, body: AddMessageReactionEvtMsgBody) extends BbbCoreMsg
case class AddMessageReactionEvtMsgBody(userId: String, chatId: String, messageId: String, emojiId: String)

object UndoMessageReactionEvtMsg { val NAME = "UndoMessageReactionEvtMsg" }
case class UndoMessageReactionEvtMsg(header: BbbClientMsgHeader, body: UndoMessageReactionEvtMsgBody) extends BbbCoreMsg
case class UndoMessageReactionEvtMsgBody(userId: String, chatId: String, messageId: String, emojiId: String)