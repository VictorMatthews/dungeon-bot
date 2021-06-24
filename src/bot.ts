import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./dependency-injection/types";
import {CommandUtil} from "./command/command-util";
import {Constants} from "./constants/constants";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    commands = CommandUtil.COMMANDS;

    constructor(@inject(TYPES.Client) client: Client, @inject(TYPES.Token) token: string) {
        this.client = client;
        this.token = token;
    }

    public listen(): Promise<string> {
        this.client.on(Constants.READY, () => this.onReady());
        this.client.on(Constants.MESSAGE, (message: Message) => this.onMessage(message));
        return this.client.login(this.token);
    }

    private onMessage(message: Message): void {
        if (message.author == this.client.user) {
            return;
        }
        console.log(Constants.MESSAGE_RECEIVED + Constants.QUOTE + message.content + Constants.QUOTE);

        const args = message.content.split(/ +/);
        let cmd = args.shift();
        if (cmd) {
            cmd = cmd.toLowerCase();
            console.info(Constants.CALLED_COMMAND + cmd);
            const command = this.commands.get(cmd);
            if (command) {
                try {
                    command.execute(message, args);
                } catch (error) {
                    console.error(error);
                    message.reply(Constants.COMMAND_ERROR).then();
                }
            }
        }

    }

    private onReady(): void {
        const user = this.client.user;
        if (user) {
            console.log(Constants.LOGGED_IN_AS + user.tag);
        }
    }
}
