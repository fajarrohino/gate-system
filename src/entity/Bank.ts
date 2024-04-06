import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

@Entity({ name: "banks" })
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameBank: string;

  @Column()
  codeBank: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updateAt: Date;

  @OneToMany(() => Account, (account) => account.bank)
  accountId: Account[];
}
