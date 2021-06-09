<template>
  <div id="table">
    <span v-for="(item, key) in items" :key="key"
      >{{ item.name }}
      <button @click="del(key)">删除</button>
    </span>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      items: this.$store.state.items,
    };
  },
  methods: {
    del(key) {
      this.items.splice(key, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
#table {
  text-align: center;
}
</style>