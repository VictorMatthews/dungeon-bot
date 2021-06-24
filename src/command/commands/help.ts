import {Message} from "discord.js";
import {Command} from "../command";
import {CommandUtil} from "../command-util";
import {Constants} from "../../constants/constants";

export class Help extends Command {
    constructor() {
        super(Constants.HELP, 'How to use this Bot');
    }

    public execute(msg: Message, args: string[]): void {
        let text = Constants.HELP_DEF + Constants.CODE + Constants.LINE_RETURN;
        CommandUtil.COMMANDS.forEach((command: Command) => {
            text += command.name + Constants.SPACE + Constants.OPEN_PAR
                + command.description + Constants.CLOSE_PAR + Constants.LINE_RETURN;
        });
        text += Constants.CODE;
        super.sendMessage(msg, text);
    }
}
