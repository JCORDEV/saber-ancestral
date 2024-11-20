// const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
module.exports = {
  login(req, res) {
    const { username, password } = req.body;

    if (username != process.env.USER_MASTER || password != process.env.PASSWORD_MASTER) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    
    const token = jwt.sign(
      {
        id: 1,
        username: process.env.USER_MASTER,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      // { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Autenticación exitosa',
      data: { username, password },
      token
    })
  },
};