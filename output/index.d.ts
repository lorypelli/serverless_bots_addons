export declare function reply(interaction: Interaction, options: InteractionOptions, token?: String): Promise<void>;
export declare function editReply(interaction: Interaction, options: InteractionEditOptions, token?: String): Promise<void>;
export declare function deferReply(interaction: Interaction, options: InteractionDeferredOptions, token?: String): Promise<void>;
export declare function updateDefer(interaction: Interaction, options: InteractionDeferredOptions, token?: String): Promise<void>;
export declare function showModal(interaction: Interaction, options: ModalOptions, token?: String): Promise<void>;
export declare function autocompleteResult(interaction: Interaction, options: AutocompleteOptions, token?: String): Promise<void>;
export declare function followup(interaction: Interaction, options: FollowupOptions, token?: String): Promise<void>;
export declare function editFollowup(interaction: Interaction, options: FollowupOptions, token?: String): Promise<void>;
export declare function get(interaction: Interaction, value: String): String | undefined;
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
export interface Interaction {
    app_permissions: String;
    application_id: String;
    channel: Channel;
    channel_id: String;
    data?: {
        guild_id: String;
        id: String;
        name: String;
        options: Data["options"];
        components: Data["components"];
        type: 1 | Number;
    };
    entitlement_sku_ids: any[];
    entitlements: any[];
    guild: {
        features: String[];
        id: String;
        locale: String;
    };
    guild_id?: String;
    guild_locale?: String;
    id: String;
    locale?: String;
    member: Member;
    token: String;
    type: Number;
    version: Number;
    message: Message;
}
export interface Message {
    id: String;
    channel_id: String;
    author: User;
    content: String;
    timestamp: String;
    edited_timestamp: String | null;
    tts: Boolean;
    mention_everyone: Boolean;
    attachments: Attachments[];
    embeds: Embeds[];
    reactions?: {
        count: Number;
        me: Boolean;
        emoji: Emoji;
    };
    pinned: Boolean;
    flags?: Number;
    interaction?: Interaction;
    thread?: Channel;
    components?: ButtonsComponent[] | SelectMenusComponent[] | TextInputsComponent[];
    position?: Number;
}
export interface ModalOptions {
    title: String;
    custom_id: String;
    components: ActionRow[];
}
export interface InteractionDeferredOptions {
    ephemeral: Boolean;
}
export interface InteractionOptions {
    content?: String;
    embeds?: Embeds[];
    components?: ActionRow[];
    attachments?: Attachments[];
    ephemeral: Boolean;
}
export interface InteractionEditOptions {
    content?: String;
    embeds?: Embeds[];
    components?: ActionRow[];
    attachments?: Attachments[];
}
export interface FollowupOptions {
    content?: String;
    embeds?: Embeds[];
    components?: ActionRow[];
}
export interface AutocompleteOptions {
    choices: {
        name: String;
        name_localizations?: Object | null;
        value: String | Number;
    }[];
}
export interface Embeds {
    title?: String;
    type?: String;
    description?: String;
    url?: String;
    timestamp?: String;
    color?: Number;
    footer?: {
        text: String;
        icon_url?: String;
    };
    image?: {
        url: String;
    };
    thumbnail?: {
        url: String;
    };
    author?: {
        name: String;
        url?: String;
        icon_url?: String;
    };
    fields?: {
        name: String;
        value: String;
        inline?: Boolean;
    }[];
}
export interface Attachments {
    id: String;
    filename: String;
    description?: String;
    content_type?: String;
    size: Number;
    url: String;
    proxy_url: String;
    height?: Number | null;
    width?: Number | null;
    ephemeral?: Boolean;
    duration_secs?: Number;
    waveform?: String;
}
export interface ActionRow {
    type: 1;
    components: ButtonsComponent[] | SelectMenusComponent[] | TextInputsComponent[];
}
interface BaseComponent {
    type: Number;
}
export interface ButtonsComponent extends BaseComponent {
    custom_id?: String;
    style: Number;
    label?: String;
    emoji?: Emoji;
    url?: String;
    disabled?: Boolean;
}
export interface SelectMenusComponent extends BaseComponent {
    custom_id: String;
    options?: {
        name: String;
        value: String;
        inline?: Boolean;
    };
    channel_types?: ChannelTypes[];
}
export interface TextInputsComponent extends BaseComponent {
    custom_id: String;
    style: Number;
    label: String;
    min_length?: Number;
    max_length?: Number;
    required?: Boolean;
    value?: String;
    placeholder?: String;
}
export interface Emoji {
    id: String | null;
    name: String | null;
    roles?: Roles[];
    user?: User;
    require_colons?: Boolean;
    managed?: Boolean;
    animated?: Boolean;
    avaible?: Boolean;
}
export interface Channel {
    flags?: Number;
    guild_id?: String;
    id: String;
    last_message_id?: String | null;
    last_pin_timestamp?: String | null;
    name?: String;
    nsfw?: Boolean;
    parent_id?: String | null;
    permissions?: String;
    position?: Number;
    rate_limit_per_user?: Number;
    topic?: String;
    type?: ChannelTypes.GUILD_TEXT | Number;
}
export interface Member {
    avatar?: String | null;
    communication_disabled_until?: String | null;
    deaf: Boolean;
    flags: Number;
    joined_at: String;
    mute: Boolean;
    nick?: String | null;
    pending?: Boolean;
    permissions?: String;
    premium_since?: String | null;
    roles: String[];
    unusual_dm_activity_until: any | null;
    user: User;
}
export interface Roles {
    id: String;
    name: String;
    color: Number;
    hoist: Boolean;
    icon?: String | null;
    unicode_emoji?: String | null;
    position: Number;
    permissions: String;
    managed: Boolean;
    mentionable: Boolean;
    tags?: {
        bot_id?: String;
        integration_id?: String;
        premium_subscriber?: null;
        subscription_listing_id?: String;
        available_for_purchase?: null;
        guild_connections?: null;
    };
}
export interface User {
    id: String;
    username: String;
    discriminator: String;
    avatar: String | null;
    avatar_decoration: any | null;
    bot?: Boolean;
    system?: Boolean;
    mfa_enabled?: Boolean;
    banner?: String;
    accent_color?: Number;
    locale?: String;
    verified?: String;
    email?: String | null;
    flags?: Number;
    premium_type?: Number;
    public_flags?: Number;
}
interface Data {
    options?: {
        name: String;
        type: Number;
        value: String;
    }[];
    components?: {
        components: {
            custom_id: String;
            type: Number;
            value: String;
        }[];
    }[];
}
export {};
