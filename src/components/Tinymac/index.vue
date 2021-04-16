<template>
  <div
    :class="{fullscreen:fullscreen}"
    class="tinymce-container"
    :style="{width:containerWidth}"
  >
    <textarea
      :id="tinymceId"
      class="tinymce-textarea"
    ></textarea>
  </div>
</template>

<script>
import load from "./loadScript";
import plugins from "./plugins";
import toolbar from "./toolbar";
const tinymceCDN =
  "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";

export default {
  name: "Tinymce",
  props: {
    id: {
      type: String,
      default: () =>
        "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""),
    },
    value: {
      type: String,
      default: "",
    },
    toolbar: {
      type: Array,
      default: () => [],
    },
    menubar: {
      type: String,
      default: "file edit insert view format table",
    },
    height: {
      type: [Number, String],
      default: 360,
    },
    width: {
      type: [Number, String],
      default: "auto",
    },
  },
  data() {
    return {
      tinymceId: this.id,
      hasInit: false,
      hasChange: false,
      fullscreen: false,
      languageTypeList: {
        en: "en",
        zh: "zh_CN",
        es: "es_MX",
        ja: "ja",
      },
    };
  },
  computed: {
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        return `${width}px`;
      }
      return width;
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => {
          window.tinymce.get(this.tinymceId).setContent(val || "");
        });
      }
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    init() {
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.err(err.message);
          return;
        }
        this.initTinymce();
      });
    },
    initTinymce() {
      const self = this;
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList["en"],
        theme: "modern",
        height: this.height,
        body_class: "panel-body",
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins,
        file_picker_types: "file image media",
        paste_data_images: true,
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: (editor) => {
          if (self.value) {
            editor.setContent(self.value);
          }
          self.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", (e) => {
            this.fullscreen = e.state;
          });
        },
      });
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }
      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
  },
};
</script>
<style lang='less' scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
  .mce-fullscreen {
    z-index: 100000;
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
}
</style>