import e from "express";
import {
    getAllGenset, 
    getGensetFiltered, 
    updateGenset, 
    getAllUsers, 
    getUsersFiltered,
    getDistinctJobCode,
    updateUser,
    getAllBerita,
    CreateBerita,
    DeleteBerita,
    UpdateBerita
} from "../controllers/AdminController.js";
const router = e.Router();

{/* GENSET */}
router.get("/getAllGenset", getAllGenset);
router.post("/getGensetFiltered", getGensetFiltered);
router.put("/updateGenset/:id", updateGenset);
{/*LIST USER */}
router.get("/getdistinctjobcode", getDistinctJobCode);
router.get("/getallusers", getAllUsers);
router.post("/getuserfiltered", getUsersFiltered);
router.put("/updateuseradm/:id", updateUser);
{/*BERITA*/}
router.get("/admin/getberita", getAllBerita);
router.post("/admin/addberita", CreateBerita);
router.post("/admin/updateberita/:id", UpdateBerita);
router.delete("/admin/deleteberita/:id", DeleteBerita);

export default router;
