import { Request, Response } from "express";
import GateServices from "../services/GateServices";

class GateController {
  gatePriok(req: Request, res: Response) {
    GateServices.gateActivityPriok(req, res);
  }

  gateJuanda(req: Request, res: Response) {
    GateServices.gateActivityJuanda(req, res);
  }
}
export default new GateController();
