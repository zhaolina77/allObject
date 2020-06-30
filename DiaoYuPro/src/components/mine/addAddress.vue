<template>
	<div class="popup">
		
		<div class="bg-white add-address">
			<div class="clearfix">
				<img class="close" src="../../assets/images/close.png" @click="close()"/>
			</div>
			<ul class="form">
				<!-- <li class="clearfix">
					<div class="fl name">地址管理：</div>
					<div class="inpt">
						<select>
							<option value="">请选择省/市/区/街道</option>
							<option value="">陕西</option>
						</select>
					</div>
				</li> -->
				<li class="clearfix">
					<div class="fl name">地址管理：</div>
					<div class="inpt">
						<div class="pick-area" name=""></div>
						<!-- <input type="text" placeholder="调用元素pick-area，显示值的地方，方法在参数getVal中"/> -->
					</div>
				</li>
				<li class="clearfix">
					<div class="fl name">详细地址：</div>
					<div class="inpt" style="height: 52px ;">
						<textarea name="" rows="" cols="" placeholder="请输入详细地址，如门牌号等信息" v-model="address_info"></textarea>
					</div>
				</li>
				<li class="clearfix">
					<div class="fl name">收货人姓名：</div>
					<div class="inpt">
						<input name="" rows="" cols="" placeholder="请输入收货人姓名" v-model="name"></input>
					</div>
				</li>
				<li class="clearfix">
					<div class="fl name">联系电话：</div>
					<div class="inpt">
						<input name="" rows="" cols="" placeholder="请输入收货人联系电话" v-model="mobile"></input>
					</div>
				</li>
			</ul>
			<!-- <div class="moren">
				<input type="checkbox" name="" id="checkDefault" value="" @click="setIsDefault()"/>
				<span class="text-theme">默认</span>
			</div> -->
			<div class="btn" @click="saveAddress()">
				保存
			</div>
		</div>
		
	</div>
</template>
<script>
	import '../../assets/js/pick-pcc-1.0.4/pick-pcc.css';
	import '../../assets/js/pick-pcc-1.0.4/pick-pcc.js';
	import bus from '../../assets/eventBus.js'
	export default {
		name: 'addAddress',
		data () {
			return {
				token: sessionStorage.getItem('token'),
				name: '', // 收货人姓名
				mobile: '' , // 收货人电话 
				full_address: '', // 所在区域
				address_info: '', // 详细地址
			}
		},
		created() {
			
		},
		mounted() {
			// $(".pick-area").attr("data-codearea")
			$(".pick-area").pickArea({
			        "format":"", //格式
			        "width":"340",
			        "borderColor":"#ff8c00",//文本边框的色值
			        "arrowColor":"#ff8c00",//下拉箭头颜色
			        "listBdColor":"#ff8c00",//下拉框父元素ul的border色值
			        "color":"#ff8c00",//字体颜色
			        "hoverColor":"#ff8c00",
			        //"preSet":"山东省/临沂市/兰陵县",
			        "getVal": () => {
			            console.log($(".pick-area-hidden").val(),33333)
			            console.log($(".pick-area-dom").val(),22222)
			            var thisdom = $("."+$(".pick-area-dom").val());
			            thisdom.next().val($(".pick-area-hidden").val());
						this.full_address = $(".pick-area-hidden").val()
						console.log(this.full_address,'this.full_address')
			        }
			    });
		},
		methods: {
			// 关闭添加地址页面
			close() {
				this.$emit('close', 1)
			},
			// 保存新添加地址
			saveAddress () {
//				debugger
				console.log(this.full_address,'==================')
				this.$axios.get(this.$common.wode_addAddress,{
					params: {
						token: this.token,
						name: this.name, // 收货人姓名
						mobile: this.mobile, // 收货人电话
						full_address: this.full_address, // 所在区域
						address_info: this.address_info, // 详细地址
					}
				}).then(res => {
					console.log(res,'res ---添加地址')
					if(res.data.status == 0){
						this.$message({
							message:res.data.msg,
							type: 'warning',
							offset: 100
						});
					}else{
						this.$message({
							message:res.data.msg,
							type: 'success',
							offset: 100
						});
						this.$emit('close', 1)
					}
				}).catch(err => {
					console.log(err,'err')
				})
			},
			// setIsDefault () {
			// 	let checkDefault = document.getElementById('checkDefault')
			// 	console.log(checkDefault.checked,'eeeeeeeee')
			// 	if(checkDefault.checked == true){
			// 		this.$axios.get(this.$common.wode_address_isDefault,{
			// 			params:{
							
			// 			}
			// 		}).then( res => {
			// 			console.log(res,'res--将收货地址设为默认')
			// 		}).catch( err => {
			// 			console.log(err,'err===')
			// 		})
					
			// 	}
			// },
		}
	}
</script>

<style>
</style>
