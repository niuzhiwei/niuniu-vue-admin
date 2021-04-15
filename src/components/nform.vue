<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-position="right"
  >
    <el-row :gutter="20">
      <el-col
        v-bind="attrs"
        v-for="(x, idx) in columns"
        :key="idx"
      >
        <el-form-item
          :label="x.label"
          :prop="x.prop"
        >
          <component
            v-model.trim="form[x.prop]"
            v-bind="componentAttrs(x)"
            class="width100"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col v-bind="attrs">
        <div
          class="searchBtn"
          v-if="footer"
        >
          <el-button
            class="filter-item"
            @click="reset"
          >重置</el-button>
          <el-button
            class="filter-item"
            type="primary"
            @click="submit"
          >提交</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { identity } from "lodash";
export default {
  props: {
    config: Object,
  },
  components: {
    selectBar: {
      functional: true,
      props: { value: String, list: Array, callback: Function }, //callback为传过来的回调函数，可以方便在切换时处理一些业务逻辑
      render(
        h,
        {
          props: { value = "", list = [], callback = identity },
          data: { attrs = {} },
          listeners: { input = identity },
        }
      ) {
        //identity是lodash回调函数的默认值
        return h(
          "el-select",
          {
            class: "width100",
            props: { value, ...attrs },
            on: {
              change(v) {
                input(v);
                callback(v);
              },
            },
          },
          list.map((o) => h("el-option", { props: { ...o, key: o.value } }))
        ); //key为vue循环时的必须
      },
    },
    checkbox: {
      functional: true,
      props: { value: Boolean, label: String },
      render(
        h,
        {
          props: { value = "", label = "" },
          data: { attrs = {} },
          listeners: { input = identity },
        }
      ) {
        return h(
          "el-checkbox",
          {
            props: { value, ...attrs },
            on: {
              change(v) {
                input(v);
              },
            },
          },
          label
        );
      },
    },
    checkboxGroup: {
      functional: true,
      props: { value: Array, list: Array },
      render(
        h,
        {
          props: { value = [], list = [] },
          data: { attrs = {} },
          listeners: { input = identity },
        }
      ) {
        //像el-checkbox-group和el-radio-group这种组合级别的组件在绑定选中事件时不能像el-select组件（el-select组件是这样触发的on: {change(v) {input(v)}}）那样使用change，只能使用类似el-input组件的input方法来触发选中
        return h(
          "el-checkbox-group",
          {
            props: { value, ...attrs },
            on: {
              input(v) {
                input(v);
              },
            },
          },
          list.map((o) =>
            h(
              "el-checkbox",
              { props: { ...o, label: o.value, key: o.value } },
              [o.label]
            )
          )
        );
      },
    },
    radioGroup: {
      functional: true,
      props: { value: String, list: Array },
      render(
        h,
        {
          props: { value = "", list = [] },
          data: { attrs = {} },
          listeners: { input = identity },
        }
      ) {
        return h(
          "el-radio-group",
          {
            props: { value, ...attrs },
            on: {
              input(v) {
                input(v);
              },
            },
          },
          list.map((o) =>
            h("el-radio", { props: { ...o, key: o.label } }, [o.value])
          )
        );
      },
    },
  },
  watch: {
    config: {
      handler: function (val) {
        this.form = this.renderForm();
      },
      deep: true,
    },
  },
  data() {
    const { columns = [], data = {} } = this.config || {};
    return {
      TYPE: {
        select: {
          is: "selectBar",
          clearable: true,
        },
        text: {
          is: "el-input",
          clearable: true,
        },
        switch: {
          is: "el-switch",
        },
        checkbox: {
          is: "checkbox",
          clearable: true,
        },
        checkboxGroup: {
          is: "checkboxGroup",
          clearable: true,
        },
        radioGroup: {
          is: "radioGroup",
          clearable: true,
        },
        daterange: {
          is: "el-date-picker",
          type: "daterange",
          valueFormat: "yyyy-MM-dd",
          rangeSeparator: "至",
          startPlaceholder: "开始日期",
          endPlaceholder: "结束日期",
          editable: false, //文本框是否可输入，默认为true可输入
        },
        date: {
          is: "el-date-picker",
          type: "date",
          valueFormat: "yyyy-MM-dd",
          editable: false,
        },
        auto: {
          is: "el-autocomplete",
        },
      },
      attributes: {
        lg: 6,
        md: 8,
        xs: 24,
      },
      form: this.renderForm(),
      // form: columns.reduce(
      //   (r, c) =>
      //     Object.assign(r, {
      //       [c.prop]:
      //         data && data[c.prop]
      //           ? data[c.prop]
      //           : c.is == "checkboxGroup"
      //           ? []
      //           : null,
      //     }),
      //   {}
      // ),
      rules: columns.reduce(
        (r, c) => ({ ...r, [c.prop]: c.rules ? c.rules : [] }),
        {}
      ),
      columns,
    };
  },
  computed: {
    attrs() {
      const { attrs = this.attributes } = this.config || {};
      return attrs;
    },
    footer() {
      const { footer = true } = this.config || {};
      return footer;
    },
  },
  mounted() {
    this.reset();
  },
  methods: {
    renderForm() {
      const { columns = [], data = {} } = this.config || {};
      return columns.reduce(
        (r, c) =>
          Object.assign(r, {
            [c.prop]:
              data && data[c.prop]
                ? data[c.prop]
                : c.is == "checkboxGroup"
                ? []
                : null,
          }),
        {}
      );
    },
    componentAttrs(item) {
      const { is = "text", label } = item,
        attrs = Object.fromEntries(
          Object.entries(item).filter((n) => !/^(prop|is|rules)/.test(n[0]))
        ),
        placeholder =
          (/^(select|el-date-picker)/.test(is) ? "选择" : "输入/搜索") + label;
      return { ...attrs, ...this.TYPE[is], placeholder };
    },
    reset() {
      this.$refs.form.resetFields();
    },
    /*
     * 这里区分了两种情况(footer默认为true，代表默认会展示封装的form组件所自带的查询、重置按钮)：
     * 1、不使用封装的form组件中自带的查询、重置按钮，则需要使用回调的方式获取form表单的值
     * 2、使用封装的form组件中自带的查询、重置按钮，则需要在使用时通过父组件向封装的form子组件传一个函数submit来获取form表单的值
     */
    submit(cb = noop) {
      // 第一种情况
      !this.footer &&
        this.$refs.form.validate((valid) => valid && cb(this.form));
      // 第二种情况
      this.footer &&
        this.$refs.form.validate(
          (valid) => valid && this.$emit("submit", this.form)
        );
    },
  },
};
</script>
<style scoped>
.width100 {
  width: 100%;
}
</style>