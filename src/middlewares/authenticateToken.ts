import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET; //usamos la variable de ambiente en el cual tenemos la duracion del token

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']; 
  //La expresión authHeader.split(' ')[1] divide el valor del encabezado de autorización en un array
  //utilizando el espacio en blanco como separador (' '). Esto se hace utilizando el método split() de la cadena.
  //La función split(' ') dividirá el encabezado en partes, y [1] accederá a la segunda parte del array resultante, que corresponde al token JWT.
  const token = authHeader && authHeader.split(' ')[1]; //se utiliza para extraer el token JWT del encabezado de autorización

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret!, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
}

export default authenticateToken;