import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<Toast[]>([]);

    const removeToast = (id: string) => {
        toasts.value = toasts.value.filter(t => t.id !== id);
    };

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = Date.now().toString();
        const newToast = { ...toast, id, duration: toast.duration || 3000 };
        toasts.value.push(newToast);

        if (newToast.duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, newToast.duration);
        }
    };

    return { toasts, addToast, removeToast };
});
