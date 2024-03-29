import mongoose from 'mongoose';

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  id_user: String,
  client: String,
  procedure: String,
  date: String,
  time: String,
  phone: String,
  pacote: Boolean,
  qtdAtendimento: Number,
  qtdTotalAtendimento: Number,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export { Schedule };
