const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../config/passport')
//const decodeJWT = require('../middleware/decodeJWT');
const signatureSigner = require('../middleware/checkSignature');
require('dotenv').config();

//Middleware
var localMiddleWare = passport.authenticate('local', {session: false});
//const dataParser = decodeJWT.decodeMiddleware;
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


//import controller
var LoginCtrl = require('../controllers/LoginCtrl');
var RegisterCtrl = require('../controllers/RegisterCtrl');
var PasswordResetCtrl = require('../controllers/PasswordResetCtrl');
//var WebHook = require('../controllers/WebHook');
var Encoder = require('../controllers/EncoderCtrl');
var HomeCtrl = require('../controllers/HomeCtrl');
const db = require('../database/db');

//Routes
router.post('/login', [signatureSignerMiddleware, dataParser], LoginCtrl.Login);
router.post('/grandLottoAdmin', [signatureSignerMiddleware, dataParser], LoginCtrl.AdminLogin )
router.post('/register', [signatureSignerMiddleware, dataParser], RegisterCtrl.Register);
router.post('/validate-otp', [signatureSignerMiddleware, dataParser], RegisterCtrl.validateOTP);

router.post('/resend-voice', [signatureSignerMiddleware, dataParser], RegisterCtrl.resendOTPVoice);
router.post('/resend-whatsapp', [signatureSignerMiddleware, dataParser], RegisterCtrl.resendOTPWhatsApp);

//Reset Password
router.post('/password-reset', [signatureSignerMiddleware, dataParser], PasswordResetCtrl.ResetPassword);
router.post('/validate-token',  [signatureSignerMiddleware, dataParser], PasswordResetCtrl.validateToken);
router.post('/update-password', [signatureSignerMiddleware, dataParser], PasswordResetCtrl.updatePassword);


//Digitain
router.post('/encoder',  Encoder.encode);
router.post('/decoder',  Encoder.decode);


router.get('/site-settings',  HomeCtrl.siteSettings);
router.post('/placeStake', HomeCtrl.placeStake);
router.post('/placeLottoExpressStake', HomeCtrl.placeLottoExpress)
router.post('/placeSoftLotto', HomeCtrl.softLotto)

//admin

router.get('/gamemaxamount', [signatureSignerMiddleware, dataParser], HomeCtrl.getMax)

router.get('/lotto', async (req, res, next) => {
    let lotto = await db.Lotto.findAll()
    res.status(200).json({success: true, lotto})
})



module.exports = router;