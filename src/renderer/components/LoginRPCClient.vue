<template>
  <div>
    <Input v-model="rpcHost" placeholder="localhost:10006" style="width:200px; margin-bottom:10px;"></Input>
    <!-- <p class="api-host">{{rpcHost}}</p> -->
    <Form ref="formInline" inline>
      <Form-item prop="user">
        <Input type="text" v-model="username" placeholder="Username" style="width:100px">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="password">
        <Input type="password" v-model="password" placeholder="Password" style="width:100px">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <!-- <Form-item>
        <Select v-model="selectedRPCCompany" style="width:100px">
          <Option value="ING"></Option>
        </Select>
      </Form-item> -->
      <Form-item>
        <Button type="primary" @click="login">Login</Button>
      </Form-item>
    </Form>
    <div v-if="errorLogin" class="error">
      The username or password is incorrect
    </div>
    <div v-if="selectCompanyError" class="error">
      Please specify a RPC host
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      rootUrl: ''
    },
    data () {
      return {
        username: '',
        password: '',
        rpcHost: '',
        selectedRPCCompany: '',
        selectCompanyError: false,
        errorLogin: false
      }
    },
    methods: {
      login () {
        if (this.rpcHost === '') {
          this.selectCompanyError = true
        } else {
          console.log('rpc: ' + this.rootUrl)
          this.selectCompanyError = false
          this.$http({
            method: 'POST',
            url: this.rootUrl + '/RPC',
            params: {
              username: this.username,
              password: this.password,
              host: this.rpcHost
            }
          })
          .then((response) => {
            this.errorLogin = false
            this.showModal = false
            this.RPCClient = true
            this.$emit('expose')
          })
          .catch((handle) => {
            console.log('handle is ' + JSON.stringify(handle, null, 4))
            this.errorLogin = true
          })
        }
      }
    }
  }
</script>


<style>
  .error {
    color: red;
  }
</style>
