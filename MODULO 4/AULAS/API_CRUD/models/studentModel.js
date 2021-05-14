import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  subject: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

const studentModel = mongoose.model('student', studentSchema, 'student');

export { studentModel };
