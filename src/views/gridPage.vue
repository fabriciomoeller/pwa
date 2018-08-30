<template>
  <v-layout align-center justify-center >
    <v-flex xs12 sm12 md12 lg12>
      <v-card>
        <h2>{{teste}}</h2>
        <input v-model="teste" placeholder="Me edite" style="width:300px">
        <button v-on:click="update">Atualiza Dados</button>
        <router-link to="/form">
          <v-btn block color="success" >Insere Usuário</v-btn>
        </router-link>
        <v-data-table
            v-bind:headers="headers"
            :items="items"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.first_name }}</td>
            <td class="text-xs-left">{{ props.item.last_name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.username }}</td>
            <td class="text-xs-left">{{ props.item.password }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout> 
</template>

<script>

  export default {
    data () {
      return {
        teste: 'TESTE DE TABELA POR PARÂMETRO',
        headers: [
          {
            text: 'First Name',
            align: 'left',
            sortable: true,
            value: 'first_name'
          },
          {
            text: 'Last Name',
            align: 'left',
            sortable: true,
            value: 'last_name'
          },
          {
            text: 'Email',
            align: 'left',
            sortable: true,
            value: 'email'
          },
          {
            text: 'User',
            align: 'left',
            sortable: true,
            value: 'username'
          },
          {
            text: 'Password',
            align: 'left',
            sortable: true,
            value: 'password'
          }
        ],
        items: [{first_name: 'Teste', last_name: 'Moeller', email: 'fabriciomoeller@gmail.com'}]
      }
    },
    mounted () {
      this.axios.get('http://localhost:3010/list')
        .then(response => {
          this.items = response.data
          console.log(response)
        })
    },
    methods: {
      update: function () {
        console.log('Passou aqui')
        this.axios.get('http://locahost:3010/list')
          .then(response => {
            this.items = response.data
            console.log(response)
          })
      }
    }
  }
</script>