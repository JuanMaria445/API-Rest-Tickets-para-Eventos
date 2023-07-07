"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_controller_2 = require("../controllers/user.controller");
const passport_1 = __importDefault(require("passport"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
router.get("/users", authenticateToken_1.default, user_controller_1.getUsers);
router.post("/users", authenticateToken_1.default, user_controller_1.createUser);
router.put("/users/:id", authenticateToken_1.default, user_controller_1.updateUser);
router.delete("/users/:id", authenticateToken_1.default, user_controller_1.deleteUser);
//Agregar para jwt
router.post('/signup', user_controller_2.signUp); //usamos bcrypt para hashear la clave
router.post('/signin', user_controller_2.signIn); //comparamos usando bcrypt para compare desde el login el password mandado es el mismo de nuestra BD para poder enviarsela al cliente si esta todo bien
router.post('/token', user_controller_2.refresh); //genera un nuevo token válido, cuando se vence nos manda el token y le devolvemos uno nuevo.
router.post('/protected', passport_1.default.authenticate('jwt', { session: false }), user_controller_2.protectedEndpoint); //Me devuelve un correcto o ok.
exports.default = router;
