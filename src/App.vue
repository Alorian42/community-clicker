<template>
	<Header />
	<div class="container">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import Header from './components/Header.vue';
import { Game } from './class/Game';

onBeforeMount(() => {
	const game = new Game();

	game.start();
});
</script>
<style>
html,
body,
#app {
	height: 100%;
	margin: 0;
	padding: 0;
}

#app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
	background: #f5f6fa;
	min-height: 0;
}
</style>
