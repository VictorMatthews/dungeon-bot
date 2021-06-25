import {Command} from "./command";
import {Roll} from "./commands/roll";

export class CommandUtil {
    private static ROLL = new Roll();

    private static COMMANDS: Map<string, Command> = new Map([
        [CommandUtil.ROLL.name, CommandUtil.ROLL],
    ]);

    static getCommandHandler(name: string): Command {
        const command = CommandUtil.COMMANDS.get(name);
        return command as Command;
    }
}
