import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransferFrom } from "./TransferFrom";
import { Account } from "./Account";

@Entity({ name: "transferTo" })
export class TransferTo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  toPanCard: string;

  @Column()
  message: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dateTransfer: Date;

  @OneToOne(() => TransferFrom, (trnasferFrom) => trnasferFrom.transferTo, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  transferFrom: TransferFrom;

  @ManyToOne(() => Account, (account) => account.transferToId)
  account: Account;
}
