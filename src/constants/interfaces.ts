import {GuildMember} from "discord.js";

export interface Interaction {
    version: number
    type: number
    token: string
    member: GuildMember
    id: string
    guild_id: string
    data: InteractionData
    channel_id: string
    application_id: string
}

export interface InteractionData {
    options: CommandOption[]
    name: string
    id: string
}

export interface CommandOption {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
    type: number
    name: string
}
