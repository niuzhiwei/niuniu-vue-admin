<template>
  <div>
    <div class="container">
      <el-tabs
        v-model="activeName"
        type="border-card"
      >
        <el-tab-pane
          v-for="n in tabArr"
          :key="n.label"
          :name='n.label'
        >
          <span slot="label"><i :class="n.icon"></i> {{n.title}} {{`(${msg[n.label].length})`}}</span>
          <component
            :key="activeName"
            is='renderTable'
            :show-header="false"
            :config='config'
            ref='rendertable'
            :border="false"
            size='mini'
          ></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import renderTable from "@/components/rendertable/rendertable.vue";
export default {
  name: "tabs",
  components: { renderTable },
  data() {
    return {
      activeName: "unread",
      tableConfig: {
        headers: [
          {
            prop: "title",
            label: "title",
            attrs: { align: "left" },
            type: "Format",
            format: (val) => this.format(val),
          },
          {
            prop: "date",
            label: "date",
            attrs: { wdith: 180, align: "center" },
          },
        ].concat(this.getActions()),
      },
      loadUnRead: () =>
        Promise.resolve({
          list: this.msg["unread"],
        }),
      loadRead: () =>
        Promise.resolve({
          list: this.msg["read"],
        }),
      loadRubbish: () =>
        Promise.resolve({
          list: this.msg["recycle"],
        }),
      msg: {
        unread: [
          {
            date: "2021-04-19 20:00:00",
            title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          },
          {
            date: "2021-04-19 21:00:00",
            title: "今晚12点整发福利，先到先得",
          },
        ],
        read: [
          {
            date: "2021-04-22 20:00:00",
            title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          },
        ],
        recycle: [
          {
            date: "2021-04-20 20:00:00",
            title: "【系统通知】系统升级完成",
          },
        ],
      },
      tabArr: [
        { icon: "el-icon-phone-outline", title: "未读消息", label: "unread" },
        { icon: "el-icon-star-off", title: "已读消息", label: "read" },
        { icon: "el-icon-delete", title: "垃圾箱", label: "recycle" },
      ],
    };
  },
  mounted() {
    this.changeMsg(this.msg.unread.length);
  },
  computed: {
    config() {
      if (this.activeName === "unread") {
        return { ...this.tableConfig, loadData: this.loadUnRead };
      } else if (this.activeName === "read") {
        return { ...this.tableConfig, loadData: this.loadRead };
      } else {
        return { ...this.tableConfig, loadData: this.loadRubbish };
      }
    },
  },
  methods: {
    ...mapMutations(["changeMsg"]),
    getActions() {
      return {
        prop: "action",
        label: "操作",
        type: "Action",
        value: [
          {
            label: "标为已读",
            click: (data, index) => {
              const item = this.msg[this.activeName].splice(index, 1);
              this.msg.read = item.concat(this.msg.read);
              this.changeMsg(this.msg.unread.length);
            },
            filter: () => this.activeName === "unread",
          },
          {
            label: "删除",
            click: (data, index) => {
              const item = this.msg[this.activeName].splice(index, 1);
              this.msg.recycle = item.concat(this.msg.recycle);
            },
            filter: () => this.activeName === "read",
          },
          {
            label: "还原",
            click: (data, index) => {
              const item = this.msg[this.activeName].splice(index, 1);
              this.msg.read = item.concat(this.msg.read);
              this.changeMsg(this.msg.unread.length);
            },
            filter: () => this.activeName === "recycle",
          },
        ],
      };
    },
    format(val) {
      let str = '<span style="color:#20a0ff">' + val + "</span>";
      return str;
    },
  },
};
</script>
<style lang='less' scoped>
</style>