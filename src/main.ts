require('dotenv').config(); // Recommended way of loading dotenv
import container from "./dependency-injection/inversify.config";
import {TYPES} from "./dependency-injection/types";
import {Bot} from "./bot";
let bot = container.get<Bot>(TYPES.Bot);

bot.listen().then(() => {
    console.log('Listening to request');
}).catch((error) => {
    console.log('Oh no! ', error);
});
