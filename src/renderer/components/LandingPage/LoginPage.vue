<template>
    <div>
    <div style="
         height: 100%;
         width: 100%;
         display: flex;
         position: fixed;
         align-items: center;
         justify-content: center;">

    <Form ref="formInline" :model="formInline" >
        <p style="font-weight: bold;font-size: 30px;color: rgb(0,0,128);">Welcome to AskING</p>
        <p style="margin-bottom:10px;text-align:center;font-style:italic;font-weight: bold;font-size: 15px;color: rgb(0,0,128);">Your Personal Assistant</p>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Corporate Key">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Log in</Button>
        </FormItem>
    </Form>
    </div>

    <img style="width: 100px;position: absolute;left: 10px;bottom:10px" src="../../ING_logo.png"/>
    </div>
</template>

<script>
    export default {
        name: 'login-page',

        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },


        methods: {
            handleSubmit(name) {
                this.$router.push({
                    name: 'main-page',
                })
            },
        }
    }
</script>