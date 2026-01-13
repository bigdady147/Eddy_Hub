<script setup lang="ts">
defineProps<{
  title: string;
  value: number;
  icon: string;
  color?: 'primary' | 'yellow' | 'green' | 'red';
}>();

const colorClasses = {
  primary: 'text-primary',
  yellow: 'text-yellow-400',
  green: 'text-green-400',
  red: 'text-red-400'
};
</script>

<template>
  <div class="glass-panel p-6 hover:border-primary/30 transition-all">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-slate-400 text-sm mb-2" v-text="title"></p>
        <p class="text-3xl font-bold" :class="color ? colorClasses[color] : 'text-white'">{{ value }}</p>
      </div>
      <div class="text-4xl opacity-50">{{ icon }}</div>
    </div>
  </div>
</template>
