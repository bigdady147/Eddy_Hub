<script setup lang="ts">
import GlobalToast from "./modules/core/components/GlobalToast.vue";
import { useUIStore } from "./modules/core/stores/ui.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute } from "vue-router";

const uiStore = useUIStore();
const { isLoading } = storeToRefs(uiStore);

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout || "div"; // Fallback to basic div if no layout
});
</script>

<template>
  <!-- Global Loading Overlay -->
  <div
    v-if="isLoading"
    class="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center"
  >
    <div class="flex flex-col items-center gap-4">
      <div
        class="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
      ></div>
      <p class="text-white font-medium animate-pulse">Loading...</p>
    </div>
  </div>

  <GlobalToast />

  <component :is="layout">
    <router-view />
  </component>
</template>
