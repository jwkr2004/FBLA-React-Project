import { Schema, model } from "mongoose";
const eventsSchema = new Schema({
    image: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    points: {
        type: String
    }
});
export default model('events', eventsSchema);