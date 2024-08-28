import { defineStore } from "pinia";

export const useActionStore = defineStore({
    id: 'taskID',
    state: () => ({
        task: 'null'
    }),
    actions: {
        setAction(value) {
            this.task = value
        }
    },
    getters: {
        getAction: (state) => {
            state.hasChanged
        }
    }
})