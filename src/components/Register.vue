<template>
    <div class="d-flex align-center justify-center"
            style="height: 100vh; background-color: white; background-image:url(https://picsum.photos/1920/1080?random); background-repeat: no-repeat; background-size: cover; "
            :style="bottom - gradient">

            <v-sheet width="600" class="ma-3 pa-3 mr-4 rounded-lg" style="opacity:0.9; background: white;" max-width="456"
                elevation="12" height="450">
                <!-- mx-auto  -->
                <!-- :lazy-src="`https://vuejs.org/images/logo.png)`" -->

                <div class="d-flex align-center justify-center pt-5">
                    <v-img src="https://vuejs.org/images/logo.png" height="40" width="40"></v-img>
                    <br>
                    <br>
                    <!-- <h2>Iniciar Sessão</h2> -->
                </div>

                <div class="d-flex align-center justify-center">

                    <br>
                    <br>
                    <h2>Registar</h2>
                </div>
                <br>

                <v-form fast-fail @submit.prevent="login">
                    <v-text-field class="text-button" :rules="[rules.required, rules.min]" variant="outlined"
                        prepend-inner-icon="mdi-account" v-model="username" label="Nome de utilizador"></v-text-field>
                    <!-- style="height: 50px; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;" -->
                    <br>
                    <v-text-field class="text-button" variant="outlined" prepend-inner-icon="mdi-lock"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" hint="Pelo menos 8 caracteres" counter
                        @click:append="show1 = !show1" v-model="password" label="Palavra-passe" type="password"></v-text-field>
                    <a href="#" class="text-body-2 font-weight-regular">Esqueceu a sua palavra-passe?</a>

                    <v-btn type="submit" color="primary" block class="mt-2" v-on:click="TokenStore.setToken(newToken, true);"
                        @click="ShowData();" :ripple="true" :disabled="loading" :loading="loading"
                        prepend-icon="mdi-login">Entrar</v-btn>

                </v-form>
                <div class="mt-2">
                    <p class="text-body-2">Não tem uma conta? <a href="/register">Subscreva</a></p>
                </div>
            </v-sheet>
        </div>
</template>


<script setup>
// useTokenStore
import { ref, onMounted } from 'vue';
import { useTokenStore } from '@/store/TokenStore';
import axios from 'axios'

onMounted(() => {
    // alert(TokenStore.tokenID) 
    if (window.localStorage.getItem('token') != null) {
        // window.location = '/dashboard'
    }
    else {
    }
});
</script>

<script>
const TokenStore = useTokenStore();
const newToken = ['ljahsdfq697e69qwerq', 'Vasco Gungui', 'Administrator']

export default {
    data: () => ({
           partnerId: '',
            branch: '',
            id: '',
            user: '',
            email: '',
            aid: 0,
            mode: '',
            type: '',
            crdate: '',
            mdate: '',
            adminId: '',
            admin: '',
            userGroup: '',
            username: '',
            pass: '',
            domain: '',
            status: '',
            mlog: '',
            session: '',
            visit: '',
            ask: '',
            quest: '',
            dept: '',
            access: '',
            level: '',
            stock: '',
            lang: '',
            points: '',
            sales: '',
            curhours: '',
            tothours: '',
            bonus: '',
            stat: '',
            modules: '',
            defModule: '',
            openMode: '',
            permissions: '',
            chgpwd: '',
            ontime: 0,
            wdays: '',
            din1: '',
            dout1: '',
            din2: '',
            dout2: '',
            din3: '',
            dout3: '',
            din4: '',
            dout4: '',
            din5: '',
            dout5: '',
            din6: '',
            dout6: '',
            din7: '',
            dout7: '',
            totLogins: 0,
            trace: '',
            defTerminal: '',
            tagger: '',
            sigStat: '',
            flex: '',
            tel: '',
            sex: '',
            adr: '',
            likes: '',
            tokenId: '',
            tokenDate: '',
            tokenTime: '',
            signature: '',

        username: '',
        password: '',
        show1: false,
        show2: true,
        password: '',
        rules: {
            required: value => !!value || 'Campo obrigatório.',
            min: v => v.length >= 8 || 'Min 8 carácteres',
            emailMatch: () => (`The email and password you entered don't match`),
        },
        userDetails: []

    }),
    methods: {
        checkInput: function () {
            window.localStorage.setItem('token', JSON.stringify(newToken));
            this.$router.push({ path: `/dashboard` })
        },
        handleSubmit() {

        },
        async ShowData(){

        },
        login: async function () {

            const data1 = {
                   partnerId: '',
                    branch: '',
                    id: '',
                    user: '',
                    email: '',
                    aid: 0,
                    mode: '',
                    type: '',
                    crdate: '',
                    mdate: '',
                    adminId: '',
                    admin: '',
                    userGroup: '',
                    username: '',
                    pass: '',
                    domain: '',
                    status: '',
                    mlog: '',
                    session: '',
                    visit: '',
                    ask: '',
                    quest: '',
                    dept: '',
                    access: '',
                    level: '',
                    stock: '',
                    lang: '',
                    points: '',
                    sales: '',
                    curhours: '',
                    tothours: '',
                    bonus: '',
                    stat: '',
                    modules: '',
                    defModule: '',
                    openMode: '',
                    permissions: '',
                    chgpwd: '',
                    ontime: 0,
                    wdays: '',
                    din1: '',
                    dout1: '',
                    din2: '',
                    dout2: '',
                    din3: '',
                    dout3: '',
                    din4: '',
                    dout4: '',
                    din5: '',
                    dout5: '',
                    din6: '',
                    dout6: '',
                    din7: '',
                    dout7: '',
                    totLogins: 0,
                    trace: '',
                    defTerminal: '',
                    tagger: '',
                    sigStat: '',
                    flex: '',
                    tel: '',
                    sex: '',
                    adr: '',
                    likes: '',
                    tokenId: '',
                    tokenDate: '',
                    tokenTime: '',
                    signature: ''

            };
            console.log(data1);

            axios.post('https://localhost:3000/api/AccountLogin', data1)
                .then(
                    res => {
                        console.log(res)
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )

            //  axios.get('https://localhost:7127/api/Account/' + this.username)
            //         .then(function(response)
            //         {
            //            console.log(response.data.email + ' ' + response.data.pass + ' ' + response.data.ask)
            //         }) 
        }
    },
    computed: {

    }
}
</script>