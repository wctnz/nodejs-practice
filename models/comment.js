import mongoose from 'mongoose'

const Schema = mongoose.Schema
const commentSchema = new Schema({
  title: String,
  body: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export const Comment = mongoose.model('Comment', commentSchema)