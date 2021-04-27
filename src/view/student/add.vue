<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="论文" name="first">
      <el-form
        label-position="left"
        label-width="80px"
        :model="paperForm"
        style="width: 400px"
      >
        <el-form-item label="学号">
          <el-input v-model="paperForm.学号" disabled></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="paperForm.作者" disabled></el-input>
        </el-form-item>
        <el-form-item label="论文名称">
          <el-input v-model="paperForm.论文名称"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="paperForm.排序"></el-input>
        </el-form-item>
        <el-form-item label="刊物名称">
          <el-input v-model="paperForm.刊物名称"></el-input>
        </el-form-item>
        <el-form-item label="发表年月">
          <el-input v-model="paperForm.发表年月"></el-input>
        </el-form-item>
        <el-form-item label="收录情况">
          <el-input v-model="paperForm.收录情况"></el-input>
        </el-form-item>
        <el-form-item label="学分值">
          <el-input v-model="paperForm.学分值"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addPaper">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="竞赛" name="second">
      <el-form
        label-position="left"
        label-width="80px"
        :model="competitionFrom"
        style="width: 400px"
      >
        <el-form-item label="学号">
          <el-input v-model="competitionFrom.学号" disabled></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="competitionFrom.作者" disabled></el-input>
        </el-form-item>
        <el-form-item label="竞赛名称">
          <el-input v-model="competitionFrom.竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-input v-model="competitionFrom.级别"></el-input>
        </el-form-item>
        <el-form-item label="获奖">
          <el-input v-model="competitionFrom.获奖"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="competitionFrom.时间"></el-input>
        </el-form-item>
        <el-form-item label="学分值">
          <el-input v-model="competitionFrom.学分值"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCompetition">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { paperName, competitionName } from "../../api/common";
import { addPaper, addCompetition } from "../../api/student";
export default {
  inject: ["reload"],
  data() {
    return {
      activeName: "first",
      paper: [],
      competition: [],
      paperForm: {
        论文名称: "",
        作者: localStorage.name,
        学号: localStorage.sno,
        排序: "",
        刊物名称: "",
        发表年月: "",
        收录情况: "",
        学分值: "",
      },
      competitionFrom: {
        竞赛名称: "",
        作者: localStorage.name,
        学号: localStorage.sno,
        级别: "",
        获奖: "",
        时间: "",
        学分值: "",
      },
    };
  },
  created() {
    this.paperName();
    this.competitionName();
  },
  methods: {
    //获取论文属性
    async paperName() {
      await paperName().then((res) => {
        let data = res.data;
        // console.log(data);
        this.paper = data.data.data;
      });
    },
    //获取竞赛属性
    async competitionName() {
      await competitionName().then((res) => {
        let data = res.data;
        // console.log(data);
        this.competition = data.data.data;
      });
    },
    //添加论文成果
    async addPaper() {
      let str = "";
      for (let key in this.paperForm) {
        str += this.paperForm[key];
        if (key != "学分值") str += " ";
      }
      await addPaper({ add: str }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.$message.success("添加成功");
          this.$router.push("/student/list");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    //添加竞赛成果
    async addCompetition() {
      let str = "";
      for (let key in this.competitionFrom) {
        str += this.competitionFrom[key];
        if (key != "学分值") str += " ";
      }
      await addCompetition({ add: str }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.$message.success("添加成功");
          this.$router.push("/student/list");
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