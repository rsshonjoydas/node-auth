const express = require('express')
const router = express.Router()

const {signup, activateAccount, login, forgotPassword, resetPassword} = require("../controllers/auth")

router.post("/signup", signup)
router.post("/email-activate", activateAccount)
router.post("/login", login)

router.put("/forgot-password", forgotPassword)
router.put("/reset-password", resetPassword)

module.exports = router;