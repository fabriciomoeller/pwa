<template>
  <v-layout align-center justify-center >
      <v-flex xs12 sm10 md12 lg12>
        <v-card>
          <v-toolbar >
            <v-toolbar-title>Painel para administrar Usuários</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">Novo Usuário</v-btn>
              <v-layout align-center justify-center >
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap row>
                      <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editedItem.first_name" label="Primeiro Nome"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field v-model="editedItem.last_name" label="Último Nome"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md12>
                        <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md12>
                        <v-text-field v-model="editedItem.username" label="Usuário"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md12>
                        <v-text-field v-model="editedItem.password" label="Senha"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="save">Salvar</v-btn>
                </v-card-actions>
              </v-card>
              </v-layout>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.first_name }}</td>
              <td class="text-xs-right">{{ props.item.last_name }}</td>
              <td class="text-xs-right">{{ props.item.email }}</td>
              <td class="text-xs-right">{{ props.item.username }}</td>
              <td class="text-xs-right">{{ props.item.password }}</td>
              <td class="justify-center layout px-0">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(props.item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
            <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Primeiro Nome',
          align: 'left',
          sortable: true,
          value: 'first_name'
        },
        { text: 'Último Nome', value: 'last_name' },
        { text: 'Email', value: 'email' },
        { text: 'Usuário', value: 'username' },
         { text: 'Senha', value: 'password' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
      },
      defaultItem: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.axios.get('http://localhost:3010/list')
          .then(response => {
            this.items = response.data
            console.log(response)
          })
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        let confirmDel = confirm('Are you sure you want to delete this item?')
        if (confirmDel) {
          let userId = this.items[index]._id
          console.log(userId)
          this.axios.delete(`http://localhost:3010/list/${userId}`)
            .then(response => {
              console.log(response)
            })
          this.items.splice(index, 1)
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        let newUser = {
          'first_name': this.editedItem.first_name,
          'last_name': this.editedItem.last_name,
          'email': this.editedItem.email,
          'username': this.editedItem.username,
          'password': this.editedItem.password,
        }

        if (this.editedIndex > -1) {
          newUser['_id'] = this.editedItem._id
          this.axios.put('http://localhost:3010/list', newUser)
            .then(response => {
              Object.assign(this.items[this.editedIndex], this.editedItem)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.axios.post('http://localhost:3010/list', newUser)
            .then(response => {
              this.items.push(response.data)
            })
            .catch((error) => {
              console.log(error)
            })
        }
        this.close()
      }
    }
  }
</script>