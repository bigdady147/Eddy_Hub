<script setup lang="ts">
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-shrink-0">
      <TheHeader />
    </div>
    <main
      class="flex-grow flex flex-col justify-center container mx-auto px-4 py-8"
    >
      <slot />
    </main>
    <div class="flex-shrink-0">
      <TheFooter />
    </div>
  </div>
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
