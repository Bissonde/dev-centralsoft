import { defineStore } from "pinia";

export const useRouteStore = defineStore({
    id: 'routeID',
    state: () => ({
        route: 'null'
    }),
    actions: {
        setRoute(value) {
            // alert(1 + value)
            // if(value == null)
            // {
            this.route = value
            // }
            // else{
                // this.route = window.localStorage.getItem('MRT')
            // }
        }
    },
    getters: {
        getRoute: (state) => {
            state.hasChanged
        }
    }
})