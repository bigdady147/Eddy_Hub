<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '../../core/components/BaseButton.vue';

const props = defineProps<{
  action: 'approve' | 'reject';
  request: any;
}>();

const emit = defineEmits<{
  confirm: [message?: string];
  cancel: [];
}>();

const message = ref('');

const handleConfirm = () => {
  emit('confirm', message.value || undefined);
  message.value = '';
};
</script>

<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="$emit('cancel')">
    <div class="glass-panel p-6 max-w-md w-full" @click.stop>
      <h2 class="text-2xl font-bold mb-4 text-gradient">
        {{ action === 'approve' ? '✓ Approve Request' : '✗ Reject Request' }}
      </h2>
      
      <div class="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
        <p class="text-sm text-slate-400 mb-2">User:</p>
        <p class="font-semibold text-white mb-3">{{ request.user.username }} ({{ request.user.email }})</p>
        
        <p class="text-sm text-slate-400 mb-2">Feature:</p>
        <p class="font-semibold text-white">{{ request.feature.name.vi || request.feature.name }}</p>
      </div>
      
      <p class="mb-4 text-slate-300">
        {{ action === 'approve' 
          ? 'This will grant access to the requested feature.' 
          : 'This will deny access to the requested feature.' 
        }}
      </p>
      
      <div class="mb-6">
        <label class="block text-sm text-slate-400 mb-2">
          Optional message to user:
        </label>
        <textarea
          v-model="message"
          :placeholder="action === 'approve' ? 'e.g., Welcome! Enjoy the feature.' : 'e.g., Sorry, this feature is not available for your account type.'"
          class="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-primary focus:outline-none transition-colors"
          rows="3"
        />
      </div>
      
      <div class="flex gap-3">
        <BaseButton 
          @click="handleConfirm" 
          :variant="action === 'approve' ? 'primary' : 'secondary'"
          class="flex-1"
        >
          {{ action === 'approve' ? 'Confirm Approval' : 'Confirm Rejection' }}
        </BaseButton>
        <BaseButton @click="$emit('cancel')" variant="secondary" class="flex-1">
          Cancel
        </BaseButton>
      </div>
    </div>
  </div>
</template>
