<script setup lang="ts">
import { useField } from "vee-validate";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

// useField() will automatically finding the validation rules from the parent Form or use explicit rules
const { value, errorMessage, handleBlur, handleChange, meta } = useField(
  () => props.name
);
</script>

<template>
  <div class="space-y-2">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-slate-300"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        :id="name"
        :name="name"
        :type="type"
        :value="value"
        @input="handleChange"
        @blur="handleBlur"
        :placeholder="placeholder"
        class="glass-input"
        :class="{
          '!border-red-500/50 !focus:border-red-500/50': errorMessage,
          '!border-green-500/50 !focus:border-green-500/50':
            meta.valid && meta.dirty,
        }"
      />
    </div>

    <transition name="fade">
      <p v-if="errorMessage" class="text-xs text-red-400 mt-1">
        {{ errorMessage }}
      </p>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
