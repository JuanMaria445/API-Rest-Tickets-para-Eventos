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
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../entity/Users");
const passport_jwt_1 = require("passport-jwt");
const jwtSecret = process.env.JWT_SECRET; //usamos la variable de ambiente en el cual tenemos la duracion del token
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};
exports.default = new passport_jwt_1.Strategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.User.findOneBy({ id: parseInt(payload.id) }); //payload es lo que llega del ID TOKEN y se busca si existe ese usuario en la BD
        if (user) {
            return done(null, user); //si lo encuentra devuelve el usuario completo
        }
        return done(null, false); //si no lo encuentra devuelve false
        //done es una funcion propia de passport.
    }
    catch (error) {
        console.log(error);
    }
}));
