import express from "express";
import User from "./user.js";

const router = express.Router();

router.get('/test', (req, res) => {
    res.json(User);
});





export default router;