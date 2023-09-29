import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";


export class TimeblocksController extends BaseController {
  constructor() {
    super()
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async getTimeblocks(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }





  async getTimeblockById(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }




  async createTimeblock(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }





  async editTimeblock(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }





  async deleteTimeblock(req, res, next) {
    try {

      res.send()
    } catch (error) {
      next.error(error)
    }
  }
}