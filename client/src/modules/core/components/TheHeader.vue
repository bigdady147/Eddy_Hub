<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../auth/stores/auth.store";
import BaseButton from "./BaseButton.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full glass-panel border-b border-white/10 rounded-none bg-opacity-70 backdrop-blur-md"
  >
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group">
        <div
          class="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all"
        >
          <span class="text-white font-bold text-lg">E</span>
        </div>
        <span
          class="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors"
        >
          Eddy<span class="text-primary">Hub</span>
        </span>
      </router-link>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-6">
        <router-link
          to="/"
          class="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Dashboard
        </router-link>
        <a
          href="#"
          class="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Tools
        </a>
        <a
          href="#"
          class="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Settings
        </a>
      </nav>

      <!-- User Profile & Language -->
      <div class="flex items-center gap-4">
        <!-- Language Switcher -->
        <LanguageSwitcher />

        <div v-if="user" class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-white">{{ user.username }}</p>
            <p class="text-xs text-slate-400">{{ user.email }}</p>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border-2 border-white/10"
          >
            <img
              :src="
                user.avatar ||
                'https://ui-avatars.com/api/?name=' +
                  user.username +
                  '&background=random'
              "
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          </div>
          <button
            @click="handleLogout"
            class="text-slate-400 hover:text-red-400 transition-colors p-2"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
        <div v-else>
          <router-link to="/login">
            <BaseButton variant="primary" class="!py-2 !px-4 text-sm"
              >Login</BaseButton
            >
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
