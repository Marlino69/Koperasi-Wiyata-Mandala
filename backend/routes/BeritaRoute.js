import express from "express";
import cors from 'cors';

import {
    getAllBerita,
    getBeritaById,
    createBerita,
    updateBerita,
    deleteBerita,
    deleteAllBerita
} from "../controllers/BeritaController.js";

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get("/berita", getAllBerita);        
router.get("/showBerita/:id", getBeritaById);   
router.post('/berita', createBerita);
router.delete("/deleteBerita/:id", deleteBerita);  
router.delete("/berita", deleteAllBerita); 
router.patch('/updateBerita/:id', updateBerita);

export default router;