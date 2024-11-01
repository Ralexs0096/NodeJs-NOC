import mongoose from 'mongoose';

import { LogEntityOptions } from './../../../domain/entities/log.entity';
/**
 * See {@link LogEntityOptions} for reference
 */

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  message: {
    type: String,
    required: true
  },
  origin: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export const LogModel = mongoose.model('Log', logSchema);
