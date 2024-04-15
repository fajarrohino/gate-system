import { Request, Response } from "express";
import { DataSource, Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Account } from "../entity/Account";
import { updateSchema } from "../utils/validator/updateValidator";

class UpdateServices {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);
  private readonly accountRepository: Repository<Account> = AppDataSource.getRepository(Account);
  async topUpBalance(req: Request, res: Response) {
    try {
      // const { mobileNo, topUp } = req.body;
      const { error, value } = updateSchema.validate(req.body);

      if (error) {
        return res.status(422).json(error.details[0].message);
      }

      const checkUser = await this.userRepository.findOne({
        where: { mobileNo: value.mobileNo },
        relations: { account: true },
      });

      if (!checkUser) {
        return res.status(404).json("Not Found");
      }

      const getAccountId = checkUser.account.id;
      const currentBalance = checkUser.account.balance;
      const addTopUp = currentBalance + value.topUp;

      await this.accountRepository.update(getAccountId, { balance: addTopUp });
      return res.status(200).json(`i get ${checkUser}`);
    } catch (error) {
      return res.status(500).json("FAILED TOPUP");
    }
  }
}
export default new UpdateServices();
