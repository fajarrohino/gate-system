import { Repository } from "typeorm";
import { Card } from "../entity/Card";
import { AppDataSource } from "../data-source";
import { Activity } from "../entity/Activity";
import { Location } from "../entity/Location";
import { Request, Response } from "express";

class GateServices {
  private readonly cardRepository: Repository<Card> = AppDataSource.getRepository(Card);
  private readonly activityRepository: Repository<Activity> = AppDataSource.getRepository(Activity);
  private readonly locationRepository: Repository<Location> = AppDataSource.getRepository(Location);

  async gateActivityPriok(req: Request, res: Response) {
    try {
      const { numberCard } = req.body;

      const existingCard = await this.cardRepository.findOne({
        where: { numberCard: numberCard },
      });

      if (!existingCard) {
        return res.status(200).json("CARD IS NOT REGISTERED YET!");
      }
      const existingLocation = await this.locationRepository.findOne({
        where: { id: 1 },
      });

      const activityLog = await this.activityRepository.findOne({
        where: {
          card: { id: existingCard.id },
          status: 1,
          gate: "IN",
        },
        order: {
          id: "DESC",
        },
      });

      if (activityLog) {
        const currentDate = new Date();
        const newActivity = await this.activityRepository.update(activityLog.id, {
          status: 0,
          gate: "OUT",
          location: { id: existingLocation.id },
          date: currentDate,
        });
        console.log(newActivity);
        // await this.activityRepository.save(newActivity);
        return res.status(200).json("BE CAREFULE! \n COST WILL BE COMING SOON😜");
      } else {
        const newActivity = this.activityRepository.create({
          status: 1,
          gate: "IN",
          card: existingCard,
          location: existingLocation,
        });
        // console.log("NEW ACTIVITY : ", newActivity);
        await this.activityRepository.save(newActivity);
        return res.status(200).json("WELCOME TO GATE PRIOK!");
      }
    } catch (error) {
      return res.status(400).json({ message: "FAILED GATE", error: error });
    }
  }

  async gateActivityJuanda(req: Request, res: Response) {
    try {
      const { numberCard } = req.body;

      const existingCard = await this.cardRepository.findOne({
        where: { numberCard: numberCard },
      });

      if (!existingCard) {
        return res.status(200).json("CARD IS NOT REGISTERED YET!");
      }

      const existingLocation = await this.locationRepository.findOne({
        where: { id: 2 },
      });

      const activityLog = await this.activityRepository.findOne({
        where: {
          card: { id: existingCard.id },
          status: 1,
          gate: "IN",
        },
        order: {
          id: "DESC",
        },
      });

      if (activityLog) {
        const currentDate = new Date();
        const newActivity = await this.activityRepository.update(activityLog.id, {
          status: 0,
          gate: "OUT",
          location: { id: existingLocation.id },
          date: currentDate,
        });
        // console.log(newActivity);
        // await this.activityRepository.save(newActivity);
        return res.status(200).json(`BE CAREFULE! \n COST WILL BE COMING SOON😜`);
      } else {
        const newActivity = this.activityRepository.create({
          status: 1,
          gate: "IN",
          card: existingCard,
          location: existingLocation,
        });
        // console.log("NEW ACTIVITY : ", newActivity);
        await this.activityRepository.save(newActivity);
        return res.status(200).json("WELCOME TO GATE JUANDA!");
      }
    } catch (error) {
      return res.status(400).json({ message: "FAILED GATE", error: error });
    }
  }
}
export default new GateServices();
