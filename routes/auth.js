const express = require('express')
const router = express.Router()

const {signup, activateAccount, forgotPassword} = require("../controllers/auth")

router.post("/signup", signup)
router.post("/email-activate", activateAccount)

router.put("/forgot-password", forgotPassword)

module.exports = router;