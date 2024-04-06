import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Bank } from "./Bank";
import { Transaction } from "./Transaction";

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

  @OneToMany(() => Transaction, (transactions) => transactions.account, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  transactions: Transaction[];
}
