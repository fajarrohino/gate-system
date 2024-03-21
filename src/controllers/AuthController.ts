import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

class AuthController {
  registerUser(req: Request, res: Response) {
    AuthServices.registerUser(req, res);
  }

  registerGate(req: Request, res: Response) {
    AuthServices.registerLocation(req, res);
  }
}
export default new AuthController();
