<script setup lang="ts">
interface Props {
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  type: "button",
  variant: "primary",
  size: "md"
});

const variantClasses = {
  primary: 'bg-primary hover:bg-primary/80 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40'
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};
</script>

<template>
  <button :type="type" :disabled="disabled || loading"
    class="glass-btn relative flex items-center justify-center overflow-hidden font-medium rounded-lg transition-all duration-200 cursor-pointer"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      { 'opacity-50 cursor-not-allowed': disabled || loading }
    ]">
    <transition name="fade" mode="out-in">
      <span v-if="loading" class="flex items-center gap-2">
        <svg class="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        Loading...
      </span>
      <span v-else>
        <slot></slot>
      </span>
    </transition>
  </button>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
