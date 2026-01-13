<script setup lang="ts">
import type { FeatureRequest } from '../../../services/feature-request.service';
import BaseButton from '../../core/components/BaseButton.vue';

defineProps<{ 
  request: FeatureRequest;
}>();

defineEmits<{
  approve: [];
  reject: [];
}>();

const getStatusColor = (status: string) => {
  const colors = {
    pending: 'text-yellow-400 bg-yellow-400/10',
    approved: 'text-green-400 bg-green-400/10',
    rejected: 'text-red-400 bg-red-400/10'
  };
  return colors[status as keyof typeof colors] || 'text-slate-400';
};
</script>

<template>
  <div class="glass-panel p-6 hover:border-primary/20 transition-all">
    <div class="flex items-start justify-between gap-4">
      <!-- User & Feature Info -->
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
            {{ request.user.username?.[0]?.toUpperCase() || 'U' }}
          </div>
          <div>
            <p class="font-medium text-white">{{ request.user.username }}</p>
            <p class="text-xs text-slate-400">{{ request.user.email }}</p>
          </div>
        </div>
        
        <div class="mt-3 mb-2">
          <p class="text-sm text-slate-400">Requested feature:</p>
          <p class="text-lg font-semibold text-white">
            {{ typeof request.feature.name === 'string' ? request.feature.name : request.feature.name.vi || request.feature.name.en }}
          </p>
        </div>
        
        <p class="text-sm text-slate-500">
          {{ new Date(request.requestedAt).toLocaleDateString('vi-VN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) }}
        </p>
        
        <p v-if="request.requestMessage" class="mt-2 text-sm text-slate-400 italic">
          "{{ request.requestMessage }}"
        </p>
      </div>
      
      <!-- Status / Actions -->
      <div class="flex flex-col items-end gap-2">
        <span 
          class="px-3 py-1 rounded-full text-xs font-semibold uppercase"
          :class="getStatusColor(request.status)"
        >
          {{ request.status }}
        </span>
        
        <div v-if="request.status === 'pending'" class="flex gap-2 mt-2">
          <BaseButton @click="$emit('approve')" variant="primary" size="sm" class="min-w-[100px]">
            <div class="flex items-center justify-center gap-1.5">
              <span>✓</span>
              <span>Approve</span>
            </div>
          </BaseButton>
          <BaseButton @click="$emit('reject')" variant="secondary" size="sm" class="min-w-[100px]">
            <div class="flex items-center justify-center gap-1.5">
              <span>✗</span>
              <span>Reject</span>
            </div>
          </BaseButton>
        </div>
        
        <div v-else-if="request.reviewedAt" class="text-xs text-slate-500 mt-2">
          Reviewed: {{ new Date(request.reviewedAt).toLocaleDateString('vi-VN') }}
        </div>
      </div>
    </div>
    
    <!-- Response Message -->
    <div v-if="request.responseMessage" class="mt-4 pt-4 border-t border-white/10">
      <p class="text-sm text-slate-400">Admin response:</p>
      <p class="text-sm text-slate-300 italic">"{{ request.responseMessage }}"</p>
    </div>
  </div>
</template>
