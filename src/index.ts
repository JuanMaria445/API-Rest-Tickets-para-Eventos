//Ordenando el codigo
import "reflect-metadata" //permite el uso de los decoradores con @ que indican un tipo de configuracion u operacion que se hace despues del decorador que tambien son de TypeORM
import app from './app'
import { AppDataSource } from "./db"
const port = 3000
//Agregando el DataSource para la conexion con la BD
async function main() {
    try{
        await AppDataSource.initialize(); //metodo de AppDataSource que es una clase de TypeORM
        console.log('Database Connected...');
        app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`))
        console.log('Bienvenido!')
    } catch(error){
        console.error(error)
    }
    
}

main();



