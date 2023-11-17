const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para gestionar usuarios
router.get('/', userController.getAllUsers);
router.get('/:cedula', userController.getUserByCedula);
router.put('/:cedula', userController.updateUserByCedula);
router.delete('/:cedula', userController.deleteUserByCedula);

module.exports = router;
