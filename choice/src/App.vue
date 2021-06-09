<template>
  <div id="app">
    <Input></Input>
    <TurnTable @showRes="show"></TurnTable>
    <div>吃{{ res.name }}</div>
    <Table></Table>
  </div>
</template>


<script>
import TurnTable from "@/components/TurnTable.vue";
import Table from "@/components/Table.vue";
import Input from "@/components/Input.vue";
export default {
  data() {
    return {
      res: { type: Object },
    };
  },
  methods: {
    show(res) {
      this.res = res;
    },
  },
  components: {
    TurnTable,
    Table,
    Input
  },
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body {
  height: 100%;
}
ul {
  list-style: none;
}

</style>
