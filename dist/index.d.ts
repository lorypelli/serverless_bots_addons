import { MessageComponentTypes, ButtonStyleTypes, TextStyleTypes, InteractionType } from 'discord-interactions';
export declare function login(request: any, publicKey?: string): Promise<{
    app_permissions: string;
    application_id: string;
    channel: Channel;
    channel_id: string;
    data?: {
        guild_id: string;
        id: string;
        name: string;
        resolved?: Resolved | undefined;
        target_id?: string | undefined;
        options?: {
            name: string;
            type: number;
            value: string;
        }[] | undefined;
        components?: {
            components: {
                custom_id: string;
                type: number;
                value: string;
            }[];
        }[] | undefined;
        custom_id?: string | undefined;
        component_type: number;
        values: [label: string];
        type: ApplicationCommandTypes;
    } | undefined;
    guild: {
        features: string[];
        id: string;
        locale: string;
    };
    guild_id?: string | undefined;
    guild_locale?: string | undefined;
    id: string;
    locale?: string | undefined;
    member?: Member | undefined;
    user?: User | undefined;
    token: string;
    type: InteractionType;
    version: 1;
    message: Message;
    status: number;
}>;
export declare function reply(interaction: Interaction, options: InteractionOptions, token?: string): Promise<void>;
export declare function editReply(interaction: Interaction, options: InteractionEditOptions, token?: string): Promise<void>;
export declare function deferReply(interaction: Interaction, options: InteractionDeferredOptions, token?: string): Promise<void>;
export declare function deferUpdate(interaction: Interaction, token?: string): Promise<void>;
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
export declare enum Permissions {
    CREATE_INSTANT_INVITE = 1,
    KICK_MEMBERS = 2,
    BAN_MEMBERS = 4,
    ADMINISTRATOR = 8,
    MANAGE_CHANNELS = 16,
    MANAGE_GUILD = 32,
    ADD_REACTIONS = 64,
    VIEW_AUDIT_LOG = 128,
    PRIORITY_SPEAKER = 256,
    STREAM = 512,
    VIEW_CHANNEL = 1024,
    SEND_MESSAGES = 2048,
    SEND_TTS_MESSAGES = 4096,
    MANAGE_MESSAGES = 8192,
    EMBED_LINKS = 16384,
    ATTACH_FILES = 32768,
    READ_MESSAGE_HISTORY = 65536,
    MENTION_EVERYONE = 131072,
    USE_EXTERNAL_EMOJIS = 262144,
    VIEW_GUILD_INSIGHTS = 524288,
    CONNECT = 1048576,
    SPEAK = 2097152,
    MUTE_MEMBERS = 4194304,
    DEAFEN_MEMBERS = 8388608,
    MOVE_MEMBERS = 16777216,
    USE_VAD = 33554432,
    CHANGE_NICKNAME = 67108864,
    MANAGE_NICKNAMES = 134217728,
    MANAGE_ROLES = 268435456,
    MANAGE_WEBHOOKS = 536870912,
    MANAGE_GUILD_EXPRESSIONS = 1073741824,
    USE_APPLICATION_COMMANDS = -2147483648,
    REQUEST_TO_SPEAK = 1,
    MANAGE_EVENTS = 2,
    MANAGE_THREADS = 4,
    CREATE_PUBLIC_THREADS = 8,
    CREATE_PRIVATE_THREADS = 16,
    USE_EXTERNAL_STICKERS = 32,
    SEND_MESSAGES_IN_THREADS = 64,
    USE_EMBEDDED_ACTIVITIES = 128,
    MODERATE_MEMBERS = 256,
    VIEW_CREATOR_MONETIZATION_ANALYTICS = 512,
    USE_SOUNDBOARD = 1024,
    USE_EXTERNAL_SOUNDS = 8192,
    SEND_VOICE_MESSAGES = 16384
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
    default_member_permissions: string | null;
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
    'id'?: string;
    'da'?: string;
    'de'?: string;
    'en-GB'?: string;
    'en-US'?: string;
    'es-ES'?: string;
    'fr'?: string;
    'hr'?: string;
    'it'?: string;
    'lt'?: string;
    'hu'?: string;
    'nl'?: string;
    'no'?: string;
    'pl'?: string;
    'pt-BR'?: string;
    'ro'?: string;
    'fi'?: string;
    'sv-SE'?: string;
    'vi'?: string;
    'tr'?: string;
    'cs'?: string;
    'el'?: string;
    'bg'?: string;
    'ru'?: string;
    'uk'?: string;
    'hi'?: string;
    'th'?: string;
    'zh-CN'?: string;
    'ja'?: string;
    'zh-TW'?: string;
    'ko'?: string;
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
        options?: Data['options'];
        components?: Data['components'];
        custom_id?: string;
        component_type: number;
        values: [
            label: string
        ];
        type: ApplicationCommandTypes;
    };
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
        [T in Interaction['data'] extends {
            target_id: string;
        } ? Interaction['data']['target_id'] : string]: Message;
    };
    users?: {
        [T in Interaction['data'] extends {
            target_id: string;
        } ? Interaction['data']['target_id'] : string]: User;
    };
    members?: {
        [T in Interaction['data'] extends {
            target_id: string;
        } ? Interaction['data']['target_id'] : string]: Member;
    };
    roles?: {
        [T in Interaction['data'] extends {
            target_id: string;
        } ? Interaction['data']['target_id'] : string]: Roles;
    };
    channels?: {
        [T in Interaction['data'] extends {
            target_id: string;
        } ? Interaction['data']['target_id'] : string]: Channel;
    };
    attachments?: {
        [T in Interaction['data'] extends {
            target_id: string;
        } ? Interaction['data']['target_id'] : string]: Attachments;
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
        label: string;
        value: string;
        description?: string;
        emoji?: Emoji;
        default?: boolean;
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
export interface Guild {
    id: string;
    name: string;
    icon: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    region?: string | null;
    afk_channel_id: string | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null;
    verification_level: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: Roles;
    emojis: Emoji;
    features: string[];
    mfa_level: number;
    application_id: string | null;
    system_channel_id: string | null;
    system_channel_flags: number;
    rules_channel_id: string | null;
    max_presences?: number | null;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: GuildPremiumTier;
    premium_subscription_count?: number;
    preferred_locate: string;
    nsfw_level: NSFW_Level;
}
interface PremiumType {
    NONE: 0;
    NITRO_CLASSIC: 1;
    NITRO: 2;
    NITRO_BASIC: 3;
}
interface GuildPremiumTier {
    NONE: 0;
    TIER_1: 1;
    TIER_2: 2;
    TIER_3: 3;
}
interface NSFW_Level {
    DEFAULT: 0;
    EXPLICIT: 1;
    SAFE: 2;
    AGE_RESTRICTED: 3;
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