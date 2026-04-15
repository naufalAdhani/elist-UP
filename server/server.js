const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { sequelize } = require('./models');


const boardRoutes = require('./routes/boardRoutes');
const listRoutes = require('./routes/listRoutes');
const cardRoutes = require('./routes/cardRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/cards', cardRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate().then(() => {
  console.log('DB connected');

  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
});