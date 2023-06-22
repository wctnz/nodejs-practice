import { ApplicationController } from "./application_controller.js"

export class StaticPagesController extends ApplicationController { 
  static index(req, res) {
    this.renderView(req, res, 'static_pages/index', {company: "test", main_title: "Index"})
  }

  static about(req, res) {
    this.renderView(req, res, 'static_pages/about', {main_title: "About Us"})
  }
}