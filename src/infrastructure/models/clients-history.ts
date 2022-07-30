import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientsHistorySchema = new Schema({
  id_user: String,
  description: String,
  client: String,
  date: String,
});

const ClientsHistory = mongoose.model('ClientsHistory', clientsHistorySchema);

export { ClientsHistory };
