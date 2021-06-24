import {Message} from "discord.js";
import {Constants} from "../constants/constants";

export abstract class Command {
    protected constructor(public name: string, public description: string) {
    }

    public abstract execute(msg: Message, args: string[]): void;

    protected sendMessage(message: Message, text: string): void {
        message.channel.send(text).then(() => {
            console.log(Constants.MESSAGE_SEND + Constants.QUOTE + text + Constants.QUOTE);
        });
    }

    protected tagUser(userId: string): string {
        return Constants.OPEN_USER_TAG + userId + Constants.CLOSE_TAG;
    }
}

