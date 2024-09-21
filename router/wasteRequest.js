const express = require('express')
const { createWaste, deleteWaste, getAllWaste, getOne, updateWaste } = require('../controller/pickUpDetailsC')
const { authenticate, isAdmin } = require('../middleware/auth copy')  
const { createWasteValidator } = require('../middleware/validator')
const { pickWaste } = require('../controller/wasterController')

const router = express.Router()

router.post('/create-waste/:id',createWasteValidator,createWaste)
router.post('/update-waste',authenticate,updateWaste);
router.get('/get-all',authenticate, isAdmin, getAllWaste);

//router.get('/get-one',authenticate,getOne)
router.delete('/delete-waste',isAdmin,deleteWaste)

module.exports = router