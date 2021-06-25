import {Constants} from "../constants/constants";

export const TYPES = {
    Bot: Symbol(Constants.BOT),
    Client: Symbol(Constants.CLIENT),
    Token: Symbol(Constants.TOKEN),
    AppId: Symbol(Constants.APP_ID),
    GuildId: Symbol(Constants.GUILD_ID),
    CommandResponder: Symbol(Constants.COMMAND_RESPONDER),
    MessageResponder: Symbol(Constants.MESSAGE_RESPONDER),
};
