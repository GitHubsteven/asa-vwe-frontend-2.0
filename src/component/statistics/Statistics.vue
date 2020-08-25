<template>
    <div>
        <p>hello,statistics</p>
        <div style="width: 100%;height: 700px;border:1px solid rgb(180,180,180);top: 0" id="echartss"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: "Statistics",
        components: {},
        data() {
            return {
                echarts1_option: {
                    title: {
                        text: '基本信息',
                        subtext: '虚假数据'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    color: ['rgba(31,13,230,0.95)', '#ff475d', '#49ef18', '#efeb23'],
                    legend: [
                        {
                            data: ['学历层次', '职业技能'],
                        },
                        {
                            top: 20,
                            data: ['业绩成果', '专业经历'],
                        }

                    ],
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {
                                show: true, readOnly: true,
                                optionToContent: function (opt) {
                                    let axisData = opt.xAxis[0].data; //坐标数据
                                    let series = opt.series; //折线图数据
                                    let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
                                    let tdBodys = ''; //数据
                                    series.forEach(function (item) {
                                        //组装表头
                                        tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
                                    });
                                    let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
                                    for (let i = 0, l = axisData.length; i < l; i++) {
                                        for (let j = 0; j < series.length; j++) {
                                            //组装表数据
                                            tdBodys += `<td>${series[j].data[i]}</td>`;
                                        }
                                        table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
                                        tdBodys = '';
                                    }
                                    table += '</tbody></table>';
                                    return table;
                                }
                            },
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '学历层次',
                            type: 'bar',
                            stack: '个人信息',
                            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '职业技能',
                            type: 'bar',
                            stack: '个人信息',
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                            markPoint: {
                                data: [
                                    {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                                    {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '业绩成果',
                            type: 'bar',
                            stack: '个人信息',
                            data: [2.0, 6.0, 7.0, 20.4, 21.7, 60.7, 135.6, 152.2, 56.7, 15.8, 7.0, 2.3],
                            markPoint: {
                                data: [
                                    {name: '年最高', value: 152.2, xAxis: 7, yAxis: 153},
                                    {name: '年最低', value: 2.0, xAxis: 1, yAxis: 2}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '专业经历',
                            type: 'bar',
                            stack: '个人信息',
                            data: [1.0, 6.9, 9.0, 36.4, 48.7, 90.7, 100.6, 122.2, 40.7, 8.8, 6.0, 2.3],
                            markPoint: {
                                data: [
                                    {name: '年最高', value: 122.2, xAxis: 7, yAxis: 123},
                                    {name: '年最低', value: 1.0, xAxis: 1, yAxis: 1}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                },
            }
        },
        mounted: function () {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('echartss'));
            // 绘制图表，this.echarts1_option是数据
            myChart.setOption(this.echarts1_option);
        }
    }
</script>

<style scoped>

</style>