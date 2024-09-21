const express = require("express");
const {
  signUp,
  login,
  verifyEmail,
  resendVerificationEmail,
  ForgetPassword,
  changePassword,
  ResetPassword,
  makeAdmin,
  updateUser,
  deleteUser,
  oneUser,
  getAll,
  logOut,
} = require("../controller/userC");
const {
  createWaste,
  updateWaste,
  getAllWaste,
  getOne,
  deleteWaste,
  wasteHistory,
  pickWaste,
  getUserWasteRecords,
} = require("../controller/wasterController");
const { authenticate, isAdmin } = require("../middleware/auth.copy");
const {
  validateSignUp,
  validateLogin,
  createWasteValidator,
} = require("../middleware/validator");

const router = express.Router();

router.post("/signUp", validateSignUp, signUp);
router.post("/sign-in", validateLogin, login);
router.get("/verify/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/forgot-password", ForgetPassword);
router.post("/change-password/:token", changePassword);
router.post("/reset-password/:token", ResetPassword);
router.put("/make-admin/:id", isAdmin, makeAdmin);
router.put("/update/:userId", updateUser);
router.get("/oneUser/:id", oneUser);
router.get("/getall", getAll);
router.post("/log-out", logOut);
router.delete("/deleteUser/:userId", authenticate, isAdmin, deleteUser);

router.post("/create-waste", authenticate, createWasteValidator, createWaste);
router.post("/update-waste", authenticate, updateWaste);
router.get("/waste-records", authenticate, getUserWasteRecords);
router.get("/get-all", authenticate, isAdmin, getAllWaste);
router.delete("/delete-waste/:id", authenticate, isAdmin, deleteWaste);
router.get("/wasteHistory", authenticate, wasteHistory);
router.get('/pick-waste/:wasteId', authenticate, isAdmin, pickWaste);

module.exports = router;
