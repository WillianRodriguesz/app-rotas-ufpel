const loginService = {
    async login(email, senha) {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const result = await response.json();

            if (response.ok) {
                return { success: true };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return { success: false, message: 'Erro inesperado, tente novamente mais tarde.' };
        }
    }
};

export default loginService;