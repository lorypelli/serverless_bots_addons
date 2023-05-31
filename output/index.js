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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelTypes = exports.ApplicationCommandOptionTypes = exports.ApplicationCommandTypes = exports.get = exports.editFollowup = exports.followup = exports.autocompleteResult = exports.showModal = exports.updateDefer = exports.deferReply = exports.editReply = exports.reply = void 0;
function reply(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
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
        });
    });
}
exports.reply = reply;
function editReply(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/messages/@original`, {
            method: "PATCH",
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
        });
    });
}
exports.editReply = editReply;
function deferReply(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: "POST",
            headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
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
function updateDefer(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: "POST",
            headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                type: 6,
                data: {
                    flags: options.ephemeral ? 64 : 0
                }
            })
        });
    });
}
exports.updateDefer = updateDefer;
function showModal(interaction, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: "POST",
            headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
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
            method: "POST",
            headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                type: 8,
                data: Object.assign({}, options)
            })
        });
    });
}
exports.autocompleteResult = autocompleteResult;
function followup(interaction, options, token) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let id = (_a = (token || process.env.TOKEN)) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        id = atob(id);
        yield fetch(`https://discord.com/api/v10/webhooks/${id}/${interaction.token}`, {
            method: "POST",
            headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
            body: JSON.stringify(Object.assign({}, options))
        });
    });
}
exports.followup = followup;
function editFollowup(interaction, options, token) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let id = (_a = (token || process.env.TOKEN)) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        id = atob(id);
        yield fetch(`https://discord.com/api/v10/webhooks/${id}/${interaction.token}/messages/${interaction.message.id}`, {
            method: "PATCH",
            headers: { "Authorization": `Bot ${token || process.env.TOKEN}`, "Content-Type": "application/json" },
            body: JSON.stringify(Object.assign({}, options))
        });
    });
}
exports.editFollowup = editFollowup;
function get(interaction, value) {
    let hasOptions = interaction.data.hasOwnProperty("options");
    if (hasOptions == true) {
        let options = interaction.data.options;
        for (let i = 0; i < options.length; i++) {
            if (interaction.data.options[i].name == value) {
                return interaction.data.options[i].value;
            }
        }
    }
    else {
        let hasComponents = interaction.data.hasOwnProperty("components");
        if (hasComponents == true) {
            let components = interaction.data.components;
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
})(ApplicationCommandTypes = exports.ApplicationCommandTypes || (exports.ApplicationCommandTypes = {}));
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
})(ApplicationCommandOptionTypes = exports.ApplicationCommandOptionTypes || (exports.ApplicationCommandOptionTypes = {}));
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
})(ChannelTypes = exports.ChannelTypes || (exports.ChannelTypes = {}));
