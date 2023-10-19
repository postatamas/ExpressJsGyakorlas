import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const UserModel: Model<IUser> = mongoose.model<IUser>('users', UserSchema);

export default UserModel;
