//Creando la Entity o Entidad que tendra el mapeo de todo
import {Entity,Column, PrimaryGeneratedColumn,BaseEntity} from "typeorm";   
  @Entity()

  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
  
    @Column()
    password: string;
  }