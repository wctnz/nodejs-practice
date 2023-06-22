import bcrypt from "bcrypt"
import { User } from "../models/user.js"
import { ApplicationController } from "./application_controller.js"

export class SessionsController extends ApplicationController { 
  static new_create(req, res) {
    this.renderView(req, res, 'sessions/new', {main_title: "Sign In"})
  }

  static create(req, res) {
    User.findOne( {email: req.body.user_email} ).then((user) => {
      if (!user) {
        req.flash('data', {warning: "Email and/or password is incorrect!"})
        return res.redirect('/sessions/new')
      }
      bcrypt.compare(req.body.user_password, user.hashed_password).then((valid) => {
        console.log(valid)
        if (!valid) {
          req.flash('data', {warning: "Email and/or password is incorrect!"})
          return res.redirect('/sessions/new')
        }
        req.flash('data', {success: "Welcome!"})
        req.session.user = user
        res.redirect('/')
      })
    })
  }

  static destroy(req, res) {
    if (req.session && req.session.user && req.session.user._id) {
      req.session.user = null
      res.locals.currentUser = null
    }
    res.redirect('/')
  }
}