import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./Activity";
import { User } from "./User";

@Entity({ name: "cards" })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numberCard: string;

  @Column({ default: 1 })
  status: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.card, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @OneToMany(() => Activity, (activity) => activity.card)
  activityId: Activity[];
}
