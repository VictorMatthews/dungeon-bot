export class Constants {
    public static APP_ID = 'AppId';
    public static BOT = 'Bot';
    public static CLIENT = 'Client';
    public static CLOSE_TAG = '> ';
    public static COMMAND = 'command';
    public static COMMAND_RESPONDER = 'CommandResponder';
    public static D10 = 'd10';
    public static D100 = 'd100';
    public static D12 = 'd12';
    public static D20 = 'd20';
    public static D4 = 'd4';
    public static D6 = 'd6';
    public static D8 = 'd8';
    public static DELETE = 'delete';
    public static EXAMPLE_DIE = 'Example ```roll d20```';
    public static FROM_A = 'from a ';
    public static GUILD_ID = 'GuildId';
    public static LISTENING = 'Listening to request';
    public static LOGGED_IN_AS = 'We have logged in as ';
    public static MESSAGE = 'message';
    public static MESSAGE_RECEIVED = 'Message received! Contents: ';
    public static MESSAGE_RESPONDER = 'MessageResponder';
    public static OH_NO = 'Oh no! ';
    public static OPEN_USER_TAG = '<@!';
    public static POST = 'post';
    public static QUOTE = '"';
    public static READY = 'ready';
    public static ROLL = 'roll';
    public static ROLLED = 'rolled: ';
    public static SPACE = ' ';
    public static TOKEN = 'Token';

    public static SLASH_COMMANDS = {
        name: Constants.ROLL,
        description: "Returns a dice roll based on the die entered.",
        options: [
            {
                name: "die",
                description: "The type of die",
                type: 3,
                required: true,
                choices: [
                    { name: "D4", value: Constants.D4 },
                    { name: "D6", value: Constants.D6 },
                    { name: "D8", value: Constants.D8 },
                    { name: "D10", value: Constants.D10 },
                    { name: "D12", value: Constants.D12 },
                    { name: "D20", value: Constants.D20 },
                    { name: "D100", value: Constants.D100 }
                ]
            }
        ]
    };
}
