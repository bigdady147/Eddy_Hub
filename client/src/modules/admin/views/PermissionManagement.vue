<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { featureRequestApi, type FeatureRequest } from '../../../services/feature-request.service';
import { useToastStore } from '../../core/stores/toast.store';
import RequestCard from '../components/RequestCard.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

const toastStore = useToastStore();

const requests = ref<FeatureRequest[]>([]);
const filter = ref<'all' | 'pending' | 'approved' | 'rejected'>('pending');
const loading = ref(true);

// Modal state
const showModal = ref(false);
const selectedRequest = ref<FeatureRequest | null>(null);
const action = ref<'approve' | 'reject'>('approve');

const filteredRequests = computed(() => {
  if (filter.value === 'all') return requests.value;
  return requests.value.filter(r => r.status === filter.value);
});

const loadRequests = async () => {
  try {
    loading.value = true;
    const response = await featureRequestApi.getAllRequests();
    requests.value = response;
  } catch (error: any) {
    console.error('Failed to load requests:', error);
    toastStore.addToast({ 
      message: error.response?.data?.message || 'Failed to load requests', 
      type: 'error' 
    });
  } finally {
    loading.value = false;
  }
};

const openConfirmModal = (request: FeatureRequest, actionType: 'approve' | 'reject') => {
  selectedRequest.value = request;
  action.value = actionType;
  showModal.value = true;
};

const confirmAction = async (message?: string) => {
  if (!selectedRequest.value) return;
  
  try {
    if (action.value === 'approve') {
      await featureRequestApi.approveRequest(selectedRequest.value._id, message);
      toastStore.addToast({ 
        message: 'Request approved successfully', 
        type: 'success' 
      });
    } else {
      await featureRequestApi.rejectRequest(selectedRequest.value._id, message);
      toastStore.addToast({ 
        message: 'Request rejected', 
        type: 'info' 
      });
    }
    
    showModal.value = false;
    selectedRequest.value = null;
    await loadRequests();
  } catch (error: any) {
    console.error('Failed to process request:', error);
    toastStore.addToast({ 
      message: error.response?.data?.message || 'Failed to process request', 
      type: 'error' 
    });
  }
};

const closeModal = () => {
  showModal.value = false;
  selectedRequest.value = null;
};

onMounted(() => {
  loadRequests();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gradient mb-2">Permission Management</h1>
      <p class="text-slate-400 text-lg">Review and manage user feature access requests</p>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
      <button
        @click="filter = 'all'"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap',
          filter === 'all' 
            ? 'bg-primary text-white' 
            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
        ]"
      >
        All Requests ({{ requests.length }})
      </button>
      <button
        @click="filter = 'pending'"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap',
          filter === 'pending' 
            ? 'bg-yellow-500 text-black' 
            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
        ]"
      >
        ⏳ Pending ({{ requests.filter(r => r.status === 'pending').length }})
      </button>
      <button
        @click="filter = 'approved'"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap',
          filter === 'approved' 
            ? 'bg-green-500 text-black' 
            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
        ]"
      >
        ✅ Approved ({{ requests.filter(r => r.status === 'approved').length }})
      </button>
      <button
        @click="filter = 'rejected'"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap',
          filter === 'rejected' 
            ? 'bg-red-500 text-black' 
            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
        ]"
      >
        ❌ Rejected ({{ requests.filter(r => r.status === 'rejected').length }})
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="glass-panel p-6 animate-pulse">
        <div class="flex gap-4">
          <div class="w-12 h-12 bg-slate-700 rounded-full"></div>
          <div class="flex-1">
            <div class="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
            <div class="h-4 bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Requests List -->
    <div v-else-if="filteredRequests.length > 0" class="space-y-4">
      <RequestCard 
        v-for="request in filteredRequests" 
        :key="request._id"
        :request="request"
        @approve="openConfirmModal(request, 'approve')"
        @reject="openConfirmModal(request, 'reject')"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="glass-panel p-12 text-center">
      <div class="text-6xl mb-4">📭</div>
      <h3 class="text-xl font-semibold text-white mb-2">No requests found</h3>
      <p class="text-slate-400">
        {{ filter === 'pending' 
          ? 'All caught up! No pending requests at the moment.' 
          : `No ${filter} requests found.` 
        }}
      </p>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal 
      v-if="showModal && selectedRequest"
      :action="action"
      :request="selectedRequest"
      @confirm="confirmAction"
      @cancel="closeModal"
    />
  </div>
</template>
