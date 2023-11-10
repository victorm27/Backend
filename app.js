const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 4000;

const db = new Sequelize('nombre_de_tu_base_de_datos', 'tu_usuario', 'tu_contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});

db.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((err) => {
    console.error('Error de conexión a la base de datos:', err);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importa y configura el modelo de usuario
const UserModel = require('./models/User')(db);

// Sincroniza el modelo con la base de datos
db.sync()
  .then(() => {
    console.log('Conexión exitosa con la base de datos');
  })
  .catch((error) => {
    console.error('Error en la conexión con la base de datos:', error);
  });

// Rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
