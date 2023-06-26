import { MessageComponentTypes, ButtonStyleTypes, TextStyleTypes, InteractionType } from "discord-interactions"
export async function reply(interaction: Interaction, options: InteractionOptions, token?: string) {
    await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
        method: "POST",
        headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            type: 4,
            data: {
                content: options.content,
                embeds: options.embeds,
                attachments: options.attachments,
                components: options.components,
                flags: options.ephemeral ? 64 : 0
            }
        })
    })
}
export async function editReply(interaction: Interaction, options: InteractionEditOptions, token?: string) {
    let id = (token || process.env.TOKEN)?.split(".")[0]!
    id = atob(id)
    await fetch(`https://discord.com/api/v10/webhooks/${id}/${interaction.token}/messages/@original`, {
        method: "PATCH",
        headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            type: 4,
            data: {
                ...options
            }
        })
    })
}
export async function deferReply(interaction: Interaction, options: InteractionDeferredOptions, token?: string) {
    await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
        method: "POST",
        headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            type: 5,
            data: {
                flags: options.ephemeral ? 64 : 0
            }
        })
    })
}
export async function updateDefer(interaction: Interaction, options: InteractionDeferredOptions, token?: string) {
    await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
        method: "POST",
        headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            type: 6,
            data: {
                flags: options.ephemeral ? 64 : 0
            }
        })
    })
}
export async function showModal(interaction: Interaction, options: ModalOptions, token?: string) {
    await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
        method: "POST",
        headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            type: 9,
            data: {
                ...options
            }
        })
    })
}
export async function autocompleteResult(interaction: Interaction, options: Options, token?: string) {
    await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
        method: "POST",
        headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            type: 8,
            data: {
                ...options
            }
        })
    })
}
export async function followup(interaction: Interaction, options: FollowupOptions, token?: string) {
    let id = (token || process.env.TOKEN)?.split(".")[0]!
    id = atob(id)
    await fetch(`https://discord.com/api/v10/webhooks/${id}/${interaction.token}`, {
        method: "POST",
        headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            ...options
        })
    })
}
export async function editFollowup(interaction: Interaction, options: FollowupOptions, token?: string) {
    let id = (token || process.env.TOKEN)?.split(".")[0]!
    id = atob(id)
    await fetch(`https://discord.com/api/v10/webhooks/${id}/${interaction.token}/messages/${interaction.message.id}`, {
        method: "PATCH",
        headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            ...options
        })
    })
}
export function get(interaction: Interaction, value: string) {
    let hasOptions = interaction.data!.hasOwnProperty("options")
    if (hasOptions == true) {
        let options = interaction.data!.options
        for (let i = 0; i < options!.length; i++) {
            if (interaction.data!.options![i].name == value) {
                return interaction.data!.options![i].value
            }
        }
    }
    else {
        let hasComponents = interaction.data!.hasOwnProperty("components")
        if (hasComponents == true) {
            let components = interaction.data!.components
            for (let i = 0; i < components!.length; i++) {
                if (interaction.data!.components![i].components[0].custom_id == value) {
                    return interaction.data!.components![i].components[0].value
                }
            }
        }
    }
}
export enum ApplicationCommandTypes {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}
export enum ApplicationCommandOptionTypes {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}
export enum ChannelTypes {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUNCEMENT = 5,
    ANNOUNCEMENT_THREAD = 10,
    PUBLIC_THREAD = 11,
    PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15,
    GUILD_MEDIA = 16
}
export interface SlashCommandsStructure {
    id: string,
    type?: ApplicationCommandTypes,
    application_id: string,
    guild_id?: string,
    name: string,
    name_localizations?: object | null,
    description: string,
    description_localizations?: object | null,
    options?: ApplicationCommandOptions[],
    default_member_permissions: string | null,
    dm_permission?: boolean,
    default_permission?: boolean | null,
    nsfw?: boolean,
    version: string
}
export interface ApplicationCommandOptions {
    type: ApplicationCommandOptionTypes,
    name: string,
    name_localizations?: object | null,
    description: string,
    description_localizations?: object | null,
    required?: boolean,
    choices?: Options[],
    options?: ApplicationCommandOptions[],
    channel_types?: ChannelTypes[],
    min_value?: number,
    max_value?: number,
    min_length?: number
    max_length?: number,
    autocomplete?: boolean
}
export interface Interaction {
    app_permissions: string,
    application_id: string,
    channel: Channel,
    channel_id: string,
    data?: {
        guild_id: string,
        id: string,
        name: string,
        options?: Data["options"],
        components?: Data["components"],
        custom_id?: string,
        component_type: number,
        values: {
            label: string,
            value: string,
            description?: string,
            emoji?: Emoji,
            default?: boolean
        }
        type: ApplicationCommandTypes
    },
    entitlement_sku_ids: any[],
    entitlements: any[],
    guild: {
        features: string[],
        id: string,
        locale: string
    },
    guild_id?: string,
    guild_locale?: string,
    id: string,
    locale?: string,
    member?: Member,
    user?: User
    token: string,
    type: InteractionType,
    version: 1,
    message: Message
}
export interface Message {
    id: string,
    channel_id: string,
    author: User,
    content: string,
    timestamp: string,
    edited_timestamp: string | null,
    tts: boolean,
    mention_everyone: boolean,
    attachments: Attachments[],
    embeds: Embeds[],
    reactions?: {
        count: number,
        me: boolean,
        emoji: Emoji
    },
    pinned: boolean,
    flags?: number,
    interaction?: Interaction,
    thread?: Channel,
    components?: ButtonsComponent[] | SelectMenusComponent[] | TextInputsComponent[],
    position?: number
}
export interface ModalOptions {
    title: string,
    custom_id: string,
    components: ActionRow[]
}
export interface InteractionDeferredOptions {
    ephemeral: boolean
}
export interface InteractionOptions {
    content?: string,
    embeds?: Embeds[]
    components?: ActionRow[],
    attachments?: Attachments[]
    ephemeral: boolean
}
export interface InteractionEditOptions {
    content?: string,
    embeds?: Embeds[]
    components?: ActionRow[],
    attachments?: Attachments[]
}
export interface FollowupOptions {
    content?: string,
    embeds?: Embeds[],
    components?: ActionRow[]
}
export interface Options {
    choices: {
        name: string,
        name_localizations?: object | null,
        value: string | number
    }[]
}
export interface Embeds {
    title?: string,
    type?: string,
    description?: string,
    url?: string,
    timestamp?: string,
    color?: number,
    footer?: {
        text: string,
        icon_url?: string
    },
    image?: {
        url: string
    },
    thumbnail?: {
        url: string
    },
    author?: {
        name: string,
        url?: string,
        icon_url?: string
    },
    fields?: {
        name: string,
        value: string,
        inline?: boolean
    }[]
}
export interface Attachments {
    id: string,
    filename: string,
    description?: string,
    content_type?: string,
    size: number,
    url: string,
    proxy_url: string,
    height?: number | null,
    width?: number | null,
    ephemeral?: boolean,
    duration_secs?: number,
    waveform?: string
}
export interface ActionRow {
    type: MessageComponentTypes.ACTION_ROW,
    components: ButtonsComponent[] | SelectMenusComponent[] | TextInputsComponent[]
}
interface BaseComponent {
    type: MessageComponentTypes
}
export interface ButtonsComponent extends BaseComponent {
    custom_id?: string,
    style: ButtonStyleTypes,
    label?: string,
    emoji?: Emoji,
    url?: string,
    disabled?: boolean
}
export interface SelectMenusComponent extends BaseComponent {
    custom_id: string,
    options?: {
        name: string,
        value: string,
        inline?: boolean
    },
    channel_types?: ChannelTypes[]
}
export interface TextInputsComponent extends BaseComponent {
    custom_id: string,
    style: TextStyleTypes,
    label: string,
    min_length?: number,
    max_length?: number,
    required?: boolean
    value?: string,
    placeholder?: string
}
export interface Emoji {
    id: string | null,
    name: string | null,
    roles?: Roles[],
    user?: User,
    require_colons?: boolean,
    managed?: boolean,
    animated?: boolean,
    avaible?: boolean
}
export interface Channel {
    flags?: number,
    guild_id?: string,
    id: string,
    last_message_id?: string | null,
    last_pin_timestamp?: string | null,
    name?: string,
    nsfw?: boolean,
    parent_id?: string | null,
    permissions?: string,
    position?: number,
    rate_limit_per_user?: number,
    topic?: string,
    type?: ChannelTypes
}
export interface Member {
    avatar?: string | null,
    communication_disabled_until?: string | null,
    deaf: boolean,
    flags: number,
    joined_at: string,
    mute: boolean,
    nick?: string | null,
    pending?: boolean,
    permissions?: string,
    premium_since?: string | null,
    roles: string[],
    unusual_dm_activity_until: any | null
    user: User,
}
export interface Roles {
    id: string,
    name: string,
    color: number,
    hoist: boolean,
    icon?: string | null,
    unicode_emoji?: string | null,
    position: number,
    permissions: string,
    managed: boolean,
    mentionable: boolean,
    tags?: {
        bot_id?: string,
        integration_id?: string,
        premium_subscriber?: null,
        subscription_listing_id?: string,
        available_for_purchase?: null,
        guild_connections?: null
    }
}
export interface User {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    avatar_decoration: any | null
    bot?: boolean,
    system?: boolean,
    mfa_enabled?: boolean,
    banner?: string,
    accent_color?: number,
    locale?: string,
    verified?: string,
    email?: string | null,
    flags?: number,
    premium_type?: PremiumType,
    public_flags?: number
}
interface PremiumType {
    NONE: 0,
    NITRO_CLASSIC: 1
    NITRO: 2,
    NITRO_BASIC: 3
}
interface Data {
    options?: {
        name: string,
        type: number,
        value: string
    }[],
    components?: {
        components: {
            custom_id: string,
            type: number,
            value: string
        }[]
    }[]
}