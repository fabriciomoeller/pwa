<template>
  <v-app id="sandbox" :dark="dark">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <template v-for="itemList in items">
          <template v-if="itemList.group">
            <v-list-group
              v-for="item in [itemList]"
              v-model="item.active"
              :key="item.title"
              :prepend-icon="item.icon"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                router
                :to="subItem.to"
                v-for="subItem in item.items"
                :key="subItem.title"
                @click="subItem.to"
              >
                <v-list-tile-content>
                  <v-list-tile-title> {{ subItem.title }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            </v-list-group>
          </template>
          <template v-else>
            <v-list-tile
              router
              :to="item.to"
              v-for="item in [itemList]"
              :key="item.title"
            >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> {{ item.title }} </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch primary label="Dark" v-model="dark"></v-switch>
      <template v-for="(item,key) in items">
        <v-btn flat :key=key :to="item.to" v-show="!item.group" class="hidden-sm-and-down">{{item.title}}</v-btn>
        <v-menu offset-y :key=key v-show="item.group">
          <v-btn flat slot="activator" >
            {{item.title}}
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, index) in item.items"
              :key="index"
              :to="item.to"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>
      <v-menu offset-y>
        <v-btn flat slot="activator" >
              {{users[0].title}}
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, index) in users[0].items"
            :key="index"
            :to="item.to"
            @click="logout"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <screenfull class="screenfull"/>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Screenfull from '@/components/Screenfull'
export default {
  name: 'App',
  components: {
    Screenfull,
  },
  data () {
    return {
      dark: false,
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Temas',
      items: [
        { icon: 'home', title: 'Home', to: '/', group:false },
          { icon: 'credit_card', title: 'Cad. Cliente', to: '/form', group:false },
          { icon: 'reorder', title: 'Dados do Cliente', to: '/grid', group:false },
          { icon: 'table_chart', title: 'Crud', to: '/crud', group:false },
          { icon: 'insert_chart', 
            title: 'Gráficos', 
             group:true,
            items: [
              {title: 'Gráfico Polar', to: '/grafico'},
              {title: 'Gráfico Barras', to: '/grafico2'},
              {title: 'Gráfico 03', to: '/grafico3'}
            ] 
          },
         // { icon: 'insert_chart', title: 'Resize', to: '/resize' },
          { icon: 'account_circle', title: 'Login', to: '/login',  group:false }
      ],
      users: [
        { icon: 'account_circle', title: 'Usuário', group:true, 
            items: [
                {title: 'Sair', to: '/login' }
            ]
        }
        ]
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
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
