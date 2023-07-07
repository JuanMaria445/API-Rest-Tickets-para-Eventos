
import {Entity,Column, PrimaryGeneratedColumn,BaseEntity} from "typeorm";
  @Entity()

  export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_event: number;
  
    @Column()
    id_user: number;

    @Column()
    lugar: string;

    @Column()
    fechaHora: Date;
  
    @Column()
    precio: number;
  
    @Column()
    gps: string;

  }