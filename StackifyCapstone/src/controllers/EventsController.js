import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";


export class EventsController extends BaseController {
  constructor() {
    super()
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async getEvents(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }





  async getEventById(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }




  async createEvent(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }





  async editEvent(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }





  async deleteEvent(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }
}