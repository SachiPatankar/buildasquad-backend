// post-application.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IApplication extends Document {
  _id: string;
  post_id: string;
  applicant_id: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: Date;
  updated_at: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    post_id: {
      type: String,
      required: true,
    },
    applicant_id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const ApplicationModel = mongoose.model<IApplication>(
  'ApplicationModel',
  ApplicationSchema
);
