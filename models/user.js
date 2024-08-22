const {Schema,model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            max_length: 15,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            max_length: 50,
            match:[/^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address' ]

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref:'user',
            },
        ],
    }
);
const User = model('user',userSchema);

module.exports =User;