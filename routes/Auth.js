import express from "express";
import login from "../controllers/Auth/login.js";
import register from "../controllers/Auth/register.js";
import refreshToken from "../controllers/Auth/refreshToken.js";
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get("/refresh", refreshToken);


export default router;
