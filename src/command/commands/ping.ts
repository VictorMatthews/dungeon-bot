import {Message} from "discord.js";
import {Command} from "../command";

export class Ping extends Command {
    constructor() {
        super('--ping', 'Ping!');
    }

    public execute(msg: Message, args: string[]): void {
        super.sendMessage(msg, 'pong')
    }
}
