import { Schema, model, models } from 'mongoose';

const scheduleSchema = new Schema({
  isRunScrape: {
    type: Boolean,
    default: false,
  },
});

const Schedule = models.Schedule || model('Schedule', scheduleSchema);

export default Schedule;
