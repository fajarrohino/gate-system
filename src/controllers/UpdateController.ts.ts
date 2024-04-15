import { Request, Response } from "express";
import UpdateServices from "../services/UpdateServices";

class UpdateController {
  topUp(req: Request, res: Response) {
    UpdateServices.topUpBalance(req, res);
    // res.send("this controller");
  }
}
export default new UpdateController();
