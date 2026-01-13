<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { featureRequestApi } from '../../../services/feature-request.service';
import { useToastStore } from '../../core/stores/toast.store';
import StatCard from '../components/StatCard.vue';

const toastStore = useToastStore();

const stats = ref({ total: 0, pending: 0, approved: 0, rejected: 0 });
const loading = ref(true);

const loadStats = async () => {
  try {
    loading.value = true;
    const response = await featureRequestApi.getStats();
    stats.value = response;
  } catch (error: any) {
    console.error('Failed to load stats:', error);
    toastStore.addToast({ 
      message: error.response?.data?.message || 'Failed to load statistics', 
      type: 'error' 
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadStats();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
      <p class="text-slate-400 text-lg">Manage features requests and permissions</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in 4" :key="i" class="glass-panel p-6 animate-pulse">
        <div class="h-4 bg-slate-700 rounded w-1/2 mb-3"></div>
        <div class="h-8 bg-slate-700 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard 
        title="Total Requests" 
        :value="stats.total" 
        icon="📊" 
        color="primary"
      />
      <StatCard 
        title="Pending Review" 
        :value="stats.pending" 
        icon="⏳" 
        color="yellow"
      />
      <StatCard 
        title="Approved" 
        :value="stats.approved" 
        icon="✅" 
        color="green"
      />
      <StatCard 
        title="Rejected" 
        :value="stats.rejected" 
        icon="❌" 
        color="red"
      />
    </div>

    <!-- Quick Actions -->
    <div class="glass-panel p-8">
      <h2 class="text-2xl font-bold mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <router-link to="/admin/permissions">
          <div class="glass-panel p-6 cursor-pointer hover:bg-white/5 hover:border-primary/50 transition-all group">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🔐
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">Manage Permissions</h3>
                <p class="text-sm text-slate-400">Review and approve feature requests</p>
              </div>
            </div>
          </div>
        </router-link>

        <div class="glass-panel p-6 cursor-pointer hover:bg-white/5 hover:border-primary/50 transition-all group opacity-50">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-2xl">
              👥
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">User Management</h3>
              <p class="text-sm text-slate-400">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
