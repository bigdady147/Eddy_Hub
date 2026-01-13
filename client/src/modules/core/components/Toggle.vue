<script setup lang="ts">
interface Props {
  checked?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false
});

const emit = defineEmits<{
  change: [value: boolean]
}>();

const handleClick = () => {
  emit('change', !props.checked);
};
</script>

<template>
  <button
    type="button"
    :class="[
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      checked ? 'bg-primary' : 'bg-gray-600'
    ]"
    role="switch"
    :aria-checked="checked"
    @click="handleClick"
  >
    <span
      :class="[
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        checked ? 'translate-x-5' : 'translate-x-0'
      ]"
    ></span>
  </button>
</template>
