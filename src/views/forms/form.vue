<template>
  <v-container>
  <v-layout align-center justify-center >
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
          <v-form style="padding: 16px;">
              <v-text-field
              v-model="User.first_name"
              :rules="nameRules"
              :counter="3"
              label="Primeiro Nome"
              required
              ></v-text-field>
              <v-text-field
              v-model="User.last_name"
              :rules="nameRules"
              :counter="3"
              label="Último Nome"
              required
              ></v-text-field>
              <v-text-field
              v-model="User.email"
              :rules="emailRules"
              label="E-mail"
              required
              ></v-text-field>
 
            <v-btn block v-on:click="submit" color="primary">Gravar Dados</v-btn>
            <v-btn block :to="gridPage" color="success">Ver usuários</v-btn>

          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
</template>

<script>

  export default {
    data: () => ({
      valid: false,
      gridPage: "/grid",
      User: {'first_name': '', 'last_name': '', 'email': ''},
      nameRules: [
        v => !!v || 'Obrigatório',
        v => v.length >= 3 || 'Nome deve ter mais de 3 letras'
      ],
      emailRules: [
        v => !!v || 'E-mail obrigatório',
        v => /.+@.+/.test(v) || 'E-mail não é valido'
      ]
    }),
    methods: {
      submit: function () {
        let newUser = {
          'first_name': this.User.first_name,
          'last_name': this.User.last_name,
          'email': this.User.email
        }
        console.log(newUser)
        this.axios.post('http://localhost:3010/list', newUser)
          .then(response => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

