import { Request,Response } from "express";
import { Event } from "../entity/Events";

  
  export const getEvents = async (req: Request, res:Response) =>{
      console.log('entrando')
      try{
          const events = await Event.find(); //va a guardar todos los Eventos que se van a consultar
          console.log('Eventos: --->')
          return res.status(200).json(events); //el retorno de esta funcion va a ser los los eventos
      } catch(error){
          if (error instanceof Error){
              return res.status(500).json({message: error.message});
          }
      }
  };
  
  export const createEvent = async (req: Request, res: Response) =>{
      const { nombre, descripcion, lugar, fechaHora, precio, gps, limite, tipoEvento } = req.body;
      //creamos un objeto al que se le asignan los valores que vienen
      const event = new Event();
      event.nombre = nombre;
      event.descripcion = descripcion;
      event.lugar = lugar;
      event.fechaHora = new Date(fechaHora);
      event.precio = precio;
      event.gps = gps;
      event.limite = limite;
      event.tipoEvento = tipoEvento;
  
      await event.save();
      return res.status(200).json(event);
  };
  
  export const updateEvent = async (req: Request, res: Response) =>{
      const {id} = req.params;
  
      try{
          const event = await Event.findOneBy({id: parseInt(id)}); //existe ese Evento? lo busco
          if (!event) return res.status(404).json({message: "Evento no encontrado"});
  
          await Event.update({id: parseInt(id)}, req.body); //Actualiza El Evento
  
          return res.status(200).json({message: "Evento Modificado"});
      } catch (error){
          if (error instanceof Error) {
              return res.status(500).json({message: error.message})
          }
      }
  };
  
  export const deleteEvent = async (req: Request, res: Response) => {
      const { id } = req.params;
      try{
          const result = await Event.delete({id: parseInt(id)});
          //se esta eliminando un único evento
  
          if (result.affected === 0)
              return res.status(404).json({message: "Evento no encontrado"});
          return res.status(200).json({message: "Evento Eliminado"});
      } catch (error){
          if (error instanceof Error){
              return res.status(500).json({message: error.message});
          }
      }
  };