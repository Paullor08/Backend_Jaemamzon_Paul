import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },

    Email: {
        type: String,
        required: true,
        unique: true,
    },

    Password: {
        type: String,
        required: true,
        unique: true,
    },

    IsAdmin: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User',UserSchema)


export default User;