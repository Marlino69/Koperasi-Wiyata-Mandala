import express from "express";
import cors from "cors";
import { getTotalPengeluaranAnggota, getFinancialStatementData } from "../controllers/KeuanganController.js";

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(router);

router.get("/getTotalPengeluaranAnggota", getTotalPengeluaranAnggota);
router.get("/getFinancialStatementData", getFinancialStatementData);

export default router;

