import { Request, Response } from "express";
import { DataSource, Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Account } from "../entity/Account";

class UpdateServices {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);
  private readonly accountRepository: Repository<Account> = AppDataSource.getRepository(Account);
  async topUpBalance(req: Request, res: Response) {
    try {
      const { mobileNo } = req.body;
      const checkUser = await this.userRepository.findOne({
        where: { mobileNo: mobileNo },
      });
      console.log(checkUser);
      const chekcAccount = await this.accountRepository.findOne({
        where: { user: checkUser.account },
      });
      console.log(chekcAccount);
      console.log("disini");
      const anjing = await this.accountRepository.update(chekcAccount.id, { balance: 600 });
      console.log(anjing);
      // tinggal buat balance + topUP.. sip
      return res.status(200).json(`i get ${checkUser}`);
    } catch (error) {
      return res.status(500).json("FAILED TOPUP");
    }
  }
}
export default new UpdateServices();
