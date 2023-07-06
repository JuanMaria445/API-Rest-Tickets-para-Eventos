"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
//Conexion a la Base de Datos
const typeorm_1 = require("typeorm");
const Users_1 = require("./entity/Users"); //importo esta entidad
const Events_1 = require("./entity/Events");
const Bookings_1 = require("./entity/Bookings");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "ticket-system-db",
    //loggin: true, //muestra la peticion a la bd muestra por consola
    synchronize: true,
    entities: [Users_1.User, Events_1.Event, Bookings_1.Booking], //hace un mapeo de la BD
});
