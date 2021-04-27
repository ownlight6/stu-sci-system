<template>
  <el-table :data="stuList" stripe border :height="height" style="width: 100%">
    <el-table-column prop="ID" label="编号" width="80"> </el-table-column>
    <el-table-column prop="姓名" label="姓名"> </el-table-column>
    <el-table-column prop="学号" label="学号"> </el-table-column>
  </el-table>
</template>

<script>
import { studentList } from "../../api/counselor";
export default {
  data() {
    return {
      stuList: [],
      height: window.innerHeight - 150,
    };
  },
  created() {
    this.studentList();
  },
  methods: {
    //获取学生列表
    async studentList() {
      await studentList().then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.stuList = data.data;
          // console.log(this.stuList);
        }
      });
    },
  },
};
</script>

<style>
</style>