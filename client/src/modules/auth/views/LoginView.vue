<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/auth.store";
import { Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import BaseInput from "../../core/components/BaseInput.vue";
import BaseButton from "../../core/components/BaseButton.vue";
import { ref, computed } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();
const errorMsg = ref("");
const isLoading = ref(false);

// Define Validation Schema
const schema = computed(() => toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, t('auth.emailRequired'))
      .email(t('auth.invalidEmail')),
    password: z.string().min(6, t('auth.passwordMinLength')),
  })
));

const onSubmit = async (values: any) => {
  try {
    isLoading.value = true;
    errorMsg.value = "";
    await authStore.login(values);
    router.push("/feature-selection");
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || t('auth.loginFailed');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="glass-panel w-full max-w-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gradient" v-text="$t('auth.welcomeBack')"></h1>
        <p class="text-slate-400 mt-2" v-text="$t('auth.signInSubtitle')"></p>
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
          :label="$t('auth.email')"
          type="email"
          :placeholder="$t('auth.emailPlaceholder')"
        />

        <BaseInput
          name="password"
          :label="$t('auth.password')"
          type="password"
          :placeholder="$t('auth.passwordPlaceholder')"
        />

        <div class="flex justify-end">
          <router-link
            to="/forgot-password"
            class="text-xs text-slate-400 hover:text-white transition-colors"
            v-text="$t('auth.forgotPassword')"
          ></router-link>
        </div>

        <BaseButton type="submit" :loading="isLoading">
          <span v-text="$t('auth.signIn')"></span>
        </BaseButton>
      </Form>

      <div class="mt-6 text-center text-sm text-slate-500">
        {{ $t('auth.dontHaveAccount') }}
        <router-link
          to="/register"
          class="text-primary hover:text-primary-hover font-medium transition-colors"
          v-text="$t('auth.createAccount')"
        ></router-link>
      </div>
    </div>
  </div>
</template>
