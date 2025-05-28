import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Game } from '../class/Game';
import type { Building } from '../class/Building/Building';
import { BuildingUtils } from '../class/BuildingUtils';

export const useGameStore = defineStore('game', () => {
	const currency = ref(0);
	const game = ref(null as Game | null);

	const init = (initGame: Game) => {
		currency.value = 0;

		game.value = initGame;
	};

	const incrementCurrency = (amount: number) => {
		if (game.value?.isRunning) {
			currency.value += amount;
		}
	};

	const buyBuilding = (building: Building, amount: number = 1) => {
		if (game.value?.isRunning) {
			for (let i = 0; i < amount; i++) {
				const upgradeCost = BuildingUtils.getNextBuildingCost(building);
				if (currency.value >= upgradeCost) {
					currency.value -= upgradeCost;
					building.upgrade();
				} else {
					console.warn(`Not enough currency to buy ${building.getName()}`);
					break;
				}
			}
		}
	};

	const saveGame = () => {
		if (game.value) {
			game.value.saveGame();
		}
	};

	return {
		currency,
		init,
		incrementCurrency,
		saveGame,
		buyBuilding,
	};
});
