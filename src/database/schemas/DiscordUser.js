"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DiscordUserSchema = new mongoose_1.Schema({
    discordId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
});
var DiscordUserModel = mongoose_1.default.model('discord_users', DiscordUserSchema);
exports.default = DiscordUserModel;
