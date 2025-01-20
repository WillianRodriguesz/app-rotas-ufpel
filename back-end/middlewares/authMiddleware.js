const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({ message: 'Acesso não autorizado. Token ausente.' });
        }

        // Usando jwt.verify com Promises e async/await
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Erro ao validar o token:', err);
                return res.status(401).json({ message: 'Acesso não autorizado. Token inválido.' });
            }
            
            req.user = decoded;  // Armazenando o usuário autenticado
            next();  // Prossegue para a próxima etapa da requisição
        });

    } catch (err) {
        console.error('Erro inesperado ao validar o token:', err);
        return res.status(401).json({ message: 'Acesso não autorizado. Token inválido.' });
    }
}

module.exports = authMiddleware;
