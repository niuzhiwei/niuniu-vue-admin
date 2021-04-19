<template>
  <div>
    <div class="container">
      <switch-roles @changeRoles='changeRoles'></switch-roles>
      <div
        class="cflex"
        :key="key"
      >
        <span
          class="role-btn"
          v-permission="['admin']"
        >
          只有admin可见： <el-button type="success">Admin</el-button>
        </span>
        <span
          class="role-btn"
          v-permission="['editor']"
        >
          只有editor可见： <el-button type="info">Admin</el-button>
        </span>
        <span
          class="role-btn"
          v-permission="['admin','editor']"
        >
          admin、editor角色都可见： <el-button type="primary">我是Admin、Editor角色都可见</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchRoles from "@/components/SwitchRoles.vue";
export default {
  components: { SwitchRoles },
  data() {
    return { key: 0 };
  },
  methods: {
    changeRoles() {
      this.key += 1;
    },
  },
};
</script>
<style lang='less' scoped>
.cflex {
  .role-btn {
    margin: 8px 0;
  }
}
</style>