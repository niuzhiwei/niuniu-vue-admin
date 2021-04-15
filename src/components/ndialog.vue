<template>
  <el-dialog
    :visible.sync="visibleDialog"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="$_handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="$_handleConfirm"
      >{{confirmButtonText}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "nDialog",
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    confirmButtonText: {
      type: String,
      default: "确 定",
    },
  },
  computed: {
    visibleDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  methods: {
    $_handleCancel() {
      this.$emit("cancel");
    },
    $_handleConfirm() {
      this.$emit("confirm");
    },
  },
};
</script>
<style lang='less' scoped>
</style>