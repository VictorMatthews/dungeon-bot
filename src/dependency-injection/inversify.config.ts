import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";
import {Bot} from "../bot";
import {Client} from "discord.js";
import {CommandResponder} from "../command/command-responder";
import {MessageResponder} from "../command/message-responder";

const container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<CommandResponder>(TYPES.CommandResponder).to(CommandResponder).inSingletonScope();
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN as string);
container.bind<string>(TYPES.AppId).toConstantValue(process.env.APP_ID as string);
container.bind<string>(TYPES.GuildId).toConstantValue(process.env.GUILD_ID as string);

export default container;
