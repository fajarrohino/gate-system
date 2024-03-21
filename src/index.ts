import { AppDataSource } from "./data-source";
import { Request, Response } from "express";
import * as cors from "cors";
import * as express from "express";
import router from "./router";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 8000;

    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
      })
    );

    app.use(express.json());
    app.use("/api/v1/", router);

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
