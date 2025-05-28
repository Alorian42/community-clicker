import type { Building } from '../class/Building/Building';
import { BuildingUtils } from '../class/BuildingUtils';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useShopStore = defineStore('shop', () => {
	const nextBuildingCost = (building: Building) =>
		BuildingUtils.getNextBuildingCost(building);
	const currentProduction = (building: Building) =>
		BuildingUtils.getCurrentProduction(building);
	const buildings = computed(() =>
		BuildingUtils.getAllBuildings().map((building) => ({
			name: building.getName(),
			level: building.getLevel(),
			cost: nextBuildingCost(building),
			production: currentProduction(building),
			building: building,
		})),
	);

	return {
		buildings,
	};
});
