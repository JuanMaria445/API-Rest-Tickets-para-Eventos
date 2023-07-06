//Conexion a la Base de Datos
import { DataSource } from "typeorm";
//Importo Entidades
import { User } from "./entity/Users";
import { Booking } from "./entity/Bookings";
import { Event } from "./entity/Events"; 
export const AppDataSource = new DataSource({ //export disponibiliza el ojeto de conexion para todos los métodos que estén haciendo esa conexión
    type: "mysql",
    host: "localhost",
    port: 3306, //escucha las peticiones por este puerto
    username: "root",
    password: "mysql",
    database: "ticket-system-db",
    synchronize: true, //si no está en true no se sincronizan los objetos nuevos en la tabla
    entities: [User,Event,Booking], //hace un mapeo de la BD
});