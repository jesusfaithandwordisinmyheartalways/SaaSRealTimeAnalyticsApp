


import mongoose, { Schema } from 'mongoose'


const EventSchema = new Schema({
    userId: {type: String, required: true},
    eventType: {type: String, required: true},
    timestamp: {type: Number, required: true}
})

const EventModel = mongoose.model('Event', EventSchema)



export default EventModel