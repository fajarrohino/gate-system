import { Request, Response } from "express";
import CheckServices from "../services/CheckServices";

class CheckController {
  checkUser(req: Request, res: Response) {
    CheckServices.checkUser(req, res);
  }
}
export default new CheckController();
