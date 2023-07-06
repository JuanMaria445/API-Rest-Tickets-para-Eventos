//Conexion a la Base de Datos
import { DataSource } from "typeorm";
import { User } from "./entity/Users"; //importo esta entidad
import { Event } from "./entity/Events";
import { Booking } from "./entity/Bookings";
export const AppDataSource = new DataSource({ //export disponibiliza el ojeto de conexion para todos los métodos que estén haciendo esa conexión
    type: "mysql",
    host: "localhost", //acá irá una IP si es una base remota
    port: 3306, //escucha las peticiones por este puerto
    username: "root",
    password: "mysql",
    database: "ticket-system-db",
    //loggin: true, //muestra la peticion a la bd muestra por consola
    synchronize: true, //si no está en true no se sincronizan los objetos nuevos en la tabla
    entities: [User,Event,Booking], //hace un mapeo de la BD
});
