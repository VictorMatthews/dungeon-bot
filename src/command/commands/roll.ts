import {Command} from "../command";
import {Constants} from "../../constants/constants";
import {CommandOption, Interaction} from "../../constants/interfaces";

export class Roll extends Command {

    constructor() {
        super(Constants.ROLL, Constants.ROLL_DESC + Constants.EXAMPLE_DIE);
    }

    execute(interaction: Interaction, callback: (response: string) => void): void {
        let roll = 1;
        let die = 0;
        let dieType = '';
        let numOfRolls = 1;
        let msg = this.tagUser(interaction.member.user.id);
        interaction.data.options.forEach((option: CommandOption) => {
            if (option.name === Constants.DIE) {
                die = parseInt(option.value.slice(1));
                dieType = option.value;
            } else if (option.name === Constants.ROLLS) {
                numOfRolls = parseInt(option.value);
            }
        });

        if (die && !Number.isNaN(numOfRolls)) {
            if (numOfRolls > 25) {
                msg += Constants.LINE_RETURN + Constants.CANNOT_ROLL_EXCEEDED_AMOUNT;
            } else if (numOfRolls > 1) {
                let sum = 0;
                for (let i = 1; i <= numOfRolls; i++) {
                    roll = this.roll(die);
                    sum += roll;
                    msg += Constants.LINE_RETURN + i + Constants.SPACE + Constants.ROLLED
                        + roll + Constants.SPACE + Constants.FROM_A + dieType;
                }
                msg += Constants.LINE_RETURN + Constants.AVG_ROLL + dieType
                    + Constants.SPACE + Constants.IS + Constants.SPACE + Math.round(sum / numOfRolls);
            } else {
                roll = this.roll(die);
                msg += Constants.ROLLED + roll + Constants.SPACE + Constants.FROM_A + dieType;
            }
        } else {
            msg += Constants.LINE_RETURN + Constants.ERROR_PROCESSING_COMMAND;
        }
        callback(msg);
    }

    private roll(die: number): number {
        return Math.floor(Math.random() * die) + 1;
    }
}
