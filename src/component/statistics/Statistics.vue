<template>
    <div>
        <p>hello,statistics</p>
        <div style="width: 50%;height: 700px;border:1px solid rgb(180,180,180);top: 0" id="cateStat"></div>
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

    export default {
        name: "Statistics",
        components: {},
        data() {
            return {}
        },
        methods: {
            genData(count) {
                var nameList = [
                    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕',
                    '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛',
                    '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉',
                    '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康',
                    '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝',
                    '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵',
                    '席', '季', '麻', '强', '贾', '路', '娄', '危'
                ];
                var legendData = [];
                var seriesData = [];
                var selected = {};
                for (var i = 0; i < count; i++) {
                    name = "category" + i;
                    legendData.push(name);
                    seriesData.push({
                        name: name,
                        value: i + 1
                    });
                    selected[name] = i < 6;
                }

                return {
                    legendData: legendData,
                    seriesData: seriesData,
                    selected: selected
                };

                function makeWord(max, min) {
                    var nameLen = Math.ceil(Math.random() * max + min);
                    var name = [];
                    for (var i = 0; i < nameLen; i++) {
                        name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
                    }
                    return name.join('');
                }
            }

        },
        mounted: function () {
            let data = this.genData(10);

            let _option = {
                title: {
                    text: '博客分类统计',
                    subtext: '',
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

            let myChart = echarts.init(document.getElementById('cateStat'));
            // 绘制图表，this.echarts1_option是数据
            myChart.setOption(_option);
        }
    }
</script>

<style scoped>

</style>