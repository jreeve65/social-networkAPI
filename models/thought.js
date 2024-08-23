const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat.js");
const reactionSchema = require('./reaction.js')
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions:[reactionSchema],

    },
    {
        toJSON:{
            virtuals:true,
        },
        id: false,
    },
);

thoughtsSchema
.virtual('reactionCount')
.get(function(){
    return `${this.reactions.length}`;
});
const Thought = model('thought',thoughtsSchema);

module.exports =Thought;