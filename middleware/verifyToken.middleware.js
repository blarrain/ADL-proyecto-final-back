import  jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: 'el token debe estar presente'})
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
          id_usuario: decoded.id_usuario,
          email: decoded.email,
          rol: decoded.rol,
        };

        next()

    } catch (error) {
        console.error('❌ verifyToken error:', error.message);
        res.status(401).json({message: 'el token es invalido'})        
    }
}

export const verifyCredentials = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ message: "Email y password son obligatorios" });
    }

    next();
};