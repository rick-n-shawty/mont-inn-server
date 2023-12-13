import createCard from "../controllers/Cards/CreateCard.js";
import getCards from "../controllers/Cards/GetCards.js";
import express from "express"; 
import data from "../imports.cjs";
import getCard from "../controllers/Cards/GetCard.js";
import deleteCard from "../controllers/Cards/DeleteCard.js";
import auth from "../controllers/Middleware/auth.js";
const { upload } = data;
const router = express.Router(); 

router.post("/upload", [ auth, upload.array("files") ], createCard);
router.get("/all/:type", getCards);
router.get("/:id", getCard);
router.delete("/:id", auth, deleteCard); 

export default router; 