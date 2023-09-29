import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";


export class CollaboratorsController extends BaseController {
  constructor() {
    super()
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
  }
}