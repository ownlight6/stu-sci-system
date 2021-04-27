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
        <el-table-column label="审核状态" width="80">
          <template slot-scope="scope">
            <div>
              {{ checkStatus(scope.row.审核) }}
            </div>
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
        <el-table-column label="审核状态" width="80">
          <template slot-scope="scope">
            <div>
              {{ checkStatus(scope.row.审核) }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { paperList, competitionList } from "../../api/common";
export default {
  data() {
    return {
      sno: 0,
      paper: [],
      competition: [],
      activeName: "first",
      height: window.innerHeight - 200,
    };
  },
  created() {
    this.sno = localStorage.sno;
    this.paperList();
    this.competitionList();
  },
  methods: {
    //获取论文列表
    async paperList() {
      await paperList({ sno: this.sno }).then((res) => {
        let data = res.data;
        // console.log(data);
        if (data.code == 0) {
          this.paper = data.data.data;
        } else {
          this.$message.error("网络错误");
        }
      });
    },
    //获取竞赛列表
    async competitionList() {
      await competitionList({ sno: this.sno }).then((res) => {
        let data = res.data;
        // console.log(data);
        if (data.code == 0) {
          this.competition = data.data.data;
        } else {
          this.$message.error("网络错误");
        }
      });
    },
    //判断审核状态
    checkStatus(num) {
      switch (num) {
        case "0":
          return "审核中";
        case "1":
          return "已通过";
        case "2":
          return "被驳回";
      }
    },
  },
};
</script>

<style>
</style>