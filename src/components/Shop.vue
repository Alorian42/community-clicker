<template>
	<div class="shop">
		<div class="shop-header">Currency: {{ currency }}</div>
		<div class="shop-items">
			<!-- Shop items will be rendered here -->
			<!-- Example item: -->
			<div class="shop-item" v-for="item in 200" :key="item">
				<span>{{ item }}</span>
				<button @click="">Buy</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '../stores/game'; // Adjust the path if needed

const gameStore = useGameStore();
const currency = computed(() => gameStore.currency);
</script>

<style scoped>
.shop {
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: 16px;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
}

.shop-header {
	position: sticky;
	font-weight: bold;
	margin-bottom: 16px;
	font-size: 1.2em;
}
</style>
