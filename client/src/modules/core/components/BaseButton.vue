<script setup lang="ts">
interface Props {
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
}

withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  type: "button",
  variant: "primary",
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="glass-btn relative flex items-center justify-center overflow-hidden"
    :class="{ 'opacity-70 cursor-not-allowed': disabled || loading }"
  >
    <transition name="fade" mode="out-in">
      <span v-if="loading" class="flex items-center gap-2">
        <svg
          class="animate-spin -ml-1 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
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
