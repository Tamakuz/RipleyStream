import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  tokenApi: string;
  provider: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true }, // Set email as unique to prevent duplicates
  provider: { type: String, required: true },
  tokenApi: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
