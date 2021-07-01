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

        // Load data from command input
        interaction.data.options.forEach((option: CommandOption) => {
            if (option.name === Constants.DIE) {
                die = parseInt(option.value.slice(1));
                dieType = option.value;
            } else if (option.name === Constants.ROLLS) {
                numOfRolls = parseInt(option.value);
            }
        });

        // Create return message
        if (die && !Number.isNaN(numOfRolls)) {
            if (numOfRolls > 25) {
                msg += Constants.LINE_RETURN + Constants.CANNOT_ROLL_EXCEEDED_AMOUNT;
            } else if (numOfRolls > 1) {
                let sum = 0;
                for (let i = 1; i <= numOfRolls; i++) {
                    roll = this.roll(die);
                    sum += roll;
                    msg += Constants.LINE_RETURN + this.multiLineRoll(i, roll.toString(), dieType);
                }
                msg += Constants.LINE_RETURN + this.rollAvg(dieType, Math.round(sum / numOfRolls).toString())
                    + Constants.LINE_RETURN + this.rollSum(dieType, sum.toString());
            } else {
                roll = this.roll(die);
                msg += this.lineRoll(roll, dieType);
            }
        } else {
            msg += Constants.LINE_RETURN + Constants.ERROR_PROCESSING_COMMAND;
        }

        callback(msg);
    }

    public roll(die: number): number {
        return Math.floor(Math.random() * die) + 1;
    }

    public lineRoll(roll: number, dieType: string): string {
        return Constants.ROLLED + roll + Constants.SPACE + Constants.FROM_A + dieType;
    }

    public multiLineRoll(nthRoll: number, roll: string, dieType: string): string {
        return nthRoll + Constants.SPACE + Constants.ROLLED
        + roll + Constants.SPACE + Constants.FROM_A + dieType;
    }

    public rollAvg(dieType: string, avg: string): string {
        return Constants.ROLL_AVG + dieType
            + Constants.SPACE + Constants.IS + Constants.SPACE + avg;
    }

    public rollSum(dieType: string, sum: string): string {
        return Constants.ROLL_SUM + dieType + Constants.SPACE
            + Constants.ROLLS + Constants.SPACE + Constants.IS + Constants.SPACE + sum;
    }
}
