import express from "express";
import { configDotenv } from "dotenv";
import connect from "./DB/connect.js";  
import cors from "cors"; 
import NotFound from "./errors/NotFound.js"
import ErrorHandler from "./errors/ErrorHandler.js";
import authRouter from "./routes/Auth.js";
import roomRouter from "./routes/Cards.js"; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs"; 
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


configDotenv();
const app = express(); 
const PORT = process.env.PORT || 3000;  
 
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.get('/', (req, res) => {
    return res.send("Hello world!!!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cards", roomRouter);

app.use(ErrorHandler);
app.use(NotFound);


const start = async () => {
    try{ 
        connect(process.env.MONGO_URL);
        console.log('connected to the database');
        const uploadsPath = path.join(__dirname, ".", "uploads");
        if(!fs.existsSync(uploadsPath)){
            fs.mkdirSync(uploadsPath);
        }
        app.listen(PORT, () => {
            console.log('server is up')
        })
    }catch(err){
        console.log(err)
    }
}
start();