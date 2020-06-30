<template>
	<div class="content">
		<div class="wrap clearfix">
			<div class="mine-right bg-white my-address">
				<div class="public-title border-b">
					<span class="font-size-24 font-bd">账号认证</span>
				</div>
				<ul class="list" style="padding: 100px 0;">
					<div class="box">
						<img class="tu" src="../../assets/images/code.jpg" />
						<div class="rz">
							扫描二维码，前往App认证
						</div>
					</div>
				</ul>
			</div>

		</div>
	</div>
</template>
<script>
	export default {
		name: 'infor',
		data() {
			return {}
		},
		created() {

		},
		methods: {

		}
	}
</script>
<style>
	.box {
		width: 200px;
		margin: 0 400px;
	}
	.tu {
		width: 100%;
		height: 200px;
	}
	.rz {
		margin-top: 20px;
		text-align: center;
	}
</style>