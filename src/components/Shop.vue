<template>
	<div class="shop">
		<div class="shop-header">
			<div>Currency: {{ currency }}</div>
			<div>Income: {{ income }}</div>

			<div class="shop-tabs">
				<span
					:class="{
						'tab-active': currentTab === 'buildings',
					}"
					@click="currentTab = TABS.BUILDINGS"
				>
					Buildings
				</span>
				<span
					:class="{
						'tab-active': currentTab === 'upgrades',
					}"
					@click="currentTab = TABS.UPGRADES"
				>
					Upgrades
				</span>
			</div>
		</div>
		<div class="shop-items">
			<template v-if="currentTab === TABS.BUILDINGS">
				<div class="shop-item" v-for="item in state.buildings" :key="item.name">
					<span>{{ item.name }}</span>
					<span>Cost: {{ item.cost.toFixed(0) }}</span>
					<span>Income: {{ item.production.toFixed(0) }}</span>
					<button @click="buyBuilding(item as any)">Buy</button>
				</div>
			</template>
			<template v-else-if="currentTab === TABS.UPGRADES">
				<div class="shop-item" v-for="item in state.upgrades" :key="item.name">
					<span>{{ item.name }}</span>
					<span>Cost: {{ item.cost.toFixed(0) }}</span>
					<span>{{ item.description }}</span>
					<button @click="buyUpgrade(item as any)">Buy</button>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useGameStore } from '../stores/game';
import { BuildingUtils, type BuildingsDetails } from '../class/BuildingUtils';
import { UpgradeUtils, type UpgradeDetails } from '../class/UpgradeUtils';

const TABS = {
	BUILDINGS: 'buildings',
	UPGRADES: 'upgrades',
} as const;

const currentTab = ref<(typeof TABS)[keyof typeof TABS]>(TABS.BUILDINGS);

const gameStore = useGameStore();
const currency = computed(() => gameStore.currency.toFixed(0));
const income = computed(() => gameStore.income.toFixed(0));
const state = reactive<{
	buildings: BuildingsDetails[];
	upgrades: UpgradeDetails[];
}>({
	buildings: [],
	upgrades: [],
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
const generateUpgrades = () => {
	state.upgrades = UpgradeUtils.getAllUpgrades().map((upgrade) => ({
		name: upgrade.getName(),
		cost: upgrade.getCost(),
		description: upgrade.getDescription(),
		upgrade: upgrade,
	}));
};

const init = () => {
	generateBuildings();
	generateUpgrades();
};

onMounted(() => {
	init();
});

const buyBuilding = (item: BuildingsDetails) => {
	gameStore.buyBuilding(item.building);
	init();
};

const buyUpgrade = (item: UpgradeDetails) => {
	gameStore.buyUpgrade(item.upgrade);
	init();
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
