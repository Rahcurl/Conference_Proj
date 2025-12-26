import express from "express";
const router = express.Router();
/api/chat/token
router.get("/token",getStreamToken)
export default router;