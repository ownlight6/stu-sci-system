<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="论文" name="first">
      <el-table
        :data="paper"
        stripe
        border
        :height="height"
        style="width: 100%"
      >
        <el-table-column prop="ID" label="论文编号" width="100">
        </el-table-column>
        <el-table-column prop="论文名称" label="论文名称"> </el-table-column>
        <el-table-column prop="作者" label="作者" width="100">
        </el-table-column>
        <el-table-column prop="排序" label="排序" width="50"> </el-table-column>
        <el-table-column prop="刊物名称" label="刊物名称"> </el-table-column>
        <el-table-column prop="发表年月" label="发表年月" width="100">
        </el-table-column>
        <el-table-column prop="收录情况" label="收录情况" width="100">
        </el-table-column>
        <el-table-column prop="学分值" label="学分值" width="80">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="checkPaper(scope, 1)" type="text" size="small"
              >通过</el-button
            >
            <el-button @click="checkPaper(scope, 2)" type="text" size="small"
              >驳回</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="竞赛" name="second">
      <el-table
        :data="competition"
        stripe
        border
        :height="height"
        style="width: 100%"
      >
        <el-table-column prop="ID" label="竞赛编号" width="100">
        </el-table-column>
        <el-table-column prop="竞赛名称" label="竞赛名称"> </el-table-column>
        <el-table-column prop="作者" label="作者" width="100">
        </el-table-column>
        <el-table-column prop="级别" label="级别" width="50"> </el-table-column>
        <el-table-column prop="获奖" label="获奖" width="80"> </el-table-column>
        <el-table-column prop="时间" label="时间" width="100">
        </el-table-column>
        <el-table-column prop="学分值" label="学分值" width="80">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="checkCompetition(scope, 1)"
              type="text"
              size="small"
              >通过</el-button
            >
            <el-button
              @click="checkCompetition(scope, 2)"
              type="text"
              size="small"
              >驳回</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { paperList, competitionList } from "../../api/common";
import { checkPaper, checkCompetition } from "../../api/counselor";
export default {
  inject: ["reload"],
  data() {
    return {
      paper: [],
      competition: [],
      activeName: "first",
      height: window.innerHeight - 200,
    };
  },
  created() {
    this.paperList();
    this.competitionList();
  },
  methods: {
    //获取论文列表
    async paperList() {
      await paperList().then((res) => {
        let data = res.data;
        if (data.code == 0) {
          for (let i = 0; i < data.data.num; i++) {
            if (data.data.data[i].审核 == 0) {
              this.paper.push(data.data.data[i]);
            }
          }
          // console.log(this.paper);
        }
      });
    },
    //获取竞赛列表
    async competitionList() {
      await competitionList().then((res) => {
        let data = res.data;
        if (data.code == 0) {
          for (let i = 0; i < data.data.num; i++) {
            if (data.data.data[i].审核 == 0) {
              this.competition.push(data.data.data[i]);
            }
          }
          // console.log(this.competition);
        }
      });
    },
    //审核论文
    async checkPaper(scope, num) {
      await checkPaper({ id: scope.row.ID, status: num }).then((res) => {
        let data = res.data;
        console.log(data);
        if (data.code == 0) {
          if (num == 1) this.$message.success("审核通过");
          else this.$message.success("审核驳回");
          this.reload();
        } else {
          this.$message.error(data.msg + " " + data.data);
        }
      });
    },
    //审核竞赛
    async checkCompetition(scope, num) {
      await checkCompetition({ id: scope.row.ID, status: num }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          if (num == 1) this.$message.success("审核通过");
          else this.$message.success("审核驳回");
          this.reload();
        } else {
          this.$message.error(data.msg + " " + data.data);
        }
      });
    },
  },
};
</script>

<style>
</style>