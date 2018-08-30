<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar >
                <v-toolbar-title>
                    <v-icon>account_circle</v-icon> 
                    Registro
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field 
                        prepend-icon="person" 
                        name="name" 
                        label="Nome" 
                        type="text"
                        v-model="name"
                        :rules="[rules.required]"
                    ></v-text-field>
                    <v-text-field 
                        prepend-icon="email" 
                        name="login" 
                        label="Email" 
                        type="text"
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                    ></v-text-field>
                  <v-text-field 
                      id="password" 
                      prepend-icon="lock" 
                      name="password" 
                      v-model="password"
                      :append-icon="show1 ? 'visibility_off' : 'visibility'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      label="Senha"
                      hint="Pelo menos 8 caracteres"
                      counter
                      @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field 
                      id="password_confirm" 
                      prepend-icon="lock" 
                      name="password_confirm" 
                      v-model="password_confirm"
                      :append-icon="show1 ? 'visibility_off' : 'visibility'"
                      :rules="[rules.required, rules.passEqual]"
                      :type="show1 ? 'text' : 'password'"
                      label="Confirme Senha"
                      hint="Pelo menos 8 caracteres"
                      counter
                      @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-checkbox
                    v-model="is_admin"
                    label="É administrador"
                    required
                  ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn v-on:click="register" block color="primary">Registrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>

const userList = {
    'userName': 'fabriciomoeller@gmail.com',
    'passWord': 'guru@2011'
}

export default {
  data () {
    return {
      show1: false,
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      is_admin: false,
      rules: {
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Mínimo 8 caracteres',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail inválido'
        },
        passEqual: value => {
          return value == password.value || 'Senhas diferentes'
        }
      }
    }
  },
  mounted () {},
  watch: {},
  components: {},
  methods: {
    google () {},
    facebook () {},
    register (e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.axios.post('http://localhost:3010/register', 
          {
              name: this.name,
              email: this.email,
              password: this.password,
              admin: this.is_admin
          }
        ).then(response => {
          let is_admin = response.data[0].admin
          if (is_admin)
            alert('Adminstrador')
          else
            alert('usuário comum')
        })
        .catch(function (error) {
          alert('erro ao logar' + error.response)
        })
      }  
    },
    logout () {},
    check () {}
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

