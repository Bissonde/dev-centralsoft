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

        <div class="d-flex align-center justify-center" width="500" max-width="456" style="height: 100vh;">

            <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->

            <!-- class="pa-5 pb-8 ma-2" -->
            <v-card id="dvLogin" class="pa-3 pb-0 ma-4" elevation="8" max-width="448" rounded="sm" margin-left="4"
                style="opacity:0.9;">

                <v-toolbar color="deep-blue-accent-4" cards dark flat>
                    <v-btn @click="handleReset, emptyFields = false" icon>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <v-card-title class="mx-auto my-8">
                        Alterar Palavra-Passe
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="handleReset, emptyFields = false;" icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-img class="mx-auto my-6" max-width="228"
                    src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>


                <v-alert v-model="emptyFields" class="mb-5 mt-5" border="start" variant="tonal" closable
                    close-label="Close Alert" color="warning" title="Atenção!" type="warning">
                    Preencha e-mail / palavra-passe
                </v-alert>

                <v-alert v-model="resetPwdOk" class="mb-5 mt-5" border="start" variant="tonal" closable
                    close-label="Close Alert" color="warning" title="Atenção!" type="warning">
                    Preencha todos os campos abaixo!
                </v-alert>

                <v-alert v-model="ActExist" class="mb-5 mt-5" border="start" variant="tonal" closable
                    close-label="Close Alert" color="error" title="Erro!" type="error">
                    Esta conta não existe!
                </v-alert>

                <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                <v-text-field density="compact" id="PWE" v-model="logUser.value.value" v-bind="$attrs" disabled
                    :error-messages="logUser.errorMessage.value" placeholder="Introduza e-mail" required
                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Nova Palavra-passe

                    <v-btn class="text-caption text-decoration-none text-blue" variant="text"
                        @click="alert = 'pwd'; loginError = false;">
                        <v-icon icon="mdi-help-circle"></v-icon>&nbsp;Esqueceu a palavra-passe?</v-btn>
                </div>

                <v-text-field id="PWD1" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Introduza palavra-passe"
                    v-model="logPwd.value.value" clearable :error-messages="logPwd.errorMessage.value"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    required></v-text-field>


                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Repetir Palavra-passe
                </div>

                <v-text-field id="PWD2" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Introduza palavra-passe"
                    v-model="logPwd.value.value" clearable :error-messages="logPwd.errorMessage.value"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    required></v-text-field>
                <!-- <v-card-text class="text-center pt-0"> -->
                <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                <v-alert v-if="loginError" rounded="0" class="text-caption font-weight-regular" text="Após 3 tentativas consecutivas de login malsucedidas, sua conta será temporariamente
                            bloqueada por três horas." type="error" variant="tonal">
                    <!-- <hr/> Se precisar fazer login agora, você também pode clicar em Esqueceu a senha de -->
                    <!-- login? abaixo para redefinir a senha de login. -->
                </v-alert>


                <!-- </v-card-text> -->
                <!-- <v-card class="mb-4" width="200" color="surface-variant" variant="text">
                        <v-card-text style="color: white;" class="text-medium-emphasis text-caption surface-variant" color="surface-variant">
                            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                <!-- Aviso: Preencha todos os campos para prosseguir com o início de sessão. -->
                <!-- </v-card-text> -->
                <!-- </v-card> -->

                <!-- LOGIN BUTTONS -->
                <v-card-text class="text-center pt-0">

                    <v-row>
                        <v-col cols="md-6">
                            <div class="text-caption text-decoration-none text-blue">
                                Já tem uma conta?
                            </div>
                            <v-btn variant="tonal" color="blue-accent-0" size="large" block rounded="0"
                                class="text-decoration-none mb-0 flex-grow-1" rel="noopener noreferrer" target="/."
                                @click="GoHome(); loginError = false;">
                                <v-icon icon="mdi-arrow-left-circle"></v-icon>&nbsp;Voltar
                            </v-btn>
                        </v-col>

                        <v-col cols="md-6">
                            <div class="text-caption text-decoration-none text-blue">
                                És novo aqui?
                            </div>
                            <v-btn variant="flat" size="large" block rounded="0"
                                class="text-blue text-decoration-none mb-0 flex-grow-1" rel="noopener noreferrer"
                                :loading="loading" @click="loading = !loading, ResetPassword()">
                                <v-icon icon="mdi-check"></v-icon>&nbsp;Confirmar<v-icon
                                    icon="mdi-chevron-right-1"></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- DONE -->
            <div id="rstPwdOk" style="display: none;">

                <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->


                <v-card class="pa-5 pb-1 ma-2 blue-lighten-3" elevation="8" max-width="448" rounded="sm" margin-left="4"
                    style="opacity:0.9;">

                    <v-spacer></v-spacer>

                    <v-img class="mx-auto my-6" max-width="228"
                        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

                    <v-divider></v-divider>

                    <div class="py-12 text-center">
                        <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="108"></v-icon>

                        <div class="text-h6 font-weight-bold">Parabéns!</div>
                        <br>
                        <p class="text-caption">A sua palavra-passe foi alterada com sucesso. <span
                                class="text-subtitle-1" id="PWE1" style="font-weight:500"></span> e já podes aceder ao
                            nosso portal.
                            <br>Abra-o clicando no botão abaixo!
                        </p>
                    </div>

                    <!-- <v-divider></v-divider> -->

                    <div class="or pb-10" style="font-size: 10pt; font-weight: 500;">OU</div>


                    <!-- LOGIN BUTTONS -->
                    <v-card-text class="text-center pt-0">

                        <v-row>


                            <v-btn variant="tonal" size="large" block rounded="0" class="text-blue text-decoration-none"
                                rel="noopener noreferrer" target="/register"
                                @click="GoDash(); loginError = false; emptyFields = false;">
                                <v-icon icon="mdi-account-star"></v-icon>&nbsp;Ir para minha Conta<v-icon
                                    icon="mdi-chevron-right"></v-icon>
                            </v-btn>
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

    // window.localStorage.setItem('JwtToken', response.credential)
    // window.location = '/dashboard'
}

function decodeJwtResponse(token) {
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
    // alert(TokenStore.tokenID) 
    // this.regFullName = window.localStorage.getItem('given_name') + ' ' + window.localStorage.getItem('family_name')
    // this.regEmail = window.localStorage.getItem('email')
    // alert(this.regEmail)

    // gapi.signin2.render('g_id_register', {
    //     onsuccess: this.Register
    // })
    async function GetAccount(pay) {
        let config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + _JwtToken
            }
        }

        axios.post('auth?username=admin&password=auth')
            .then(
                (response) => {
                    
                    let configx = {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + response.data.token
                        }
                    }

                    // alert(response.data.token)
                    axios.get('Account/' + pay, configx)
                        .then(
                            (response) => {
                                alert(response)
                                if (response.request.status == '400') {

                                    if (response.request.response == "Not found.") {

                                    }
                                }
                                if (response.request.status == '200') {

                                }
                            }
                        )
                        .catch((err) => {
                            alert(err)
                        });
                })
            .catch((err) => {
                alert(err)
            });
    }

    if (window.localStorage.getItem('JwtToken') != null) {
        // window.location = '/dashboard'
    }
    else {
    }

    // let urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams.has('acc')); // true
    // console.log(urlParams.get('yourParam')); // "MyParam"

    // parseJwt();

    let uri = window.location.href.split('?')
    _JwtToken = uri[1]
    // _account = uri[2].split('=')


    // alert(_JwtToken)
    // alert(_account)

    let config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + _JwtToken
        }
    }

    axios.post('AuthJwtDecode?token_=' + _JwtToken, config)
        .then(
            (response) => {
                // window.location = '/profile'
                // alert(response.request.status)
                // console.log(response.request.status)

                if (response.request.status == '400') {

                }
                if (response.request.status == '200') {
                    const PayLoad = decodeJwtResponse(_JwtToken)
                    document.getElementById('PWE').value = PayLoad.act;

                    if(PayLoad.exp < Date.now() / 1000)
                    {
                        alert("You don't have persmission. This page has expired!")
                    }
                    // alert(PayLoad.acc)
                }
            }
        )
        .catch((err) => {
            alert(err)
        });
});
</script>

<script>
const TokenStore = useTokenStore();
const newToken = ['ljahsdfq697e69qwerq', 'Vasco Gungui', 'Administrator']
let _JwtToken;
let _account;


export default {
    data: () => ({
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
        // const router = useRouter();

        // const AuthLogin = async e => {
        //     const form = new FormData(e.target);

        //     const inputs = Object.fromEntries(form.entries());

        //     await axios.post('auth', inputs);

        //     // await router.push('/dashboard');
        // }       

    },
    methods: {
        
        GoHome: function () {
            window.location = '/'
        },
        GoDash: function () {
            window.location = '/dashboard'
        },
        parseJwt: function () {
            let uri = window.location.href.split('?')
            let xta = uri[0].split('=')

            _JwtToken = uri[1].split('=')
            _account = uri[2].split('=')

            document.getElementById('LGU').value = _account;

            // alert(_JwtToken)
            // alert(_account)
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
            // window.location = '/dashboard'
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

        ResetPassword: async function () {

            this.notifyAlert = false;
            this.ActIncPwd = false;

            var PWE = document.getElementById('PWE').value
            var PWD1 = document.getElementById('PWD1').value
            var PWD2 = document.getElementById('PWD2').value

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

            await axios.put('AuthPwd?username=' + PWE + '&pwd=' + PWD1, config)
                .then(
                    (response) => {

                        document.getElementById('topProgress').style.display = "block"

                        this.notifyAlert = false
                        this.ActExistF = false
                        this.ActExist = false

                        this.loginError = false,
                            this.emptyFields = false

                        if (response.request.status == '400') {
                            // this.ActExist = true;
                            if (response.request.response == "Not found.") {
                                this.ActExist = true;
                            }
                        }
                        if (response.request.status == '200') {
                            document.getElementById('dvLogin').style.display = "none"
                            document.getElementById('topProgress').style.display = "none"
                            // document.getElementById('dvDonePwd').style.display = "block"
                            document.getElementById('rstPwdOk').style.display = "block"
                        }
                    }
                )
                .catch((err) => {
                    alert(err.response)
                    if ((LGU == '' || LPW == '')) {
                        this.loginError = false
                        this.emptyFields = true
                    }
                    else {
                        this.emptyFields = false
                        this.loginError = true
                    }
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