import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import PengajuanRoute from "./routes/PengajuanRoute.js";
import BeritaRoute from "./routes/BeritaRoute.js";
import KeuanganRoute from "./routes/KeuanganRoute.js";
import JobRoute from "./routes/JobRoute.js";
import db from "./config/database.js";
import Scheduler from "./scheduler.js";

//IMPORT ALL MODELS FOR SYNCING
import MsGeneralSetting from './models/MS_GENERALSETTING.js';
import MS_JOB from './models/MS_JOB.js';
import StatusPinjaman from './models/MS_STATUS_PINJAMAN.js';
import StatusSimpanan from './models/MS_STATUS_SIMPANAN.js';
import MS_TYPE_SIMPANAN from './models/MS_TYPE_SIMPANAN.js'
import MS_TYPE_PINJAMAN from './models/MS_TYPE_PINJAMAN.js'
import MS_USER from './models/MS_USER.js';
import Berita from './models/TR_BERITA.js';
import TrHistoryDataPinjaman from "./models/TR_HISTORY_DATA_PINJAMAN.js";
import TrHistoryDataSimpanan from "./models/TR_HISTORY_DATA_SIMPANAN.js";
import TrLobBerita from "./models/TR_LOB_BERITA.js";
import TrLobPfp from "./models/TR_LOB_PFP.js";
import TrMonthlyFinanceAnggota from "./models/TR_MONTHLY_FINANCE_ANGGOTA.js";
import TrMonthlyFinancialStatement from "./models/TR_MONTHLY_FINANCIAL_STATEMENT.js";
import TR_PENGAJUAN_SIMPANAN from "./models/TR_PENGAJUAN_SIMPANAN.js";
import PengajuanPinjaman from "./models/TR_PENGAJUAN_PINJAMAN.js";
//END MODEL SYNCING

dotenv.config();

const app = express();

(async () => {
    try {
        await db.sync({ alter: true }); 
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing the database:", error);
    }
})();

// CORS configuration with credentials
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Middleware for parsing cookies and request bodies
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Route handlers
app.use(UserRoute);
app.use(PengajuanRoute);
app.use(BeritaRoute);
app.use(KeuanganRoute);
app.use(JobRoute);

Scheduler();

// Start the server
app.listen(5000, () => console.log("Server is running..."));
