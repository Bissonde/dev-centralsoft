<template>
    <header>
        <title>Perfil</title>
    </header>
    <h2>User Profile</h2>
    <br>
    
    <h3 id="userD">tok[1]</h3>
    
    <v-btn variant="tonal" color="success" type="submit" v-on:click="TokenStore.setToken(newToken, true);"
        @click="checkInput();" to="/dashboard" :ripple="true" :disabled="loading" :loading="loading"
        prepend-icon="mdi-content-save-outline">
        GUARDAR
        <template v-slot:loader>
            <v-progress-linear indeterminate></v-progress-linear>
        </template>
    </v-btn>
</template>

<script setup>
// useTokenStore
import { ref, onMounted } from 'vue';
import { useTokenStore } from '@/store/TokenStore';
import axios from 'axios'

onMounted(() => {
    // alert(TokenStore.tokenID) 
    // if (window.localStorage.getItem('JwtToken') != null) {
        var MyUserName = localStorage.getItem('username')
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

    axios.get('account/' + MyUserName)
    .then(
        res => {
            document.getElementById('userD').innerHTML = res.data.ask
            // console.log(res)
        }
    ).catch(
        error => {
            const status = error.response ? error.response.status : null;

            if(status === 401){
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

           
                window.location = '/login'
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

    }),
    methods: {
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