<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar >
                <v-toolbar-title>
                    <v-icon>account_circle</v-icon> 
                    Login
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field 
                        prepend-icon="person" 
                        name="login" 
                        label="Usuário" 
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
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn v-on:click="login" block color="primary">Login</v-btn>
                <v-btn v-on:click="register" color="success">Registro</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>


export default {
  data () {
    return {
      show1: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Mínimo 8 caracteres',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail inválido'
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
    login (e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.axios.post('http://localhost:3010/login', 
          {
              "email": this.email,
              "password": this.password
          }
        ).then(response => {
          let is_admin = response.data.user.admin
          localStorage.setItem('user',JSON.stringify(response.data.user))
          localStorage.setItem('jwt',response.data.token)
          localStorage.setItem('accessToken',response.data.accessToken)

          if (localStorage.getItem('jwt') != null){
              this.$emit('loggedIn')
              if(this.$route.params.nextUrl != null){
                  this.$router.push(this.$route.params.nextUrl)
              }
              else {
                  if(is_admin== 1){
                      this.$router.push('crud')
                  }
                  else {
                      this.$router.push('home')
                  }
              }
          }
        })
        .catch(function (error) {
          alert('erro ao logar, ' + JSON.stringify(error.response) )
        })
      }  
    },
    logout () {},
    check () {},
    register () { this.$router.push('register') }
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

