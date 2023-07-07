import {Entity,Column, PrimaryGeneratedColumn,BaseEntity} from "typeorm";
  @Entity()

  export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
  
    @Column()
    descripcion: string;
  
    @Column()
    lugar: string;
  
    @Column()
    fechaHora: Date;
  
    @Column()
    precio: number;

    @Column()
    gps: string;

    @Column()
    limite: number;

    @Column()
    tipoEvento: string;
  }