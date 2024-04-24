import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bank } from "./Bank";
import { User } from "./User";
import { TransferFrom } from "./TransferFrom";
import { TransferTo } from "./TransferTo";

@Entity({ name: "accounts" })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.account, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Bank, (bank) => bank.accountId)
  bank: Bank;

  @OneToMany(() => TransferFrom, (transferFrom) => transferFrom.account)
  transferFromId: TransferFrom[];

  @OneToMany(() => TransferTo, (transferTo) => transferTo.account)
  transferToId: TransferTo[];
}
