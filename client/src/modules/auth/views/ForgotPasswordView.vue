<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import BaseInput from "../../core/components/BaseInput.vue";
import BaseButton from "../../core/components/BaseButton.vue";

const authStore = useAuthStore();
const isLoading = ref(false);
const isSent = ref(false);

const schema = toTypedSchema(
  z.object({
    email: z.string().email("Invalid email address"),
  })
);

const onSubmit = async (values: any) => {
  try {
    isLoading.value = true;
    await authStore.forgotPassword(values.email);
    isSent.value = true;
  } catch (error) {
    // Error handled in store
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="glass-panel w-full max-w-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gradient">Forgot Password</h1>
        <p class="text-slate-400 mt-2">
          Enter your email to receive a reset link
        </p>
      </div>

      <div v-if="isSent" class="text-center space-y-4 animate-fade-in">
        <div
          class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500 text-2xl"
        >
          ✓
        </div>
        <h3 class="text-xl font-bold text-white">Email Sent!</h3>
        <p class="text-slate-400">
          Please check your inbox (and spam folder) for the reset link.
        </p>
        <router-link to="/login">
          <BaseButton variant="secondary" class="mt-4"
            >Back to Login</BaseButton
          >
        </router-link>
      </div>

      <Form
        v-else
        @submit="onSubmit"
        :validation-schema="schema"
        class="space-y-6"
      >
        <BaseInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
        />

        <BaseButton type="submit" :loading="isLoading" variant="primary">
          Send Reset Link
        </BaseButton>

        <div class="text-center mt-4">
          <router-link
            to="/login"
            class="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Back to Login
          </router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
