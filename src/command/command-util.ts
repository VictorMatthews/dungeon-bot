import {Command} from "./command";
import {Ping} from "./commands/ping";
import {Help} from "./commands/help";

export class CommandUtil {
    private static PING = new Ping();
    private static HELP = new Help();

    public static COMMANDS: Map<string, Command> = new Map([
        [CommandUtil.HELP.name, CommandUtil.HELP],
        [CommandUtil.PING.name, CommandUtil.PING]
    ]);
}
