<template>
  <el-table :data="sortList" stripe border :height="height" style="width: 100%">
    <el-table-column type="index" label="排名" width="80"></el-table-column>
    <el-table-column prop="name" label="姓名"> </el-table-column>
    <el-table-column prop="sno" label="学号"> </el-table-column>
    <el-table-column prop="data" label="成果数"> </el-table-column>
  </el-table>
</template>

<script>
import { sortStudent } from "../../api/counselor";
export default {
  data() {
    return {
      sortList: [],
      height: window.innerHeight - 150,
    };
  },
  created() {
    this.sortStudent();
  },
  methods: {
    //获取排序列表
    async sortStudent() {
      await sortStudent().then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.sortList = data.data;
          // console.log(this.sortList);
        }
      });
    },
  },
};
</script>

<style>
</style>