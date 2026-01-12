<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import BaseInput from "../../core/components/BaseInput.vue";
import BaseButton from "../../core/components/BaseButton.vue";
import { ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const errorMsg = ref("");
const isLoading = ref(false);

// Define Validation Schema
const schema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
);

const onSubmit = async (values: any) => {
  try {
    isLoading.value = true;
    errorMsg.value = "";
    await authStore.login(values);
    router.push("/");
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || "Login failed";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="glass-panel w-full max-w-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gradient">Welcome Back</h1>
        <p class="text-slate-400 mt-2">Sign in to access your tools</p>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
        <div
          v-if="errorMsg"
          class="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center"
        >
          {{ errorMsg }}
        </div>

        <BaseInput
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />

        <BaseInput
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />

        <div class="flex justify-end">
          <router-link
            to="/forgot-password"
            class="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Forgot password?
          </router-link>
        </div>

        <BaseButton type="submit" :loading="isLoading"> Sign In </BaseButton>
      </Form>

      <div class="mt-6 text-center text-sm text-slate-500">
        Don't have an account?
        <router-link
          to="/register"
          class="text-primary hover:text-primary-hover font-medium transition-colors"
        >
          Create account
        </router-link>
      </div>
    </div>
  </div>
</template>
