import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { error } from "console";

class UpdateServices {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);
  async topUpBalance(mobileNO: number) {
    try {
      const stringMobileNO = String(mobileNO);
      console.log(stringMobileNO);
      const checkUser = await this.userRepository.findOne({
        where: {
          mobileNo: stringMobileNO,
        },
      });
      if (!checkUser) {
        console.log("tidak ada");
      }
      return checkUser.username;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new UpdateServices();
