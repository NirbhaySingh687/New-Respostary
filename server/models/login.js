import mongoose from 'mongoose';

const loginSchema= mongoose.Schema({
    user_name: String,
    user_email: String,
    user_password: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Login = mongoose.model('logon', loginSchema);

export default Login;