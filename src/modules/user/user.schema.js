const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
