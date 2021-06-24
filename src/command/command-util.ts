import {Command} from "./command";
import {Help} from "./commands/help";
import {Roll} from "./commands/roll";

export class CommandUtil {
    private static HELP = new Help();
    private static ROLL = new Roll();

    public static COMMANDS: Map<string, Command> = new Map([
        [CommandUtil.HELP.name, CommandUtil.HELP],
        [CommandUtil.ROLL.name, CommandUtil.ROLL],
    ]);
}
