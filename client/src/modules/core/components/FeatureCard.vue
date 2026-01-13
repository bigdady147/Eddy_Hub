<script setup lang="ts">
import { Lock } from 'lucide-vue-next';

interface Props {
  title: string;
  description: string;
  icon: string;
  isLocked?: boolean;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isLocked: false,
  to: '#'
});

const emit = defineEmits<{
  click: []
}>();

const handleClick = () => {
  if (!props.isLocked) {
    emit('click');
  }
};
</script>

<template>
  <div 
    class="feature-card glass-panel p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow relative overflow-hidden group"
    :class="{ 'locked': isLocked }"
    @click="handleClick"
  >
    <!-- Background Glow Effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <!-- Lock Overlay -->
    <div v-if="isLocked" class="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px] flex items-center justify-center z-10">
      <div class="text-center">
        <Lock :size="32" class="mx-auto mb-2 text-yellow-400" :stroke-width="2" />
        <span class="text-yellow-400 font-semibold text-sm tracking-wide" v-text="$t('features.locked')"></span>
      </div>
    </div>

    <!-- Icon -->
    <div class="relative z-0 mb-4 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-2xl"
         :class="{ 'opacity-40': isLocked }">
      {{ icon }}
    </div>

    <!-- Content -->
    <div class="relative z-0">
      <h3 class="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all"
          :class="{ 'opacity-40': isLocked }">
        {{ title }}
      </h3>
      <p class="text-slate-400 text-sm mb-4 line-clamp-2"
         :class="{ 'opacity-40': isLocked }">
        {{ description }}
      </p>

      <!-- Action Button -->
      <button 
        class="w-full py-2 px-4 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2"
        :class="isLocked 
          ? 'border-slate-600 text-slate-400 cursor-not-allowed bg-slate-800/30' 
          : 'border-white/10 text-white hover:bg-white/5 hover:border-primary/50'"
        :disabled="isLocked"
      >
        <span v-text="$t(isLocked ? 'features.findAccessHere' : 'features.access')"></span>
        <svg v-if="!isLocked" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  position: relative;
}

.feature-card.locked {
  cursor: not-allowed;
}

.feature-card:not(.locked):hover {
  transform: translateY(-4px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
