import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class CartItem {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  set_num: string;

  @Column()
  name: string;

  @Column()
  quantity: number;
}
