import { defineStore } from "pinia";

export const useOperationStore = defineStore({
    id: 'operationID',
    state: () => ({
        tokenID: 'null'
    }),
    actions: {
        setToken(value) {
            this.tokenID = value
        }
    },
    getters: {
        getModule: (state) => {
            state.hasChanged
        }
    }
})