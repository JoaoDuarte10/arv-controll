import mongoose from 'mongoose';

const { Schema } = mongoose;

const loginSchema = new Schema({
  user: String,
  password: String,
});

const Login = mongoose.model('Login', loginSchema);

export { Login };
