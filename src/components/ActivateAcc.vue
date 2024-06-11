<template>
    <!-- <div> -->

    <!-- </div> -->

    <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="{
        background: {
            color: {
                // value: '#0d47a1'
            }
        },
        fullScreen: {
            enable: true,
            zIndex: 0
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    // enable: true,
                    mode: 'push'
                },
                onHover: {
                    enable: true,
                    mode: 'grab'
                },
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.9,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: '#ccc'
            },
            links: {
                color: '#ccc',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 2
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: 'bounce',
                random: false,
                speed: 3,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                },
                value: 60
            },
            opacity: {
                value: 0.9
            },
            shape: {
                type: 'circle'
            },
            size: {
                value: { min: 1, max: 5 }
            }

        },
        detectRetina: true
    }" />

    <v-form ref="form" fast-fail @submit.prevent="submit" class="circular"
        v-bind:style="{ 'background-image': 'url(' + bgimage + ')' }">

        <!-- PROGRESS BAR -->
        <v-progress-linear :active="loading" :indeterminate="loading" color="blue-lighten-3" id="topProgress"
            style="display: none;" indeterminate></v-progress-linear>
        <!-- LOGIN -->

        <div class="d-flex align-center justify-center" width="500" max-width="456"
            style="height: 100vh; border-top:5px solid darkorange">


            <!-- DONE -->
            <div id='don' style="display:none;">

                <v-card class="pa-6 pb-3 ma-2 blue-lighten-3" elevation="8" max-width="448" rounded="sm" margin-left="4"
                    style="opacity:0.9;">

                    <v-spacer></v-spacer>

                    <v-img class="mx-auto my-6" max-width="228"
                        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

                    <v-divider></v-divider>

                    <div class="py-12 text-center">
                        <v-icon class="mb-2" color="success" icon="mdi-check-circle-outline" size="108"></v-icon>

                        <div class="text-h6 font-weight-bold">Conta activada com sucesso!</div>
                        <br>
                        <p class="text-subtitle-1">A sua conta foi activada com sucesso. <span class="text-subtitle-1"
                                id="PWE1" style="font-weight:500"></span> e já podes aceder
                            ao
                            nosso portal.
                        </p>
                    </div>

                    <!-- <v-divider></v-divider> -->

                    <div class="or pb-10" style="font-size: 10pt; font-weight: 500;">OU</div>


                    <!-- LOGIN BUTTONS -->
                    <v-card-text class="text-center pt-0">

                        <v-row>


                            <v-btn variant="tonal" size="large" block rounded="0" class="text-blue text-decoration-none"
                                rel="noopener noreferrer" @click="GoDash();">
                                <v-icon icon="mdi-account-star"></v-icon>&nbsp;Ir para minha Conta<v-icon
                                    icon="mdi-chevron-right"></v-icon>
                            </v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>

            <!-- ACCESS DENIED -->
            <div id='adn' style="display:none;">

                <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->


                <v-card class="pa-5 pb-1 ma-2 orange-lighten-3" elevation="8" max-width="448" rounded="sm"
                    margin-left="4" style="opacity:0.9;">

                    <v-spacer></v-spacer>

                    <v-img class="mx-auto my-6" max-width="228"
                        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

                    <v-divider></v-divider>

                    <div class="py-0 text-center">
                        <v-icon class="mb-6" color="warning" icon="mdi-lock" size="108"></v-icon>

                        <div class="text-h6 font-weight-bold">Esta página expirou!</div>
                        <br>
                        <p class="text-caption">Não tem permissões para ver essa página porque expirou em <span
                                class="text-subtitle-3" id="tkExpDate" style="font-weight:500"></span> Clique no
                            botão
                            abaixo voltar ao início.
                        </p>
                    </div>

                    <!-- <v-divider></v-divider> -->

                    <div class="or pb-2" style="font-size: 10pt; font-weight: 500;">OU</div>


                    <!-- LOGIN BUTTONS -->
                    <v-card-text class="text-center pb-7">

                        <v-row>
                            <v-btn variant="tonal" color="black" size="large" block rounded="0"
                                rel="noopener noreferrer" target="/register" @click="GoHome();">
                                <v-icon icon=" mdi-arrow-left-circle"></v-icon>&nbsp;Voltar
                            </v-btn>
                            <br>
                            <!-- 
                            <v-btn variant="tonal" size="large" block rounded="0" class="text-blue text-decoration-none"
                                rel="noopener noreferrer" target="/register"
                                @click="GoHome(); loginError = false; emptyFields = false;">
                                <v-icon icon="mdi-account-star"></v-icon>&nbsp;Ir para minha Conta<v-icon
                                    icon="mdi-chevron-right"></v-icon>
                            </v-btn> -->
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
        </div>

    </v-form>
</template>


<script setup>

import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.


// useTokenStore
import { ref, onMounted } from 'vue';
import { useTokenStore } from '@/store/TokenStore';
import axios from 'axios'
import router from '@/router';
import { useRouter } from 'vue-router';
import { validate } from "vee-validate";
import { useField, useForm } from "vee-validate";
import { reactive } from 'vue'

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        // LOGIN
        logUser(value) {
            if (value?.length >= 2) return true
            return 'Campo obrigatório'
        },
        logPwd(value) {
            if (value?.length >= 2) return true
            return 'Campo obrigatório'
        },
        // PWD
        pwdEmail(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return 'Formato de e-mail válido'
        },
        pwdPhone(value) {
            if (value?.length > 8 && /[0-9-]+/.test(value)) return true
            return 'Formato: 912345678'
        },

        // REG
        regFullName(value) {
            if (value?.length >= 2) return true
            return 'Este campo deve conter no minímo 2 caractéres'
        },
        regEmail(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return 'Este campo deve conter no minímo 2 caractéres'
        },
        regPhone(value) {
            if (value?.length >= 8 && /[0-9-]+/.test(value)) return true
            return 'Formato: 912345678'
        },
        regPwd(value) {
            if (value?.length > 2 && /[0-9-]+/.test(value)) return true
            return 'Este campo deve conter no minímo 2 caractéres'
        },
        regPwd2(value) {
            if (value?.length > 2 && /[0-9.-]+/.test(value)) return true
            return 'Este campo deve conter no minímo 2 caractéres'
        },
        agreementR(value) {
            if (value == '1') return true

            return 'Deve selecionar antes de continuar'
        },
        Sex(value) {
            if (value != null) return true
            return 'Deve selecionar antes de continuar'
        },
        DOB(value) {
            if (value != null) return true
            return 'Deve selecionar antes de continuar'
        },
        Likes(value) {
            if (value != null) return true
            return 'Deve selecionar antes de continuar'
        },
    }
})

const logUser = useField('logUser')
const logPwd = useField('logPwd')
const regEmail = useField('regEmail')
const regFullName = useField('regFullName')
const regPhone = useField('regPhone')
const regPwd = useField('regPwd')
const regPwd2 = useField('regPwd2')
const pwdEmail = useField('pwdEmail')
const pwdPhone = useField('pwdPhone')
const agreementR = useField('agreementR')
const Sex = useField('Sex')
const DOB = useField('DOB')
const Likes = useField('Likes')

const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
})


const callback = (response) => {
    // console.log("Handle the response", response)
    const PayLoad = decodeJwtResponse(response.credential)
    console.log("Handle the response", PayLoad)
    // alert(PayLoad.email)
    TokenStore.setToken(response.credential, true);
    window.localStorage.setItem('username', PayLoad.name)
    window.localStorage.setItem('family_name', PayLoad.family_name)
    window.localStorage.setItem('given_name', PayLoad.given_name)
    window.localStorage.setItem('email', PayLoad.email)
    window.localStorage.setItem('myPicture', PayLoad.picture)
    window.localStorage.setItem('JwtToken', response.credential)
    window.location = '/dashboard'
}

const callbackReg = (response) => {
    // console.log("Handle the response", response)
    const PayLoad = decodeJwtResponse(response.credential)
    console.log("Handle the response", PayLoad)
    // alert(PayLoad.email)
    // TokenStore.setToken(response.credential, true);

    window.localStorage.setItem('username', PayLoad.name)
    window.localStorage.setItem('family_name', PayLoad.family_name)
    window.localStorage.setItem('given_name', PayLoad.given_name)
    window.localStorage.setItem('email', PayLoad.email)
    window.localStorage.setItem('myPicture', PayLoad.picture)

    this.regFullName = PayLoad.family_name

    Register();
}

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

// import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

// createApp(App).use(Particles, {
init: async engine => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
    // },
};

onMounted(() => {

});
</script>

<script>
const TokenStore = useTokenStore();
const newToken = ['ljahsdfq697e69qwerq', 'Vasco Gungui', 'Administrator']
let _JwtToken;
let _account;
let activePanel;

export default {
    data: () => ({
        activePanel: 'log',
        PWE1: '',
        resetPwdOk: false,
        MainPanel: false,
        ActIncPwd: false,
        ActEmpty: false,
        ActExist: false,
        ActExistF: false,
        myInterests: ['Tecnológia', 'Portáteis', 'Telefones', 'Impressoras', 'Auriculares', 'Acessórios', 'Consumiveis', 'Comunicação', 'Web', 'Payrol', 'SMS/E-mail'],
        sexCombo: ['Homem', 'Mulher'],
        tab: null,
        bgimage: "https://www.verangola.net/va/images/cache/750x380/crop/images%7Ccms-image-000008157.jpg",
        joke: '',
        username: '',
        password: '',
        show1: false,
        show2: true,
        alert: 'log',
        resetPwd: false,
        visible: false,
        loginError: false,
        emptyFields: false,
        loading: false,
        loaded: false,
        notifyAlert: false,
        agreement: false,
        rules: {
            email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
            length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
            password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
                'Password must contain an upper case letter, a numeric character, and a special character',
            required: v => !!v || 'Este campo é obrigatório',
        },
        nameRules: [
            value => !!value || 'Campo obrigatório.'
            // min: v => v.length >= 8 || 'Min 8 carácteres',
            // emailMatch: () => (`The email and password you entered don't match`),
        ],
        pwdRules: [
            value => !!value || 'Campo obrigatório.',
            // min: v => v.length >= 8 || 'Min 8 carácteres',
            // emailMatch: () => (`The email and password you entered don't match`),
        ],
        userDetails: []

    }),

    watch: {
        loading(val) {
            if (!val) return

            setTimeout(() => (this.loading = false), 1000)
        },
    },
    setup() {

    },
    methods: {

        decodeJwtResponse: function (token) {
            var base64Url = token.split(".")[1];
            var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            var jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );
            return JSON.parse(jsonPayload);
        },

        CheckAccount: async function () {
            const PayLoad = this.decodeJwtResponse(_JwtToken)

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + _JwtToken
                }
            }

            await axios.get('Account/' + PayLoad.act, config)
                .then(
                    (response) => { 

                        // alert(response.request.status)

                        if (response.request.status == '400') {
                            const dt = new Date(0)
                            dt.setTime(PayLoad.iat * 1000)

                                document.getElementById('tkExpDate').innerText = dt
                                document.getElementById('adn').style.display = "block"
                        }
                        else if (response.request.status == '200') {
                            this.ActivateAccount();
                            document.getElementById('don').style.display = "block"
                        }  
                        else if (response.request.status == '500') {
                            document.getElementById('tkExpDate').innerText = dt
                            document.getElementById('adn').style.display = "block"
                        }                      
                    }
                )
                .catch(
                    (error) => {
                        return error.response;
                    }
                )
        },

        ActivateAccount: function () {
            const PayLoad = this.decodeJwtResponse(_JwtToken)

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + _JwtToken
                }
            }
            axios.put('Account',
                {
                    Email: PayLoad.act,
                    Stat: "true"
                }, config)
                .then(
                    (response) => { }
                )
                .catch(
                    (error) => {
                        return error.response;
                    }
                )
        },

        LoadPage: function () {

            let uri = window.location.href.split('?')
            _JwtToken = uri[1]

            window.localStorage.setItem('JwtToken', _JwtToken)
            const PayLoad = this.decodeJwtResponse(_JwtToken)

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + _JwtToken
                }
            }

            axios.post('AuthJwtDecode?token_=' + _JwtToken, config)
                .then(
                    (response) => {

                        if (response.request.status == '400') {
                            const dt = new Date(0)
                            dt.setTime(PayLoad.iat * 1000)

                            document.getElementById('tkExpDate').innerText = dt
                            document.getElementById('adn').style.display = "block"
                            // document.getElementById('act').style.display = "block"
                        }
                        if (response.request.status == '200') {

                            const dt = new Date(0)
                            dt.setTime(PayLoad.iat * 1000)


                            if (PayLoad.exp < Date.now() / 1000) {

                                document.getElementById('tkExpDate').innerText = dt
                                document.getElementById('adn').style.display = "block"
                            }
                            else {
                                this.CheckAccount();
                            }
                        }
                    }
                )
                .catch((err) => {
                    alert(err)
                });
        },
        GoHome: function () {
            window.location = '/'
        },
        GoDash: async function () {

            const PayLoad = this.decodeJwtResponse(_JwtToken)

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + _JwtToken
                }
            }

            await axios.get('AccountLogin?xid=' + PayLoad.act, config)
                .then(
                    (response) => {

                        if (response.request.status == '200') {
                            //SET USER DATA
                            window.localStorage.setItem('username', PayLoad.act),
                                window.localStorage.setItem('myPicture', "https://media.istockphoto.com/id/513501731/pt/vetorial/silhueta-de-uma-mulher-cabe%C3%A7a.jpg?s=612x612&w=0&k=20&c=LF6Sto6AB8taV1HGAZaqJ5rubniAXPyeSxQ-fgxa12w="),

                                window.localStorage.removeItem('PWE'),
                                window.localStorage.removeItem('PWD'),
                                window.location = PayLoad.url
                        }
                    }
                )
                .catch((err) => {

                });
        },
        parseJwt: function () {
            let uri = window.location.href.split('?')
            let xta = uri[0].split('=')

            _JwtToken = uri[1].split('=')
            _account = uri[2].split('=')
        },
        created() {
            let urlParams = new URLSearchParams(window.location.search);
            console.log(urlParams.has('acc')); // true
            console.log(urlParams.get('yourParam')); // "MyParam"
        },
        RegComplete: function () {
            this.alert = 'done'
            if (this.notifyAlert == true) {
                // alert(true)
            }
        },
        reset() {
            // this.$refs.form.reset()
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        submit: function () {
            this.$refs.form.$el.submit();
        },

        onflicker() {
            // alert(regFullName)
        },
        onSuccess(googleUser) {
            console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
        },
        onFailure(error) {
            console.log(error);
        },
        renderButton() {
            gapi.signin2.render('my-signin2', {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': onSuccess,
                'onfailure': onFailure
            });
        },
        checkInput: function () {
            window.localStorage.setItem('JwtToken', JSON.stringify(newToken));
            this.$router.push({ path: `/dashboard` })
        },
        handleSubmit() {

        },
        async ShowData() {
            let config = {
                headers: {
                    'Accept': 'application/json'
                }
            }

            // const joke = await axios.get('https://icanhazdadjoke.com', config);
            // const joke = await axios.get('https://rest.bissonde.ao/api/account', config);
            const joke = await axios.get('https://localhost:7127/api/account/cubenda@gmail.com', config);
            console.log(joke.data);
        },
        Send_Email_Client: async function (token, mode, USR, TEL) {

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + _JwtToken
                }
            }

            let IpValue = window.localStorage.getItem('IP')
            let IpGeoLoc = window.localStorage.getItem('GEO')
            let IpDevice = window.localStorage.getItem('DEV')

            if (token != undefined) {
                await axios.post('Messages',
                    {
                        partnerID: '',
                        branch: '',
                        CRDATE: '',
                        ADMIN: '',
                        CLIENT: USR,
                        DEST: TEL,
                        CC: '',
                        BCC: '',
                        TOPIC: mode,
                        MESSAGE1: _JwtToken,
                        IP: IpValue,
                        DEVICE: IpDevice,
                        GEOLOCATION: IpGeoLoc
                    }, config)
                    .then(
                        (response) => {
                            if (response.request.status == '400') {

                            }
                            if (response.request.status == '200') {

                                // this.requestPwdChg = false;
                                // document.getElementById('rstPwd').style.display = "none"
                                // document.getElementById('topProgress').style.display = "none"
                                // this.isFormValid = false
                                // document.getElementById('rstPwdOk').style.display = "block"
                            }
                        }
                    )
                    .catch((err) => {

                    });
            }
        },

        ResetPassword: async function () {

            this.notifyAlert = false;
            this.ActIncPwd = false;

            if (PWD1 == "" || PWD2 == "") {
                this.ActExist = false;
                this.ActEmpty = true;
                this.resetPwdOk = true;
                return;
            }
            else {
            }

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + _JwtToken
                }
            }

            await axios.put('AuthPwd?',
                {
                    Email: PWE,
                    Pass: PWD1,
                    TokenId: _JwtToken
                },
                config)
                .then(
                    (response) => {

                        // document.getElementById('topProgress').style.display = "block"

                        this.notifyAlert = false
                        this.ActExistF = false
                        this.ActExist = false

                        this.loginError = false,
                            this.emptyFields = false

                        // alert(response.data.token)

                        if (response.request.status == '400') {
                            document.getElementById('act').style.display = "block"
                        }
                        if (response.request.status == '200') {

                            this.Send_Email_Client(_JwtToken, 'Password Alterada', PWE, PWD1)

                            window.localStorage.setItem('PWE', PWE)
                            window.localStorage.setItem('PWD', PWD1)

                            // document.getElementById('log').style.display = "none"
                            document.getElementById('don').style.display = "block"
                        }
                    }
                )
                .catch((err) => {
                    alert(err.response)
                });
        },

        load() {
            // if (this.emptyFields === false) {
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.loaded = true
                this.AuthLogin()
            }, 500)
            // }

        },

        async validate() {
            const { valid } = await this.$refs.form.validate()
            alert(valid)
        }
    },
    beforeMount() {

        this.LoadPage();

    },
    computed: {

    },
    validations() {
        return {
            fullname: { required },
            email: { required },
            phone: { required },
            password: { required }
        }
    }
}
</script>


<style lang="css" scoped>
.circular {
    width: 100%;
    height: 100%;
    background-size: cover;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
}

.h2 {
    font-size: 1.8em;
}

.v-text-field:deep() {
    font-size: 12px;
    height: 25%;
}

.or {
    text-align: center;
    font-size: 20px;
    background:
        linear-gradient(#000 0 0) left,
        linear-gradient(#000 0 0) right;
    background-size: 40% 1px;
    background-repeat: no-repeat;
}
</style>