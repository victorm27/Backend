const User = require('../models/User');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener un usuario por su cedula
exports.getUserByCedula = async (req, res) => {
  const userCedula = req.params.cedula;

  try {
    const user = await User.findOne({ cedula: userCedula });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener usuario por cedula:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Actualizar un usuario por su cedula
exports.updateUserByCedula = async (req, res) => {
  const userCedula = req.params.cedula;
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const user = await User.findOneAndUpdate({ cedula: userCedula }, { firstName, lastName, email, phoneNumber }, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar usuario por cedula:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Eliminar un usuario por su cedula
exports.deleteUserByCedula = async (req, res) => {
  const userCedula = req.params.cedula;

  try {
    const user = await User.findOneAndDelete({ cedula: userCedula });
    if (user) {
      res.send('Usuario eliminado correctamente');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al eliminar usuario por cedula:', error);
    res.status(500).send('Error interno del servidor');
  }
};
