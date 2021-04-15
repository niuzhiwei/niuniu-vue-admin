<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-select
          v-model="query.status"
          placeholder="当前监控状态"
          class="handle-select mr10"
        >
          <el-option
            key="1"
            label="未监控"
            value="00"
          ></el-option>
          <el-option
            key="2"
            label="监控中"
            value="01"
          ></el-option>
        </el-select>

        <el-input
          v-model="query.payeeAcctName"
          placeholder="收款账户名"
          class="handle-input mr10"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="getTableData"
        >搜索</el-button>
      </div>
      <render-table
        :config='tableConfig'
        ref='rendertable'
      ></render-table>
    </div>
    <n-dialog
      :visible="dialogVisible"
      wdith='800px'
      title='编辑'
      @close="dialogVisible=false"
      @cancel="dialogVisible=false"
      @confirm='confirmDialog'
    >
      <n-form
        :config='config'
        @submit="submit"
        ref='form'
      ></n-form>
    </n-dialog>
  </div>
</template>

<script>
import nTable from "@/components/ntable";
import breadCrumb from "@/components/breadCrumb";
import nDialog from "@/components/ndialog";
import nForm from "@/components/nform";
import renderTable from "@/components/rendertable/rendertable.vue";
import { handleComfirm } from "@/utils/confirm";
import { fetchTable } from "../api";

const statusLlist = [
  { label: "未监控", value: "00" },
  { label: "监控中", value: "01" },
];
export default {
  name: "basetable",
  components: { nTable, breadCrumb, nDialog, nForm, renderTable },
  data() {
    return {
      tableConfig: {
        headers: [
          {
            prop: "contractCode",
            label: "业务编号",
            attrs: { width: 50, align: "center" },
          },
          {
            prop: "payeeAcctName",
            label: "收款账户名",
            type: "Link",
            query: (row) => this.linkQuery(row),
            attrs: { width: 120, align: "center" },
          },
          { prop: "tradeAmt", label: "付款金额", type: "Currency" },
          {
            prop: "status",
            label: "操作状态",
            type: "Enum",
            Enum: { name: "order" },
          },
          {
            prop: "statistic",
            label: "预警统计",
            type: "Format",
            attrs: { width: 50, align: "center" },
            format: (val) => this.format(val),
          }, //自定义展示自己想要的数据格式
          { prop: "reason", label: "原因", type: "Popover" },
          {
            prop: "payTime",
            label: "付款时间",
            type: "Date",
            format: "yyyy-MM-dd hh:mm:ss",
          }, //不设置format的话，日期格式默认为yyyy/MM/dd
          {
            prop: "monitorStatus",
            label: "当前监控状态",
            type: "Enum",
            Enum: { name: "monitor" },
          },
          {
            prop: "progress",
            label: "进度",
            type: "Progress",
          },
        ].concat(this.getActions()),
        //通过接口获取列表数据 - 这里的参数p就是子组件传过来的包含分页的参数
        loadData: (p) => {
          return fetchTable({ ...this.query, ...p });
        },
        hasCheckbox: true,
        selectable: this.selectable,
        reserveSelection: false,
        rowKey: (row) => row.id,
      },
      status: "01",
      permission: ["handle", "pass", "refuse", "reApply", "export"],
      query: {
        status: "01",
        payeeAcctName: "",
      },
      dialogVisible: false,
      config: {
        columns: [
          {
            prop: "payeeAcctName",
            label: "收款账户名",
            rules: [{ required: true, message: "请输入收款账户名" }],
          },
          {
            prop: "monitorStatus",
            label: "当前监控状态",
            is: "select",
            list: statusLlist,
            callback: (r) => this.statusChange(r),
          },
        ],
        data: {},
        footer: false,
        attrs: {
          span: 24,
        },
      },
      idx: null,
    };
  },
  computed: {
    handle() {
      return this.permission.some((n) => n == "handle");
    },
    pass() {
      return this.permission.some((n) => n == "pass");
    },
    reject() {
      return this.permission.some((n) => n == "reject");
    },
    refuse() {
      return this.permission.some((n) => n == "refuse");
    },
  },
  methods: {
    getTableData() {
      this.$refs.rendertable.reload();
    },
    getActions() {
      return {
        prop: "action",
        label: "操作",
        type: "Action",
        value: [
          {
            label: "查看",
            click: (data, index) => {
              this.dialogVisible = true;
              this.config.data = data;
              this.idx = index;
            },
          },
          {
            label: "办理",
            click: (data) => {},
            filter: ({ status }) => status == "CREATED" && this.handle,
          },
          {
            label: "通过",
            click: (data) => {},
            filter: ({ status }) => status == "PASS" && this.pass,
          },
          {
            label: "驳回",
            click: (data) => {},
            filter: ({ status }) => status == "REJECT" && this.reject,
          },
          {
            label: "拒绝",
            click: (data) => {},
            filter: ({ status }) => status == "CREATED" && this.refuse,
          },
        ],
      };
    },
    linkQuery(row) {
      return {
        path: "/otherElTable", // 路由path
        payload: {
          id: row.id,
          type: "link",
        },
      };
    },
    format(val) {
      let str = "";
      val.forEach((t) => {
        str += '<div style="margin-right:5px;color:#bbb">' + t.total + "</div>";
      });
      return str;
    },
    selectable({ status }) {
      return status === "REFUSE" ? false : true;
    },
    delAllSelection() {
      const mulSelection = this.$refs.rendertable.getChecked();
      const tableData = this.$refs.rendertable.cfg.data;
      if (mulSelection.length === 0) {
        return;
      }
      handleComfirm("确定删除所选内容吗？", "warning")
        .then(() => {
          mulSelection.forEach((item) => {
            this.removeArr(tableData, item);
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    statusChange(r) {
      console.log(r);
    },
    submit(res) {
      console.log(res);
    },
    confirmDialog() {
      const data = this.$refs.rendertable.cfg.data;
      this.$set(data, this.idx, { ...data[this.idx], ...this.$refs.form.form });
      this.dialogVisible = false;
    },
    removeArr(arr, obj) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === obj.id) {
          arr.splice(i, 1);
        }
      }
    },
  },
};
</script>
<style lang='less' scoped >
.handle-box {
  margin-bottom: 20px;
  .handle-select {
    width: 120px;
  }
  .handle-input {
    display: inline-block;
    width: 320px;
  }
}
</style>
<style lang='less' >
.table-header {
  background-color: #f5f7fa !important;
}
</style>