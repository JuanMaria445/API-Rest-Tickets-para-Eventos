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
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookings = void 0;
const Bookings_1 = require("../entity/Bookings"); //importamos Booking
const Events_1 = require("../entity/Events");
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield Bookings_1.Booking.find(); //va a guardar todas las reservas que se van a consultar
        console.log('Reservas: --->');
        return res.status(200).json(bookings); //el retorno de esta funcion va a ser las reservas
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getBookings = getBookings;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event, id_user } = req.body;
    const reservas = yield Bookings_1.Booking.find();
    const eventos = yield Events_1.Event.find();
    const evento = eventos.find((evento) => evento.id === parseInt(id_event)); // Encuentro el evento con el mismo id_event
    const contar = reservas.filter((reserva) => reserva.id_event === parseInt(id_event)).length; //cuento cuantas reservas hay con el id_event
    if (evento) {
        const limite = evento.limite;
        if (contar >= limite) {
            res.status(400).json({ message: "No se pueden realizar mas reservas para el Evento - Límite Alcanzado" });
        }
        else {
            const booking = new Bookings_1.Booking();
            booking.id_event = id_event;
            booking.id_user = id_user;
            booking.lugar = evento.lugar;
            booking.fechaHora = new Date(evento.fechaHora);
            booking.precio = evento.precio;
            booking.gps = evento.gps;
            yield booking.save(); //guarda el registro
            return res.status(200).json(booking);
        }
    }
});
exports.createBooking = createBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield Bookings_1.Booking.findOneBy({ id: parseInt(id) }); //existe esa reserva? la busco;
        if (!user)
            return res.status(404).json({ message: "Reserva no Encontrada" });
        yield Bookings_1.Booking.update({ id: parseInt(id) }, req.body); //Se modifica la reserva
        return res.status(200).json({ message: "Reserva Modificada" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Bookings_1.Booking.delete({ id: parseInt(id) }); // esta funcion de TypeORM me traduce en sql
        //se esta eliminando un único registro
        if (result.affected === 0)
            return res.status(404).json({ message: "Reserva no Encontrada" });
        return res.status(200).json({ message: "Reserva Eliminada" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteBooking = deleteBooking;
