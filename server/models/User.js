const mongoose = require('mongoose')
const {Schema} = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 00
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: "Male"
    },
    phone:{
        type: Number,
        default: 0000000
    },
    location: {
        type: String,
        default: "______"
    }
})

const User = mongoose.model("User", userSchema);
// User.createIndexes() //unique true with respect to email
module.exports = User;