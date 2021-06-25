import {Client, Message, WSEventType} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./dependency-injection/types";
import {Constants} from "./constants/constants";
import {Interaction} from "./constants/interfaces";
import {CommandResponder} from "./command/command-responder";
import {MessageResponder} from "./command/message-responder";

@injectable()
export class Bot {
    private readonly client: Client;
    private readonly token: string;
    private commandResponder: CommandResponder;
    private messageResponder: MessageResponder;

    constructor(@inject(TYPES.Client) client: Client,
                @inject(TYPES.Token) token: string,
                @inject(TYPES.CommandResponder) commandResponder: CommandResponder,
                @inject(TYPES.MessageResponder) messageResponder: MessageResponder) {
        this.client = client;
        this.token = token;
        this.commandResponder = commandResponder;
        this.messageResponder = messageResponder;
    }

    public listen(): Promise<string> {
        this.client.on(Constants.READY, () => this.onReady());
        this.client.on(Constants.MESSAGE, (message: Message) => this.onMessage(message));
        this.client.ws.on(('INTERACTION_CREATE' as WSEventType), async (interaction: Interaction) => {
            this.onInteractionCreate(interaction);
        });
        return this.client.login(this.token);
    }

    private onReady(): void {
        const user = this.client.user;
        if (user) {
            console.log(Constants.LOGGED_IN_AS + user.tag);
        }
    }

    private onMessage(message: Message): void {
        this.messageResponder.handle(message, this.client);
    }

    private onInteractionCreate(interaction: Interaction): void {
        this.commandResponder.handle(interaction, this.client);
    }
}
