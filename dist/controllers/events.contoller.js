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
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvents = void 0;
const Events_1 = require("../entity/Events");
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('entrando');
    try {
        const events = yield Events_1.Event.find(); //va a guardar todos los Eventos que se van a consultar
        console.log('Eventos: --->');
        return res.status(200).json(events); //el retorno de esta funcion va a ser los los eventos
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getEvents = getEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, lugar, fechaHora, precio, gps, limite, tipoEvento } = req.body;
    //creamos un objeto al que se le asignan los valores que vienen
    const event = new Events_1.Event();
    event.nombre = nombre;
    event.descripcion = descripcion;
    event.lugar = lugar;
    event.fechaHora = new Date(fechaHora);
    event.precio = precio;
    event.gps = gps;
    event.limite = limite;
    event.tipoEvento = tipoEvento;
    yield event.save();
    return res.status(200).json(event);
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield Events_1.Event.findOneBy({ id: parseInt(id) }); //existe ese Evento? lo busco
        if (!event)
            return res.status(404).json({ message: "Evento no encontrado" });
        yield Events_1.Event.update({ id: parseInt(id) }, req.body); //Actualiza El Evento
        return res.status(200).json({ message: "Evento Modificado" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Events_1.Event.delete({ id: parseInt(id) }); // esta funcion de TypeORM me traduce en sql
        //se esta eliminando un único registro
        if (result.affected === 0)
            return res.status(404).json({ message: "Evento no encontrado" });
        return res.status(200).json({ message: "Evento Eliminado" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteEvent = deleteEvent;
