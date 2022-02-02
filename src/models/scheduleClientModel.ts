import mongoose from 'mongoose';

const { Schema } = mongoose;

const scheduleClientSchema = new Schema({
    id_user: String,
    name: String,
    date: String,
    time: String,
    service: String,
    phone: String,
    createdAt: {type: Date, default: Date.now}
});

const ScheduleClient = mongoose.model('ScheduleClient', scheduleClientSchema)

export { ScheduleClient };