<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div style="width: 80%;height: 500px;border:1px solid rgb(180,180,180);top: 0" id="cateStat"/>
            </el-col>
            <el-col :span="12">
                <div style="width: 80%;height: 500px;border:1px solid rgb(180,180,180);top: 0" id="timeStat"/>
            </el-col>
        </el-row>

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
            describeBlogByCategory() {
                let myChart = echarts.init(document.getElementById('cateStat'));
                myChart.showLoading();
                statisticsService.blogByCategory().then(resp => {
                    myChart.hideLoading();
                    let data = this.getBlogByCateData(resp);
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
            describeBlogByCreatTime() {
                let timeChart = echarts.init(document.getElementById('timeStat'));
                statisticsService.blogByCreateTime().then(resp => {
                    let data = this.groupBlogByCreateTimeData(resp);
                    let option = {
                        color: ['#3398DB'],
                        title: {
                            text: '博客分类统计',
                            subtext: '按月份分类',
                            left: 'center'
                        },
                        tooltip: {},
                        legend: {
                            orient: 'vertical',
                            right: 10,
                            top: 20,
                            bottom: 20,
                            data: ['按月份分类']
                        },
                        xAxis: {
                            data: data.xData
                        },
                        yAxis: {},
                        series: [{
                            name: '按月份分类',
                            type: 'bar',
                            data: data.yData
                        }]
                    };
                    timeChart.setOption(option);
                }, error => {
                    // do something?
                })
            },
            getBlogByCateData(resp) {
                if (!resp) return {};
                let legendData = [];
                let seriesData = [];
                let selected = {};
                resp.forEach(ele => {
                    legendData.push(ele._id);
                    seriesData.push({name: ele._id, value: ele.count});
                    let key = ele._id;
                    selected[key] = true;
                });
                return {
                    legendData: legendData,
                    seriesData: seriesData,
                    selected: selected
                };
            },
            groupBlogByCreateTimeData(resp) {
                let _xData = [];
                let _yData = [];
                if (resp) {
                    resp.forEach(ele => {
                        _xData.push(ele._id);
                        _yData.push(ele.count);
                    })
                }
                return {
                    xData: _xData,
                    yData: _yData
                }
            }
        },
        mounted: function () {
            this.describeBlogByCategory();
            this.describeBlogByCreatTime();
        }
    }
</script>

<style scoped>

</style>