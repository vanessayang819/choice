<template>
  <div class="turntable-wrap">
    sdf
    <div class="light"></div>
    <div class="turntable">
      <ul class="choice">
        <li v-for="(item, index) in items" :key="index" :style="style(index)">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="pointer disabled" @click="gameStart()"></div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      items: this.$store.state.items,
      isGoing: false,
    };
  },
  methods: {
    style(key) {
      let deg = (360 / this.items.length) * key;
      return { transform: "rotate(" + deg + "deg)" };
    },

    gameStart() {
      if (this.isGoing) {
        return;
      }
      this.isGoing = true;
      let _items = this.items;
			let t = document.querySelector(".turntable");
			t.style=''

      // 设置随机数
      let randomRate = Math.floor(Math.random() * 100);
      // 给每个item设置范围
      let num = 0;
      _items.forEach((item) => {
        item.min = num;
        num += 100 / _items.length;
        item.max = num;
      });
      // 根据随机数得到结果
      let res = _items.filter((item) => {
        return randomRate >= item.min && randomRate < item.max;
      })[0];


      // 计算旋转角度，将结果旋转到上方
      let rotateItemDeg =
        (_items.length - _items.indexOf(res)) * (360 / _items.length);
      let rotate = rotateItemDeg + 360;
      let rotateSpeed = (rotate / 360).toFixed(2);

      // 旋转动画
      setTimeout(() => {
        t.style.transform = `rotate(${rotate}deg)`;
        t.style.transition = `transform ${rotateSpeed}s ease-out`;
      }, 10);

      // 显示结果
      setTimeout(() => {
        this.isGoing = false;
        console.log(randomRate, res);
				this.$emit("showRes",res)
      }, rotateSpeed * 1000); //转盘停止
    },
  },
};
</script>

<style lang="scss" scoped>
.turntable-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin: 50px auto;
  width: 340px;
  height: 340px;
  border: 7px solid #f5af19;
  border-radius: 50%;
  box-shadow: 0 0 5px #f5af19;
}

.turntable-wrap .light {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f0ddbe;
}

.turntable-wrap .turntable {
  position: absolute;
  margin: 20px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #fff;
}

.turntable-wrap .turntable .choice {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}

.turntable-wrap .turntable .choice li {
  position: absolute;
  top: 5%;
  left: 5%;
  width: 45%;
  height: 45%;
  transform-origin: right bottom;
}

.turntable-wrap .turntable .choice li span {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  margin: auto;
  transform: rotate(-45deg);
  text-align: center;
  color: black;
  font-size: 1rem;
}

.turntable-wrap .pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, 0%);
  -moz-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  margin: -23px auto;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #fff;
  border: 5px solid #f5af19;
  color: #f5af19;
  cursor: pointer;
}

.turntable-wrap .pointer:before {
  content: "";
  position: absolute;
  top: -53px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 0;
  border-style: solid;
  border-color: transparent transparent #f5af19 transparent;
  border-width: 25px 10px 25px 10px;
}
</style>