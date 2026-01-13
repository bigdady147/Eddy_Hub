<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../auth/stores/auth.store';
import FeatureCard from '../components/FeatureCard.vue';
import { featureApi } from '../../../services/feature.service';
import type { Feature } from '../../../types/feature';
import type { FeatureCardData } from '../../../types/feature';

const router = useRouter();
const authStore = useAuthStore();
const { locale } = useI18n();
const features = ref<Feature[]>([]);
const loading = ref(true);

// Icon mapping for each feature
const featureIcons: Record<string, string> = {
  'expense_manager': '💰',
  'address_converter': '📍',
  'word_to_pdf': '📄',
  'pdf_to_word': '📝',
  'keyboard_tester': '⌨️',
  'controller_tester': '🎮',
  'json_parse': '🔧',
  'ai_image_enhancer': '🖼️'
};

const featureCards = computed<FeatureCardData[]>(() => {
  return features.value.map(feature => {
    // Get current language from i18n (vi or en)
    const currentLang = locale.value as 'vi' | 'en';
    
    // Handle multilingual name and description based on current locale
    const title = typeof feature.name === 'string' 
      ? feature.name 
      : (feature.name as any)?.[currentLang] || (feature.name as any)?.vi || (feature.name as any)?.en || 'Unnamed Feature';
    
    const description = typeof feature.description === 'string'
      ? feature.description
      : (feature.description as any)?.[currentLang] || (feature.description as any)?.vi || (feature.description as any)?.en || '';

    return {
      title,
      description,
      icon: featureIcons[feature.key] || '📦',
      key: feature.key,
      isLocked: !authStore.hasFeaturePermission(feature._id),
      route: `/${feature.key}`
    };
  });
});

const loadFeatures = async () => {
  try {
    loading.value = true;
    features.value = await featureApi.getFeatures();
  } catch (error) {
    console.error('Failed to load features:', error);
  } finally {
    loading.value = false;
  }
};

const handleFeatureClick = (feature: FeatureCardData) => {
  if (!feature.isLocked && feature.route) {
    router.push(feature.route);
  }
};

onMounted(() => {
  loadFeatures();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-gradient mb-4" v-text="$t('app.title')"></h1>
      <p class="text-slate-400 text-lg" v-text="$t('app.subtitle')"></p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="glass-panel p-6 animate-pulse">
        <div class="w-12 h-12 bg-slate-700 rounded-lg mb-4"></div>
        <div class="h-6 bg-slate-700 rounded mb-2"></div>
        <div class="h-4 bg-slate-700 rounded mb-4"></div>
        <div class="h-10 bg-slate-700 rounded"></div>
      </div>
    </div>

    <!-- Feature Cards Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <FeatureCard
        v-for="feature in featureCards"
        :key="feature.key"
        :title="feature.title"
        :description="feature.description"
        :icon="feature.icon"
        :is-locked="feature.isLocked"
        @click="handleFeatureClick(feature)"
      />
    </div>

    <!-- Empty State -->
    <div v-if="!loading && features.length === 0" class="text-center py-12">
      <p class="text-slate-400 text-lg" v-text="$t('features.noFeaturesFound')"></p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>
