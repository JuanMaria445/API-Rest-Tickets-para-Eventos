"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Ordenando el codigo
require("reflect-metadata"); //permite el uso de los decoradores con @ que indican un tipo de configuracion u operacion que se hace despues del decorador que tambien son de TypeORM
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
const port = 3000;
//Agregando el DataSource para la conexion con la BD
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.AppDataSource.initialize(); //metodo de AppDataSource que es una clase de TypeORM
            console.log('Database Connected...');
            app_1.default.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));
            console.log('Bienvenido!');
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
