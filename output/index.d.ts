import { MessageComponentTypes, ButtonStyleTypes, TextStyleTypes, InteractionType } from "discord-interactions";
export declare function reply(interaction: Interaction, options: InteractionOptions, token?: string): Promise<void>;
export declare function editReply(interaction: Interaction, options: InteractionEditOptions, token?: string): Promise<void>;
export declare function deferReply(interaction: Interaction, options: InteractionDeferredOptions, token?: string): Promise<void>;
export declare function updateDefer(interaction: Interaction, token?: string): Promise<void>;
export declare function showModal(interaction: Interaction, options: ModalOptions, token?: string): Promise<void>;
export declare function autocompleteResult(interaction: Interaction, options: AutocompleteOptions, token?: string): Promise<void>;
export declare function followUp(interaction: Interaction, options: FollowupOptions, token?: string): Promise<void>;
export declare function editFollowup(interaction: Interaction, options: FollowupOptions, token?: string): Promise<void>;
export declare function get(interaction: Interaction, value: string): string | undefined;
export declare enum ApplicationCommandTypes {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}
export declare enum ApplicationCommandOptionTypes {
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
export declare enum ChannelTypes {
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
    type?: ApplicationCommandTypes;
    guild_id?: string;
    name: string;
    name_localizations?: LocalizationObject | null;
    description: string;
    description_localizations?: LocalizationObject | null;
    options?: ApplicationCommandOptions[];
    dm_permission?: boolean;
    default_permission?: boolean | null;
    nsfw?: boolean;
}
export interface ApplicationCommandOptions {
    type: ApplicationCommandOptionTypes;
    name: string;
    name_localizations?: LocalizationObject | null;
    description: string;
    description_localizations?: LocalizationObject | null;
    required?: boolean;
    choices?: Options[];
    options?: ApplicationCommandOptions[];
    channel_types?: ChannelTypes[];
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
    autocomplete?: boolean;
}
export interface LocalizationObject {
    "id"?: string;
    "da"?: string;
    "de"?: string;
    "en-GB"?: string;
    "en-US"?: string;
    "es-ES"?: string;
    "fr"?: string;
    "hr"?: string;
    "it"?: string;
    "lt"?: string;
    "hu"?: string;
    "nl"?: string;
    "no"?: string;
    "pl"?: string;
    "pt-BR"?: string;
    "ro"?: string;
    "fi"?: string;
    "sv-SE"?: string;
    "vi"?: string;
    "tr"?: string;
    "cs"?: string;
    "el"?: string;
    "bg"?: string;
    "ru"?: string;
    "uk"?: string;
    "hi"?: string;
    "th"?: string;
    "zh-CN"?: string;
    "ja"?: string;
    "zh-TW"?: string;
    "ko"?: string;
}
export interface Interaction {
    app_permissions: string;
    application_id: string;
    channel: Channel;
    channel_id: string;
    data?: {
        guild_id: string;
        id: string;
        name: string;
        resolved?: Resolved;
        target_id?: string;
        options?: Data["options"];
        components?: Data["components"];
        custom_id?: string;
        component_type: number;
        values: {
            label: string;
            value: string;
            description?: string;
            emoji?: Emoji;
            default?: boolean;
        };
        type: ApplicationCommandTypes;
    };
    entitlement_sku_ids: any[];
    entitlements: any[];
    guild: {
        features: string[];
        id: string;
        locale: string;
    };
    guild_id?: string;
    guild_locale?: string;
    id: string;
    locale?: string;
    member?: Member;
    user?: User;
    token: string;
    type: InteractionType;
    version: 1;
    message: Message;
}
interface Resolved {
    messages?: {
        [T in Interaction["data"] extends {
            target_id: string;
        } ? Interaction["data"]["target_id"] : string]: Message;
    };
    users?: {
        [T in Interaction["data"] extends {
            target_id: string;
        } ? Interaction["data"]["target_id"] : string]: User;
    };
    members?: {
        [T in Interaction["data"] extends {
            target_id: string;
        } ? Interaction["data"]["target_id"] : string]: Member;
    };
    roles?: {
        [T in Interaction["data"] extends {
            target_id: string;
        } ? Interaction["data"]["target_id"] : string]: Roles;
    };
    channels?: {
        [T in Interaction["data"] extends {
            target_id: string;
        } ? Interaction["data"]["target_id"] : string]: Channel;
    };
    attachments?: {
        [T in Interaction["data"] extends {
            target_id: string;
        } ? Interaction["data"]["target_id"] : string]: Attachments;
    };
}
export interface Message {
    id: string;
    channel_id: string;
    author: User;
    content: string;
    timestamp: string;
    edited_timestamp: string | null;
    tts: boolean;
    mention_everyone: boolean;
    attachments: Attachments[];
    embeds: Embeds[];
    reactions?: {
        count: number;
        me: boolean;
        emoji: Emoji;
    };
    pinned: boolean;
    flags?: number;
    interaction?: Interaction;
    thread?: Channel;
    components?: ButtonsComponent[] | SelectMenusComponent[] | TextInputsComponent[];
    position?: number;
}
export interface ModalOptions {
    title: string;
    custom_id: string;
    components: ActionRow[];
}
export interface InteractionDeferredOptions {
    ephemeral: boolean;
}
export interface InteractionOptions {
    content?: string;
    embeds?: Embeds[];
    components?: ActionRow[];
    attachments?: Attachments[];
    ephemeral: boolean;
}
export interface InteractionEditOptions {
    content?: string;
    embeds?: Embeds[];
    components?: ActionRow[];
    attachments?: Attachments[];
}
export interface FollowupOptions {
    content?: string;
    embeds?: Embeds[];
    components?: ActionRow[];
}
export interface Options {
    name: string;
    name_localizations?: object | null;
    value: string | number;
}
export interface AutocompleteOptions {
    choices: {
        name: string;
        value: string;
    }[];
}
export interface Embeds {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: {
        text: string;
        icon_url?: string;
    };
    image?: {
        url: string;
    };
    thumbnail?: {
        url: string;
    };
    author?: {
        name: string;
        url?: string;
        icon_url?: string;
    };
    fields?: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
}
export interface Attachments {
    id: string;
    filename: string;
    description?: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number | null;
    width?: number | null;
    ephemeral?: boolean;
    duration_secs?: number;
    waveform?: string;
}
export interface ActionRow {
    type: MessageComponentTypes.ACTION_ROW;
    components: ButtonsComponent[] | SelectMenusComponent[] | TextInputsComponent[];
}
interface BaseComponent {
    type: MessageComponentTypes;
}
export interface ButtonsComponent extends BaseComponent {
    custom_id?: string;
    style: ButtonStyleTypes;
    label?: string;
    emoji?: Emoji;
    url?: string;
    disabled?: boolean;
}
export interface SelectMenusComponent extends BaseComponent {
    custom_id: string;
    options?: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
    channel_types?: ChannelTypes[];
    placeholder?: string;
    min_values?: string;
    max_values?: string;
    disabled?: boolean;
}
export interface TextInputsComponent extends BaseComponent {
    custom_id: string;
    style: TextStyleTypes;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
}
export interface Emoji {
    id: string | null;
    name: string | null;
    roles?: Roles[];
    user?: User;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    avaible?: boolean;
}
export interface Channel {
    flags?: number;
    guild_id?: string;
    id: string;
    last_message_id?: string | null;
    last_pin_timestamp?: string | null;
    name?: string;
    nsfw?: boolean;
    parent_id?: string | null;
    permissions?: string;
    position?: number;
    rate_limit_per_user?: number;
    topic?: string;
    type?: ChannelTypes;
}
export interface Member {
    avatar?: string | null;
    communication_disabled_until?: string | null;
    deaf: boolean;
    flags: number;
    joined_at: string;
    mute: boolean;
    nick?: string | null;
    pending?: boolean;
    permissions?: string;
    premium_since?: string | null;
    roles: string[];
    unusual_dm_activity_until: any | null;
    user: User;
}
export interface Roles {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string | null;
    unicode_emoji?: string | null;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: {
        bot_id?: string;
        integration_id?: string;
        premium_subscriber?: null;
        subscription_listing_id?: string;
        available_for_purchase?: null;
        guild_connections?: null;
    };
}
export interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    avatar_decoration: any | null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: string;
    email?: string | null;
    flags?: number;
    premium_type?: PremiumType;
    public_flags?: number;
}
interface PremiumType {
    NONE: 0;
    NITRO_CLASSIC: 1;
    NITRO: 2;
    NITRO_BASIC: 3;
}
interface Data {
    options?: {
        name: string;
        type: number;
        value: string;
    }[];
    components?: {
        components: {
            custom_id: string;
            type: number;
            value: string;
        }[];
    }[];
}
export {};
