const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// establish schema before attempting to access in thought schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter used to format timestamp on query 
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String, 
            required: true
        },
        reactions: [
            ReactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);


// virtual that retrieves length of the thoughts reactions array 
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
  
const Thought = model('Thought', ThoughtSchema);
  
module.exports = Thought ;