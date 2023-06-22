import cookieSession from 'cookie-session'
import express from "express"
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import { router } from "./config/routes.js"
import { setupAssets } from "./config/assets.js"

await mongoose.connect('mongodb://127.0.0.1/mcs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.set('trust proxy', 1)
app.use(cookieSession({
  name: 'session',
  secret: 'test',
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(flash())

app.use('/', router)

app.listen(3000, () => {
  console.log('Express web app on localhost:3000')
})

setupAssets(app, express)