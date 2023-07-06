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
exports.refresh = exports.protectedEndpoint = exports.signIn = exports.signUp = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const Users_1 = require("../entity/Users"); //importamos user
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// -------- Agregar para jwt
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const jwtSecretExpiration = process.env.JWT_SECRET_EXPIRATION;
const jwtRefreshTokenExpiration = process.env.JWT_REFRESH_TOKEN_EXPIRATION;
let refreshTokens = []; //se guardan todos los refreshtoken
const createToken = (user) => {
    // Se crean el jwt y refresh token
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: jwtSecretExpiration });
    const refreshToken = jsonwebtoken_1.default.sign({ username: user.username }, jwtRefreshTokenSecret, { expiresIn: jwtRefreshTokenExpiration });
    //se generan de la misma forma ambos token
    refreshTokens.push(refreshToken);
    return {
        token,
        refreshToken
    };
};
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('entrando');
    try {
        const users = yield Users_1.User.find(); //va a guardar todos los usuarios que se van a consultar
        console.log('Usuarios: --->');
        return res.status(200).json(users); //el retorno de esta funcion va a ser los users
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //creamos un objeto al que se le asignan los valores que vienen
    const user = new Users_1.User();
    user.username = username;
    user.password = yield createHash(password);
    yield user.save(); //hace el guardado
    return res.status(200).json(user);
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password } = req.body;
    //hasheamos la clave antes de guardarla
    const passH = yield createHash(password);
    const actualizar = {
        username: `${username}`,
        password: `${passH}`
    };
    try {
        const user = yield Users_1.User.findOneBy({ id: parseInt(id) }); //existe ese usuario? lo busco; esta línea y la de abajo son de verificacion
        if (!user)
            return res.status(404).json({ message: "Usuario no Encontrado" }); //cuando no existe ese usuario
        const pass = yield createHash(req.body.password);
        yield Users_1.User.update({ id: parseInt(id) }, actualizar); //esta tambien es una funcion TypeORM que se traduce en mysql
        //hace la modificación el req.body debe tener todos los valores a modificar
        return res.status(200).json({ message: "Usuario Actualizado" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Users_1.User.delete({ id: parseInt(id) }); // esta funcion de TypeORM me traduce en sql
        //se esta eliminando un único registro
        if (result.affected === 0)
            return res.status(404).json({ message: "User no Encontrado" });
        return res.status(200).json({ message: "Usuario eliminado con Exito!" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteUser = deleteUser;
//--------- Agregar para JWT
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Por favor envíe su usuario y contraseña" });
    }
    const user = yield Users_1.User.findOneBy({ username: req.body.username }); //consulta si el usuario existe y me lo retorna en user
    if (user) {
        return res.status(400).json({ msg: "El usuario ya existe!" });
    }
    //si no existe el usuario se crea uno nuevo acá abajo
    const newUser = new Users_1.User();
    newUser.username = req.body.username;
    newUser.password = yield createHash(req.body.password);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signUp = signUp;
//Vemos el login
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Por favor envíe su usuario y contraseña" });
    }
    const user = yield Users_1.User.findOneBy({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
    }
    const isMatch = yield comparePassword(user, req.body.password);
    if (isMatch) {
        return res.status(200).json({ credentials: createToken(user) });
    }
    return res.status(400).json({
        msg: "El usuario o la password son incorrectos"
    });
});
exports.signIn = signIn;
//Protect para ejecutar la autentificacion de password si es valido pasa la autentificiacion y da un ok
const protectedEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ msg: 'ok' });
});
exports.protectedEndpoint = protectedEndpoint;
// Create new access token from refresh token
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = jsonwebtoken_1.default.verify(refreshToken, jwtRefreshTokenSecret);
        const { username } = user;
        const userFound = yield Users_1.User.findOneBy({ username: username }); //busco si existe el usuario
        if (!userFound) {
            return res.status(400).json({ msg: "El Usuario no existe" });
        }
        //Si existe generamos el nuevo accestoken jwt.sign
        const accessToken = jsonwebtoken_1.default.sign({ id: userFound.id, username: userFound.username }, jwtSecret, { expiresIn: jwtSecretExpiration });
        res.json({ accessToken }); // al ultimo se retorna el nuevo acces token
    }
    catch (error) {
        res.status(403).json({
            errors: [
                {
                    msg: "Token Inválido!!",
                },
            ],
        });
    }
});
exports.refresh = refresh;
//funciones a usar:
const createHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcrypt_1.default.hash(password, saltRounds);
});
const comparePassword = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, user.password);
});
