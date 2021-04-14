const BASIC_OPTION = {
    title: {
        text: '最近一周水果销量占比',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
        top: '10%',
        left: 'center'
    },
    series: [{
        name: '销量占比',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
        },
        label: {
            show: false,
            position: 'center',
        },
        emphasis: {
            label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
            },
        },
        labelLine: {
            show: false,
        },
        data: [],
    }, ],
};

export default BASIC_OPTION;