import { Comment } from "../models/comment.js"
import { ApplicationController } from "./application_controller.js"

export class CommentsController extends ApplicationController {
  static index(req, res) {
    Comment.find().populate('user').then((comments) => {
      this.renderView(req, res, 'comments/index', {main_title: "Comments", comments: comments})
    }).catch((error) => {
      res.status(400).json({
        error: error
      })
    })
  }

  static show(req, res) {
    Comment.findOne({ _id: req.params.id }).populate('user').then((comment) => {
      this.renderView(req, res, 'comments/show', {main_title: comment.title, comment: comment})
    }).catch((_error) => {
      req.flash('data', {warning: "Cannot find comment!"})
      res.redirect('/comments')
    })
  }

  static create(req, res) {
    const comment = new Comment({
      title: req.body["comment_title"],
      body: req.body["comment_body"],
      date: new Date(),
      user: res.locals.currentUser._id
    })
    comment.save().then(() => {
      res.redirect('/comments')
    }).catch((error) => {
      res.status(400).json({
        error: error
      })
    })
  }

  static update(req, res) {
    Comment.findOne({ _id: req.params.id }).then((comment) => {
      if(comment.user.toString() === res.locals.currentUser._id.toString()) {
        const new_comment = new Comment({
          _id: req.params.id,
          title: req.body["comment_title"],
          body: req.body["comment_body"]
        })
        Comment.updateOne(comment, new_comment).then(() => {
          res.redirect('/comments')
        }).catch((error) => {
          res.status(400).json({
            error: error
          })
        })
      } else {
        res.redirect('/comments')
      }
    }).catch((error) => {
      res.status(400).json({
        error: error
      })
    })
  }

  static destroy(req, res) {
    Comment.findOne({ _id: req.params.id }).then((comment) => {
      if(comment.user.toString() === res.locals.currentUser._id.toString()) {
        comment.remove()
      }
      
      res.redirect('/comments')
    }).catch((error) => {
      res.status(400).json({
        error: error
      })
    })
  }
}