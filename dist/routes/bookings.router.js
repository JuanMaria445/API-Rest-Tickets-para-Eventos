"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookings_controller_1 = require("../controllers/bookings.controller");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
router.get("/Bookings", authenticateToken_1.default, bookings_controller_1.getBookings);
router.post("/Bookings", authenticateToken_1.default, bookings_controller_1.createBooking);
router.put("/Bookings/:id", authenticateToken_1.default, bookings_controller_1.updateBooking);
router.delete("/Bookings/:id", authenticateToken_1.default, bookings_controller_1.deleteBooking);
exports.default = router;
