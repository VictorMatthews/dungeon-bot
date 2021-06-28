// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config(); // Recommended way of loading dotenv
import container from "./dependency-injection/inversify.config";
import {TYPES} from "./dependency-injection/types";
import {Constants} from "./constants/constants";
import {Bot} from "./bot";
const bot = container.get<Bot>(TYPES.Bot);

bot.listen().then(() => {
    console.log(Constants.LISTENING);
}).catch((error) => {
    console.log(Constants.OH_NO, error);
});
