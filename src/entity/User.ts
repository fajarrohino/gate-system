import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Card } from "./Card";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update: Date;

  @OneToOne(() => Card, (card) => card.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  card: Card;
}
