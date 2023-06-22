export class ApplicationController {
  static renderView(req, res, view, data = {}) {
    data.current_user = res.locals.currentUser
    data.flash_messages = req.flash('data')
    res.render(view, data)
  }
}