<template>
  <div>
    <div class="container">
      <div class="form-box">
        <n-form
          :config='config'
          @submit="submit"
          ref='form'
        ></n-form>
      </div>
    </div>
  </div>
</template>

<script>
import nForm from "../components/nform";

const statusLlist = [
  { label: "未提交", value: "0" },
  { label: "待审批", value: "1" },
  { label: "已通过", value: "2", disabled: true },
];
export default {
  name: "baseForm",
  components: { nForm },
  data() {
    const confirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.$refs.form.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      config: {
        columns: [
          {
            prop: "name",
            label: "借款人名称",
            is: "auto",
            fetchSuggestions: this.querySearch,
          },
          {
            prop: "certificateId",
            label: "统一信用代码",
            rules: [{ required: true, message: "请输入统一信用代码" }],
          },
          { prop: "daterange", label: "日期范围", is: "daterange" },
          { prop: "date", label: "日期", is: "date" },
          {
            prop: "status",
            label: "状态",
            is: "select",
            list: statusLlist,
            callback: (r) => this.statusChange(r),
          },
          {
            prop: "currencyId",
            label: "币别",
            is: "select",
            Enum: { name: "currency" },
          }, //异步获取字典项
          { prop: "password", label: "密码", type: "password" },
          {
            prop: "confimPass",
            label: "确认密码",
            type: "password",
            rules: [{ validator: confirmPass }],
          },
          { prop: "remark", label: "备注", type: "textarea" },
          {
            prop: "email",
            label: "邮箱",
            rules: [
              { required: true, message: "请输入邮箱地址" },
              { type: "email", message: "请输入正确的邮箱地址" },
            ],
          },
          { prop: "remember", label: "记住密码", is: "checkbox" },
          {
            prop: "gender",
            label: "性别",
            is: "radioGroup",
            list: [
              { label: "male", value: "男" },
              { label: "famale", value: "女", disabled: true },
            ],
          },
          {
            prop: "love",
            label: "爱好",
            is: "checkboxGroup",
            list: [
              { label: "篮球", value: "0" },
              { label: "排球", value: "1" },
              { label: "足球", value: "2", disabled: true },
            ],
          },
          { prop: "delivery", label: "即时配送", is: "switch" },
        ],
        data: {},
        attrs: {
          span: 24,
        },
      },
    };
  },
  mounted() {
    const data = {
      name: "橙子",
      certificateId: "068001",
      status: "0",
      love: ["0"],
    };
    this.config.data = data;
  },
  methods: {
    querySearch(q, cb) {
      if (!q) {
        cb([]);
        return;
      }
    },
    statusChange(r) {
      console.log(r);
    },
    submit(res) {
      console.log(res);
    },
  },
};
</script>
<style lang='less' scoped>
</style>