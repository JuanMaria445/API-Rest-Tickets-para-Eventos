import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from "./routes/users.router"
import eventsRoutes from "./routes/events.router"
import bookingsRoutes from "./routes/bookings.router"
import passportMiddleware from './middlewares/passport';
import passport from 'passport'


const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) //manejar el body con put post u otras peticiones

//Agregar para jwt
app.use(express.urlencoded({extended: false})); //agregamos middleware accedemos al header.
// cuando nos lo mande al token podremos acceder a ese dato.
app.use(passport.initialize()); //inicializa la configuarcion de password
passport.use(passportMiddleware); //usa middleware propia de middleware que es passport


app.use("/api", userRoutes)
app.use("/api", eventsRoutes) // esto es un middleware define la ruta base
app.use("/api", bookingsRoutes)

export default app;