import {Constants} from "../constants/constants";
import {Interaction} from "../constants/interfaces";

export abstract class Command {
    protected constructor(public name: string, public description: string) {
    }

    public abstract execute(data: Interaction, callback: (response: string) => void): void;

    protected tagUser(userId: string): string {
        return Constants.OPEN_USER_TAG + userId + Constants.CLOSE_TAG;
    }
}

