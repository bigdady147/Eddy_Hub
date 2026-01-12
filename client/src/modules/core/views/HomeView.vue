<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const changeLanguage = (lang: string) => {
  locale.value = lang;
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center bg-transparent text-white"
  >
    <h1 class="text-4xl font-bold mb-4">{{ t("welcome") }}</h1>
    <div class="space-x-4 mb-4">
      <button
        @click="changeLanguage('vi')"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Tiếng Việt
      </button>
      <button
        @click="changeLanguage('en')"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        English
      </button>
    </div>
    <p class="text-lg text-gray-600">Vue 3 + TypeScript + Tailwind + i18n</p>
  </div>
</template>
