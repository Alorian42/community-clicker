<template>
	<Header />
	<div class="container">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
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
	padding: 2rem;
	background: #f5f6fa;
	min-height: 0;
}
</style>
