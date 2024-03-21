import { And, Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { registerLocationSchema, registerSchema } from "../utils/validator/authValidator";
import { Card } from "../entity/Card";
import { Location } from "../entity/Location";

class AuthServices {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  private readonly cardRepository: Repository<Card> = AppDataSource.getRepository(Card);

  private readonly locationRepository: Repository<Location> = AppDataSource.getRepository(Location);

  async registerUser(req: Request, res: Response) {
    try {
      const { fullName, username, numberCard } = req.body;
      const { error, value } = registerSchema.validate(req.body);

      if (error) {
        return res.status(422).json(error.details[0].message);
      }

      const checkNumberCard = await this.cardRepository.count({
        where: { numberCard: value.numberCard },
      });

      const checkUsername = await this.userRepository.count({
        where: { username: value.username },
      });

      if (checkUsername > 0) {
        return res.status(200).json("USERNAME ALREADY REGISTERED!");
      } else if (checkNumberCard > 0) {
        return res.status(200).json("CARD ALREADY REGISTERED!");
      }

      const newCard = this.cardRepository.create({ numberCard });

      const savedCard = await this.cardRepository.save(newCard);

      const newUser = this.userRepository.create({
        fullName,
        username,
        card: savedCard,
      });

      const createUser = await this.userRepository.save(newUser);

      return res.status(200).json(`SUCCESS REGISTER ${createUser}`);
    } catch (error) {
      res.status(400).json({ message: "FAILED REGISTER!", error: error.message });
    }
  }

  async registerLocation(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const { error, value } = registerLocationSchema.validate(req.body);
      if (error) {
        return res.status(422).json(error.details[0].message);
      }
      const checkName = await this.locationRepository.count({
        where: { name: value.name },
      });
      if (checkName > 0) {
        return res.status(200).json("LOCATION ALREADY REGISTERED!");
      }
      const createLocation = this.locationRepository.create({
        name,
      });
      const newLocation = await this.locationRepository.save(createLocation);
      return res.status(200).json(`SUCCESS REGISTER ${newLocation}`);
    } catch (error) {
      return res.status(400).json({ message: "FAILED REGISTER!", error: error.message });
    }
  }
}
export default new AuthServices();
