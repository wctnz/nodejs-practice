import bcrypt from "bcrypt"
import { validationResult } from "express-validator"
import { User } from "../models/user.js"
import { ApplicationController } from "./application_controller.js"

export class UsersController extends ApplicationController { 
  static index(req, res) {
    this.renderView(req, res, 'users/index', {main_title: "Users", users: []})
  }

  static show(req, res) {
    this.renderView(req, res, 'users/show', {main_title: user.name, user: {}})
  }

  static new_create(req, res) {
    this.renderView(req, res, 'users/new', {main_title: "Registration"})
  }

  static create(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return this.renderView(req, res, 'users/new', {main_title: "Registration", errors: errors.array()})
    }
    const saltRounds = 10
    bcrypt.hash(req.body.user_password, saltRounds).then((hash) => {
      const user = new User({
        username: req.body["user_username"],
        email: req.body["user_email"],
        name: req.body["user_name"],
        surname: req.body["user_surname"],
        hashed_password: hash
      })
      user.save().then(() => {
        res.redirect('/')
      }).catch((e) => {
        res.status(400).json({
          error: e
        })
      })
    })
  }
}