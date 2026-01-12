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
  z
    .object({
      username: z.string().min(3, "Username must be at least 3 characters"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      fullName: z.string().optional(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })
);

const onSubmit = async (values: any) => {
  try {
    isLoading.value = true;
    errorMsg.value = "";
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = values;
    await authStore.register(userData);
    router.push("/");
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || "Registration failed";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="glass-panel w-full max-w-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gradient-accent">Create Account</h1>
        <p class="text-slate-400 mt-2">Join the future of productivity</p>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
        <div
          v-if="errorMsg"
          class="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center"
        >
          {{ errorMsg }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput name="username" label="Username" placeholder="johndoe" />
          <BaseInput name="fullName" label="Full Name" placeholder="John Doe" />
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

        <BaseInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
        />

        <BaseButton type="submit" :loading="isLoading" variant="primary">
          Sign Up
        </BaseButton>
      </Form>

      <div class="mt-6 text-center text-sm text-slate-500">
        Already have an account?
        <router-link
          to="/login"
          class="text-accent-purple hover:text-accent-pink font-medium transition-colors"
        >
          Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>
