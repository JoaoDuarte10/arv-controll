import mongoose from 'mongoose';

const { Schema } = mongoose;

const segmentSchema = new Schema({
  id_user: String,
  segment: String,
});

const Segment = mongoose.model('Segment', segmentSchema);

export { Segment };
