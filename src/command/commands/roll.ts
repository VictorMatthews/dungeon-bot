import {Message} from "discord.js";
import {Command} from "../command";
import {Constants} from "../../constants/constants";

export class Roll extends Command {
    validDice = [Constants.D4,Constants.D6,Constants.D8,Constants.D10,Constants.D12,Constants.D20,Constants.D100];

    constructor() {
        super(Constants.ROLL, 'Returns a dice roll based on the dice entered. Example ```roll d20```');
    }

    public execute(msg: Message, args: string[]): void {
        let roll = 1;
        const dice = args.shift();
        if (!dice) {
            this.sendMessage(msg, 'Please enter a die to role. Example ```roll d20```');
        } else if (this.isValid(dice)) {
            const die = parseInt(dice.slice(1));
            console.log('Rolling a d' + die);
            roll = Math.floor(Math.random() * (die - roll + 1)) + roll;
            console.log('Rolled a ' + roll);
            this.sendMessage(msg, '<@!' + msg.author.id + '> rolled: ' + roll);
        } else {
            this.sendMessage(msg, 'Please enter a valid die. I do not know what a "' + dice + '" die is.');
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
