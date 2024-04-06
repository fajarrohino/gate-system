import { Repository } from "typeorm";
import { Card } from "../entity/Card";
import { AppDataSource } from "../data-source";
import { Activity } from "../entity/Activity";
import { Location } from "../entity/Location";
import { Request, Response, application } from "express";
import { Account } from "../entity/Account";
import { Transaction } from "../entity/Transaction";

class GateServices {
  private readonly cardRepository: Repository<Card> = AppDataSource.getRepository(Card);
  private readonly activityRepository: Repository<Activity> = AppDataSource.getRepository(Activity);
  private readonly locationRepository: Repository<Location> = AppDataSource.getRepository(Location);
  private readonly accountRepository: Repository<Account> = AppDataSource.getRepository(Account);
  private readonly transactionsRepository: Repository<Transaction> = AppDataSource.getRepository(Transaction);

  async gateActivityPriok(req: Request, res: Response) {
    try {
      const { numberCard } = req.body;

      const existingCard = await this.cardRepository.findOne({
        where: {
          numberCard: numberCard,
        },
      });

      if (existingCard) {
        const activeCard = await this.cardRepository.findOne({
          where: {
            numberCard: numberCard,
            status: 1,
          },
        });
        if (!activeCard) {
          return res.status(200).json("CARD IS NOT ACTIVE!");
        }
        const existingLocation = await this.locationRepository.findOne({
          where: { gateId: 1 },
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
          // transaction gate out
          // cek balance tidak dibawah limit Rp.5000
          // update transactions card ke gate
          console.log("SUCCESS UPDATE = ", newActivity);
          return res.status(200).json("BE CAREFULE! \n COST WILL BE COMING SOON😜");
        } else {
          const newActivity = this.activityRepository.create({
            status: 1,
            gate: "IN",
            card: existingCard,
            location: existingLocation,
          });
          await this.activityRepository.save(newActivity);
          return res.status(200).json("WELCOME TO GATE PRIOK!");
        }
      } else {
        return res.status(200).json("CARD IS NOT REGISTERED!");
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

      if (existingCard) {
        const activeCard = await this.cardRepository.findOne({
          where: {
            numberCard: numberCard,
            status: 1,
          },
        });
        if (!activeCard) {
          return res.status(200).json("CARD IS NOT ACTIVE!");
        }
        const existingLocation = await this.locationRepository.findOne({
          where: { gateId: 2 },
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
          console.log("SUCCESS UPDATE = ", newActivity);
          return res.status(200).json("BE CAREFULE! \n COST WILL BE COMING SOON😜");
        } else {
          const newActivity = this.activityRepository.create({
            status: 1,
            gate: "IN",
            card: existingCard,
            location: existingLocation,
          });
          await this.activityRepository.save(newActivity);
          return res.status(200).json("WELCOME TO GATE JUANDA!");
        }
      } else {
        return res.status(200).json("CARD IS NOT REGISTERED!");
      }
    } catch (error) {
      return res.status(400).json({ message: "FAILED GATE", error: error });
    }
  }
}
export default new GateServices();
