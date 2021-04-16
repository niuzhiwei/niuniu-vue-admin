<template>
  <div>
    <div class="container">
      <div class="plugins-tips">
        Element UI自带上传组件。
        访问地址：<a
          href="https://element.eleme.cn/#/zh-CN/component/upload"
          target="_blank"
        >Element UI Upload</a>
      </div>
      <div class="content-title">
        拖拽上传
      </div>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div
          class="el-upload__tip"
          slot="tip"
        >只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="content-title">
        图片列表缩略图
      </div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button
          size="small"
          type="primary"
        >点击上传</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        >只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>
<style lang='less' scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.upload-demo {
  width: 50%;
}
</style>