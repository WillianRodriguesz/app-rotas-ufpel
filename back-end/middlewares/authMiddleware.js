const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({ message: 'Acesso não autorizado. Token ausente.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Erro ao validar o token:', err);
                return res.status(401).json({ message: 'Acesso não autorizado. Token inválido.' });
            }
            req.user = decoded;  
            next();  
        });

    } catch (err) {
        console.error('Erro inesperado ao validar o token:', err);
        return res.status(401).json({ message: 'Acesso não autorizado. Token inválido.' });
    }
}

module.exports = authMiddleware;
