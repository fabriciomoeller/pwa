<template>
  <v-container fluid fill-height>
      <v-layout row wrap>
        <v-flex xs12 md12>
          <v-card>
            <v-toolbar card prominent >
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-btn icon>
                <svg id="expand" style="width:15px;height:15px" viewBox="0 0 24 24">
                  <path d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"></path>
                </svg>  
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_horiz</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-media>
              <figure>
                <chart :options="polar" auto-resize></chart>
              </figure>
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<style scoped>

figure {
  width: 90%;
  margin: 1.5em auto;
}

figure .echarts {
  width: 100%;
  height: 60vmin;
}

@media (max-width: 980px) {
  figure {
    width: 90%;
    margin: 1em auto;
  }

  figure .echarts {
    width: 100%;
    height: 50vmin;
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
  data: function () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      title: 'Gráfico Polar',
      polar: {
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    }
  }
}
</script>

