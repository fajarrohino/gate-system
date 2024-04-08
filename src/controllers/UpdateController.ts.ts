import { Request, Response } from "express";
import UpdateServices from "../services/UpdateServices";

class UpdateController {
  async topUp(req: Request, res: Response) {
    try {
      const mobileNO = parseInt(req.params.id);
      const response = await UpdateServices.topUpBalance(mobileNO);
      console.log("controller");
      return res.status(200).json(response);
    } catch (error) {
      console.log("disini");
      return res.status(500).json({ error: error.message });
    }
  }
}
export default new UpdateController();
