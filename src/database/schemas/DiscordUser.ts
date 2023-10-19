import mongoose, { Document, Model, Schema } from 'mongoose';

interface IDiscordUser extends Document {
  discordId: string;
  createdAt: Date;
}

const DiscordUserSchema: Schema<IDiscordUser> = new Schema({
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

const DiscordUserModel: Model<IDiscordUser> = mongoose.model<IDiscordUser>('discord_users', DiscordUserSchema);

export default DiscordUserModel;
