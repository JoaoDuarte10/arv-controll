import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema({
  id_user: String,
  name: String,
  email: String,
  phone: String,
  segment: String,
});

const Client = mongoose.model('Client', clientSchema);

export { Client };
