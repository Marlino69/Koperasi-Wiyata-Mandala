import e from "express";
import { 
    createJob,
    getJobID,
 } from "../controllers/JobController.js"

const router = e.Router();

router.get("/getJobID", getJobID);
router.post("/createJob", createJob);

export default router;

