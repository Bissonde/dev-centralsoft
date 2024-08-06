<template>
    <header>
        <title>Perfil</title>
    </header>

    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- <div v-show="true" bg-color="white"></div> -->

    <v-form fast-fail @submit.prevent v-show="viewMainForm"
        v-bind:style="{ 'background-image': 'url(' + bgimage + ')' }">
        <v-app theme="light">
            <v-app-bar flat class="border-b" density="compact" style="border-top:5px solid darkorange">
                <!-- <v-app-bar density="compact" prominent> -->
                <template v-slot:prepend>
                    <v-app-bar-nav-icon variant="text" class="text-h5"
                        @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                </template>

                <v-app-bar-title>
                    <v-icon icon="mdi-view-grid" size="large" start />
                    <b>Perfil</b></v-app-bar-title>

                <v-spacer></v-spacer>
                <v-divider vertical class="mx-1"></v-divider>
                <v-toolbar-items>
                    <v-btn href="/dashboard">Dashboard</v-btn>
                    <v-btn>Settings</v-btn>
                </v-toolbar-items>
                <!-- <v-text-field hide-details label="Procurar..." single-line></v-text-field> -->


                <template v-slot:append>
                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>

                    <v-btn icon class="mr-2">
                        <v-badge dot color="info">
                            <v-icon icon="mdi-bell-outline"></v-icon>
                        </v-badge>
                    </v-btn>

                    <v-menu>
                        <template #activator="{ props }">
                            <v-avatar v-bind="props" size="x-small" style="border: 2px solid blue;">

                                <v-tooltip location="top" border="warning lg">
                                    <template v-slot:activator="{ props: tooltip }">

                                        <v-img id="myImg" class="circular" cover
                                            v-bind:style="{ backgroundImage: 'url(' + myPicture + ')', backgroundPosition: 'center center', backgroundSize: 'cover' }"
                                            v-bind="mergeProps(menu, tooltip)"></v-img>

                                    </template>
                                    <span>{{ MyUserName }}</span>
                                </v-tooltip>

                            </v-avatar>
                        </template>

                        <v-card min-width="200px">
                            <v-list :lines="false" density="compact" nav="">

                                <v-list-item to="/profile" prepend-icon="mdi-account-outline">Perfil</v-list-item>
                            </v-list>
                            <v-list :lines="false" density="compact" nav="">
                                <v-list-item to="/favorites" prepend-icon="mdi-heart-outline">Favoritos</v-list-item>
                            </v-list>
                            <v-list :lines="true" density="compact" nav="">
                                <v-list-item v-on:click="logOff()" prepend-icon="mdi-power">Terminar
                                    Sessão</v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>

                    <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
                </template>

            </v-app-bar>

            <v-navigation-drawer v-model="drawer" location="left" temporary transition="fade-transition">
                <v-list><v-list-subheader>Menu</v-list-subheader>
                    <v-list-item prepend-icon="mdi-home" class="text-subtitle-1" to="/posts">Inicio</v-list-item>
                    <!-- <v-list :items="items"></v-list> -->

                    <v-list-item prepend-icon="mdi-account" class="text-subtitle-1"
                        to="/accounts">Accounts</v-list-item>
                    <v-list-item prepend-icon="mdi-account-group" class="text-subtitle-1"
                        to="/groups">Groups</v-list-item>

                    <v-list-group value="Users" class="text-subtitle-1">
                        <template #activator="{ props }">
                            <v-list-item v-bind="props" prepend-icon="mdi-account" title="Clients"></v-list-item>
                        </template>
                        <v-list-item prepend-icon="mdi-chart-bar" class="text-subtitle-1"
                            to="/reports">Report</v-list-item>
                        <v-list-item prepend-icon="mdi-currency-usd" class="text-subtitle-1"
                            to="/cashflow">Cashflow</v-list-item>
                        <!-- </v-list-group> v-for="n in items" :key="n" v-slot="{}"> -->

                    </v-list-group>
                </v-list>
            </v-navigation-drawer>

            <v-progress-linear :active="loading" :indeterminate="loading" color="blue-lighten-3" id="topProgress"
                style="display: none;" indeterminate></v-progress-linear>
            <v-sheet class="pt-12 container">
                <v-breadcrumbs :items="topItems">
                    <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-breadcrumbs>
            </v-sheet>
            <v-sheet class="pt-0 mt-5 text-center h2 container" v-if="this.navGoToPage == undefined">
                O meu perfil
            </v-sheet>

            <v-sheet class="pt-1 container" v-if="this.navGoToPage == undefined" color="#0FFEF9F">
                <v-row>
                    <v-col cols="12" sm="3" md="3" lg="3" class="pa-0 ma-0 rounded-0">
                        <v-expansion-panels v-model="panel" multiple>
                            <v-expansion-panel class="pa-0 ma-0 rounded-0">
                                <v-expansion-panel-title color="#ccc">Informação & Contacto</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    Some content
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel class="pa-0 ma-0 rounded-0">
                                <v-expansion-panel-title color="#ccc">Produtos e Compras</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    Some content
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel class="pa-0 ma-0 rounded-0">
                                <v-expansion-panel-title color="#ccc">Utilizador & Definições</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    Some content
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel class="pa-0 ma-0 rounded-0">
                                <v-expansion-panel-title color="#ccc">Endereço & Dados</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    Some content
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                    <v-col>2</v-col>
                </v-row>
            </v-sheet>
        </v-app>
    </v-form>


</template>

<script setup>
// useTokenStore
import { ref, onMounted } from 'vue';
import { useTokenStore } from '@/store/TokenStore';
import axios from 'axios'
import { mergeProps } from 'vue'

// useTokenStore
import { useEmailStore } from '@/store/EmailStore'
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

var MyUserName = '';
var JwtToken = '';
var myPicture = '';
var myEmail = '';

onMounted(() => {

    if (window.localStorage.getItem('JwtToken') != null) {

        JwtToken = localStorage.getItem('JwtToken')
        MyUserName = localStorage.getItem('username')

    }
    else {
        window.location = '/signin?returnUrl=profile'
    }



    let config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
        }
    }


    axios.get('account/' + MyUserName, config)
        .then(
            res => {
                document.getElementById('userD').innerHTML = res.data.username
                document.getElementById('RFN').value = res.data.username
                document.getElementById('REM').value = res.data.email
                document.getElementById('PWT').value = res.data.tel
            }
        ).catch(
            error => {
                const status = error.response ? error.response.status : null;

                if (status === 401) {
                    document.getElementById('userD').innerHTML = "Acesso não autorizado"
                }
                else if (status === 404) {
                    document.getElementById('userD').innerHTML = "Post não encontrado"
                }
                else {
                    document.getElementById('userD').innerHTML = "Ocorreu um erro:", error
                }
                document.getElementById('userD').innerHTML = error
                console.log(error)


                window.location = '/signin?returnUrl=profile'
            }
        )




});

</script>

<script>
const TokenStore = useTokenStore();
const newToken = { "tokenID": "ljahsdfq697e69qwerq", "user": "Vasco Gungui", "domain": "Administrator" }

// alert(tok[1])
export default {
    data: () => ({
        panel: [0, 1],
        navGoToPage: '',
        topItems: [
            {
                title: 'Dashboard',
                disabled: false,
                href: '/dashboard',
            },
            {
                title: 'Perfil',
                disabled: false,
                href: '/profile',
            },
            {
                title: localStorage.getItem('username'),
                disabled: true,
                href: 'breadcrumbs_link_2',
            },
        ],
        MyUserName: '',
        viewMainForm: true,
        drawer: false,
        resetPwd: false,
        visible: false,
        loginError: false,
        emptyFields: false,
        ActIncPwd: false,
        ActEmpty: false,
        ActExist: false,
        ActExistF: false,
        bgimage: "https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg", //https://www.verangola.net/va/images/cache/750x380/crop/images%7Ccms-image-000008157.jpg

    }),
    mounted: async function () {
        // window.location = goToPage[1]
        let xp = window.location.href
        this.navGoToPage = xp.split('=')[1] // = goToPage[1]
    },
    methods: {

        logOff: function () {
            localStorage.removeItem("token");
            localStorage.removeItem("JwtToken");
            localStorage.removeItem("module");
            localStorage.removeItem("username");
            localStorage.removeItem("myPicture");
            const off = 'off';
            // window.location = '/login'
            this.$router.push({ path: `/signin` })
        },
        checkInput: function () {
            // window.localStorage.setItem('JwtToken', newToken);
            //  alert(TokenStore.tokenID);
            // alert(useModule.dialog)
            if (TokenStore == 'Contacts') {
                // this.isOkToSubmit = this.firstName && this.lastName
            }
            // alert(this.isOkToSubmit)
        },

        logOff: function () {
            localStorage.removeItem("token");
            localStorage.removeItem("JwtToken");
            localStorage.removeItem("module");
            localStorage.removeItem("username");
            const off = 'off';
            // window.location = '/login'
            this.$router.push({ path: `/signin` })
        }
    },
    watch: {
        $router: {
            imediate: true,
            handler(to, from) {
                document.title = to.meta.title || 'Profiler'
            }
        }
    },
    computed: {
        pageTitle: function () {
            return this.$route.meta.title;
        }
    }
}
</script>