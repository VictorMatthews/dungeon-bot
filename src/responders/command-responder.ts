import {injectable} from "inversify";
import {Interaction} from "../constants/interfaces";
import {CommandUtil} from "../command/command-util";

@injectable()
export class CommandResponder {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    handle(interaction: Interaction, client: any): void {
        if (interaction && interaction.type === 2) {
            const callback = (response: string): void => {
                const data = {
                    type: 4,
                    data: {
                        content: response
                    }
                };
                client.api.interactions(interaction.id, interaction.token).callback.post({ data: data });
            };

            const commandHandler = CommandUtil.getCommandHandler(interaction.data.name);
            if (commandHandler) {
                commandHandler.execute(interaction, callback);
            }
        }
    }
}
