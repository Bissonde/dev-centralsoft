<template> <v-app theme="light">
        <v-app-bar flat class="border-b" density="compact" style="border-top:5px solid darkorange">
            <!-- <v-app-bar density="compact" prominent> -->
            <template v-slot:prepend>
                <v-app-bar-nav-icon variant="text" class="text-h5" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>
                <v-icon icon="mdi-view-grid" size="large" start />
                <b>Perfil</b></v-app-bar-title>

            <v-spacer></v-spacer>
            <v-divider vertical class="mx-1"></v-divider>
            <v-toolbar-items>
                <v-btn>Dashboard</v-btn>
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
                        <v-avatar v-bind="props">

                            <v-tooltip location="top">
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

                <v-list-item prepend-icon="mdi-account" class="text-subtitle-1" to="/accounts">Accounts</v-list-item>
                <v-list-item prepend-icon="mdi-account-group" class="text-subtitle-1" to="/groups">Groups</v-list-item>

                <v-list-group value="Users" class="text-subtitle-1">
                    <template #activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-account" title="Clients"></v-list-item>
                    </template>
                    <v-list-item prepend-icon="mdi-chart-bar" class="text-subtitle-1" to="/reports">Report</v-list-item>
                    <v-list-item prepend-icon="mdi-currency-usd" class="text-subtitle-1"
                        to="/cashflow">Cashflow</v-list-item>

                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<script setup>
// useTokenStore
var myPicture = '';
var MyUserName = '';
import { ref, onMounted } from 'vue';
import { useTokenStore } from '@/store/TokenStore';
import axios from 'axios'
import { mergeProps } from 'vue'

onMounted(() => {
    // alert(TokenStore.tokenID) 
    // if (window.localStorage.getItem('JwtToken') != null) {
    var MyUserName = localStorage.getItem('username')
    myPicture = localStorage.getItem('myPicture')
    MyUserName = localStorage.getItem('username')
    //     document.getElementById('userD').innerHTML = MyUserName
    //     // window.location = '/dashboard'


    //         let config = {
    //             headers: {
    //                 'Accept': 'application/json'

    //             }

    //         }

    //     //    this.axios.get('Account/' + MyUserName, )
    //     //         .then((response) => {
    //     //             console.log(response.data)
    //     //         })
    //     //         .catch((err) => console.log(err.response));

    //             axios.request({
    //                url: 'Account/' + MyUserName,
    //                method: 'get',
    //                baseURL: axios.defaults.baseURL,
    //                headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem('JwtToken')
    //                } 
    //             });

    // }
    // else {
    // }


    // console.log(MyUserName);

    let config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
        }
    }

    axios.get('account/' + MyUserName, config)
        .then(
            res => {
                document.getElementById('userD').innerHTML = res.data.ask
                // console.log(res)
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


                // window.location = '/signin'
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
        MyUserName: '',
        viewMainForm: true,
        drawer: false,
        overlay: false,
        props: true,
        menu: false,
        loading: false
    }),
    methods: {
        mergeProps,
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
            this.$router.push({ path: `/login` })
        }
    }
}
</script>
