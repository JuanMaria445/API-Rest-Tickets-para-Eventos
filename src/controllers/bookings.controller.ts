import { Request,Response } from "express";
import { Booking } from "../entity/Bookings"; //importamos Booking
import {Event} from "../entity/Events"

  
  export const getBookings = async (req: Request, res:Response) =>{
    
      try{
          const bookings = await Booking.find(); //va a guardar todas las reservas que se van a consultar
          console.log('Reservas: --->')
          return res.status(200).json(bookings); //el retorno de esta funcion va a ser las reservas
      } catch(error){
          if (error instanceof Error){
              return res.status(500).json({message: error.message});
          }
      }
  };

  export const createBooking = async (req: Request, res: Response) =>{
    const { id_event,id_user} = req.body;
    const reservas = await Booking.find();
    const eventos = await Event.find();

    const evento = eventos.find((evento) => evento.id === parseInt(id_event));// Encuentro el evento con el mismo id_event
    const contar = reservas.filter((reserva) => reserva.id_event === parseInt(id_event)).length; //cuento cuantas reservas hay con el id_event
    if(evento){
        const limite = evento.limite;
        if(contar>=limite){
            res.status(400).json({message: "No se pueden realizar mas reservas para el Evento - Límite Alcanzado"})
        }
        else{
            const booking = new Booking();
            booking.id_event = id_event;
            booking.id_user = id_user;
            booking.lugar = evento.lugar;
            booking.fechaHora = new Date(evento.fechaHora);
            booking.precio = evento.precio;
            booking.gps = evento.gps;
  
            await booking.save(); //guarda el registro
            return res.status(200).json(booking);
        }
    }
    
};
  
  export const updateBooking = async (req: Request, res: Response) =>{
      const {id} = req.params;
  
      try{
          const user = await Booking.findOneBy({id: parseInt(id)}); //existe esa reserva? la busco;
          if (!user) return res.status(404).json({message: "Reserva no Encontrada"});
  
          await Booking.update({id: parseInt(id)}, req.body); //Se modifica la reserva
          return res.status(200).json({message: "Reserva Modificada"});
      } catch (error){
          if (error instanceof Error) {
              return res.status(500).json({message: error.message})
          }
      }
  };
  
  export const deleteBooking = async (req: Request, res: Response) => {
      const { id } = req.params;
      try{
          const result = await Booking.delete({id: parseInt(id)}); // esta funcion de TypeORM me traduce en sql
          //se esta eliminando un único registro
  
          if (result.affected === 0)
              return res.status(404).json({message: "Reserva no Encontrada"});
          return res.status(200).json({message:"Reserva Eliminada"});
      } catch (error){
          if (error instanceof Error){
              return res.status(500).json({message: error.message});
          }
      }
  };