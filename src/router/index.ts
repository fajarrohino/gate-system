import * as express from "express";
import { Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import GateController from "../controllers/GateController";
import CheckController from "../controllers/CheckController";
import UpdateController from "../controllers/UpdateController.ts";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("WELLCOME TO EANNOY GATE");
});

// ROUTER REGISTER USER
router.post("/auth/register", AuthController.registerUser);

// ROUTE REGISTER  LOCATION GATE
router.post("/auth/register/gate", AuthController.registerGate);

// ROUTE REGISTER BANK
router.post("/auth/register/bank", AuthController.registerBank);

// ROUTE LOCATION GATE
router.post("/gate/priok", GateController.gatePriok);
router.post("/gate/juanda", GateController.gateJuanda);

// ROUTE CHECK NO REK AND NO CARD
router.post("/check", CheckController.checkUser);

// ROUTE TOP UP
router.put(
  "/topup",
  UpdateController.topUp
  // (req: Request, res: Response) => {
  //   res.send("hallo")
  // }
);

export default router;
