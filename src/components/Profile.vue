<template>
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
var tok = JSON.parse(localStorage.getItem('token'))
onMounted(() => {
    // alert(TokenStore.tokenID) 
    if (window.localStorage.getItem('token') != null) {
        document.getElementById('userD').innerHTML = tok[1]
        // window.location = '/dashboard'
    }
    else {
    }
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
            window.localStorage.setItem('token', newToken);
            //  alert(TokenStore.tokenID);
            // alert(useModule.dialog)
            if (TokenStore == 'Contacts') {
                // this.isOkToSubmit = this.firstName && this.lastName
            }
            // alert(this.isOkToSubmit)
        },
    }
}
</script>