"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.ChannelTypes = exports.ApplicationCommandOptionTypes = exports.ApplicationCommandTypes = exports.get = exports.editFollowup = exports.followUp = exports.autocompleteResult = exports.showModal = exports.deferUpdate = exports.deferReply = exports.editReply = exports.reply = exports.login = void 0;
/* eslint-disable no-prototype-builtins */
const discord_interactions_1 = require("discord-interactions");
const raw_body_1 = __importDefault(require("raw-body"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function login(request, publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request instanceof Request) {
            const signature = request.headers.get('x-signature-ed25519');
            const timestamp = request.headers.get('x-signature-timestamp');
            const body = yield request.clone().arrayBuffer();
            const isValidRequest = (0, discord_interactions_1.verifyKey)(body, signature, timestamp, publicKey || process.env.PUBLIC_KEY);
            const interaction = request.json();
            if (!isValidRequest) {
                return Object.assign({ status: 401 }, interaction);
            }
            return Object.assign({ status: 200 }, interaction);
        }
        else {
            const signature = request.headers['x-signature-ed25519'];
            const timestamp = request.headers['x-signature-timestamp'];
            const body = yield (0, raw_body_1.default)(request);
            const isValidRequest = (0, discord_interactions_1.verifyKey)(body, signature, timestamp, publicKey || process.env.PUBLIC_KEY);
            const interaction = request.body;
            if (!isValidRequest) {
                return Object.assign({ status: 401 }, interaction);
            }
            return Object.assign({ status: 200 }, interaction);
        }
    });
}
exports.login = login;
function reply(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: 'POST',
            headers: { 'Authorization': `Bot ${token || process.env.TOKEN}`, 'Content-Type': 'application/json' },
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
        });
    });
}
exports.reply = reply;
function editReply(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = (token || process.env.TOKEN).split('.')[0];
        id = atob(id);
        yield fetch(`https://discord.com/api/v10/webhooks/${id}/${interaction.token}/messages/@original`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bot ${token || process.env.TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 4,
                data: Object.assign({}, options)
            })
        });
    });
}
exports.editReply = editReply;
function deferReply(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: 'POST',
            headers: { 'Authorization': `Bot ${token || process.env.TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 5,
                data: {
                    flags: options.ephemeral ? 64 : 0
                }
            })
        });
    });
}
exports.deferReply = deferReply;
function deferUpdate(interaction, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: 'POST',
            headers: { 'Authorization': `Bot ${token || process.env.TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 6
            })
        });
    });
}
exports.deferUpdate = deferUpdate;
function showModal(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: 'POST',
            headers: { 'Authorization': `Bot ${token || process.env.TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 9,
                data: Object.assign({}, options)
            })
        });
    });
}
exports.showModal = showModal;
function autocompleteResult(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: 'POST',
            headers: { 'Authorization': `Bot ${token || process.env.TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 8,
                data: Object.assign({}, options)
            })
        });
    });
}
exports.autocompleteResult = autocompleteResult;
function followUp(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = (token || process.env.TOKEN).split('.')[0];
        id = atob(id);
        yield fetch(`https://discord.com/api/v10/webhooks/${id}/${interaction.token}`, {
            method: 'POST',
            headers: { 'Authorization': `Bot ${token || process.env.TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.assign({}, options))
        });
    });
}
exports.followUp = followUp;
function editFollowup(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = (token || process.env.TOKEN).split('.')[0];
        id = atob(id);
        yield fetch(`https://discord.com/api/v10/webhooks/${id}/${interaction.token}/messages/${interaction.message.id}`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bot ${token || process.env.TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.assign({}, options))
        });
    });
}
exports.editFollowup = editFollowup;
function get(interaction, value) {
    const hasOptions = interaction.data.hasOwnProperty('options');
    if (hasOptions == true) {
        const options = interaction.data.options;
        for (let i = 0; i < options.length; i++) {
            if (interaction.data.options[i].name == value) {
                return interaction.data.options[i].value;
            }
        }
    }
    else {
        const hasComponents = interaction.data.hasOwnProperty('components');
        if (hasComponents == true) {
            const components = interaction.data.components;
            for (let i = 0; i < components.length; i++) {
                if (interaction.data.components[i].components[0].custom_id == value) {
                    return interaction.data.components[i].components[0].value;
                }
            }
        }
    }
}
exports.get = get;
var ApplicationCommandTypes;
(function (ApplicationCommandTypes) {
    ApplicationCommandTypes[ApplicationCommandTypes["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    ApplicationCommandTypes[ApplicationCommandTypes["USER"] = 2] = "USER";
    ApplicationCommandTypes[ApplicationCommandTypes["MESSAGE"] = 3] = "MESSAGE";
})(ApplicationCommandTypes || (exports.ApplicationCommandTypes = ApplicationCommandTypes = {}));
var ApplicationCommandOptionTypes;
(function (ApplicationCommandOptionTypes) {
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["STRING"] = 3] = "STRING";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["INTEGER"] = 4] = "INTEGER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["BOOLEAN"] = 5] = "BOOLEAN";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["USER"] = 6] = "USER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["CHANNEL"] = 7] = "CHANNEL";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ROLE"] = 8] = "ROLE";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["MENTIONABLE"] = 9] = "MENTIONABLE";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["NUMBER"] = 10] = "NUMBER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ATTACHMENT"] = 11] = "ATTACHMENT";
})(ApplicationCommandOptionTypes || (exports.ApplicationCommandOptionTypes = ApplicationCommandOptionTypes = {}));
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    ChannelTypes[ChannelTypes["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    ChannelTypes[ChannelTypes["GROUP_DM"] = 3] = "GROUP_DM";
    ChannelTypes[ChannelTypes["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    ChannelTypes[ChannelTypes["GUILD_ANNOUNCEMENT"] = 5] = "GUILD_ANNOUNCEMENT";
    ChannelTypes[ChannelTypes["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
    ChannelTypes[ChannelTypes["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
    ChannelTypes[ChannelTypes["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
    ChannelTypes[ChannelTypes["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    ChannelTypes[ChannelTypes["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    ChannelTypes[ChannelTypes["GUILD_FORUM"] = 15] = "GUILD_FORUM";
    ChannelTypes[ChannelTypes["GUILD_MEDIA"] = 16] = "GUILD_MEDIA";
})(ChannelTypes || (exports.ChannelTypes = ChannelTypes = {}));
var Permissions;
(function (Permissions) {
    Permissions[Permissions["CREATE_INSTANT_INVITE"] = 1] = "CREATE_INSTANT_INVITE";
    Permissions[Permissions["KICK_MEMBERS"] = 2] = "KICK_MEMBERS";
    Permissions[Permissions["BAN_MEMBERS"] = 4] = "BAN_MEMBERS";
    Permissions[Permissions["ADMINISTRATOR"] = 8] = "ADMINISTRATOR";
    Permissions[Permissions["MANAGE_CHANNELS"] = 16] = "MANAGE_CHANNELS";
    Permissions[Permissions["MANAGE_GUILD"] = 32] = "MANAGE_GUILD";
    Permissions[Permissions["ADD_REACTIONS"] = 64] = "ADD_REACTIONS";
    Permissions[Permissions["VIEW_AUDIT_LOG"] = 128] = "VIEW_AUDIT_LOG";
    Permissions[Permissions["PRIORITY_SPEAKER"] = 256] = "PRIORITY_SPEAKER";
    Permissions[Permissions["STREAM"] = 512] = "STREAM";
    Permissions[Permissions["VIEW_CHANNEL"] = 1024] = "VIEW_CHANNEL";
    Permissions[Permissions["SEND_MESSAGES"] = 2048] = "SEND_MESSAGES";
    Permissions[Permissions["SEND_TTS_MESSAGES"] = 4096] = "SEND_TTS_MESSAGES";
    Permissions[Permissions["MANAGE_MESSAGES"] = 8192] = "MANAGE_MESSAGES";
    Permissions[Permissions["EMBED_LINKS"] = 16384] = "EMBED_LINKS";
    Permissions[Permissions["ATTACH_FILES"] = 32768] = "ATTACH_FILES";
    Permissions[Permissions["READ_MESSAGE_HISTORY"] = 65536] = "READ_MESSAGE_HISTORY";
    Permissions[Permissions["MENTION_EVERYONE"] = 131072] = "MENTION_EVERYONE";
    Permissions[Permissions["USE_EXTERNAL_EMOJIS"] = 262144] = "USE_EXTERNAL_EMOJIS";
    Permissions[Permissions["VIEW_GUILD_INSIGHTS"] = 524288] = "VIEW_GUILD_INSIGHTS";
    Permissions[Permissions["CONNECT"] = 1048576] = "CONNECT";
    Permissions[Permissions["SPEAK"] = 2097152] = "SPEAK";
    Permissions[Permissions["MUTE_MEMBERS"] = 4194304] = "MUTE_MEMBERS";
    Permissions[Permissions["DEAFEN_MEMBERS"] = 8388608] = "DEAFEN_MEMBERS";
    Permissions[Permissions["MOVE_MEMBERS"] = 16777216] = "MOVE_MEMBERS";
    Permissions[Permissions["USE_VAD"] = 33554432] = "USE_VAD";
    Permissions[Permissions["CHANGE_NICKNAME"] = 67108864] = "CHANGE_NICKNAME";
    Permissions[Permissions["MANAGE_NICKNAMES"] = 134217728] = "MANAGE_NICKNAMES";
    Permissions[Permissions["MANAGE_ROLES"] = 268435456] = "MANAGE_ROLES";
    Permissions[Permissions["MANAGE_WEBHOOKS"] = 536870912] = "MANAGE_WEBHOOKS";
    Permissions[Permissions["MANAGE_GUILD_EXPRESSIONS"] = 1073741824] = "MANAGE_GUILD_EXPRESSIONS";
    Permissions[Permissions["USE_APPLICATION_COMMANDS"] = -2147483648] = "USE_APPLICATION_COMMANDS";
    Permissions[Permissions["REQUEST_TO_SPEAK"] = 1] = "REQUEST_TO_SPEAK";
    Permissions[Permissions["MANAGE_EVENTS"] = 2] = "MANAGE_EVENTS";
    Permissions[Permissions["MANAGE_THREADS"] = 4] = "MANAGE_THREADS";
    Permissions[Permissions["CREATE_PUBLIC_THREADS"] = 8] = "CREATE_PUBLIC_THREADS";
    Permissions[Permissions["CREATE_PRIVATE_THREADS"] = 16] = "CREATE_PRIVATE_THREADS";
    Permissions[Permissions["USE_EXTERNAL_STICKERS"] = 32] = "USE_EXTERNAL_STICKERS";
    Permissions[Permissions["SEND_MESSAGES_IN_THREADS"] = 64] = "SEND_MESSAGES_IN_THREADS";
    Permissions[Permissions["USE_EMBEDDED_ACTIVITIES"] = 128] = "USE_EMBEDDED_ACTIVITIES";
    Permissions[Permissions["MODERATE_MEMBERS"] = 256] = "MODERATE_MEMBERS";
    Permissions[Permissions["VIEW_CREATOR_MONETIZATION_ANALYTICS"] = 512] = "VIEW_CREATOR_MONETIZATION_ANALYTICS";
    Permissions[Permissions["USE_SOUNDBOARD"] = 1024] = "USE_SOUNDBOARD";
    Permissions[Permissions["USE_EXTERNAL_SOUNDS"] = 8192] = "USE_EXTERNAL_SOUNDS";
    Permissions[Permissions["SEND_VOICE_MESSAGES"] = 16384] = "SEND_VOICE_MESSAGES";
})(Permissions || (exports.Permissions = Permissions = {}));
