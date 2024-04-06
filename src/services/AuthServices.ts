import { And, Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { registerBankSchema, registerLocationSchema, registerSchema } from "../utils/validator/authValidator";
import { Card } from "../entity/Card";
import { Location } from "../entity/Location";
import { Bank } from "../entity/Bank";
import { Account } from "../entity/Account";

class AuthServices {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  private readonly cardRepository: Repository<Card> = AppDataSource.getRepository(Card);

  private readonly locationRepository: Repository<Location> = AppDataSource.getRepository(Location);

  private readonly bankRepository: Repository<Bank> = AppDataSource.getRepository(Bank);

  private readonly accountRepository: Repository<Account> = AppDataSource.getRepository(Account);

  async registerUser(req: Request, res: Response) {
    function generateRandomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function generatePanCard(req: Request) {
      const { nameBank } = req.body;
      if (nameBank === "BRI") {
        const panCardPerfix = "1451";
        const panCardBranch = "01";
        const randomNumber = generateRandomNumber(100000, 999999).toString();
        const randomNUmber2 = generateRandomNumber(100, 999).toString();
        return panCardPerfix + panCardBranch + randomNumber + randomNUmber2;
      } else if (nameBank === "BCA") {
        const panCardBranch = "1541";
        const randomNumber = generateRandomNumber(100000, 999999).toString();
        return panCardBranch + randomNumber;
      }
    }

    function generateNumberCard(req: Request) {
      const { nameBank } = req.body;
      if (nameBank === "BRI") {
        const codeBRI = "02";
        const getRandomNumber = generateRandomNumber(1000000000, 9999999999).toString();
        return codeBRI + getRandomNumber;
      } else if (nameBank === "BCA") {
        const codeBRI = "14";
        const getRandomNumber = generateRandomNumber(1000000000, 9999999999).toString();
        return codeBRI + getRandomNumber;
      }
    }

    try {
      const { fullName, username, mobileNo, balance } = req.body;
      const panCard = generatePanCard(req);
      const numberCard = generateNumberCard(req);
      const { error, value } = registerSchema.validate(req.body);

      if (error) {
        return res.status(422).json(error.details[0].message);
      }

      const checkMobileNo = await this.userRepository.count({
        where: { mobileNo: value.mobileNo },
      });

      const checkBank = await this.bankRepository.findOne({
        where: { nameBank: value.nameBank },
      });

      if (checkMobileNo > 0) {
        return res.status(200).json("NO MOBILE ALREADY REGISTERED!");
      } else if (!checkBank) {
        return res.status(200).json("BANK NOT FOUND!");
      }

      const newCard = this.cardRepository.create({
        numberCard: numberCard,
      });

      const saveCard = await this.cardRepository.save(newCard);
      // console.log("card: ", saveCard);

      const newAccount = this.accountRepository.create({
        balance,
        bank: { id: checkBank.id },
      });

      const saveAccount = await this.accountRepository.save(newAccount);

      const newUser = this.userRepository.create({
        fullName,
        username,
        mobileNo,
        panCard: panCard,
        account: saveAccount,
        card: saveCard,
      });

      const saveUser = await this.userRepository.save(newUser);

      return res.status(200).json(`SUCCESS REGISTER ${saveUser}, NO REK : ${panCard} and NO CARD : ${numberCard}`);
    } catch (error) {
      res.status(400).json({ message: "FAILED REGISTER!", error: error.message });
    }
  }

  async registerLocation(req: Request, res: Response) {
    try {
      const { name, gateId } = req.body;
      const { error, value } = registerLocationSchema.validate(req.body);
      if (error) {
        return res.status(422).json(error.details[0].message);
      }
      const checkName = await this.locationRepository.count({
        where: { name: value.name, gateId: value.gateId },
      });
      if (checkName > 0) {
        return res.status(200).json("LOCATION ALREADY REGISTERED!");
      }
      const createLocation = this.locationRepository.create({
        name,
        gateId,
      });
      const newLocation = await this.locationRepository.save(createLocation);
      return res.status(200).json(`SUCCESS REGISTER ${newLocation}`);
    } catch (error) {
      return res.status(400).json({ message: "FAILED REGISTER!", error: error.message });
    }
  }

  async registerBank(req: Request, res: Response) {
    try {
      const { nameBank, codeBank } = req.body;
      const { value, error } = registerBankSchema.validate(req.body);
      if (error) {
        return res.status(422).json(error.details[0].message);
      }

      const checkCode = await this.bankRepository.count({
        where: { codeBank: value.codeBank },
      });

      const checkName = await this.bankRepository.count({
        where: { nameBank: value.nameBank },
      });

      if (checkCode > 0) {
        return res.status(200).json("CODE ALREADY REGISTERED!");
      } else if (checkName > 0) {
        return res.status(200).json("NAME ALREADY REGISTERED!");
      }

      const createBank = this.bankRepository.create({ nameBank, codeBank });

      const saveBank = await this.bankRepository.save(createBank);
      return res.status(200).json(`SUCCESS REGISTER BANK ${saveBank}`);
    } catch (error) {
      return res.status(400).json({ message: "FAILED REGISTER!", error: error.message });
    }
  }
}
export default new AuthServices();
