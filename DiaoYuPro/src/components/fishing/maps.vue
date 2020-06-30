<template>
	<div class="content">
		<div class="content-top"></div>
		<div id="my_container"></div>
	</div>

</template>
<script>
	export default {
		name: "maps",
		data() {
			return {
				ruleForm: {
					name: '',
					phone: '',
					addr: '',
					long: '',
					lat: '',
					start_work_time: '',
					end_work_time: '',
				},
			}
		},
		mounted() {
			this.ruleForm.long = this.$route.query.lon
			this.ruleForm.lat = this.$route.query.lat
			this.init()
		},
		methods: {
			init() {
				var vm = this;
				var geocoder, marker;
				var lonlat = [vm.ruleForm.long, vm.ruleForm.lat];
				var map = new AMap.Map('my_container', {
					resizeEnable: true,
					zoom: 14,
					center: lonlat,
					showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true,
				})
				AMap.plugin('AMap.Geolocation', function() { //异步加载插件
					var geolocation = new AMap.Geolocation()
					map.addControl(geolocation)
					regeocoder(lonlat, vm)
					console.log(geolocation)
				})

				function regeocoder(lnglatXY, that) {
					AMap.plugin('AMap.Geocoder', function() {
						var geocoder = new AMap.Geocoder({
							radius: 1000,
							extensions: "all"
						});
						geocoder.getAddress(lnglatXY, function(status, result) {
							if(status === 'complete' && result.info === 'OK') {
								var address = result.regeocode.formattedAddress;
								that.ruleForm.addr = address
							}
						});
						if(!marker) {
							marker = new AMap.Marker();
							map.add(marker);
						}
						marker.setPosition(lnglatXY);
						//						marker.setLabel({
						//							offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
						//							content: "<div class='info'>{{}}</div>", //设置文本标注内容
						//							direction: 'right' //设置文本标注方位
						//						});
						//						marker.setTitle('我是marker的title');	
					})
				}
				//				map.on('click', function(e) {
				//					console.log(e)
				//					var lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()];
				//					regeocoder(lnglatXY, vm)
				//					vm.ruleForm.long = e.lnglat.getLng()
				//					vm.ruleForm.lat = e.lnglat.getLat()
				//					console.log(vm.ruleForm.long, vm.ruleForm.lat)
				//				});
			},
		},
	}
</script>

<style scoped>
	#my_container {
		margin-top: 200px;
		margin: 0 auto;
		height: 700px;
		width: calc(100% - 110px);
	}
	/*.amap-marker-label {
		border: 1px solid white !important;
	}*/
</style>