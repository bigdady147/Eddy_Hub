<script setup lang="ts">
import { useI18n } from "vue-i18n";
import flagUS from "@/assets/images/components/LanguageSwitcher/flagUS.png";
import flagVN from "@/assets/images/components/LanguageSwitcher/flagVN.png";

const listLanguage = [
  { code: "en", name: "English", image: flagUS },
  { code: "vi", name: "Vietnamese", image: flagVN },
];

const { locale } = useI18n();

const switchLanguage = () => {
  locale.value = locale.value === "en" ? "vi" : "en";
};

const currentLanguage = () => {
  return (
    listLanguage.find((item) => item.code === locale.value) || listLanguage[0]
  );
};
</script>

<template>
  <button
    @click="switchLanguage"
    class="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200 group"
    :title="locale === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'"
  >
    <div
      class="w-6 h-6 rounded-full overflow-hidden border border-white/20 flex-shrink-0"
    >
      <img
        class="w-full h-full object-cover"
        :src="currentLanguage().image"
        :alt="currentLanguage().name"
      />
    </div>
    <span
      class="text-sm font-medium text-slate-300 group-hover:text-white transition-colors hidden sm:block"
    >
      {{ locale.toUpperCase() }}
    </span>
  </button>
</template>
