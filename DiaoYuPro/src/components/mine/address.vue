<template>
	<div class="mine-right bg-white my-address">
		<div class="public-title border-b">
			<span class="font-size-24 font-bd">我的地址</span>
			<div class="add-btn" @click="addAddress()">添加新地址</div>
		</div>
		<ul class="list">
			<li class="border-b" v-for="item in addressList">
				<div class="">
					<div class="font-size-18 font-bd">{{item.name}} {{item.mobile}}</div>
					<div class="margin-t">{{item.full_address}} {{item.address_info}}
						<span class="text-theme hover default" v-if="item.is_default == 0">默认地址</span>
						<span class="text-theme hover" v-else @click="setDefault(item.id)">设为默认</span>
					</div>
				</div>
				<div class="">
					<span class="hover" @click="editAddress(item,item.id)">编辑 </span>l
					<span class="hover" @click="addressDel(item.id)">删除</span>
				</div>
			</li>
		</ul>
		<template>
			<addAddress v-if="status == 0" @close="close"></addAddress>
			<editAddress v-if="statusEdit == 0" @close="close" ref="editAddress" v-bind:propsData="propsData"></editAddress>
		</template>
	</div>
</template>

<script>
	import addAddress from './addAddress.vue'
	import editAddress from './editAddress.vue'
	import bus from '../../assets/eventBus.js'
	export default {
		name: 'address',
		components: {
			addAddress,
			editAddress
		},
		data() {
			return {
				status: 1,
				statusEdit: 1,
				token: sessionStorage.getItem('token'),
				addressList: [], // 地址列表
				propsData: '', // 要传给子组件 编辑地址
			}
		},
		created() {
			this.getAddressList()
		},
		mounted() {

		},
		methods: {
			// 收货地址列表
			getAddressList() {
				this.$axios.get(this.$common.wode_addressList, {
					params: {
						token: this.token
					}
				}).then(res => {
					if (res.data.status == 1) {
						this.addressList = res.data.data.addressList
					}
				}).catch(err => {
					console.log(err, 'err===')
				})
			},
			// 收货地址删除
			addressDel(id) {
				this.$confirm('确定删除该条地址么？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.get(this.$common.wode_addressDel, {
						params: {
							id: id // 收货
						}
					}).then(res => {
						if (res.data.status == 1) {
							this.$message({
								message: res.data.msg,
								type: 'success',
								offset: 100
							})
							this.getAddressList()
						} else {
							this.$message({
								message: res.data.msg,
								type: 'warning',
								offset: 100
							})
						}
					}).catch(err => {
						console.log(err, 'err')
					})
				}).catch((action) => {
					console.log(action, 'action')
				})
			},
			// 添加新地址
			addAddress() {
				this.status = 0
			},
			// 监听子组件关闭事件
			close(e) {
				console.log(e, '监听到子组件$emit了')
				this.status = e
				this.statusEdit = e
				this.getAddressList()
			},
			// 设置默认地址
			setDefault (id) {
				this.$axios.get(this.$common.wode_address_isDefault,{
					params: {
						id: id, // 收货地址id
						is_default: 0, // 是否设为默认 0:默认 1：不默认
					}
				}).then( res => {
					if(res.data.status == 1) {
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 100
						})
						this.getAddressList()
					}else{
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch( err => {
					console.log(err,'err')
				})
			},
			// 编辑地址
			editAddress (item,id) {
				this.propsData = item
				console.log(this.propsData,'asdjdkajdlaksjd')
				this.statusEdit = 0
			},
		},
	}
</script>

<style scoped>
	.default {
		display: inline-block;
		width: 80px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		border: 1px solid #ff5000;
		border-radius: 3px;
		background: #ffd6cc;
		color: #f30 !important;
	}
</style>
