<template>
	<div class="container">
		<section class="main-section">
			<div class="center-content">
				<MainButton />
			</div>
		</section>
		<section class="side-section">
			<Shop />
		</section>
	</div>
</template>

<script setup lang="ts">
import Shop from '../components/Shop.vue';
import MainButton from '../components/MainButton.vue';
</script>

<style scoped>
.container {
	display: flex;
	height: 100%;
	background: #f5f6fa;
}

.main-section {
	flex: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fff;
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.03);
}

.center-content {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.side-section {
	flex: 1;
	background: #f0f2f5;
	border-left: 1px solid #e0e0e0;
}
</style>
