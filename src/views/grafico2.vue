<template>
  <v-container fluid fill-height>
      <v-layout row wrap>
        <v-flex :class="imageHeight">
          <v-card>
            <v-toolbar card prominent class="toolbarCar">
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-btn icon @click.stop="expandCar = !expandCar">
                <svg id="expand" style="width:15px;height:15px" viewBox="0 0 24 24">
                  <path d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"></path>
                </svg>  
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-media>
              <figure>
                <chart :options="barLine" auto-resize></chart>
              </figure>
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<style scoped>

.toolbarCar {
    height: 45px;
}

figure {
  width: 100%;
  margin: 0.0em auto;
}

figure .echarts {
  width: 100%;
  height: 60vmin;
}

@media (max-width: 480px) {
  figure {
    width: 100%;
    margin: 0em auto;
  }

  figure .echarts {
    width: 100%;
    height: 100vmin;
  }
}
</style>

<script>
import ECharts from 'vue-echarts/components/ECharts'

// import ECharts modules manually to reduce bundle size
import 'echarts'

export default {
  components: {
    chart: ECharts
  },  
  mounted () {
    console.log(this.$vuetify.breakpoint)
  },
  computed: {
    imageHeight () {
      let size = this.expandCar ? 12 : 12;

      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'xs12'
        case 'sm': return 'sm12'
        case 'md': return 'md'+size
        case 'lg': return 'lg'+size
        case 'xl': return 'xl'+size
      }
    }
  },
  data: function () {
    let xData = []

    for (let i = 1; i < 13; i++) {
      xData.push(i + 'month')
    }

    return {
      expandCar: false,
      title: 'Comparativo de Vendas por Genero',
      barLine: {
        toolbox: {
          show : true,
          feature : {
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        backgroundColor: '#344b58',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 110,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '3%',
          textStyle: {
            color: '#90979c'
          },
          data: ['feminino', 'masculino', 'média']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 20,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: 'feminino',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 55,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            709,
            1917,
            2455,
            2610,
            1719,
            1433,
            1544,
            3285,
            5208,
            3372,
            2484,
            4078
          ]
        },

        {
          name: 'masculino',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            327,
            1776,
            507,
            1200,
            800,
            482,
            204,
            1390,
            1001,
            951,
            381,
            220
          ]
        }, {
          name: 'média',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            1036,
            3693,
            2962,
            3810,
            2519,
            1915,
            1748,
            4675,
            6209,
            4323,
            2865,
            4298
          ]
        }
        ]
      }
    }
  }
}
</script>