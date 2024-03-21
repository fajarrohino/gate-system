import * as express from "express";
import { Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import GateController from "../controllers/GateController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("WELLCOME TO EANNOY GATE");
});

// ROUTER REGISTER USER
router.post("/auth/register", AuthController.registerUser);

// ROUTE REGISTER  LOCATION GATE
router.post("/auth/register/gate", AuthController.registerGate);

// ROUTE LOCATION GATE
router.post("/gate/priok", GateController.gatePriok);
router.post("/gate/juanda", GateController.gateJuanda);

export default router;
