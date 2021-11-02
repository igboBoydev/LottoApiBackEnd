const express = require('express');
const router = express.Router();
const passport = require('passport')
const Joi = require('joi');
const multer = require('multer')
const { storage } = require('../cloudinary');
const db = require('../database/db');
const helpers = require('../config/helpers');
const uploads = multer({ storage });
require('../config/passport')
//const decodeJWT = require('../middleware/decodeJWT');
const signatureSigner = require('../middleware/checkSignature');
require('dotenv').config();

// import controller
var AccountCtrl = require('../controllers/AccountCtrl');

var jwtMiddleWare = passport.authenticate('jwt', {session: false});
const signatureSignerMiddleware = signatureSigner.signatureSignerMiddleware;

var dataParser;

if(process.env.APP != 'local')
{
    dataParser = require('../middleware/decodeJWT').decodeMiddleware;
}
else
{
    dataParser = (req, res, next) => {
        next()
    }
}

//get User
router.get('/profile/user', [jwtMiddleWare, signatureSignerMiddleware], AccountCtrl.getUsers )

// Routes
router.get('/profile', [jwtMiddleWare, signatureSignerMiddleware], AccountCtrl.getProfile);
router.post('/profile', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.postProfile);
router.post('/kyc-upgrade', [jwtMiddleWare, signatureSignerMiddleware], uploads.single('file'), AccountCtrl.kycUpdate);
router.post('/kyc-upgrades', [jwtMiddleWare, signatureSignerMiddleware], uploads.single('file'), AccountCtrl.kycUpdates);


router.post('/transferFund', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.transferFund)  // fund tranfer

//admin routes
router.post('/postResult', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.postResult)
router.post('/postLottoExpressOdds', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.LottoExpressOdds)
router.post('/postSoftLottoOdds', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.SoftLottoOdds)
router.get('/gameresults', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.getGameResult)
router.post('/postMaxAmount', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.postMax)
router.post('/postBetMax', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.postBetMax)
// Transaction history get request route
// router.get('/transactions', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.transactions)

// withdrawal list routes
router.post('/betHistory', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.BetList)
router.get('/betting-list', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.betLists)
router.get('/transactions', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.transactions)

// Password and Pin Update
router.post('/update-password', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.updatePassword);
router.post('/update-pin', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.setWithdrawalPin);
router.post('/fund-wallet', [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.fundWallet);

//gameResult
router.get('/games/results',  [jwtMiddleWare, signatureSignerMiddleware, dataParser], AccountCtrl.getResults)


module.exports = router;