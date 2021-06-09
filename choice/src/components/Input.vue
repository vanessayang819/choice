<template>
  <div id="input">
    <span>吃什么自己加 </span>
    <input type="text" v-model="name"  @keyup.enter="add(name)"/>
    <input type="button" value="添加" @click="add(name)" />
  </div>
</template>

<script>
export default {
	data() {
		return {
			items:this.$store.state.items,
			name:''
		}
	},
	methods: {
		add(n) {
			this.items.push({
				name:n
			})
			this.name=''
		}
	},
};
</script>

<style lang="scss" scoped>
  #input {
    margin: 10px auto;
    text-align: center;
  }
</style>