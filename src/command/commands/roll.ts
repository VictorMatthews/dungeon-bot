import {Message} from "discord.js";
import {Command} from "../command";
import {Constants} from "../../constants/constants";

export class Roll extends Command {
    validDice = [Constants.D4,Constants.D6,Constants.D8,Constants.D10,Constants.D12,Constants.D20,Constants.D100];

    constructor() {
        super(Constants.ROLL, 'Returns a dice roll based on the dice entered. ' + Constants.EXAMPLE_DIE);
    }

    public execute(msg: Message, args: string[]): void {
        let roll = 1;
        const dice = args.shift();
        if (!dice) {
            this.sendMessage(msg, Constants.ENTER_A_DIE + Constants.EXAMPLE_DIE);
        } else if (this.isValid(dice)) {
            const die = parseInt(dice.slice(1));
            roll = Math.floor(Math.random() * (die - roll + 1)) + roll;
            this.sendMessage(msg, this.tagUser(msg.author.id) + Constants.ROLLED + roll);
        } else {
            this.sendMessage(msg, Constants.ENTER_A_DIE + 'I do not know what a "' + dice + '" die is.');
        }
    }

    private isValid(dice: string): boolean {
        for (let i = 0; i < this.validDice.length; i++) {
            if (dice === this.validDice[i]) {
                return true;
            }
        }
        return false;
    }
}
