import { defineStore } from "pinia";

export const useTokenStore = defineStore({
    id: 'tokenID',
    state: () => ({
        tokenID: 'null'
    }),
    actions: {
        setToken(value)
        {
            this.tokenID = value
        }
    },
    getters: {
        getModule: (state) => {
            state.hasChanged
        }
    }
})