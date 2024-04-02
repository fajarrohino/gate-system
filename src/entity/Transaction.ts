import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  fromAccountId: number;

  @Column()
  toAccountId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column()
  amount: number;

  @ManyToOne(() => Account, (account) => account.transactions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  account: Account;
}
