<template>
  <div class="flex flex-col min-h-screen">
    <!-- Optional: Minimal Header for Auth -->
    <!-- <header class="p-4"><Logo /></header> -->

    <main class="flex-grow flex items-center justify-center relative p-4">
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[100px]"
        ></div>
        <div
          class="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent-purple/20 blur-[100px]"
        ></div>
      </div>

      <div class="relative w-full">
        <div class="relative w-full">
          <slot />
        </div>
      </div>
    </main>

    <footer class="py-4 text-center text-slate-600 text-xs relative z-10">
      &copy; {{ new Date().getFullYear() }} EddyHub. Secure Login.
    </footer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
