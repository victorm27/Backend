const User = require('../models/User');  // Ajusta la ruta según la ubicación real de tu modelo
const bcrypt = require('bcrypt');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrecta' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrecta' });
      }

      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
  
  register: async (req, res) => {
    const { cedula, firstName, lastName, email, phoneNumber, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Crear el nuevo usuario
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({ cedula, firstName, lastName, email, phoneNumber, password: hashedPassword });

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

module.exports = authController;
