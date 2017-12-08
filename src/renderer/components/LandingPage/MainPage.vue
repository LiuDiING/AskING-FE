<template>
    <div>
        <div class="layout-header" style="min-height:9vh;max-height: 9vh">
            <p style="color:rgb(0,0,128);font-weight:bold;font-size: 28px;margin-left:5px">AskING</p>
            <p style="color:rgb(0,0,128);font-weight: bold; font-size: 12px;margin-left: 5px;">Your personal virtual assistant</p>
            <img style="width: 100px;position: absolute;right: 10px;top:10px" src="../../ING_logo.png"/>
            <p style="font-style:italic;font-weight:bold;display:inline-block;position: absolute;right: 10px;top:40px;font-size: 12px;color: rgb(0,0,128)">ING Financial Markets</p>
            <img style="border-radius:50px;width: 50px;position: absolute;right:150px;top: 8px;" src="../../roham.jpg"/>
            <Button type="error" style="position: absolute;right:220px;top: 20px;" @click = "logOut">log out</Button>
        </div>
        <div id = "container"class="layout" :class="{'layout-hide-text': spanLeft < 5}">
            <div>
                <Row type="flex" >
                    <Col :span="spanLeft">
                    <div id = "chatBoxArea" style="margin:5px;min-height: 84vh;overflow: scroll;max-height: 84vh;border-style: solid;border-color: black;border-width: 1px">


                        <table v-for="a in answers" class="chat-window">

                            <!-- Your messages -->
                            <tr>
                                <td class="bubble" style="margin-right:20px;font-size: 15px">{{a.query}}</td>
                            </tr>
                            <tr>
                                <td style="margin-left: 20px;font-size:15px; float: left;background-color: rgb(255,98,0)" class="bubble resposnse">{{a.response}}</td>
                            </tr>
                        </table>
                        <!--<div v-if="haveHint">hints: {{hints}}</div>-->
                    </div>


                    <div style="margin:5px;border-color: black;border-style: solid;border-width: 1px;min-height: 5vh;max-height: 5vh">
                        <!--<Input style="margin:5px;border-color: black;min-height: 5vh;max-height: 5vh" v-model="query" @keyup.enter="submit()" icon="android-send" placeholder="Enter something..." ></Input>-->
                        <div class="wrapper" v-if="micro == false" >
                            <!--<i class="material-icons iicon" @click="microphone(true)">mic</i>-->
                            <Icon style="bottom:2.5vh;left: 1vh;position: absolute" size="50px" type="android-microphone"></Icon>
                            <input style="left:2.5vh;position: absolute;bottom:1.75vh;height: 3%;width: 90%" aria-label="Ask me something" autocomplete="off" v-model="query" @keyup.enter="submit()" placeholder="Ask me something..." autofocus type="text">

                            <Icon style="bottom:2.5vh;right: 1vh;position: absolute" v-bind:class="{ active: isSendActive}" type="android-send"></Icon>

                        </div>


                        <!--<div class="wrapper" v-else>-->
                            <!--<i class="material-icons iicon recording" @click="microphone(false)">mic</i><input class="queryform" :placeholder="speech" readonly>-->
                        <!--</div>-->

                    </div>

                    </Col>

                    <Col :span="spanRight">
                    <div id="chartScrollable" style="max-height:89vh;min-height: 89vh;overflow: scroll;border-style: solid;border-width: 1px;margin: 5px">
                    <div v-for = "cd in chartData">
                        <div v-if="cd.type === 'bar'">
                            <bar-example :data = "cd.data"></bar-example>
                        </div>
                        <div v-else-if="cd.type === 'line'">
                            <line-example :data = "cd.data"></line-example>
                        </div>
                        <div v-else-if="cd.type === 'table'">
                            <Table :columns="cd.data.columns1" :data="cd.data.data1"></Table>

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
                isSendActive : true,
                tableData: {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                    data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
            },
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
                sessionId: '',

                sendObject :{
                    question: '',
                    sessionId: ''
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
                query: '',
                hints: '',
                haveHint: false,

                speech: 'Go ahead, im listening...',
                micro: false,
                muted: false,
                online: navigator.onLine,
                spanLeft: 8,
                spanRight: 16,
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
        watch: {
          query :  function () {
              if(this.query !== ''){
                  this.isSendActive = true;
              }
              else{
                  this.isSendActive = false;
              }
          },

            hints : function () {
                if(this.hints === ''){
                    this.haveHint = false;
                }
                else{
                    this.haveHint = true;
                }
            }
        },
        methods: {
            logOut(){
                this.$router.push({
                    name: 'login-page',
                })
                this.sessionId = ''
            },
            submit(){
                if (!(this.query === '')) {
                if(this.sessionId === '' || this.sessionId === undefined) {
                    console.log('first time ');

                        this.$http.post('http://172.16.47.139:8085/api/login', this.query).then((response) => {
//                            console.log('log should be ' + JSON.stringify(response))
                            this.reponseInformation = response.data.data;
                            if (response.data.sessionId != '') {
                                console.log('session id ' + JSON.stringify(response.data.sessionId));
                                this.sessionId = response.data.sessionId;
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
                        this.sendObject.sessionId = this.sessionId;
                        console.log('send object is ' + JSON.stringify(this.sendObject));
                        this.$http.post('http://172.16.47.139:8085/api/question', JSON.stringify(this.sendObject)).then((response) => {

                            console.log('log1 should be ' + JSON.stringify(response))

                            this.reponseInformation = response.data.data;
//                            console.log('hint is ' + response.data["hint"].length);

                            if((response.data["hint"] !== undefined)) {
                                if((response.data["hint"].length > 0)){
                                console.log('I have it!');
                                this.hints = response.data["hint"];
                                this.$Notice.open({
                                    top: 50,
                                    duration: 3,
                                    title: 'Hint',
                                    desc: response.data["hint"]
                                });
                                this.haveHint = true;
                                console.log('this hints are ' + this.hints)
                            }
                        }

                            var newTestChart = {};
                            if(response.data.type === 'chart'){

                                newTestChart.type = 'line';
                                newTestChart.data = response.data.data;
                                var newArray = [];
                                response.data.data.labels.forEach(data => {
                                    var timestamp = data;
                                    var t = new Date(timestamp );
                                    console.log('data label is ' + data);
                                    console.log('format is ' + t);
                                    newArray.push(t);
                                })
                                newTestChart.data.labels = newArray;
                                newTestChart.data.datasets.fill = false;
                                this.chartData.push(newTestChart);

                            }
                            else {

                                var queryAndAnswer = {};
                                queryAndAnswer.query = this.query;
                                queryAndAnswer.response = this.reponseInformation;
                                this.answers.push(queryAndAnswer)
//                        this.handle(response) // <- handle the response in handle() method

                                this.query = ''
                                this.reponseInformation = ''
                                this.speech = 'Go ahead, im listening...' // <- reset query and speech

                                this.count++;
//                            var newTestChart = {};
//                            if (this.count % 3 === 0) {
//                                console.log('hehe')
//                                newTestChart.type = 'bar';
//                                newTestChart.data = this.testData;
//                                this.chartData.push(newTestChart);
//
//                            }
//                            else if (this.count % 3 === 1) {
//                                newTestChart.type = 'line';
//                                newTestChart.data = this.testData;
//                                this.chartData.push(newTestChart);
//                            }
//
//                            else if (this.count % 3 === 2) {
//                                newTestChart.type = 'table';
//                                newTestChart.data = this.tableData;
//                                this.chartData.push(newTestChart);
//                            }

                            }

                            setTimeout(function () {
                                var messageBody = document.querySelector('#chatBoxArea');
                                messageBody.scrollTop = messageBody.scrollHeight;
                                console.log('scroll height is ' + (messageBody.scrollHeight - messageBody.scrollTop));
                                messageBody.scrollTop += (messageBody.scrollHeight - messageBody.scrollTop);
                                console.log(messageBody.scrollTop);
                                var messageBody2 = document.querySelector('#chartScrollable');
                                messageBody2.scrollTop = messageBody2.scrollHeight;

                            }, 1500);


                        })
                    }
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
    .active {
        color:green;
    }
</style>