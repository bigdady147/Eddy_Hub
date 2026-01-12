import api from '../../../utils/api';

export const authService = {
    login(credentials: any) {
        return api.post('/auth/login', credentials);
    },
    register(userData: any) {
        return api.post('/auth/register', userData);
    },
    getMe() {
        return api.get('/auth/me');
    },
    forgotPassword(email: string) {
        return api.post('/auth/forgot-password', { email });
    },
    resetPassword(token: string, password: string) {
        return api.put(`/auth/reset-password/${token}`, { password });
    }
};
