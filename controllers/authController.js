const { User } = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrecta' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrecta' });
      }

      // Aquí puedes generar el token JWT para la autenticación

      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },

  register: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Crear el nuevo usuario
      const newUser = await User.create({ email, password });

      // Aquí puedes generar el token JWT para la autenticación

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },

  forgotPassword: async (req, res) => {
    // Lógica para enviar correo de restablecimiento de contraseña
    // Puedes utilizar nodemailer u otra librería para enviar correos
    // Generar token temporal y almacenarlo en la base de datos o en memoria

    res.status(200).json({ message: 'Instrucciones de restablecimiento de contraseña enviadas por correo electrónico' });
  },
};

module.exports = authController;
