import ResizeListener from "element-resize-detector";

export const chartMixin = {
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        window.addEventListener("resize", this.handleWindowResize);
        this.addChartResizeListener();
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
        /**
         * 当窗口缩放时，echart动态调整自身大小
         */
        handleWindowResize() {
            if (!this.chart) return;
            this.chart.resize();
        },
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleWindowResize);
    },
}