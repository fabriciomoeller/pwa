<template>
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
                <slot></slot>  
            </figure>
        </v-card-media>
        </v-card>
    </v-flex>
</template>

<script>
export default {
  computed: {
    imageHeight () {
      let size = this.expandCar ? 12 : this.point;

      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'xs12'
        case 'sm': return 'sm12'
        case 'md': return 'md'+size
        case 'lg': return 'lg'+size
        case 'xl': return 'xl'+size
      }
    }
  },
  props: {
    title: {
      type: String,
      default: 'title'
    },
    point: {
      type: Number,
      default: 6  
    }

  },
  data () {
    return {
      expandCar: false
    }
  } 
}
</script>

<style scoped>

.toolbarCar {
    height: 45px;
}

figure {
  width: 100%;
  margin: 0.0em auto;
}


@media (max-width: 480px) {
  figure {
    width: 100%;
    margin: 0em auto;
  }

}
</style>