<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="论文" name="first">
      <el-select
        v-model="paperForm"
        clearable
        multiple
        placeholder="请选择论文属性"
      >
        <el-option
          v-for="(item, index) in paperName"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="addPaper()" style="margin-left: 20px"
        >添加</el-button
      >
    </el-tab-pane>
    <el-tab-pane label="竞赛" name="second">
      <el-select
        v-model="competitionForm"
        clearable
        multiple
        placeholder="请选择竞赛属性"
      >
        <el-option
          v-for="(item, index) in competitionName"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        @click="addCompetition()"
        style="margin-left: 20px"
        >添加</el-button
      >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { addPaper, addCompetition } from "../../api/counselor";
export default {
  inject: ["reload"],
  data() {
    return {
      activeName: "first",
      paperForm: [],
      paperName: [
        "ID",
        "论文名称",
        "作者",
        "学号",
        "排序",
        "刊物名称",
        "发表年月",
        "收录情况",
        "学分值",
        "审核",
      ],
      competitionForm: [],
      competitionName: [
        "ID",
        "竞赛名称",
        "作者",
        "学号",
        "级别",
        "获奖",
        "时间",
        "学分值",
        "审核",
      ],
    };
  },
  methods: {
    //添加论文属性
    async addPaper() {
      let str = "";
      for (let i = 0; i < this.paperForm.length; i++) {
        str += this.paperForm[i];
        if (this.paperForm[i] != "审核") str += " ";
      }
      await addPaper({ addName: str }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.$message.success("添加成功");
          this.reload();
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    //添加竞赛属性
    async addCompetition() {
      let str = "";
      for (let i = 0; i < this.competitionForm.length; i++) {
        str += this.competitionForm[i];
        if (this.competitionForm[i] != "审核") str += " ";
      }
      await addCompetition({ addName: str }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.$message.success("添加成功");
          this.reload();
        } else {
          this.$message.error("添加失败");
        }
      });
    },
  },
};
</script>

<style>
</style>