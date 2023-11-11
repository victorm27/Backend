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
    const { firstName, lastName, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear el nuevo usuario
        const newUser = await User.create({ firstName, lastName, email, password });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
},
};

module.exports = authController;
