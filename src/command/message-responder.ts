import {inject, injectable} from "inversify";
import {Constants} from "../constants/constants";
import {Message} from "discord.js";
import {TYPES} from "../dependency-injection/types";
import {CommandUtil} from "./command-util";

/* eslint-disable @typescript-eslint/no-explicit-any */
@injectable()
export class MessageResponder {
    private readonly guildId: string;

    constructor(@inject(TYPES.GuildId) guildId: string) {
        this.guildId = guildId;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handle(message: Message, client: any): void {
        if (message.author == client.user) {
            return;
        }
        console.log(Constants.MESSAGE_RECEIVED + Constants.QUOTE + message.content + Constants.QUOTE);
        const args = message.content.split(/ +/);
        const cmd = args.shift();
        if (cmd && cmd === Constants.COMMAND) {
            const arg = args.shift();
            if (arg) {
                if (arg === Constants.POST) {
                    this.postSlashCommands(client);
                } else if (arg === Constants.DELETE) {
                    this.deleteSlashCommands(client);
                }
            }
        }
    }

    private postSlashCommands(client: any): void {
        CommandUtil.SLASH_COMMANDS.forEach(body => {
            client.api.applications(client.user.id).guilds(this.guildId)
                .commands.post({ data: body }).then((res: any) => {
                    console.log(res);
                });
        });
    }

    private deleteSlashCommands(client: any): void {
        // Delete Global Commands
        client.api.applications(client.user.id).commands.get().then((res: any) => {
            console.log(res);
            res.forEach((r: any) => {
                client.api.applications(client.user.id).commands(r.id).delete().then((res: any) => {
                    console.log(res);
                });
            });
        });

        // Delete Guild Commands
        client.api.applications(client.user.id).guilds(this.guildId).commands.get().then((res: any) => {
            console.log(res);
            res.forEach((r: any) => {
                client.api.applications(client.user.id).guilds(this.guildId).commands(r.id).delete().then((res: any) => {
                    console.log(res);
                });
            });
        });
    }
}
