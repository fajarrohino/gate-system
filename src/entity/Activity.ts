import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./Card";
import { Location } from "./Location";

@Entity({ name: "activity" })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column()
  gate: string;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  date: Date;

  @ManyToOne(() => Card, (cards) => cards.activityId)
  card: Card;

  @ManyToOne(() => Location, (location) => location.activityId)
  location: Location;
}
