<template>
  <el-container class="homeContainer">
    <el-header height="52px" class="header">
      <div class="headerlogo">
        <img src="../static/img/logo.png" @click="reload()" />
        <div class="title" v-if="!isCollapse">
          大学生课外科技活动成果管理系统
        </div>
      </div>
      <div class="user">
        <span
          class="iconfont wb-collapse collapse"
          @click="setCollapse()"
        ></span>
        <span class="iconfont wb-refresh refresh" @click="reload()"></span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link username iconfont wb-user">
            {{ username }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          router
          :collapse="isCollapse"
          background-color="#fff"
          text-color="#515a63"
          active-text-color="#009588"
          :default-active="$route.path"
          :unique-opened="true"
        >
          <el-menu-item index="/student/add" v-if="username != 'admin'">
            <i class="el-icon-menu"></i>
            <span slot="title" class="title">添加成果</span>
          </el-menu-item>
          <el-menu-item index="/student/list" v-if="username != 'admin'">
            <i class="el-icon-document"></i>
            <span slot="title" class="title">成果列表</span>
          </el-menu-item>
          <el-menu-item index="/counselor/add" v-if="username == 'admin'">
            <i class="el-icon-menu"></i>
            <span slot="title" class="title">添加属性</span>
          </el-menu-item>
          <el-menu-item index="/counselor/check" v-if="username == 'admin'">
            <i class="el-icon-check"></i>
            <span slot="title" class="title">成果审核</span>
          </el-menu-item>
          <el-menu-item index="/counselor/list" v-if="username == 'admin'">
            <i class="el-icon-document"></i>
            <span slot="title" class="title">成果列表</span>
          </el-menu-item>
          <el-menu-item index="/counselor/sort" v-if="username == 'admin'">
            <i class="el-icon-document"></i>
            <span slot="title" class="title">成果排序</span>
          </el-menu-item>
          <el-menu-item index="/counselor/stu" v-if="username == 'admin'">
            <i class="el-icon-user"></i>
            <span slot="title" class="title">学生列表</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-setting"></i>
            <span slot="title" class="title">关于</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view :key="$route.path" v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      username: "",
      isRouterAlive: true,
      isCollapse: false,
    };
  },
  created() {
    this.username = localStorage.name;
  },
  methods: {
    reload() {
      (this.isRouterAlive = false),
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
    },
    setCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleCommand(command) {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          localStorage.clear();
          this.$router.push("/");
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.homeContainer {
  height: 100vh;
  overflow: hidden;
  user-select: none;
  .header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    height: 52px;
    color: rgba(0, 0, 0, 0.65);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .headerlogo {
      margin-right: 40px;
      display: flex;
      align-items: center;
      img {
        cursor: pointer;
        height: 45px;
      }
      .title {
        font-size: 30px;
        margin-left: 20px;
        font-family: "楷体";
      }
    }
    .user {
      font-size: 20px;
      display: inline-flex;
      align-items: center;
      margin-right: 20px;
      .refresh,
      .collapse {
        cursor: pointer;
        margin-right: 5px;
        transition: 0.2s ease-in-out;
      }
      .refresh:hover,
      .collapse:hover {
        color: #6498fe;
      }
      .username {
        cursor: pointer;
        font-size: 18px;
        color: #697fa4;
      }
    }
  }
  .footer {
    margin-top: 50px;
    text-align: center;
    color: #000;
    padding-bottom: 50px;
    padding-top: 30px;
    border-top: 3px solid rgb(243, 244, 245);
  }
}
.el-aside {
  background-color: rgb(243, 244, 245);
  color: #e9eff3;
  text-align: left;
  line-height: 80px;
  letter-spacing: 1.2px;
  padding-top: 10px;
}
.el-aside > i {
  width: 100%;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.el-aside > i:hover {
  font-size: 18px;
  transition: 0.2s ease-in-out;
  padding: 20px;
}
.el-main {
  height: 100% !important;
  // overflow-y: scroll;
  padding-top: 20px;
  border: 20px solid rgb(243, 244, 245);
}
.el-menu {
  border-right: none;
  margin-top: 10px;
  .el-menu-item {
    height: 45px;
    line-height: 45px;
    font-size: 12px;
  }
  .is-active {
    color: #6498fe !important;
  }
  .title {
    font-size: 14px;
  }
}
</style>
