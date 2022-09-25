const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
            reactionSchema
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
// virtual that retrieves length of the thoughts reactions array 
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
  
const Thought = model('Thought', ThoughtSchema);
  
module.exports = { Thought };