<template>
  <div class="container">
    <div class="plugins-tips">
      TinyMCE is the world's most advanced open source core rich text editor.<br />
      访问地址: <a href="https://github.com/tinymce/tinymce-vue">tinymce-vue</a>
    </div>
    <div class="tinymac-container">
      <Tinymce value='hello'></Tinymce>
    </div>
  </div>
</template>

<script>
import Tinymce from "../components/Tinymac/index";
export default {
  name: "VueEditor",
  components: { Tinymce },
  methods: {},
};
</script>
<style lang='less' scoped>
</style>