// In your routes file (e.g., routes/UserRoutes.js)
import express from "express";
import {
    getUsers,
    UserData,
    Register,
    Login,
    Logout,
    approveUser,
    rejectUser,
    UserApproval,
    UserDataById,
    getOneUser
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken, getServerStatus } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.get("/user", UserData);
router.get("/userTable/:id", UserDataById);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.put("/approve/:id", approveUser);
router.delete("/reject/:id", rejectUser);
router.get("/approval", UserApproval);
router.get("/getOneUser/:id", getOneUser);
router.get("/getServerStatus", getServerStatus);

export default router;
