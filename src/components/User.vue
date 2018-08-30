<template>
    <v-menu offset-y>
        <v-btn flat slot="activator" >
              {{item.title}}
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, index) in item.items"
                :key="index"
                :to="item.to"
                @click="logout"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
    </v-menu>
</template>

<script>

export default {
  data () {
    return {

        items: [
            { icon: 'account_circle', title: 'Usuário', group:true, 
                items: [
                    {title: 'Sair', to: '/login', func: logout}
                ]
            }
        ]
    } 
  },
  methods: {
    logout () {
      localStorage.removeItem('user');
      localStorage.setremoveItemItem('jwt');
    }
  }
}
</script>

<style>
  .right-menu {
    float: right;
    height: 100%;
  }
  .right-menu-item {
    display: inline-block;
    margin: 0 8px;
  }
  .screenfull {
    height: 20px;
  }
</style>
