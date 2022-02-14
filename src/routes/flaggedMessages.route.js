import express from "express";
import controller from "../controllers/flaggedMessages.controller.js";

const router = express.Router();

router.route("/").get(controller.getFlaggedMessages);
router.route("/").post(controller.addFlaggedMessage);
router.route("/:id").delete(controller.deleteFlaggedMessage);

export default router;
