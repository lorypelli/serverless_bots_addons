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
exports.ChannelTypes = exports.ApplicationCommandOptionTypes = exports.ApplicationCommandTypes = exports.get = exports.editFollowup = exports.followUp = exports.autocompleteResult = exports.showModal = exports.deferUpdate = exports.deferReply = exports.editReply = exports.reply = exports.login = void 0;
/* eslint-disable no-prototype-builtins */
const discord_interactions_1 = require("discord-interactions");
const raw_body_1 = __importDefault(require("raw-body"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function login(request, publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof request === Request) {
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
