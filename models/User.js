const { Schema, model } = require('mongoose');

// Schema to create a user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
      match: [^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$, 'You must use a valid email address!'],
    },
    // friends: {
    //   type: Date,
    //   // Sets a default value of 12 weeks from now
    //   default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    // },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
     friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model('user', userSchema);

module.exports = User;
