import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore('player', () => {
	const name = ref('Player');

	const setName = (newName: string) => {
		name.value = newName;
	};

	return { name, setName };
});
