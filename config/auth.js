import { User } from "../models/user.js"

export function reqire_auth(req, res, next) {
  auth(req, res, next)
}

export function try_auth(req, res, next) {
  auth(req, res, next, false)
}

export function require_no_auth(req, res, next) {
  if (req.session && req.session.user && req.session.user._id) {
    res.redirect('/')
  }
  next()
}

function auth(req, res, next, mandatory = true) {
  if (req.session && req.session.user && req.session.user._id) {
    User.findOne( {_id: req.session.user._id} ).then((user) => {
      res.locals.currentUser = user
      next()
    }).catch((_e) => {
      res.redirect('/')
    })
  } else {
    if (mandatory) res.redirect('/')
    next()
  }
}