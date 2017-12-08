<template>
  <div>
    <div style="
         height: 100%;
         width: 100%;
         display: flex;
         position: fixed;
         align-items: center;
         justify-content: center;" v-if="notStarted">
      <div>
  <p style="
    font-size: 50px;
    font-weight: bold;
    color:rgb(0,0,128)
">AskING</p>
        <p href @click = "goToLoginPage" style="
    font-size: 30px;
    font-style: italic;
    font-weight: bold;
    color:rgb(0,0,128);
text-decoration:underline;">Get started></p>
      </div>
    </div>

  <div>
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
  import LoginRPCClient from './LoginRPCClient.vue'
  import BarExample from '../js/BarGraph'
  export default {
    name: 'home-page',
    components: {
      LoginRPCClient,
        BarExample
    },
    props: {
      value: {
        type: String,
        default: 'Node Legal Name'
      }
    },
    data () {
      return {
          formInline: {
              user: '',
              password: ''
          },
          ruleInline: {
              user: [
                  { required: true, message: 'Please fill in the user name', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                  { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
              ]
          },
          notStarted : true
      }
    },
    computed: {
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        goToLoginPage(){
            this.notStarted = false;
            this.$router.push({
                name: 'login-page',
            })
        }
    }
  }
</script>


<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Roboto')

  $color: #FF9800

  \:root
    --mdc-theme-primary: $color

  body
    margin: 0
    background-color: #F5F5F5
    font-family: 'Roboto', sans-serif

  .wrapper
    max-width: 500px
    margin-left: auto
    margin-right: auto

  .wrapper.ai-window
    padding: 1rem

  .up
    font-size: 32px
    background-color: white
    padding: 10px
    border-radius: 50%

  .title
    vertical-align: middle
    text-align: center
    font-weight: 700
    color: rgba(0,0,0,0.7)
    margin-top: 30%

  .query
    padding: 16px 0px
    background-color: white
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    z-index: 999
    position: fixed
    width: 100%

  .queryform
    border: 0
    width: 100% - 20%
    margin-left: 60px
    font-size: 16px
    outline: none
    color: rgba(0,0,0,0.8)
    font-weight: 500

    @media screen and (max-width: 320px)
      width: 100% - 35%

  .iicon
    margin-left: 20px
    position: absolute
    vertical-align: middle
    color: rgba(0,0,0,0.8)
    cursor: pointer

  .recording
    color: #F44336

  .iicon.t2s
    margin-left: 10px
    margin-right: 20px

    @media screen and (max-width: 720px)
      right: 0

  .chat-window
    width: 100%

  .bubble
    max-width: 300px
    background-color: #E1E1E1
    padding: 16px
    border-radius: 8px
    color: rgba(0,0,0,0.7)
    float: right

  .bubble.bot
    background-color: white
    float: left
    margin-right: 10px



  td
    margin-top: 30px
    margin-bottom: 10px

  .mdc-card
    background-color: white
    max-width: 300px
    margin-bottom: 5px

  .slide
    margin: 5px
    max-width: 300px

  .slider
    max-width: 300px
    margin-left: -5px

  .mdc-fab
    background-color: white
    color: $color

  .rightnav
    margin-left: -32px

    @media screen and (max-width: 720px)
      margin-left: -35px

    @media screen and (max-width: 320px)
      margin-left: -70px

  .leftnav
    margin-right: -35px

    @media screen and (max-width: 720px)
      display: none

  .openlink
    vertical-align: middle
    margin-top: -5px
    margin-left: 5px

  .mdc-card__media-item
    height: auto
    width: 100%
    margin-top: -5px

  .chips
    margin-left: -10px

  .suggestion
    margin-top: 10px
    float: left
    margin-left: 10px
    padding: 10px
    border: 2px rgba(0,0,0,0.5) solid
    color: rgba(0,0,0,0.5)
    border-radius: 6px
    cursor: pointer

  .suggestion:active
    border: 2px rgba(0,0,0,1) solid
    color: rgba(0,0,0,1)

  .suggestion.link
    color: white
    background-color: $color
    border: 2px $color solid

  .suggestion.link:active
    background-color: darken($color, 10%)
    border: 2px darken($color, 10%) solid

  .mdc-list-item__start-detail
    border-radius: 50%

  .copyright
    font-weight: 600
    color: rgba(0,0,0,0.8)

  .copyright a
    text-decoration: none
    color: rgba(0,0,0,0.8)
    border-bottom: 2px solid transparent

  .copyright a:hover
    color: $color
    border-bottom: 2px solid $color

</style>

<style scoped>

  html, body {
    height: 100%;
    margin: 0;
  }

  #container{
    min-height: 100%;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height:100%
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  /*.layout-content{*/
    /*min-height: 200px;*/
    /*margin: 15px;*/
    /*overflow: hidden;*/
    /*background: #fff;*/
    /*border-radius: 4px;*/
  /*}*/
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-header{
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
</style>