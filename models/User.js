const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
            timestamps: true
        },
        id: false
    }
);
// virtual that retrieves length of users friends array field on query
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
  
const User = model('User', UserSchema);
  
module.exports = { User };