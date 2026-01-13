<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../auth/stores/auth.store';
import { useToastStore } from '../stores/toast.store';
import { featureApi } from '../../../services/feature.service';
import { featureRequestApi } from '../../../services/feature-request.service';
import type { Feature } from '../../../types/feature';
import Toggle from '../components/Toggle.vue';
import BaseButton from '../components/BaseButton.vue';

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();
const { t, locale } = useI18n();

const features = ref<Feature[]>([]);
const selectedFeatures = ref<Set<string>>(new Set());
const loading = ref(true);
const submitting = ref(false);

// Feature icon mapping
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

const loadFeatures = async () => {
  try {
    loading.value = true;
    features.value = await featureApi.getFeatures();
  } catch (error) {
    console.error('Failed to load features:', error);
    toastStore.addToast({ message: t('features.loadError') || 'Failed to load features', type: 'error' });
  } finally {
    loading.value = false;
  }
};

// Check if user already has permission for a feature
const hasPermission = (featureId: string) => {
  return authStore.hasFeaturePermission(featureId);
};

const toggleFeature = (featureId: string) => {
  // Don't allow toggling features user already has
  if (hasPermission(featureId)) return;
  
  if (selectedFeatures.value.has(featureId)) {
    selectedFeatures.value.delete(featureId);
  } else {
    selectedFeatures.value.add(featureId);
  }
};

const selectedCount = computed(() => selectedFeatures.value.size);

const submitRequests = async () => {
  if (selectedFeatures.value.size === 0) {
    toastStore.addToast({ message: t('features.selectAtLeastOne') || 'Please select at least one feature', type: 'warning' });
    return;
  }

  try {
    submitting.value = true;
    const featureIds = Array.from(selectedFeatures.value);
    await featureRequestApi.submitBulkRequests(featureIds);
    
    toastStore.addToast({ message: t('features.requestsSubmitted') || 'Feature requests submitted successfully', type: 'success' });
    router.push('/');
  } catch (error: any) {
    console.error('Failed to submit requests:', error);
    toastStore.addToast({ message: error.response?.data?.message || t('features.submitError') || 'Failed to submit requests', type: 'error' });
  } finally {
    submitting.value = false;
  }
};

const skip = () => {
  router.push('/');
};

const getFeatureName = (feature: Feature) => {
  const currentLang = locale.value as 'vi' | 'en';
  return typeof feature.name === 'string' 
    ? feature.name 
    : (feature.name as any)?.[currentLang] || (feature.name as any)?.vi || (feature.name as any)?.en || 'Unnamed';
};

const getFeatureDescription = (feature: Feature) => {
  const currentLang = locale.value as 'vi' | 'en';
  return typeof feature.description === 'string'
    ? feature.description
    : (feature.description as any)?.[currentLang] || (feature.description as any)?.vi || (feature.description as any)?.en || '';
};

onMounted(() => {
  loadFeatures();
});
</script>

<template>
  <div class=" flex items-center justify-center p-4  from-slate-950 via-slate-900 to-slate-950">
    <div class="glass-panel max-w-3xl w-full p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gradient mb-3" v-text="$t('features.chooseYourFeatures')"></h1>
        <p class="text-slate-400 text-lg" v-text="$t('features.featureSelectionSubtitle')"></p>
        <p v-if="selectedCount > 0" class="mt-3 text-primary font-medium">
          {{ $t('features.featuresSelected', { count: selectedCount }) }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 5" :key="i" class="glass-panel p-4 animate-pulse">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-12 h-12 bg-slate-700 rounded-lg"></div>
              <div class="flex-1">
                <div class="h-5 bg-slate-700 rounded w-1/3 mb-2"></div>
                <div class="h-4 bg-slate-700 rounded w-2/3"></div>
              </div>
            </div>
            <div class="w-11 h-6 bg-slate-700 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Feature List -->
      <div v-else class="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar mb-6">
        <div
          v-for="feature in features"
          :key="feature._id"
          class="glass-panel p-4 transition-all duration-200"
          :class="[
            hasPermission(feature._id) 
              ? 'border-green-500/30 bg-green-500/5 cursor-default' 
              : selectedFeatures.has(feature._id)
                ? 'border-primary/50 bg-primary/5 cursor-pointer hover:bg-white/5 hover:border-primary/30'
                : 'cursor-pointer hover:bg-white/5 hover:border-primary/30'
          ]"
          @click="toggleFeature(feature._id)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 flex-1">
              <!-- Icon -->
              <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-2xl flex-shrink-0">
                {{ featureIcons[feature.key] || '📦' }}
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-semibold text-white">{{ getFeatureName(feature) }}</h3>
                  <span v-if="hasPermission(feature._id)" class="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-semibold">✓ Unlocked</span>
                </div>
                <p class="text-sm text-slate-400 line-clamp-2">{{ getFeatureDescription(feature) }}</p>
              </div>
            </div>

            <!-- Toggle / Checkmark -->
            <div class="ml-4 flex-shrink-0" @click.stop>
              <Toggle
                v-if="!hasPermission(feature._id)"
                :checked="selectedFeatures.has(feature._id)"
                @change="() => toggleFeature(feature._id)"
              />
              <div v-else class="text-green-400">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && features.length === 0" class="text-center py-12">
        <p class="text-slate-400">No features available</p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 mt-8">
        <BaseButton
          variant="secondary"
          class="flex-1"
          @click="skip"
          :disabled="submitting"
        >
          <span v-text="$t('features.skipForNow')"></span>
        </BaseButton>
        <BaseButton
          variant="primary"
          class="flex-1"
          @click="submitRequests"
          :loading="submitting"
          :disabled="loading || selectedCount === 0"
        >
          <span v-text="$t('features.submitRequests')"></span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.7);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
