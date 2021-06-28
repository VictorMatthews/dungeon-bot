import {Command} from "./command";
import {Roll} from "./commands/roll";
import {Constants} from "../constants/constants";

export class CommandUtil {
    private static readonly ROLL = new Roll();

    private static readonly COMMANDS: Map<string, Command> = new Map([
        [CommandUtil.ROLL.name, CommandUtil.ROLL],
    ]);

    public static readonly SLASH_COMMANDS = [
        {
            name: CommandUtil.ROLL.name,
            description: CommandUtil.ROLL.description,
            options: [
                {
                    name: Constants.DIE,
                    description: Constants.DIE_DESC,
                    type: 3,
                    required: true,
                    choices: [
                        { name: 'D4', value: Constants.D4 },
                        { name: 'D6', value: Constants.D6 },
                        { name: 'D8', value: Constants.D8 },
                        { name: 'D10', value: Constants.D10 },
                        { name: 'D12', value: Constants.D12 },
                        { name: 'D20', value: Constants.D20 },
                        { name: 'D100', value: Constants.D100 }
                    ]
                },
                {
                    name: Constants.ROLLS,
                    description: Constants.ROLLS_DESC,
                    type: 3,
                    required: false
                }
            ]
        }
    ];

    public static getCommandHandler(name: string): Command {
        const command = CommandUtil.COMMANDS.get(name);
        return command as Command;
    }
}
