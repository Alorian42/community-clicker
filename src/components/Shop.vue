<template>
	<div class="shop">
		<div class="shop-header">
			<div>Currency: {{ currency }}</div>
			<div>Income: {{ income }}</div>
		</div>
		<div class="shop-items">
			<!-- Shop items will be rendered here -->
			<!-- Example item: -->
			<div class="shop-item" v-for="item in state.buildings" :key="item.name">
				<span>{{ item.name }}</span>
				<span>Cost: {{ item.cost.toFixed(0) }}</span>
				<span>Income: {{ item.production.toFixed(0) }}</span>
				<button @click="buy(item as any)">Buy</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useGameStore } from '../stores/game';
import { BuildingUtils, type BuildingsDetails } from '../class/BuildingUtils';

const gameStore = useGameStore();
const currency = computed(() => gameStore.currency.toFixed(0));
const income = computed(() => gameStore.income.toFixed(0));
const state = reactive<{
	buildings: BuildingsDetails[];
}>({
	buildings: [],
});

const generateBuildings = () => {
	state.buildings = BuildingUtils.getAllBuildings().map((building) => ({
		name: building.getName(),
		level: building.getLevel(),
		cost: BuildingUtils.getNextBuildingCost(building),
		production: BuildingUtils.getCurrentProduction(building),
		building: building,
	}));
};

onMounted(() => {
	generateBuildings();
});

const buy = (item: BuildingsDetails) => {
	gameStore.buyBuilding(item.building);
	generateBuildings();
};
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
