import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Game } from '../class/Game';

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
	};
});
