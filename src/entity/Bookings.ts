//Creando la Entity o Entidad que tendra el mapeo de todo
import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,ManyToOne} from "typeorm";
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