import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../modules/auth/stores/auth.store';
import { authRoutes } from '../modules/auth/auth.routes';
import { coreRoutes } from '../modules/core/core.routes';
import { adminRoutes } from '../modules/admin/admin.routes';

const routes = [
    ...coreRoutes,
    ...authRoutes,
    ...adminRoutes
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore();

    if (authStore.token && !authStore.user) {
        await authStore.fetchUser();
    }

    // Check authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
        return;
    } 
    
    // Check admin role
    if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
        next('/'); // Redirect non-admins to home
        return;
    }
    
    // Redirect authenticated users from guest pages
    if (to.meta.guest && authStore.isAuthenticated) {
        next('/');
        return;
    }
    
    next();
});

export default router;
