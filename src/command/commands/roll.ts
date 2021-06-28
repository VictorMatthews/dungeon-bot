import {Command} from "../command";
import {Constants} from "../../constants/constants";
import {CommandOption, Interaction} from "../../constants/interfaces";

export class Roll extends Command {

    constructor() {
        super(Constants.ROLL, Constants.ROLL_DESC + Constants.EXAMPLE_DIE);
    }

    execute(interaction: Interaction, callback: (response: string) => void): void {
        let roll = 1;
        interaction.data.options.forEach((option: CommandOption) => {
            if (option.name === Constants.DIE) {
                const die = parseInt(option.value.slice(1));
                roll = Math.floor(Math.random() * (die - roll + 1)) + roll;
                const msg = this.tagUser(interaction.member.user.id) + Constants.ROLLED + roll
                    + Constants.SPACE + Constants.FROM_A + option.value;
                callback(msg);
            }
        });
    }
}
