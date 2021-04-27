<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="login-form"
          label-position="left"
          @key.enter.native="handleLogin()"
        >
          <div class="title">hello !</div>
          <div class="title-tips">{{ title }}</div>
          <el-form-item style="margin-top: 40px" prop="username">
            <span class="svg-container svg-container-admin">
              <span class="iconfont wb-user"></span>
            </span>
            <el-input
              v-model.trim="form.username"
              v-focus
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <span class="iconfont wb-unlock"></span>
            </span>
            <el-input
              show-password
              :key="passwordType"
              ref="password"
              v-model.trim="form.password"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-password"
              @click="handlePassword"
            ></span>
            <span v-else class="show-password" @click="handlePassword">
              <span style="iconfont wb-unlock"></span>
            </span>
          </el-form-item>
          <el-form-item style="display: flex">
            <el-button :loading="loading" type="primary" @click="handleLogin">
              登录
            </el-button>
            <el-button type="info" @click="reseLoginForm">重新输入</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isPassword } from "../../untils/validate";
import { login } from "../../api/student";

export default {
  name: "login",
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    const validateusername = (rule, value, callback) => {
      if ("" == value) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      title: "大学生课外科技活动成果管理系统",
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateusername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      timeHello: "",
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || "/";
      },
      immediate: true,
    },
  },
  created() {
    document.body.style.overflow = "hidden";
    this.getDate();
  },
  beforeDestroy() {
    document.body.style.overflow = "auto";
  },
  mounted() {
    this.form.username = "";
    this.form.password = "";
  },
  methods: {
    handlePassword() {
      this.passwordType === "password"
        ? (this.passwordType = "")
        : (this.passwordType = "password");
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    async handleLogin() {
      if (this.form.username == "admin") {
        localStorage.sno = this.form.username;
        localStorage.name = this.form.username;
        this.$router.push("/counselor");
        return;
      }
      if (this.form.username && this.form.password) {
        this.loading = true;
        await login(this.form)
          .then((res) => {
            let data = res.data;
            console.log(data);
            if (data.code == 0) {
              localStorage.sno = this.form.username;
              localStorage.name = data.data;
              this.$notify({
                title: `${this.timeHello}`,
                message: `${localStorage.name}`,
                type: "success",
                duration: 3000,
                offset: 60,
              });
              this.$router.push("/student");
              this.loading = false;
            } else {
              this.$message.error(data.msg + " " + data.data);
              this.loading = false;
            }
          })
          .catch((err) => {
            this.loading = false;
            this.$message.error("网络错误！");
          });
      } else {
        this.loading = false;
        this.$message.error("请填写账号密码！");
      }
    },
    reseLoginForm() {
      this.$refs.form.resetFields();
    },
    getDate() {
      let date = new Date().getHours();
      if (date >= 6 && date <= 8) {
        this.timeHello = "早上好！";
      } else if (date > 8 && date < 12) {
        this.timeHello = "上午好！";
      } else if (date >= 12 && date <= 14) {
        this.timeHello = "中午好！";
      } else if (date > 14 && date < 19) {
        this.timeHello = "下午好！";
      } else if (date >= 19 && date < 24) {
        this.timeHello = "晚上好！";
      } else {
        this.timeHello = "夜深了，要早点休息哟 ~";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url("../../static/img/bg.jpg") center center fixed no-repeat;
  background-size: cover;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: rgba(14, 18, 26, 1);
  }

  .title-tips {
    margin-top: 29px;
    font-size: 23px;
    font-weight: 400;
    color: rgba(14, 18, 26, 1);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 425px) / 2) 10% 10%;
    overflow: hidden;
    padding: 20px;
    background-color: #f1f1f1aa;
    border-radius: 10px;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #fff;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: #1890ff;
      text-align: center;
    }
  }

  .svg-container {
    position: absolute;
    top: 14px;
    left: 15px;
    z-index: 999;
    font-size: 20px;
    // color: #d7dee3;
    color: #000;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    top: 14px;
    right: 25px;
    font-size: 20px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: 32px;
        line-height: 32px;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: 12px;
        line-height: 18px;
        color: #ff4d4f;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 58px;
        padding-left: 45px;
        font-size: 14px;
        line-height: 58px;
        color: #606266;
        background: #f6f4fc;
        border: 0;
        caret-color: #606266;
      }
    }
  }
}
</style>
