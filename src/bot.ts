import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./dependency-injection/types";
import {CommandUtil} from "./command/command-util";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    commands = CommandUtil.COMMANDS

    constructor(@inject(TYPES.Client) client: Client, @inject(TYPES.Token) token: string) {
        this.client = client;
        this.token = token;
    }

    public listen(): Promise<string> {
        this.client.on('ready', () => this.onReady());
        this.client.on('message', (message: Message) => this.onMessage(message));
        return this.client.login(this.token);
    }

    private onMessage(message: Message): void {
        if (message.author == this.client.user) {
            return;
        }
        console.log('Message received! Contents: "' + message.content + '"');

        const args = message.content.split(/ +/);
        let cmd = args.shift();
        if (cmd) {
            cmd = cmd.toLowerCase();
            console.info(`Called command: ${cmd}`);
            const command = this.commands.get(cmd);
            if (command) {
                try {
                    command.execute(message, args);
                } catch (error) {
                    console.error(error);
                    message.reply('there was an error trying to execute that command!').then();
                }
            }
        }

    }

    private onReady(): void {
        let user = this.client.user;
        if (user) {
            console.log("We have logged in as " + user.username + "#" + user.tag);
        }
    }
}
