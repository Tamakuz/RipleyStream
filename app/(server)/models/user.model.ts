import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  clerkId: string;
  tokenApi: string;
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  tokenApi: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
