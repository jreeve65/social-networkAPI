const { Schema, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat.js");

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
}
);
module.exports = reactionsSchema;