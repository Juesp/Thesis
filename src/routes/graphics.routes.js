const {Router} = require('express')
const router =Router();

const {isAuthenticated, isAdmin, isLab_Staff, isPhysician, isAdminEmple, isAdminMedi, isAdminEmpleMedi} = require('../helpers/auth');

const { individualGraph, generalPromPerMonth, generalPromPerGender, generalPromPerYear } = require('../controllers/graphics.controllers');

router.get('/graphics/individualGraph',  isAuthenticated, individualGraph);
router.get('/graphics/generalPromPerMonth',  isAuthenticated, generalPromPerMonth);
router.get('/graphics/generalPromPerGender',  isAuthenticated, generalPromPerGender);
router.get('/graphics/generalPromPerYear',  isAuthenticated, generalPromPerYear);

module.exports = router;