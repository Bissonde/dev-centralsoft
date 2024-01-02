<template>
    <!-- <div> -->

    <!-- </div> -->

    <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="{
        background: {
            color: {
                value: '#0d47a1'
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
                    enable: true,
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
                    opacity: 0.8,
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
                value: '#ffffff'
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: 'bounce',
                random: false,
                speed: 5,
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


    <v-form fast-fail @submit.prevent="AuthLogin">
        <!-- LOGIN -->
        <div class="d-flex align-center justify-center" width="600" max-width="456" v-if="alert == 'log'"
            style="height: 90vh;" :style="bottom - gradient">

            <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->


            <v-card class="pa-5 pb-8 ma-2" elevation="8" max-width="448" rounded="sm" margin-left="4" style="opacity:0.9;">

                <v-img class="mx-auto my-6" max-width="228"
                    src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

                <div class="pt-1 d-flex align-center justify-center">
                    <h3> <v-icon icon="mdi-login"></v-icon>&nbsp;Iniciar Sessão</h3>
                </div>

                <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                <v-text-field density="compact" v-model="username" placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Palavra-passe

                    <v-btn class="text-caption text-decoration-none text-blue" variant="text"
                        @click="alert = 'pwd'; loginError = false;">
                         <v-icon icon="mdi-help-circle"></v-icon>&nbsp;Esqueceu a palavra-passe?</v-btn>
                </div>

                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" v-model="password" placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="visible = !visible"></v-text-field>

                    <v-card-text class="text-center pt-0">
                        <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                        <v-alert v-if="loginError" rounded="0" class="text-caption" closable text="Após 3 tentativas consecutivas de login malsucedidas, sua conta será temporariamente
                            bloqueada por três horas." type="error" variant="tonal">
                             <!-- <hr/> Se precisar fazer login agora, você também pode clicar em Esqueceu a senha de -->
                                    <!-- login? abaixo para redefinir a senha de login. -->
                            </v-alert>
                   </v-card-text>
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
                            <v-btn type="submit" rounded="0" block class="mb-0" color="blue-darken-4" size="large"
                                variant="flat">
                                <v-icon icon="mdi-login"></v-icon>&nbsp;Entrar
                            </v-btn>
                        </v-col>

                        <v-col cols="md-6">
                            <v-btn variant="tonal" size="large" block rounded="0" class="text-blue text-decoration-none"
                                rel="noopener noreferrer" target="/register" @click="alert = 'reg'; loginError = false;">
                                <v-icon icon="mdi-account-plus"></v-icon>&nbsp;Inscreva-se<v-icon icon="mdi-chevron-right"></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>

                <div class="or" style="font-size: 10pt; font-weight: 500;">OU</div>

                <v-card-text class="text-center pt-5">
                    <GoogleLogin :callback="callback" block  data-width="300" id="g_id_onload" data-type="icon" class="text-center pt-0"
                        data-shape="rectangular" style="font-size: 18pt;" />
                </v-card-text>

                <!-- <v-card class="mb-4 rounded-0" color="surface-variant" variant="tonal">
                    <v-card-text class="text-medium-emphasis text-caption">
                        Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
                       ---
                    </v-card-text>
                </v-card> -->


            </v-card>
        </div>

        <!-- RESET PWD -->
        <div class="d-flex align-center justify-center" width="600" max-width="456" v-if="alert == 'pwd'"
            style="height: 85vh;" :style="bottom - gradient">

            <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->


            <v-card class="pa-5 pb-8 ma-2" elevation="8" max-width="448" rounded="sm" margin-left="4" style="opacity:0.9;">
                <v-btn color="deep-purple" variant="text" @click="alert = 'log'" icon="mdi-arrow-left">
                </v-btn>

                <v-btn :v-slot:append="right" color="deep-purple" variant="outlined" target="_blank" @click=""
                    icon="mdi-help">
                </v-btn>

                <v-img class="mx-auto my-6" max-width="228"
                    src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

                <div class="pt-1 d-flex align-center justify-center">
                    <h3> <v-icon icon="mdi-lock-off-outline"></v-icon>&nbsp;Esqueceu a Palavra-Passe?</h3>
                </div>

                <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                <v-text-field density="compact" v-model="username" placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>


                <div class="text-subtitle-1 text-medium-emphasis">Telefone</div>

                <v-text-field density="compact" placeholder="Telemóvel" prepend-inner-icon="mdi-phone-outline"
                    variant="outlined"></v-text-field>

                <v-card class="mb-4" color="red-accent-4" v-if="loginError" variant="tonal">
                    <v-card-text class="text-medium-emphasis text-caption">
                        <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                        <v-icon>mdi-alert</v-icon>&nbsp;E-mail/Palavra-passe errados!
                    </v-card-text>
                </v-card>

                <!-- <v-card class="mb-4" color="surface-variant" variant="tonal"> -->
                    <!-- <v-card-text class="text-medium-emphasis text-caption"> -->
                        <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                        <!-- Aviso: Irá receber um link por e-mail / sms para proceder a alteração da sua palavra-passe. -->
                    <!-- </v-card-text> -->
                <!-- </v-card> -->


                <v-card-text class="text-center">

                    <v-row>
                        <v-col cols="md-6">
                            <v-btn type="submit" rounded="0" block class="mb-0" color="blue-darken-4" size="large"
                                variant="flat">
                                 <v-icon icon="mdi-lock-reset"></v-icon>&nbsp;Recuperar
                            </v-btn>
                        </v-col>

                        <v-col cols="md-6">
                            <v-btn variant="tonal" size="large" block rounded="0" class="text-blue text-decoration-none"
                                rel="noopener noreferrer" target="/register" @click="alert = 'reg'; loginError = false;">
                                 <v-icon icon="mdi-account-plus"></v-icon>&nbsp;Inscreva-se<v-icon icon="mdi-chevron-right"></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>

        <!-- REGISTER -->
        <div class="d-flex align-center justify-center" width="600" max-width="456" v-if="alert == 'reg'"
            style="height: 100vh;" :style="bottom - gradient">


            <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->

            <v-card class=" pa-5 pb-8 ma-2" elevation="8" max-width="448" rounded="sm" margin-left="4" style="opacity:0.9;">
                <v-btn color="deep-purple" variant="text" @click="alert = 'log'" icon="mdi-arrow-left">
                </v-btn>

                <v-btn :v-slot:append="right" color="deep-purple" variant="outlined" target="_blank" @click=""
                    icon="mdi-help">
                </v-btn>

                <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->



                <div class="d-flex align-center justify-center">
                    <h3> <v-icon icon="mdi-account-plus"></v-icon>&nbsp;Inscreva-se</h3>
                </div>

                <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                    variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">Nome completo</div>

                <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-account-outline"
                    variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">Telefone</div>

                <v-text-field density="compact" placeholder="Telemóvel" prepend-inner-icon="mdi-phone-outline"
                    variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Palavra-passe

                    <!-- <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                    Esqueceu a palavra-passe?</a> -->
                </div>

                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

                <v-card class="mb-4" color="surface-variant" variant="tonal">
                    <v-card-text class="text-medium-emphasis text-caption surface-variant" color="surface-variant">
                        <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                        Aviso: Preencha todos os campos para prosseguir com a criação da sua conta.
                    </v-card-text>
                </v-card>

                 <div class="or" style="font-size: 10pt; font-weight: 500;">OU</div>

                    <v-card-text class="text-center pt-5">
                        <GoogleLogin :callback="callback"  data-width="300" id="g_id_onload" data-type="icon" class="text-center pt-0"
                            data-shape="rectangular" style="font-size: 18pt;" />
                    </v-card-text>

                <v-btn block class="mb-0 rounded-0" color="blue-darken-4" size="large" variant="flat">
                     <v-icon icon="mdi-login"></v-icon>&nbsp;Terminar
                </v-btn>

                <!-- <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                    Inscreva-se agora<v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text> -->
            </v-card>
        </div>


        <div class="d-flex align-center justify-center" style="height: 100vh;" :style="bottom - gradient" v-if="alert == 5">

            <!-- background-color: white; background-image:url(https://picsum.photos/1920/1080?random); background-repeat: no-repeat; background-size: cover;  -->

            <!-- <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" url="http://foo.bar/particles.json" /> -->


            <v-sheet width="600" class="ma-3 pa-3 mr-4 rounded-sm" style="opacity:0.9; background: white;" max-width="456"
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
                    <h3> <v-icon icon="mdi-login"></v-icon>&nbsp;Iniciar Sessão</h3>
                    <!-- <p>{{ joke }}</p> -->
                </div>
                <br>



                <v-form fast-fail @submit.prevent="AuthLogin">
                    <v-text-field class="text-subtitle-1" :rules="[rules.required, rules.min]" variant="outlined"
                        prepend-inner-icon="mdi-account" v-model="username" label="Nome de utilizador"></v-text-field>
                    <!-- style="height: 50px; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;" -->
                    <!-- <br> -->
                    <v-text-field class="text-subtitle-1" variant="outlined" prepend-inner-icon="mdi-lock"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[pwd.required, pwd.min]"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" hint="Pelo menos 8 caracteres" counter
                        @click:append="show1 = !show1" v-model="password" label="Palavra-passe"
                        type="password"></v-text-field>
                    <a href="#" class="text-caption font-weight-regular">Esqueceu a sua palavra-passe?</a>

                    <v-btn type="submit" color="primary" block class="mt-2" :ripple="true" :disabled="loading"
                        :loading="loading" prepend-icon="mdi-login">Login</v-btn>
                    <!-- v-on:click="TokenStore.setToken(newToken, true);" -->
                    <!-- @click="AuthLogin();" -->

                </v-form>
                <div class="mt-2">
                    <p class="text-body-2">Não tem uma conta? <a href="/register">Subscreva</a></p>
                </div>
            </v-sheet>


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
// const particlesLoaded = async container => {
//     console.log("Particles container loaded", container);
// };

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
    if (window.localStorage.getItem('JwtToken') != null) {
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
        joke: '',
        username: '',
        password: '',
        show1: false,
        show2: true,
        password: '',
        alert: 'log',
        resetPwd: false,
        visible: false,
        loginError: false,
        rules: {
            required: value => !!value || 'Campo obrigatório.',
            min: v => v.length >= 8 || 'Min 8 carácteres',
            emailMatch: () => (`The email and password you entered don't match`),
        },
        pwd: {
            required: value => !!value || 'Campo obrigatório.',
            min: v => v.length >= 8 || 'Min 8 carácteres',
            emailMatch: () => (`The email and password you entered don't match`),
        },
        userDetails: []

    }),
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
            //  alert(TokenStore.tokenID);
            // alert(useModule.dialog)
            // alert(this.isOkToSubmit)
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
        AuthLogin: async function () {

            // this.alert(true)
            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer'
                }

            }

            let auth = {
                username: this.username, //this.username,
                password: this.password //this.password
            };

            var acc = JSON.stringify(auth);

            const joke = await axios.post('auth?username=' + this.username + '&password=' + this.password, config, acc)

                // const newToken = ['ljahsdfq697e69qwerq', 'Vasco Gungui', 'Administrator']

                .then(
                    (response) => {
                        console.log(response.data),
                            //SET USER DATA
                            TokenStore.setToken(response.data, true);

                        window.localStorage.setItem('username', this.username)
                        // window.localStorage.setItem('JwtToken', response.data.token)
                        window.localStorage.setItem('JwtToken', response.data.token)
                        window.location = '/dashboard'
                    }
                )
                .catch((err) => {
                    console.log(err.response)
                    this.loginError = true
                });


            // console.log(joke.data);

            // const URL = 'https://localhost:7127/api/auth';

            // let config = {
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // }
            // let auth = {
            //     username: 'cubenda@gmail.com', //this.username,
            //     password: '123' //this.password
            // };

            // axios.post(URL, auth, config)
            //     .then(function (response) {
            //         // console.log(response);
            //     })
            //     .catch(function (error) {
            //         // console.log(error)
            //     });




            // const joke = await axios.get('https://icanhazdadjoke.com', config);
            // console.log(joke.data);

            // try{
            //     const response = await axios.get(
            //         'https://localhost:7127/api/auth',
            //         {
            //             auth:{
            //                username: this.username,
            //                 password: this.password,
            //             },
            //         },
            //     );

            //     return response.data;
            // }
            // catch(err){
            //     console.log(err.message)
            //     console.log(err.response.status)
            // }

            // this.login().then(data => {
            //     console.log(data);
            // });

            // Your login logic here
            // axios.get('https://jsonplaceholder.typicode.com/posts/1')
            // alert(this.username)
            // axios.get('http://rest.bissonde.ao/api/Account/' + this.username)

            //  axios.get('https://rest.bissonde.ao/api/Account/' + this.username)






            // const auth = {
            //     username: this.username,
            //     password: this.password
            // };
            // // console.log(data1);

            // await axios.post('https://localhost:7127/api/auth', auth)
            // .then(
            //     res => {
            //         console.log(res)
            //     }
            // ).catch(
            //     err => {
            //         console.log(err)
            //     }
            // )







            //  axios.get('https://localhost:7127/api/Account/' + this.username)
            //         .then(function(response)
            //         {
            //            console.log(response.data.email + ' ' + response.data.pass + ' ' + response.data.ask)
            //         }) 

            // axios.get('https://rest.bissonde.ao/api/Account/' + this.username,
            // )
            //     .then(function (response) {
            // console.log(response.data.email + ' ' + response.data.pass + ' ' + response.data.ask)

            // let usr = response.data.email;
            // let pwd = response.data.pass;

            // if(this.username == usr & this.password == pwd)
            // {
            //     alert("Success")
            // }
            // else{
            //     alert("false")
            // }
            // });

            //    {
            //     console.log(response.data)
            //    })

            // const AxiosHeaders = {
            //     'Content-Type': 'application/json; charset=UTF-8',
            // };

            // const url = 'https://localhost:7127/api/Account/cubenda@gmail.com';

            // axios.get(url, { AxiosHeaders })
            // .then(response => this.userDetails = console.log(response.data))
            // .then((data) => loadTableData(data))
        }
    },
    computed: {

    }
}
</script>


<style lang="css" scoped>
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