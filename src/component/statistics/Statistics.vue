<template>
    <div>
        <h2>Statistics</h2>
        <div style="width: 40%;height: 500px;border:1px solid rgb(180,180,180);top: 0" id="cateStat"></div>
        <div style="width: 40%;height: 500px;border:1px solid rgb(180,180,180);top: 0" id="timeStat"></div>
    </div>
</template>

<script>
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    import {StatisticsService} from "../../_services/statistics.service";

    let statisticsService = new StatisticsService();

    export default {
        name: "Statistics",
        components: {},
        data() {
            return {}
        },
        methods: {
            describeBlogByCategory: () => {
                let myChart = echarts.init(document.getElementById('cateStat'));

                statisticsService.blogByCategory().then(data => {
                    let _option = {
                        title: {
                            text: '博客分类统计',
                            subtext: '按类型分类',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            type: 'scroll',
                            orient: 'vertical',
                            right: 10,
                            top: 20,
                            bottom: 20,
                            data: data.legendData,
                            selected: data.selected
                        },
                        series: [
                            {
                                name: 'blogStat',
                                type: 'pie',
                                radius: '55%',
                                center: ['40%', '50%'],
                                data: data.seriesData,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    // 绘制图表，this.echarts1_option是数据
                    myChart.hideLoading();
                    myChart.setOption(_option);
                }, error => {

                });
            },
            describeBlogByCreatTime:()=>{

            }
        },
        mounted: function () {
            this.describeBlogByCategory();
        }
    }
</script>

<style scoped>

</style>