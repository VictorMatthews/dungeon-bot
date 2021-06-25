import {GuildMember} from "discord.js";

export interface Interaction {
    version: number
    type: number
    token: string
    member: Member
    id: string
    guild_id: string
    data: InteractionData
    channel_id: string
    application_id: string
}

export interface Member {
    user: User
    roles: string[]
    permissions: string
    pending: boolean
    nick: string
    mute: boolean
    is_pending: boolean
    deaf: boolean
}

export interface User {
    username: string
    public_flags: number
    id: string
    discriminator: string
    avatar: string
}

export interface InteractionData {
    options: CommandOption[]
    name: string
    id: string
}

export interface CommandOption {
    value: string
    type: number
    name: string
}
