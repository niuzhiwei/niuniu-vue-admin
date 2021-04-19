<template>
  <div>
    <div class="roles">我当前的权限:{{roles}}</div>
    <div class="rflex">
      <p>切换权限：</p>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="editor"></el-radio-button>
        <el-radio-button label="admin"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["roles"]),
    switchRoles: {
      get() {
        return this.roles[0];
      },
      set(val) {
        this.changeRoles(val).then(() => {
          this.$emit("changeRoles");
        });
      },
    },
  },
  methods: {
    ...mapActions(["changeRoles"]),
  },
};
</script>
<style lang='less' scoped>
.rflex {
  align-items: center;
  margin: 16px 0;
}
</style>