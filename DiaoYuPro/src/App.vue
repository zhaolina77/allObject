<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<app-header />
		<router-view />
		<app-footer />
	</div>
</template>

<script>
	import Header from './components/header'
	import Footer from './components/footer'
	export default {
		name: 'App',
		components: {
			'app-header': Header,
			'app-footer': Footer,
		},
	}
</script>

<style>
	body{
		background-color:#F8F9FB;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
