<template>
  <footer
    class="w-full border-t border-white/10 bg-black/10 backdrop-blur-sm mt-auto"
  >
    <div
      class="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <p class="text-slate-500 text-sm">{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
      <div class="flex items-center gap-6">
        <a
          href="#"
          class="text-slate-500 hover:text-white transition-colors text-sm"
          v-text="$t('footer.privacyPolicy')"
        ></a>
        <a
          href="#"
          class="text-slate-500 hover:text-white transition-colors text-sm"
          v-text="$t('footer.termsOfService')"
        ></a>
        <a
          href="#"
          class="text-slate-500 hover:text-white transition-colors text-sm"
          v-text="$t('footer.contact')"
        ></a>
      </div>
    </div>
  </footer>
</template>
