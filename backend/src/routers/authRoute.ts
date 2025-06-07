import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import UserControllers from "../controllers/userControllers";

const router = express.Router();

router.use(authMiddleware);

//do something here
router.get("/test", UserControllers.init);

export default router;