let items = [
	{ name: '肉烧茄子' },
	{ name: '干锅花菜' },
	{ name: '香河肉饼' },
	{ name: '炸鸡' },
	{ name: '烤肉' },
	{ name: '麻辣烫' },
];


let item = new Proxy(items, {
	set: function (target, key, value) {
		target[key] = value;
		console.log(`修改了:${key},新值：${value}`)
		turntable.remove();
		turntable.init();
		table.show()
		return true
	}
})


let table = {
	lists: null,//下方表格
	//删除一个item
	delete(key) {
		console.log(key);
		item.splice(key, 1)
	},

	//显示下方表格
	show() {
		this.lists.innerHTML = ''
		for (let key in item) {
			let name = item[key].name;
			this.lists.innerHTML += ` ${name} <button onclick="table.delete(${key})"> 删除 </button>`;
		};
	}
}


let turntable = {
	item, // 数据
	turntable: null, // 转盘
	choice: null, // 转盘上的结果
	pointer: null, // 转盘指针
	result: null,//显示的结果
	isGoing: false, // 是否开始

	init() {
		if (!this.item.length) {
			this.pointer.style.display = 'none';
			throw new Error('请设置数据');
		}
		// 重置转盘样式
		this.turntable.removeAttribute('style');
		// 重置转盘数据
		let choiceFragment = document.createDocumentFragment();
		for (let i = 0; i < this.item.length; i++) {
			let deg = (360 / this.item.length) * i
			let choiceItem = document.createElement('li');
			choiceItem.style.transform = `rotate(${deg}deg)`;
			let span = document.createElement('span');
			span.innerHTML = this.item[i].name;
			choiceItem.appendChild(span);
			choiceFragment.appendChild(choiceItem)
		}
		this.choice.appendChild(choiceFragment);
		// 给按钮添加点击事件
		this.pointer.onclick = this.gameStart.bind(this)
	},

	//清空转盘显示的数据
	remove() {
		if (this.choice.childNodes.length !== 0) {
			this.choice.innerHTML = ""
		}
	},

	gameStart() {
		if (this.isGoing) {
			return
		}
		this.isGoing = true;

		// 设置随机数
		let randomRate = Math.floor(Math.random() * 100)
		// 给每个item设置范围
		let num = 0
		this.item.forEach(item => {
			item.min = num;
			num += 100 / this.item.length;
			item.max = num;
		})
		// 根据随机数得到结果
		let res = this.item.filter(item => {
			return randomRate >= item.min && randomRate < item.max;
		})[0];

		// 计算旋转角度，将结果旋转到上方
		let rotateItemDeg = (this.item.length - item.indexOf(res)) * (360 / this.item.length);
		let rotate = rotateItemDeg + 360;
		let rotateSpeed = (rotate / 360).toFixed(2);
		// 重置转盘样式
		this.turntable.removeAttribute('style');
		// 保证下一次旋转动画生效
		setTimeout(() => {
			this.turntable.style.transform = `rotate(${rotate}deg)`;
			this.turntable.style.transition = `transform ${rotateSpeed}s ease-out`;
		}, 10)

		// 显示结果
		setTimeout(() => {
			this.isGoing = false;
			result.innerHTML = '吃' + res.name
			console.log(randomRate, res);
		}, rotateSpeed * 1000);//转盘停止
	}
}


table.lists = document.querySelector('#table')
turntable.turntable = document.querySelector('#turntable');
turntable.light = document.querySelector('#turntable_light');
turntable.choice = document.querySelector('#turntable_choice');
turntable.pointer = document.querySelector('#turntable_pointer');
turntable.result = document.querySelector('#result');

//进入页面初始化
turntable.init();
table.show()


//添加其他选项
var btn = document.querySelector('#input_btn');
var t = document.querySelector('input');
var index = item.length + 1
btn.addEventListener('click', function () {
	item.push({
		name: t.value
	})
	index++
});