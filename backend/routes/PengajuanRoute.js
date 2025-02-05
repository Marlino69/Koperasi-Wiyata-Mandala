import express from "express";
import { 
    getPengajuan,
    getStatus,
    getType,
    createStatus,
    createType,
    createPengajuan,
    updateStatusPengajuan,
    getActivePengajuanPinjamanAnggota,
    getActivePengajuanSimpananAnggota,
    getFilteredPengajuan,
    createMandatoryPengajuan,
    createHistoryPengajuan,
 } from "../controllers/PengajuanController.js";

const router = express.Router();

router.post("/getPengajuan", getPengajuan);
router.post("/getFilteredPengajuan", getFilteredPengajuan);
router.post("/getStatus", getStatus);
router.post("/getType/:PENGAJUAN", getType);
router.post("/getActivePengajuanPinjamanAnggota", getActivePengajuanPinjamanAnggota);
router.post("/getActivePengajuanSimpananAnggota", getActivePengajuanSimpananAnggota);

router.post("/createStatus/:PENGAJUAN", createStatus);
router.post("/createType/:PENGAJUAN", createType);
router.post("/createPengajuan/:PENGAJUAN", createPengajuan);
router.patch("/updateStatusPengajuan", updateStatusPengajuan);
router.post("/createMandatoryPengajuan", createMandatoryPengajuan);
router.post("/createHistoryPengajuan", createHistoryPengajuan);


export default router;