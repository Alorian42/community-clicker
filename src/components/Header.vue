<template>
	<div class="header">
		<h1>Community Clicker</h1>
		<h2>{{ name }}</h2>
	</div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../stores/player';

const { name } = usePlayerStore();
</script>
<style scoped></style>
