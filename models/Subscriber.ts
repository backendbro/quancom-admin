// models/Subscriber.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  phone: string;
  ip: string;
  country: string;
  createdAt: Date;
}

const SubscriberSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    ip: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Prevent model overwrite upon hot-reload
export default mongoose.models.Subscriber ||
  mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
