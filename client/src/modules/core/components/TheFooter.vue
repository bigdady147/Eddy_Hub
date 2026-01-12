<template>
  <footer
    class="w-full border-t border-white/10 bg-black/10 backdrop-blur-sm mt-auto"
  >
    <div
      class="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <p class="text-slate-500 text-sm">
        &copy; {{ new Date().getFullYear() }} EddyHub. All rights reserved.
      </p>
      <div class="flex items-center gap-6">
        <a
          href="#"
          class="text-slate-500 hover:text-white transition-colors text-sm"
          >Privacy Policy</a
        >
        <a
          href="#"
          class="text-slate-500 hover:text-white transition-colors text-sm"
          >Terms of Service</a
        >
        <a
          href="#"
          class="text-slate-500 hover:text-white transition-colors text-sm"
          >Contact</a
        >
      </div>
    </div>
  </footer>
</template>
