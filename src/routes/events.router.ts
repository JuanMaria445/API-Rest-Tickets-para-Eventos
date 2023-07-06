import { Router } from "express";
import {getEvents, createEvent, updateEvent, deleteEvent} from "../controllers/events.contoller";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.get("/Events", getEvents);

router.post("/Events", authenticateToken,createEvent);
router.put("/Events/:id", authenticateToken,updateEvent);
router.delete("/Events/:id", authenticateToken,deleteEvent);

export default router;