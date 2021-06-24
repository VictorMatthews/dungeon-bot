import {Message} from "discord.js";
import {Command} from "../command";
import {CommandUtil} from "../command-util";

export class Help extends Command {
    constructor() {
        super('--help', 'How to use this Bot');
    }

    public execute(msg: Message, args: string[]): void {
        let text = 'This is a list of commands that can be used by this bot.\n'
        CommandUtil.COMMANDS.forEach((command: Command) => {
            text += command.name + ' (' + command.description + ')\n';
        });
        super.sendMessage(msg, text);
    }
}
