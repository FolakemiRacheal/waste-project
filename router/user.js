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
  logOut,
  getAllUser,
  feedBack,
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
  getSingleWasteRecord,
  getUserWasteRecordsByAdmin,
} = require("../controller/wasterController");
const { authenticate, isAdmin } = require("../middleware/auth.copy");
const {
  validateSignUp,
  validateLogin,
  createWasteValidator,
} = require("../middleware/validator");

const router = express.Router();

//USER ROUTE
router.post("/signUp", validateSignUp, signUp);
router.post("/sign-in", validateLogin, login);
router.get("/verify/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/forgot-password", ForgetPassword);
router.post("/change-password/:token", changePassword);
router.post("/reset-password/:token", ResetPassword);
router.put("/update/:userId", updateUser);
router.get("/oneUser/:id", oneUser);
router.post("/log-out", logOut);
router.get("/waste-records", authenticate, getUserWasteRecords);
router.post("/update-waste", authenticate, updateWaste);
router.post("/create-waste", authenticate, createWasteValidator, createWaste);
router.get("/wasteHistory", authenticate, wasteHistory); //admin and user have access to this route
router.get("/waste-record/:wasteId", authenticate, getSingleWasteRecord); //admin and user have access to this route

//ADMIN ROUTES
router.get("/get-all", authenticate, isAdmin, getAllWaste); //4
router.delete("/delete-waste/:id", authenticate, isAdmin, deleteWaste);
router.put('/pick-waste/:wasteId', authenticate, isAdmin, pickWaste);
router.delete("/deleteUser/:userId", authenticate, isAdmin, deleteUser);
router.get("/getall", authenticate, isAdmin, getAllUser);
router.get("/get-all-user-waste/:userId", authenticate, isAdmin, getUserWasteRecordsByAdmin); //3
router.put("/make-admin/:id", isAdmin, makeAdmin);
router.post("/feed_back", feedBack);


module.exports = router;