const router = require('express').Router();
const venteController = require('../Controllers/venteController');
const authController = require('../Controllers/authController');
const isAuth = require('../config/passport').checkIsAuth

router.post('/create', isAuth, venteController.creat)
router.get('/', venteController.getAll)
router.get('/:id', venteController.getbyid)
router.delete('/:id', isAuth, venteController.deletbyid)
router.put('/:id', venteController.updatebyid)

/********************** user routes *****************************/

router.post('/user/login', authController.login)
router.post('/user/register', authController.register)
router.get('/logout', authController.logOut)


module.exports = router
