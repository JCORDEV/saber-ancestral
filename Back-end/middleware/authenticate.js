const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    isAuthenticated(req, res, next) {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ message: 'No autenticado, token no proporcionado' });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token no válido' });
            }
            
            req.user = decoded;
            next();
        });
    }
}
  