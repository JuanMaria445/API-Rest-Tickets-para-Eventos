"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    //La expresión authHeader.split(' ')[1] divide el valor del encabezado de autorización en un array
    //utilizando el espacio en blanco como separador (' '). Esto se hace utilizando el método split() de la cadena.
    //La función split(' ') dividirá el encabezado en partes, y [1] accederá a la segunda parte del array resultante, que corresponde al token JWT.
    const token = authHeader && authHeader.split(' ')[1]; //se utiliza para extraer el token JWT del encabezado de autorización
    if (!token) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
exports.default = authenticateToken;
