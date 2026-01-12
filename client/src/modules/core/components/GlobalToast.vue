<script setup lang="ts">
import { useToastStore } from '../stores/toast.store';
import { storeToRefs } from 'pinia';

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);

const getToastClasses = (type: string) => {
  switch (type) {
    case 'success': return 'border-green-500/50 text-green-400 bg-green-500/10';
    case 'error': return 'border-red-500/50 text-red-400 bg-red-500/10';
    case 'warning': return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10';
    default: return 'border-blue-500/50 text-blue-400 bg-blue-500/10';
  }
};
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    <transition-group name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto px-4 py-3 rounded-lg border shadow-lg backdrop-blur-md min-w-[300px] flex items-center justify-between transition-all duration-300"
        :class="getToastClasses(toast.type)"
      >
        <span>{{ toast.message }}</span>
        <button @click="toastStore.removeToast(toast.id)" class="ml-4 opacity-70 hover:opacity-100">
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
