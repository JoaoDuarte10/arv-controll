import mongoose from 'mongoose';

const { Schema } = mongoose;

const salesSchema = new Schema({
  id_user: String,
  description: String,
  client: String,
  date: String,
  price: String,
});

const Sales = mongoose.model('Sales', salesSchema);

export { Sales };
