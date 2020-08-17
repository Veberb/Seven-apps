const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['Done', 'Pending', 'Doing'],
      default: 'Pending',
    },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('task', TaskSchema);
