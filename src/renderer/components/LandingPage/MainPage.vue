<template>
    <div>
        <div class="layout-header" style="min-height:9vh;max-height: 9vh">
            <p style="font-weight:bold;font-size: 20px;margin-left:5px">AskING</p>
            <p style="font-weight: bold; font-size: 10px;margin-left: 5px;">Your personal virtual assistant</p>
        </div>
        <div id = "container"class="layout" :class="{'layout-hide-text': spanLeft < 5}">
            <div>
                <Row type="flex" >
                    <Col :span="spanLeft">
                    <div id = "chatBoxArea" style="margin:5px;min-height: 84vh;overflow: scroll;max-height: 84vh;border-style: solid;border-color: black;border-width: 1px">


                        <table v-for="a in answers" class="chat-window">

                            <!-- Your messages -->
                            <tr>
                                <td class="bubble">{{a.query}}</td>
                            </tr>
                            <tr>
                                <td style="float: left;background-color: orange" class="bubble resposnse">{{a.response}}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="margin:5px;border-color: black;border-style: solid;border-width: 1px;min-height: 5vh;max-height: 5vh">
                        <div class="wrapper" v-if="micro == false" >
                            <i class="material-icons iicon" @click="microphone(true)">mic</i>
                            <input aria-label="Ask me something" autocomplete="off" v-model="query" class="queryform" @keyup.enter="submit()" placeholder="Ask me sooomeng..." autofocus type="text">
                        </div>

                        <div class="wrapper" v-else>
                            <i class="material-icons iicon recording" @click="microphone(false)">mic</i><input class="queryform" :placeholder="speech" readonly>
                        </div>
                    </div>

                    </Col>

                    <Col :span="spanRight">
                    <div id="chartScrollable" style="max-height:92vh;min-height: 92vh;overflow: scroll">
                    <div v-for = "cd in chartData">
                        <div v-if="cd.type === 'bar'">
                            <bar-example :data = "cd.data"></bar-example>
                        </div>
                        <div v-else-if="cd.type === 'line'">
                            <line-example :data = "cd.data"></line-example>
                        </div>
                    </div>
                    </div>

                    </Col>


                </Row>


            </div>

        </div>

    </div>

</template>

<script>
    import LoginRPCClient from '../LoginRPCClient.vue'
    import BarExample from '../../js/BarGraph'
    import LineExample from '../../js/LineGraph'
    export default {
        name: 'home-page',
        components: {
            LoginRPCClient,
            BarExample,
            LineExample
        },
        props: {
            value: {
                type: String,
                default: 'Node Legal Name'
            }
        },
        data () {
            return {
                hostname: '',
                barChartData:{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'GitHub Commits',
                            backgroundColor: '#f87979',
                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                        }
                    ],

                },
                sessionid: '',

                sendObject :{
                    question: '',
                    sessionid: ''
                },
                protocal: 'http://',
                apiRoot: '/api/argent',
                activeMenu: 'peers',
                showModal: false,
                errorLogin: false,
                RPCClient: false,
                selectedRPCCompany: '',
                selectCompanyError: false,
                reponseInformation : '',
                answers:[],
                charts: [],
                chartData: [],
                lineCharts: [],
                count : 0,

                speech: 'Go ahead, im listening...',
                micro: false,
                muted: false,
                online: navigator.onLine,
                spanLeft: 12,
                spanRight: 12,
                testData :{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#f87979',
                            data: [40, 39, 10, 40, 39, 80, 40]
                        }
                    ]
                }
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            submit(){
                if(this.sessionid === '' || this.sessionid === undefined){
                    console.log('first time ');
                    this.$http.post('http://192.168.178.143:8085/api/login',this.query).then((response) => {
                        this.reponseInformation = response.data;
                        console.log('response is ' + this.reponseInformation);
                        if(this.reponseInformation.sessionid != ''){
                            console.log('session id ' + this.reponseInformation.sessionid);
                            this.sessionid = this.reponseInformation.sessionid;
                        }

                        var queryAndAnswer = {};
                        queryAndAnswer.query = this.query;
                        queryAndAnswer.response = this.reponseInformation;
                        this.answers.push(queryAndAnswer)
                        this.handle(response) // <- handle the response in handle() method

                        this.query = ''
                        this.reponseInformation = ''
                        var messageBody = document.querySelector('#chatBoxArea');
                        messageBody.scrollTop = messageBody.scrollHeight;
                        console.log('scroll height is ' + (messageBody.scrollHeight - messageBody.scrollTop));
                        messageBody.scrollTop += (messageBody.scrollHeight - messageBody.scrollTop);
                        console.log(messageBody.scrollTop);
        })

                }
                else {
                    this.sendObject.question = this.query;
                    this.sendObject.sessionid = this.sessionid;
                    this.$http.post('http://192.168.178.143:8085/api/question', JSON.stringify(this.sendObject)).then((response) => {

                        this.reponseInformation = response.data;

                        var queryAndAnswer = {};
                        queryAndAnswer.query = this.query;
                        queryAndAnswer.response = this.reponseInformation;
                        this.answers.push(queryAndAnswer)
//                        this.handle(response) // <- handle the response in handle() method

                        this.query = ''
                        this.reponseInformation = ''
                        this.speech = 'Go ahead, im listening...' // <- reset query and speech

                        this.count++;
                        var newTestChart = {};
                        if(this.count % 2 === 0) {
                            console.log('hehe')
                            newTestChart.type = 'bar';
                            newTestChart.data = this.testData;
                            this.chartData.push(newTestChart);

                        }
                        else {
                            newTestChart.type = 'line';
                            newTestChart.data = this.testData;
                            this.chartData.push(newTestChart);
                        }


                        setTimeout(function () {
                            var messageBody = document.querySelector('#chatBoxArea');
                            messageBody.scrollTop = messageBody.scrollHeight;
                            console.log('scroll height is ' + (messageBody.scrollHeight - messageBody.scrollTop));
                            messageBody.scrollTop += (messageBody.scrollHeight - messageBody.scrollTop);
                            console.log(messageBody.scrollTop);
                            var messageBody2 = document.querySelector('#chartScrollable');
                            messageBody2.scrollTop = messageBody2.scrollHeight;

                        },1500);


                    })
                }
            },

            drawChart(data){

                var messageBody2 = document.querySelector('#chartScrollable');
                messageBody2.innerHTML += '<bar-example :data = ' + data + '></bar-example>';

            },
            toggleClick () {
                if (this.spanLeft === 12) {
                    this.spanLeft = 7;
                    this.spanRight = 17;
                } else {
                    this.spanLeft = 12;
                    this.spanRight = 12;
                }
            },
            handle(response){
                if(response.result.fulfillment.speech || response.result.fulfillment.messages[0].type == 'simple_response' && this.muted == false){
                    let speech = new SpeechSynthesisUtterance(response.result.fulfillment.speech || response.result.fulfillment.messages[0].textToSpeech)
                    speech.voiceURI = 'native'
                    speech.lang = 'en-GB' // <- Nice british accent
                    window.speechSynthesis.speak(speech) // <- Speech output

                }
            },
            autosubmit (suggestion) {
                this.query = suggestion
                this.submit()
            },
            mute (mode) {
                this.muted = mode
            },
            microphone (mode) {
                this.micro = mode
                let self = this

                if (mode === true) {
                    let recognition = new webkitSpeechRecognition() // <- chrome speech recognition

                    recognition.interimResults = true
                    recognition.lang = 'en-US'
                    recognition.start()

                    recognition.onresult = function (event) {
                        for (var i = event.resultIndex; i < event.results.length; ++i) {
                            self.speech = event.results[i][0].transcript
                        }
                    }

                    recognition.onend = function () {
                        recognition.stop()
                        self.micro = false
                        self.autosubmit(self.speech)
                    }
                }
            },
            onMenuSelect (selectedMenuName) {
                console.log('go to: ' + selectedMenuName)
                switch (selectedMenuName) {
                    case 'peers':
                        console.log(this.activeMenu)
                        this.$router.push({
                            name: 'peers',
                            params: { urlRoot: this.urlRoot }
                        })
                        break
                    case 'transfer-proposals':
                        console.log(this.activeMenu)
                        this.$router.push({
                            name: 'transfer-proposals',
                            params: { urlRoot: this.urlRoot }
                        })
                        break
                    case 'credit-line':
                        console.log(this.activeMenu)
                        this.$router.push({
                            name: 'credit-line',
                            params: { urlRoot: this.urlRoot }
                        })
                        break
                    default:
                        break
                }
            },
            urlRoot () {
                return this.protocal + this.hostname + this.apiRoot
            },
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