import {Interaction} from "../../constants/interfaces";
import {Roll} from "./roll";
import {expect} from 'chai';
import {Constants} from "../../constants/constants";

describe('Roll', () => {
    let roll: Roll;
    let interaction: Interaction;
    let rollResponse: RollResponse;

    const callback = (response: string): void => {
        rollResponse = {} as RollResponse;
        const prefixEnd = response.indexOf(Constants.ROLLED) + Constants.ROLLED.length;
        const rollEnd = response.indexOf(Constants.FROM_A);
        rollResponse.prefix = response.slice(0, prefixEnd);
        const r = response.slice(prefixEnd, rollEnd).trim();
        rollResponse.roll = parseInt(r);
        rollResponse.suffix = response.slice(rollEnd);
    };

    const verifyPrefix = (): void => {
        expect(rollResponse.prefix).to.exist;
        expect(rollResponse.prefix).to.equal(Constants.OPEN_USER_TAG + interaction.member.user.id + Constants.CLOSE_TAG + Constants.ROLLED);
    };

    const verifySuffix = (die: string): void => {
        expect(rollResponse.suffix).to.exist;
        expect(rollResponse.suffix).to.equal(Constants.FROM_A + die);
    };

    const verifyRoll = (maxDieRoll: number): void => {
        expect(rollResponse.roll).to.exist;
        expect(rollResponse.roll).to.be.greaterThanOrEqual(1);
        expect(rollResponse.roll).to.be.lessThanOrEqual(maxDieRoll);
    };

    beforeEach(() => {
        roll = new Roll();
        interaction = INTERACTION;
    });

    it('should be valid', async () => {
        expect(roll.name).to.equal(Constants.ROLL);
        expect(roll.description).to.equal(Constants.ROLL_DESC + Constants.EXAMPLE_DIE);
    });

    it('should return a die roll for d4', async () => {
        interaction.data.options[0].value = Constants.D4;
        roll.execute(interaction, callback);
        expect(rollResponse).to.exist;
        verifyPrefix();
        verifySuffix(Constants.D4);
        verifyRoll(4);
    });

    it('should return a die roll for d6', async () => {
        interaction.data.options[0].value = Constants.D6;
        roll.execute(interaction, callback);
        expect(rollResponse).to.exist;
        verifyPrefix();
        verifySuffix(Constants.D6);
        verifyRoll(6);
    });

    it('should return a die roll for d8', async () => {
        interaction.data.options[0].value = Constants.D8;
        roll.execute(interaction, callback);
        expect(rollResponse).to.exist;
        verifyPrefix();
        verifySuffix(Constants.D8);
        verifyRoll(8);
    });

    it('should return a die roll for d10', async () => {
        interaction.data.options[0].value = Constants.D10;
        roll.execute(interaction, callback);
        expect(rollResponse).to.exist;
        verifyPrefix();
        verifySuffix(Constants.D10);
        verifyRoll(10);
    });

    it('should return a die roll for d12', async () => {
        interaction.data.options[0].value = Constants.D12;
        roll.execute(interaction, callback);
        expect(rollResponse).to.exist;
        verifyPrefix();
        verifySuffix(Constants.D12);
        verifyRoll(12);
    });

    it('should return a die roll for d20', async () => {
        interaction.data.options[0].value = Constants.D20;
        roll.execute(interaction, callback);
        expect(rollResponse).to.exist;
        verifyPrefix();
        verifySuffix(Constants.D20);
        verifyRoll(20);
    });

    it('should return a die roll for d100', async () => {
        interaction.data.options[0].value = Constants.D100;
        roll.execute(interaction, callback);
        expect(rollResponse).to.exist;
        verifyPrefix();
        verifySuffix(Constants.D100);
        verifyRoll(100);
    });
});

const INTERACTION = {
    data: {
        options: [
            {
                value: '',
                type: 3,
                name: Constants.DIE
            }
        ]
    },
    member: {
        user: {
            id: '123456789'
        }
    }
} as Interaction;

interface RollResponse {
    prefix: string
    roll: number
    suffix: string
}
