<template functional>
  <el-popover
    placement="top-start"
    width="300"
    trigger="hover"
    popper-class="popover"
    :content='props.value'
  >
    <span
      slot='reference'
      class="popover-txt"
    >{{props.value}}</span>
  </el-popover>
</template>

<script>
export default {};
</script>
<style lang='less' scoped>
.popover-txt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  cursor: pointer;
  font-size: 12px;
}
</style>