import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
    const isSidebarOpen = ref(true);
    const isLoading = ref(false);

    const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value;
    };

    const setLoading = (status: boolean) => {
        isLoading.value = status;
    };

    return {
        isSidebarOpen,
        isLoading,
        toggleSidebar,
        setLoading
    };
});
