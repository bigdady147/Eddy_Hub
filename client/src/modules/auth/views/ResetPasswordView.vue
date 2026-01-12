<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { useRoute, useRouter } from "vue-router";
import { Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import BaseInput from "../../core/components/BaseInput.vue";
import BaseButton from "../../core/components/BaseButton.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);

const token = route.params.token as string;

const schema = toTypedSchema(
  z
    .object({
      password: z.string().min(6, "Password must be at least 6 characters"),
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
    await authStore.resetPassword(token, values.password);
    router.push("/login");
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
        <h1 class="text-3xl font-bold text-gradient">Reset Password</h1>
        <p class="text-slate-400 mt-2">Enter your new password below</p>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
        <BaseInput
          name="password"
          label="New Password"
          type="password"
          placeholder="••••••••"
        />

        <BaseInput
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
        />

        <BaseButton type="submit" :loading="isLoading" variant="primary">
          Update Password
        </BaseButton>
      </Form>
    </div>
  </div>
</template>
