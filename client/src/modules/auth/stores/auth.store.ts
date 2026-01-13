import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '../services/auth.service';
import router from '../../../router';
import { useUIStore } from '../../core/stores/ui.store';
import { useToastStore } from '../../core/stores/toast.store';
import { STORAGE_KEYS } from '../../../constants';

interface Feature {
    _id: string;
    name: { vi: string; en: string; };
    key: string;
    description: { vi: string; en: string; };
    icon: string;
    isActive: boolean;
}

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
    fullName?: string;
    features?: Feature[];
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem(STORAGE_KEYS.TOKEN));
    const isAuthenticated = computed(() => !!token.value);
    
    const uiStore = useUIStore();
    const toastStore = useToastStore();

    const login = async (credentials: any) => {
        try {
            uiStore.setLoading(true);
            const response = await authService.login(credentials);
            token.value = response.data.data.token;
            user.value = response.data.data.user;

            localStorage.setItem(STORAGE_KEYS.TOKEN, token.value!);
            toastStore.addToast({ message: `Welcome back, ${user.value?.username}!`, type: 'success' });
            return true;
        } catch (error: any) {
            console.error('Login failed', error);
            toastStore.addToast({ message: error.response?.data?.message || 'Login failed', type: 'error' });
            throw error;
        } finally {
            uiStore.setLoading(false);
        }
    };

    const register = async (userData: any) => {
        const uiStore = useUIStore();
        const toastStore = useToastStore();
        try {
            uiStore.setLoading(true);
            const response = await authService.register(userData);
            token.value = response.data.data.token;
            user.value = response.data.data.user;

            localStorage.setItem(STORAGE_KEYS.TOKEN, token.value!);
            toastStore.addToast({ message: 'Account created successfully!', type: 'success' });
            return true;
        } catch (error: any) {
            console.error('Registration failed', error);
            toastStore.addToast({ message: error.response?.data?.message || 'Registration failed', type: 'error' });
            throw error;
        } finally {
            uiStore.setLoading(false);
        }
    };

    const logout = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        router.push('/login');
    };

    const fetchUser = async () => {
        if (!token.value) return;
        try {
            const response = await authService.getMe();
            user.value = response.data.data;
        } catch (error: any) {
            // Nếu getMe bị lỗi (500 hoặc lỗi khác), tự động logout
            console.error('Failed to fetch user:', error);
            const statusCode = error.response?.status;
            
            // Logout và yêu cầu đăng nhập lại
            token.value = null;
            user.value = null;
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            
            // Hiển thị thông báo cho user
            const message = statusCode === 500 
                ? 'Session expired or server error. Please login again.' 
                : error.response?.data?.message || 'Authentication failed. Please login again.';
            toastStore.addToast({ message, type: 'error' });
            
            // Redirect về trang login
            router.push('/login');
        } finally {
            uiStore.setLoading(false);
        }
    };

    async function forgotPassword(email: string) {
        uiStore.setLoading(true);
        try {
            await authService.forgotPassword(email);
            toastStore.addToast({ message: 'Password reset email sent. Please check your inbox.', type: 'success' });
        } catch (error: any) {
            console.error('Forgot Password error:', error);
            const message = error.response?.data?.message || 'Failed to send reset email.';
            toastStore.addToast({ message: message, type: 'error' });
            throw error;
        } finally {
            uiStore.setLoading(false);
        }
    }

    async function resetPassword(resetToken: string, password: string) {
        uiStore.setLoading(true);
        try {
            await authService.resetPassword(resetToken, password);
            toastStore.addToast({ message: 'Password has been reset successfully. Please login.', type: 'success' });
        } catch (error: any) {
            console.error('Reset Password error:', error);
            const message = error.response?.data?.message || 'Failed to reset password.';
            toastStore.addToast({ message: message, type: 'error' });
            throw error;
        } finally {
            uiStore.setLoading(false);
        }
    }

    // Computed property for user's features
    const userFeatures = computed(() => user.value?.features || []);
    
    // Helper method to check if user has permission for a feature
    const hasFeaturePermission = (featureId: string): boolean => {
        if (!user.value) return false;
        // Admin has access to all features
        if (user.value.role === 'admin') return true;
        // Check if feature is in user's features list
        return userFeatures.value.some(f => f._id === featureId);
    };

    return {
        user,
        token,
        isAuthenticated,
        userFeatures,
        hasFeaturePermission,
        login,
        register,
        logout,
        fetchUser,
        forgotPassword,
        resetPassword
    };
});
