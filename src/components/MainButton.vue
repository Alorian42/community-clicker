<template>
	<button class="main-btn" :class="{ clicked: isClicked }" @click="handleClick">
		Dig!
	</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '../stores/game';
const { incrementCurrency } = useGameStore();

const isClicked = ref(false);

const handleClick = () => {
	incrementCurrency(1);
	isClicked.value = true;
	setTimeout(() => {
		isClicked.value = false;
	}, 200); // duration matches animation
};
</script>

<style scoped>
.main-btn {
	padding: 1rem 2rem;
	background: #4caf50;
	color: #fff;
	border: none;
	border-radius: 8px;
	font-size: 1.2rem;
	cursor: pointer;
	transition: background 0.2s;
}
.main-btn:hover {
	background: #388e3c;
}
.main-btn.clicked {
	animation: btn-pop 0.2s;
}
@keyframes btn-pop {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.15);
	}
	100% {
		transform: scale(1);
	}
}
</style>
