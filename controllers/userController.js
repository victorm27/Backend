const { User } = require('../models/User');

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });
    res.json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.update({ email, password });
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar usuario por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.send('Usuario eliminado correctamente');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al eliminar usuario por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};
