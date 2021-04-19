<template>
  <div>
    <div class="container">
      <switch-roles @changeRoles='changeRoles'></switch-roles>
    </div>
  </div>
</template>

<script>
import SwitchRoles from "@/components/SwitchRoles.vue";
export default {
  components: { SwitchRoles },
  methods: {
    changeRoles() {
      location.reload();
    },
  },
};
</script>
<style lang='less' scoped>
</style>