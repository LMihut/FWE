import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as yup from "yup";

export const jokeSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  count: yup.number().required(),
  active: yup.boolean().required()
});

@Entity()
export class Joke {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column('boolean', {default: true})
  active!: boolean;

  @Column()
  description!: string;

  @Column()
  count!: number;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}


