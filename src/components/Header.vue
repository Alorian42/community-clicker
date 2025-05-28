<template>
	<div class="header">
		<h1>Community Clicker</h1>
		<div>
			<button @click="saveGame">Save</button>
			<h2>{{ name }}</h2>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/game';
import { usePlayerStore } from '../stores/player';

const { name } = usePlayerStore();
const { saveGame } = useGameStore();
</script>
<style scoped>
.header {
	width: 100%;
	box-sizing: border-box;
	background: #2c3e50;
	color: #fff;
	padding: 0.75rem 2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1.25rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header h1 {
	margin: 0;
	font-size: 1.5rem;
	font-weight: bold;
	letter-spacing: 1px;
}

.header h2 {
	margin: 0;
	font-size: 1.1rem;
	font-weight: normal;
}
</style>
