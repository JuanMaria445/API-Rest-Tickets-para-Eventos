"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const users_router_1 = __importDefault(require("./routes/users.router"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const passport_2 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //manejar el body con put post u otras peticiones
//Agregar para jwt
app.use(express_1.default.urlencoded({ extended: false })); //agregamos middleware accedemos al header.
// cuando nos lo mande al token podremos acceder a ese dato.
app.use(passport_2.default.initialize()); //inicializa la configuarcion de password
passport_2.default.use(passport_1.default); //usa middleware propia de middleware que es passport
app.use("/api", users_router_1.default); // esto es un middleware define la ruta base
exports.default = app;
