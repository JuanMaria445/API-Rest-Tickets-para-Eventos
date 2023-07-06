import { Router } from "express";
import {getUsers, createUser, updateUser, deleteUser} from "../controllers/users.controller";
import {signIn, signUp, protectedEndpoint, refresh } from '../controllers/users.controller'
import passport from 'passport'
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.get("/users", authenticateToken,getUsers);

router.post("/users", authenticateToken,createUser);
router.put("/users/:id", authenticateToken,updateUser);
router.delete("/users/:id", authenticateToken,deleteUser);


//Agregar para jwt
router.post('/signup', signUp); //usamos bcrypt para hashear la clave
router.post('/signin', signIn); //comparamos usando bcrypt para compare desde el login el password mandado es el mismo de nuestra BD para poder enviarsela al cliente si esta todo bien
router.post('/token', refresh); //genera un nuevo token válido, cuando se vence nos manda el token y le devolvemos uno nuevo.
router.post('/protected', passport.authenticate('jwt', { session: false }), protectedEndpoint); //Me devuelve un correcto o ok.

export default router;