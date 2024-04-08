import { Repository } from "typeorm";
import { Card } from "../entity/Card";
import { AppDataSource } from "../data-source";
import { Account } from "../entity/Account";
import { Bank } from "../entity/Bank";
import { Request, Response } from "express";
import { checkSchema } from "../utils/validator/checkValidator";
import { User } from "../entity/User";

class CheckServices {
  private readonly cardRepository: Repository<Card> = AppDataSource.getRepository(Card);
  private readonly accountRepository: Repository<Account> = AppDataSource.getRepository(Account);
  private readonly bankRepository: Repository<Bank> = AppDataSource.getRepository(Bank);
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  async checkUser(req: Request, res: Response) {
    try {
      // const { mobileNO } = req.body;
      const { error, value } = checkSchema.validate(req.body);
      if (error) {
        res.status(422).json(error.details[0].message);
      }

      const checkUser = await this.userRepository.findOne({
        where: { mobileNo: value.mobileNO },
        relations: { account: true, card: true },
      });

      if (!checkUser) {
        return res.status(200).json("USERNAME NOT FOUND!");
      }

      const getNumberCard = checkUser.card.numberCard;
      const getPanCard = checkUser.panCard;
      return res.status(200).json(`NO Card = ${getNumberCard}, NO Rek = ${getPanCard}`);
    } catch (error) {}
  }
}

export default new CheckServices();
