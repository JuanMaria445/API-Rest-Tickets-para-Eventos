import { User } from "../entity/Users";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

const jwtSecret = process.env.JWT_SECRET; //usamos la variable de ambiente en el cual tenemos la duracion del token
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //se va a extraer el JWT en el header
  secretOrKey: jwtSecret
};

export default new Strategy(opts, async (payload, done) => { //se define la estrategia despues que se inicializa
  try {
    const user = await User.findOneBy({ id: parseInt(payload.id) }); //payload es lo que llega del ID TOKEN y se busca si existe ese usuario en la BD

    if (user) {
      return done(null, user); //si lo encuentra devuelve el usuario completo
    }
    return done(null, false); //si no lo encuentra devuelve false
    //done es una funcion propia de passport.
  } catch (error) {
    console.log(error);
  }
});