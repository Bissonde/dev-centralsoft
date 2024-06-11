import { defineStore } from "pinia";

export const useModuleStore = defineStore({
    id: 'modules',
    state: () => ({
        name: '0',
        text: 'Contactos',
        icon: 'mdi-account', 
        to: 'contacts', 
        descr: 'Directório de Contactos', 
        dialog: 'Contacts', 
        size: '400px' 
    }),
    actions: {
        setModule(value) {
            this.name=value.name,
                this.text=value.text,
                    this.icon=value.icon,
                        this.to=value.contacts,
                            this.descr=value.descr,
                                this.dialog=value.dialog,
                                    this.size= value.size 
        }
    },
    getters: {
        getModule: (state) => {
            alert(state)
            // if (state.name === 5) return 'Contacts'
            //return 'odd'
             
        }
    }
})