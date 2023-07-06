"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_contoller_1 = require("../controllers/events.contoller");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
router.get("/Events", events_contoller_1.getEvents);
router.post("/Events", authenticateToken_1.default, events_contoller_1.createEvent);
router.put("/Events/:id", authenticateToken_1.default, events_contoller_1.updateEvent);
router.delete("/Events/:id", authenticateToken_1.default, events_contoller_1.deleteEvent);
exports.default = router;
