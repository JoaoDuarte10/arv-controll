import mongoose from 'mongoose';

const { Schema } = mongoose;

const scheduleSchema = new Schema({
    id_user: String,
    client: String,
    procedure: String,
    date: String,
    time: String,
    price: String,
    phone: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema)

export { Schedule };