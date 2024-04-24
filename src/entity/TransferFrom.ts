import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransferTo } from "./TransferTo";
import { Account } from "./Account";

@Entity({ name: "transferFrom" })
export class TransferFrom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeTransfer: string;

  @Column()
  fromPanCard: string;

  @Column()
  amount: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @OneToOne(() => TransferTo, (transferTo) => transferTo.transferFrom, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  transferTo: TransferTo;

  @ManyToOne(() => Account, (account) => account.transferFromId)
  account: Account;
}
