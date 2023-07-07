import { Router } from "express";
import {getBookings, createBooking, updateBooking, deleteBooking} from "../controllers/bookings.controller";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.get("/Bookings",authenticateToken, getBookings);
router.post("/Bookings", authenticateToken,createBooking);
router.put("/Bookings/:id", authenticateToken,updateBooking);
router.delete("/Bookings/:id", authenticateToken,deleteBooking);




export default router;