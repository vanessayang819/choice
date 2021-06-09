import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		items:[
			{ name: '肉烧茄子' },
			{ name: '干锅花菜' },
			{ name: '香河肉饼' },
			{ name: '炸鸡' },
			{ name: '烤肉' },
			{ name: '麻辣烫' },
		]
	}
})