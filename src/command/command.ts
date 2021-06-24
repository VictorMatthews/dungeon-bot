import {Message} from "discord.js";

export abstract class Command {
    protected constructor(public name: string, public description: string) {
    }

    public abstract execute(msg: Message, args: string[]): void

    protected sendMessage(message: Message, text: string) {
        message.channel.send(text).then(() => {
            console.log('Successfully sent message: "' + text + '"');
        });
    }
}

