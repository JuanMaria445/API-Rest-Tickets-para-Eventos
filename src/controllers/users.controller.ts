import { Request,Response } from "express";
import { User } from "../entity/Users"; //importamos user
import dotenv from "dotenv";
dotenv.config();
// -------- Agregar para jwt
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const jwtSecretExpiration = process.env.JWT_SECRET_EXPIRATION;
const jwtRefreshTokenExpiration = process.env.JWT_REFRESH_TOKEN_EXPIRATION;
let refreshTokens: (string | undefined)[] = []; //se guardan todos los refreshtoken

const createToken = (user: User) => {
    // Se crean el jwt y refresh token
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret!, {expiresIn: jwtSecretExpiration});
    const refreshToken = jwt.sign({ username: user.username }, jwtRefreshTokenSecret!, {expiresIn: jwtRefreshTokenExpiration});
    //se generan de la misma forma ambos token
    refreshTokens.push(refreshToken);
    return {
        token,
        refreshToken
    }
  }
  
  export const getUsers = async (req: Request, res:Response) =>{
      console.log('entrando')
      try{
          const users = await User.find(); //va a guardar todos los usuarios que se van a consultar
          console.log('Usuarios: --->')
          return res.status(200).json(users); //el retorno de esta funcion va a ser los users
      } catch(error){
          if (error instanceof Error){
              return res.status(500).json({message: error.message});
          }
      }
  };
  
  
  export const createUser = async (req: Request, res: Response) =>{
      const { username , password } = req.body;
      //creamos un objeto al que se le asignan los valores que vienen
      const user = new User();
      user.username = username;
      user.password = await createHash(password);
  
      await user.save(); //hace el guardado
      return res.status(200).json(user);
  };
  
  export const updateUser = async (req: Request, res: Response) =>{
      const {id} = req.params;
      const {username, password} = req.body
      //hasheamos la clave antes de guardarla
      const passH = await createHash(password);
      const actualizar = {
        username: `${username}`,
        password: `${passH}`
      }
      try{
          const user = await User.findOneBy({id: parseInt(id)}); //existe ese usuario? lo busco; esta línea y la de abajo son de verificacion
          if (!user) return res.status(404).json({message: "Usuario no Encontrado"}); //cuando no existe ese usuario
  
          const pass = await createHash(req.body.password);
          await User.update({id: parseInt(id)},actualizar); //esta tambien es una funcion TypeORM que se traduce en mysql
          //hace la modificación el req.body debe tener todos los valores a modificar
          return res.status(200).json({message: "Usuario Actualizado"});
  
          
      } catch (error){
          if (error instanceof Error) {
              return res.status(500).json({message: error.message})
          }
      }
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
      const { id } = req.params;
      try{
          const result = await User.delete({id: parseInt(id)}); // esta funcion de TypeORM me traduce en sql
          //se esta eliminando un único registro
  
          if (result.affected === 0)
              return res.status(404).json({message: "User no Encontrado"});
          return res.status(200).json({message: "Usuario eliminado con Exito!"});
      } catch (error){
          if (error instanceof Error){
              return res.status(500).json({message: error.message});
          }
      }
  };
  //--------- Agregar para JWT
  export const signUp = async (req: Request, res: Response ): Promise<Response> => {
      if (!req.body.username || !req.body.password) {
        return res
          .status(400)
          .json({ msg: "Por favor envíe su usuario y contraseña" });
      }
    
      const user = await User.findOneBy({ username: req.body.username }); //consulta si el usuario existe y me lo retorna en user
      if (user) {
        return res.status(400).json({ msg: "El usuario ya existe!" });
      }
    //si no existe el usuario se crea uno nuevo acá abajo
      const newUser = new User();
      newUser.username = req.body.username;
      newUser.password = await createHash(req.body.password);
      await newUser.save();
      return res.status(201).json(newUser);
    };
     //Vemos el login
    export const signIn = async (req: Request, res: Response): Promise<Response> => {
      if (!req.body.username || !req.body.password) {
        return res
          .status(400)
          .json({ msg: "Por favor envíe su usuario y contraseña" });
      }
    
      const user = await User.findOneBy({ username: req.body.username });
      if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
      }
    
      const isMatch = await comparePassword(user, req.body.password);
      if (isMatch) {
        return res.status(200).json({ credentials: createToken(user) });
      }
    
      return res.status(400).json({
        msg: "El usuario o la password son incorrectos"
      });
    };
    //Protect para ejecutar la autentificacion de password si es valido pasa la autentificiacion y da un ok
    export const protectedEndpoint = async (req: Request, res: Response): Promise<Response> => {
    
      return res.status(200).json({ msg: 'ok'});
    }
    // Create new access token from refresh token
  export const refresh = async (req: Request, res: Response): Promise<any>  => {
      // const refreshToken = req.header("x-auth-token");
    
      const refreshToken = req.body.refresh;
    
    
      // If token is not provided, send error message
      if (!refreshToken) { // si no hay refresh token le mandamos el msm
        res.status(401).json({
          errors: [
            {
              msg: "Token no Encontrado",
            },
          ],
        });
      }
    
      // If token does not exist, send error message
      if (!refreshTokens.includes(refreshToken)) { //includes verifica el array, ve si el refresh token existe en el arrya si no existe el que me manda mando el mensaje de invalido
        res.status(403).json({
          errors: [
            {
              msg: "Refresh token Inválido!!",
            },
          ],
        });
      }
    
    //Acá comienza la historia del endpoint
      try {
        const user = jwt.verify(refreshToken, jwtRefreshTokenSecret!);
        const { username } = <any>user;
    
        const userFound = <User> await User.findOneBy({ username: username }); //busco si existe el usuario
        if (!userFound) {
          return res.status(400).json({ msg: "El Usuario no existe" });
        }
    //Si existe generamos el nuevo accestoken jwt.sign
        const accessToken = jwt.sign({ id: userFound.id, username: userFound.username }, jwtSecret!, {expiresIn: jwtSecretExpiration});  
        res.json({ accessToken }); // al ultimo se retorna el nuevo acces token
      } catch (error) {
        res.status(403).json({
          errors: [
            {
              msg: "Token Inválido!!",
            },
          ],
        });
      }
    };
    //funciones a usar:
    const createHash = async (password: string ): Promise<string> => {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    };
    const comparePassword = async (user: User, password: string ): Promise<Boolean> => {
      return await bcrypt.compare(password, user.password);
    };