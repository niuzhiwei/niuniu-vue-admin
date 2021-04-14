import ResizeListener from "element-resize-detector";

export const mixin = {
    data() {
        return {
            chart: null,
        }
    },
    methods: {
        /**
         * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
         */
        addChartResizeListener() {
            const instance = ResizeListener({
                strategy: "scroll",
                callOnAdd: true,
            });

            instance.listenTo(this.$el, () => {
                if (!this.chart) return;
                this.chart.resize();
            });
        },
    }
}