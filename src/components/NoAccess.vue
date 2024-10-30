<template>
    <header>
        <title>Perfil</title>
    </header>

    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- <div v-show="true" bg-color="white"></div> -->

    <v-form fast-fail @submit.prevent v-if="showForm" v-bind:style="{ 'background-image': 'url(' + bgimage + ')' }">
        <v-app theme="light">
            <v-app-bar flat class="border-b" density="compact" style="border-top:5px solid darkorange" absolute dark
                shrink-on-scroll prominent>
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
                    <v-btn href="/dashboard?nav=dshome">Dashboard</v-btn>
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

                                <v-list-item to="/profile?nav=myuser"
                                    prepend-icon="mdi-account-outline">Perfil</v-list-item>
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

            <v-navigation-drawer v-model="drawer" location="left" floating permanent transition="fade-transition"
                elevation="12" class="opacity-100 w-20 border-e-lg border-secondary">
                <v-list>
                    <!-- <v-list-subheader>Menu</v-list-subheader> -->
                    <v-expansion-panels v-model="panel" multiple elevation="0" class="pa-0 pr-0 pt-2 pl-0"
                        style="background-color: #00428c;">
                        <span class="h6 pa-0 pb-0" style="height: 15px; color: white;">My Bissonde</span>
                        <v-expansion-panel class="pa-0 ma-0 rounded-0  border-t-sm"
                            v-if="useRoute.route.toString().includes('INFO_CONTACT')"
                            style="color: #0C2340; font-size:11pt; font-weight: 500;">
                            <v-expansion-panel-title color="font-xl" class=""
                                style="background-color: #AFDBF5; font-size:11pt;"><v-icon>mdi-information</v-icon>&nbsp;Informação
                                &
                                Contacto</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-icon>mdi-home</v-icon>&nbsp;<a href="dashboard?nav=dshome"
                                    class="text-decoration-none">A
                                    minha
                                    página
                                    inicial</a><br>
                                <v-icon>mdi-phone</v-icon>&nbsp;<a href="?nav=contact"
                                    class="text-decoration-none">Contacto</a><br>
                                <v-icon>mdi-license</v-icon>&nbsp;<a href="?nav=license"
                                    class="text-decoration-none">Licenças e
                                    contratos</a>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel class="pa-0 ma-0 rounded-0"
                            v-if="useRoute.route.toString().includes('PRODUCT')"
                            style="color: #0C2340; font-size:11pt; font-weight: 500;">
                            <v-expansion-panel-title color=""
                                style="background-color: #AFDBF5; font-size:12pt"><v-icon>mdi-checkbox-multiple-marked-circle</v-icon>&nbsp;Produtos
                                e
                                Compras</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-icon>mdi-text-box-multiple</v-icon>&nbsp;<a href="?nav=proposals"
                                    class="text-decoration-none">Propostas</a><br>
                                <v-icon>mdi-check-decagram-outline</v-icon>&nbsp;<a href="?nav=approvals"
                                    class="text-decoration-none">As minhas
                                    aprovações</a><br>
                                <v-icon>mdi-shopping-outline</v-icon>&nbsp;<a href="?nav=shoppingList"
                                    class="text-decoration-none">Lista de compras</a><br>
                                <v-icon>mdi-text-box-multiple</v-icon>&nbsp;<a href="?nav=blanket-orders"
                                    class="text-decoration-none">Encomendas em
                                    reservas</a><br>
                                <v-icon>mdi-text-box-multiple</v-icon>&nbsp;<a href="?nav=orders"
                                    class="text-decoration-none">Encomendas</a><br>
                                <v-icon>mdi-text-box-multiple</v-icon>&nbsp;<a href="?nav=deliveries"
                                    class="text-decoration-none">Guias de remessa</a><br>
                                <v-icon>mdi-receipt-text-outline</v-icon>&nbsp;<a href="?nav=invoices"
                                    class="text-decoration-none">Facturas</a><br>
                                <v-icon>mdi-note-text</v-icon>&nbsp;<a href="?nav=creditnotes"
                                    class="text-decoration-none">Notas de
                                    crédito</a><br>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel class="pa-0 ma-0 rounded-0"
                            v-if="useRoute.route.toString().includes('SETTINGS')"
                            style="color: #0C2340; font-size:11pt; font-weight: 500;">
                            <v-expansion-panel-title color=""
                                style="background-color: #AFDBF5; font-size:12pt"><v-icon>mdi-account-cog</v-icon>&nbsp;Utilizador
                                &
                                Definições</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-icon>mdi-account</v-icon>&nbsp;<a href="?nav=myuser" class="text-decoration-none">O
                                    meu
                                    utilizador</a><br>
                                <v-icon>mdi-key-chain-variant</v-icon>&nbsp;<a href="?nav=modules"
                                    @click="ACCOUNT_MODULES_GET_ALL()" class="text-decoration-none">Os meu
                                    acessos</a><br>
                                <v-icon>mdi-registered-trademark</v-icon>&nbsp;<a href="?nav=avatar"
                                    class="text-decoration-none">Avatar & Logótipo</a><br>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel class="pa-0 ma-0 rounded-0"
                            v-if="useRoute.route.toString().includes('ADR_DATA')"
                            style="color: #0C2340; font-size:11pt; font-weight: 500;">
                            <v-expansion-panel-title color=""
                                style="background-color: #AFDBF5; font-size:12pt; font-weight:500"><v-icon>mdi-map-marker</v-icon>&nbsp;Endereço
                                &
                                Dados</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-icon>mdi-package-variant-closed-check</v-icon>&nbsp;<a href="?nav=addresses"
                                    class="text-decoration-none">Endereços de entrega</a><br>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <!-- <v-list-item prepend-icon="mdi-home" class="text-subtitle-1" to="/posts">Inicio</v-list-item> -->
                    <!-- <v-list :items="items"></v-list> -->

                    <!-- <v-list-item prepend-icon="mdi-account" class="text-subtitle-1"
                        to="/accounts">Accounts</v-list-item>
                    <v-list-item prepend-icon="mdi-account-group" class="text-subtitle-1"
                        to="/groups">Groups</v-list-item> -->

                    <!-- <v-list-group value="Users" class="text-subtitle-1">
                        <template #activator="{ props }">
                            <v-list-item v-bind="props" prepend-icon="mdi-account" title="Clients"></v-list-item>
                        </template>
                        <v-list-item prepend-icon="mdi-chart-bar" class="text-subtitle-1"
                            to="/reports">Report</v-list-item>
                        <v-list-item prepend-icon="mdi-currency-usd" class="text-subtitle-1"
                            to="/cashflow">Cashflow</v-list-item> -->
                    <!-- </v-list-group> v-for="n in items" :key="n" v-slot="{}"> -->

                    <!-- </v-list-group> -->
                </v-list>
            </v-navigation-drawer>

            <v-progress-linear :active="loading" :indeterminate="loading" color="blue-lighten-3" id="topProgress"
                style="display: none;" indeterminate></v-progress-linear>

            <!-- 
            <v-sheet class="pt-0 mt-5 text-center h2 container">
                O meu perfil
            </v-sheet> -->

            <v-sheet class="pa-2 mt-2 mb-2 pt-10 pb-0  text-button text-substitle-2" style="height:90px">
                <v-breadcrumbs :items="topItems">
                    <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-breadcrumbs>
            </v-sheet>
            <v-sheet class="pt-0 ma-0 pb-0" elevation="0" cols="12" sm="3" md="3" lg="3"
                style="background-color: #FAFAFA;">
                <!-- DEFAULT -->
                <v-sheet elevation="2" class="pa-5 ma-5 pt-0 pl-3 pr-3 mt-0 mb-0 pb-0 text-caption rounded-0"
                    style="font: 18px; background-color: #FAFAFA;">

                    <v-row cols="3" sm="3" md="3" lg="3">
                        <v-col cols="12" sm="3" md="3" lg="2" class="pa-0 ma-0 rounded-0 border-t-lg "
                            v-if="this.myRoutes.includes('MY_BISSONDE')"
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                            <v-expansion-panels v-model="panel" multiple elevation="0" class="pa-0 pr-0 pt-2 pl-0"
                                style="background-color: #00428c;">
                                <span class="h6 pa-0 pb-0" style="height: 19px; color: white;">My Bissonde</span>
                                <v-expansion-panel class="pa-0 ma-0 rounded-0  border-t-sm"
                                    v-if="useRoute.route.toString().includes('INFO_CONTACT')"
                                    style="color: #0C2340; font-size:11pt; font-weight: 500;">
                                    <v-expansion-panel-title color="font-xl"
                                        style="background-color: #AFDBF5; font-size:12pt;"><v-icon>mdi-information</v-icon>&nbsp;Informação
                                        &
                                        Contacto</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-icon>mdi-home</v-icon>&nbsp;<a href="dashboard?nav=dshome"
                                            class="text-decoration-none">A
                                            minha
                                            página
                                            inicial</a><br>
                                        <v-icon>mdi-phone</v-icon>&nbsp;<a href="?nav=contact"
                                            class="text-decoration-none">Contacto</a><br>
                                        <v-icon>mdi-license</v-icon>&nbsp;<a href="?nav=license"
                                            class="text-decoration-none">Licenças e
                                            contratos</a>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel class="pa-0 ma-0 rounded-0 "
                                    v-if="this.myRoutes.split('/')[0].includes('PRODUCT')"
                                    style="color: #0C2340; font-size:11pt; font-weight: 500;">
                                    <v-expansion-panel-title color=""
                                        style="background-color: #AFDBF5; font-size:12pt"><v-icon>mdi-checkbox-multiple-marked-circle</v-icon>&nbsp;Produtos
                                        e
                                        Compras</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-icon>mdi-text-box-multiple</v-icon>&nbsp;<a href="?nav=proposals"
                                            class="text-decoration-none">Propostas</a><br>
                                        <v-icon>mdi-check-decagram-outline</v-icon>&nbsp;<a href="?nav=approvals"
                                            class="text-decoration-none">As minhas
                                            aprovações</a><br>
                                        <v-icon>mdi-shopping-outline</v-icon>&nbsp;<a href="?nav=shoppingList"
                                            class="text-decoration-none">Lista de compras</a><br>
                                        <v-icon>mdi-text-box-multiple</v-icon>&nbsp;<a href="?nav=blanket-orders"
                                            class="text-decoration-none">Encomendas em
                                            reservas</a><br>
                                        <v-icon>mdi-text-box-multiple</v-icon>&nbsp;<a href="?nav=orders"
                                            class="text-decoration-none">Encomendas</a><br>
                                        <v-icon>mdi-text-box-multiple</v-icon>&nbsp;<a href="?nav=deliveries"
                                            class="text-decoration-none">Guias de remessa</a><br>
                                        <v-icon>mdi-receipt-text-outline</v-icon>&nbsp;<a href="?nav=invoices"
                                            class="text-decoration-none">Facturas</a><br>
                                        <v-icon>mdi-note-text</v-icon>&nbsp;<a href="?nav=creditnotes"
                                            class="text-decoration-none">Notas de crédito</a><br>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel class="pa-0 ma-0 rounded-0"
                                    v-if="this.myRoutes.split('/')[0].includes('SETTINGS')"
                                    style="color: #0C2340; font-size:11pt; font-weight: 500;">
                                    <v-expansion-panel-title color=""
                                        style="background-color: #AFDBF5; font-size:12pt"><v-icon>mdi-account-cog</v-icon>&nbsp;Utilizador
                                        &
                                        Definições</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-icon>mdi-account</v-icon>&nbsp;<a href="?nav=myuser"
                                            class="text-decoration-none">O meu
                                            utilizador</a><br>
                                        <v-icon>mdi-key-chain-variant</v-icon>&nbsp;<a href="?nav=modules"
                                            @click="ACCOUNT_MODULES_GET_ALL()" class="text-decoration-none">Os meu
                                            acessos</a><br>
                                        <v-icon>mdi-registered-trademark</v-icon>&nbsp;<a href="?nav=avatar"
                                            class="text-decoration-none">Avatar & Logótipo</a><br>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel class="pa-0 ma-0 rounded-0"
                                    v-if="this.myRoutes.split('/')[0].includes('ADR_DATA')"
                                    style="color: #0C2340; font-size:11pt; font-weight: 500;">
                                    <v-expansion-panel-title color=""
                                        style="background-color: #AFDBF5; font-size:12pt; font-weight:500"><v-icon>mdi-map-marker</v-icon>&nbsp;Endereço
                                        &
                                        Dados</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-icon>mdi-package-variant-closed-check</v-icon>&nbsp;<a href="?nav=addresses"
                                            class="text-decoration-none">Endereços de entrega</a><br>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                        <v-col v-if="navGoToPage.task == 'myuser' & this.showForm == true" class=" pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />
                        </v-col>
                        <v-col v-if="navGoToPage.task == 'contact'"
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);"
                            class="pa-0 pl-0 ma-0">
                           <ProfileLinks />
                        </v-col>
                        <v-col v-if="navGoToPage.task == 'license'" class="pa-0 pl-0 ma-0"
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />
                        </v-col>
                        <v-col v-if="navGoToPage.task == 'proposals'" class="pa-0 pl-0 ma-0"
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />

                        </v-col>
                        <v-col v-if="navGoToPage.task == 'approvals'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />

                        </v-col>
                        <v-col v-if="navGoToPage.task == 'shoppingList'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />
                        </v-col>

                        <v-col v-if="navGoToPage.task == 'blanket-orders'" class="pa-0 pl-0 ma-0 border-t-lg"
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">
                            <!-- <p class="h4">Os meus contactos</p> -->
                            <!-- <p>Edite o utilizdor tendo em consideração os campos obrigadtórios (*). Um endereço de -->
                            <!-- e-mail só -->
                            <!-- pode ser utlizado para um utilizador.</p> -->
                            <div class="ma-0 pb-1 mb-0 pt-0" style="background-color:  #E3F2FD;">



                                <!-- HEADER -->
                                <v-row class="ma-0 pb-0 border-s-lg"
                                    style="font-size: 8pt; background-color: #00428c; height:35px">
                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-1 pl-2 ma-0 white">
                                        <span
                                            class="text-body-1 text-white"><v-icon>mdi-file-document-multiple-outline</v-icon>&nbsp;Encomendas
                                            em reserva</span>
                                    </v-col>
                                    <v-col cols="12" sm="2" md="2" lg="1" class="pt-0 mb-0 pr-2 ma-0 text-right">
                                        <span class="text-body-1 text-white"><v-icon>mdi-chevron-right</v-icon></span>
                                    </v-col>
                                </v-row>

                                <v-sheet elevation="0" class="pa-0 ma-0 pt-0 pl-3 pr-3 mt-0 mb-0 pb-5 text-caption "
                                    style="font: 18px; background-color: #FAFAFA;">
                                    <v-row style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                        <v-col cols="5" sm="12" md="6" lg="5" class="pb-0">
                                            <v-row cols="12" style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                                <v-col cols="12" sm="9" md="6" lg="9" class="pt-0 pb-0 mb-0">
                                                    <v-text-field hide-details label="Procurar..." variant="underlined"
                                                        prepend-inner-icon="mdi-magnify" single-line></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="9" md="6" lg="3" class="pt-0 pb-0 mb-0 pl-0">

                                                    <v-btn style="display:inline-block;width: 100px"
                                                        @click="ACCOUNT_SAVE"
                                                        class="ma-0 rounded-0 mt-3 pa-3 text-subtitle-2"
                                                        variant="flat">&nbsp;Pesquisar
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="2" sm="12" md="6" lg="7" class="pb-0">
                                            <v-row style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                                <v-col cols="12" sm="9" md="3" lg="2" class="pt-0 pb-0 mb-0 mt-5">
                                                    <v-label>Período:</v-label>
                                                </v-col>
                                                <v-col cols="12" sm="9" md="6" lg="5" class="pt-0 pb-0 mb-0 pl-0">
                                                    <v-text-field hide-details label="Desde: AAAA-MM-DD"
                                                        variant="underlined" append-inner-icon="mdi-calendar"
                                                        single-line></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="9" md="6" lg="5" class="pt-0 pb-0 mb-0 pl-0">
                                                    <v-text-field hide-details label="Até: AAAA-MM-DD"
                                                        variant="underlined" append-inner-icon="mdi-calendar"
                                                        single-line></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>


                                    </v-row>


                                    <v-row style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                        <v-col cols="5" sm="12" md="6" lg="5" class="pb-0">
                                            <v-row cols="12" style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                                <v-col cols="12" sm="9" md="6" lg="5" class="pt-0 pb-0 mb-0 mt-5">
                                                    <v-label>Estado da encomenda:</v-label>
                                                </v-col>
                                                <v-col cols="12" sm="9" md="6" lg="7" class="pt-0 pb-0 mb-0 pl-0">

                                                    <v-autocomplete v-model="OrdersStat" variant="underlined"
                                                        :items="['Todos', 'Pendente', 'Encerrada', 'Em criação', 'Actual', 'Expirado', 'Encomendado', 'Rejeitado']"></v-autocomplete>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="2" sm="12" md="6" lg="7" class="pb-0">
                                            <v-row style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                                <v-col cols="12" sm="9" md="3" lg="7" class="pt-0 pb-0 mb-0 mt-5">

                                                </v-col>
                                                <v-col cols="12" sm="9" md="6" lg="5"
                                                    class="pt-0 pb-0 mb-0 pl-0 text-right">
                                                    <v-btn style="display:inline-block;width: 100px"
                                                        @click="ACCOUNT_SAVE"
                                                        class="ma-0 rounded-0 mt-3  text-subtitle-2"
                                                        variant="outlined">&nbsp;Repor
                                                        tudo
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>


                                    </v-row>
                                </v-sheet>

                                <v-sheet elevation="0" class="pa-0 ma-0 pt-0 pl-3 pr-3 mt-1 mb-0 pb-5 text-caption "
                                    style="font: 18px; background-color: #FAFAFA;">


                                    <v-row style="font-size: 8pt;" class="pa-0 ma-0 mb-3">
                                        <v-col cols="5" sm="12" md="6" lg="5" class="pb-0">
                                            <v-row cols="12" style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                                <v-col cols="12" sm="9" md="6" lg="3" class="pt-0 pb-0 mb-0 mt-5">
                                                    <v-label>Ordenação:</v-label>
                                                </v-col>
                                                <v-col cols="12" sm="9" md="6" lg="9" class="pt-0 pb-0 mb-0 pl-0">

                                                    <v-autocomplete v-model="OrdersOrder" variant="underlined"
                                                        :items="['Data de alteração [ordem crescente]', 'Data de alteração [ordem decrescente]', 'Nº de proposta [ordem crescente]', 'Nº de proposta [ordem decrescente]', 'A sua referência [ordem crescente]', 'A sua referência [ordem decrescente]', 'Estado [ordem crescente]', 'Estado [ordem decrescente]', 'Data de criação [ordem crescente]', 'Data de criação [ordem decrescente]']"></v-autocomplete>
                                                </v-col>
                                            </v-row>
                                        </v-col>


                                    </v-row>

                                    <v-tabs v-model="tab" align-tabs="title">
                                        <v-tab text="Todos" value="Todos"></v-tab>
                                        <v-tab text="Rascunhos de Propostas" value="Rascunhos de Propostas"></v-tab>
                                        <v-tab text="Propostas Bissonde" value="Propostas Bissonde"></v-tab>
                                        <!-- <v-tab v-for="item in proposalTabs" :key="item" :text="item"
                                            :value="item.value"></v-tab> -->
                                    </v-tabs>
                                    <v-tabs-window v-model="tab" class="text-left text-subtitle-1 pa-6 ma-6">
                                        <v-tabs-window-item value="Todos">

                                            <!-- <v-label><v-icon>mdi-alert</v-icon>&nbsp;Não existem propostas.</v-label> -->

                                            <p><b>Nº da encomenda em reserva: <a
                                                        href="?nav=orders/148-1600191">148-1600191</a></b>
                                            </p>
                                            <v-row>
                                                <v-col cols="4">
                                                    Data da encomenda<br>
                                                    Estado<br>
                                                    Montante total<br>
                                                    A sua referência<br>
                                                    Empresa<br>
                                                    Nº cliente
                                                </v-col>
                                                <v-col>
                                                    22/mai/2024<br>
                                                    Pendente<br>
                                                    55.909,44 €<br>
                                                    Stock Maio 2024<br>
                                                    BNP Paribas<br>
                                                    9000844177
                                                </v-col>
                                            </v-row>
                                        </v-tabs-window-item>
                                        <v-tabs-window-item value="Rascunhos de Propostas">
                                            <v-label><v-icon>mdi-alert</v-icon>&nbsp;Não existem propostas.</v-label>
                                        </v-tabs-window-item>
                                        <v-tabs-window-item value="Propostas Bissonde">
                                            <v-label><v-icon>mdi-alert</v-icon>&nbsp;Não existem propostas.</v-label>
                                        </v-tabs-window-item>
                                    </v-tabs-window>
                                </v-sheet>
                            </div>
                        </v-col>

                        <v-col v-if="navGoToPage.task == 'orders'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />
                        </v-col>
                        <v-col v-if="navGoToPage.task == 'deliveries'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />
                        </v-col>

                        <v-col v-if="navGoToPage.task == 'invoices'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />

                        </v-col>
                        <v-col v-if="navGoToPage.task == 'creditnotes'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />
                        </v-col>
                        <v-col v-if="navGoToPage.task == 'modules'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />


                        </v-col>
                        <v-col v-if="navGoToPage.task == 'avatar'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />


                        </v-col>
                        <v-col v-if="navGoToPage.task == 'addresses'" class="pa-0 pl-0 ma-0 "
                            style="background: rgb(175,219,245); background: linear-gradient(180deg, rgba(175,219,245,1) 0%, rgba(246,246,247,0.37298669467787116) 100%);">

                           <ProfileLinks />
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-sheet>
            <br>

            <v-sheet class="ma-2 pa-5 pt-0" elevation="0" v-if="devType != 'Desktop'">

                Serviço ao
                cliente<br>
                <v-icon>mdi-circle-small</v-icon><a class="text-decoration-none">Informações de
                    pagamento e
                    envio</a><br>
                <v-icon>mdi-circle-small</v-icon><a class="text-decoration-none" href="#">Centro de ajuda</a><br>
                <v-btn class="mt-5 mb-5 rounded-0">Newsletter</v-btn><br>
                A nossa oferta é apenas válida para clientes empresariais e entidades públicas.<br>
                <br>
                <b>Preços em EUR + IVA à taxa legal em vigor.</b><br>
                <v-row class="pt-0 pb-0" cols="12" sm="6" md="6" lg="6">
                    <v-col cols="10"><a class="text-decoration-none" href="#">Ficha
                            técnica</a>&nbsp;<v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                            class="text-decoration-none">Política de
                            privacidade</a>&nbsp;<v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                            class="text-decoration-none">Condições
                            Gerais de Venda</a>
                        &nbsp;<v-icon>mdi-circle-small</v-icon>&nbsp;<span class="text-decoration-none-overline">Support
                            ID:</span> f972b8238e</v-col>
                    <v-col class="text-right text-decoration-none-overline ">
                        &copy; 2024 Bissonde SO
                    </v-col>
                </v-row>

                <v-spacer></v-spacer>
            </v-sheet>


            <!-- EDIT MODAL DIALOG -->
            <v-dialog width='850' v-model="editModal" v-on:close="" v-on:open="beforeOpen" persistent>
                <template #activator="{ props }">
                </template>

                <v-card>
                    <v-toolbar color="primary" class="fixed-bar">
                        <template v-slot:prepend>
                            <v-toolbar-title class="text-h6" bg-color="deep-purple-darken-4"><v-icon class="text-h4">{{
                                useModule.icon }}</v-icon>&nbsp;Editar&nbsp;{{
                                        useModule.dialog }}</v-toolbar-title>
                        </template>

                        <v-tooltip v-model="vtooltipE" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" role="link" @click="isEditing = !isEditing" class="activateBtn"
                                    label="Editar" :disabled="btnEdit"
                                    :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                                    color="white" variant="text" icon="mdi-pencil"></v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>

                        <!-- <input id="MID" v-model="useModule.name" /> -->

                        <!-- <v-tooltip v-model="vtooltipInfo" location="bottom"> -->
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" color="white" icon="mdi-alert-circle-outline"></v-btn>
                        </template>
                        <!-- <span>Informações</span> -->
                        <!-- </v-tooltip> -->


                        <!-- <v-tooltip v-model="vtooltipDel" location="bottom"> -->
                        <!-- <template v-slot:activator="{ props }"> -->
                        <v-btn v-bind="props" color="white" @click="dialogDelete = true;" icon="mdi-delete-outline"
                            :visible="btnDelete"></v-btn>
                        <!-- </template> -->
                        <!-- <span>Remover</span> -->
                        <!-- </v-tooltip> -->

                        <template v-if="$vuetify.display.smAndUp">
                            <v-divider class="mx-3 align-self-center" length="24" thickness="2" vertical></v-divider>


                            <v-tooltip v-model="vtooltipFolder" location="bottom">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" color="white" icon="mdi-folder-outline"></v-btn>
                                </template>
                                <span>Categoria</span>
                            </v-tooltip>

                            <v-tooltip v-model="vtooltipTag" location="bottom">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" color="white" icon="mdi-tag-outline"></v-btn>
                                </template>
                                <span>Tag</span>
                            </v-tooltip>

                            <v-tooltip v-model="vtooltipDots" location="bottom">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" color="white" icon="mdi-dots-vertical"></v-btn>
                                </template>
                                <span>Opções</span>
                            </v-tooltip>

                            <v-tooltip v-model="vtooltipEdit" location="bottom">
                                <template v-slot:activator="{ props }">

                                    <!-- <v-btn v-bind="props" role="link" @click="" :disabled="btnEdit"
                            :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                            color="white" variant="text" icon="mdi-arrow-expand"></v-btn> -->

                                    <v-btn v-bind="props" role="link"
                                        @click="editModal = false; alertSuccess = false; this.ACCOUNT_MODULES_GET_ALL();"
                                        :disabled="btnEdit"
                                        :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                                        color="white" variant="text" icon="mdi-close-circle"></v-btn>

                                </template>
                                <span>Fechar</span>
                            </v-tooltip>
                        </template>
                    </v-toolbar>

                    <!-- <v-alert type="success" title="Sucesso" v-model="alertSuccess" transition="slide-y-transition"
                        border="start" variant="tonal" closable
                        text="As suas alterações foram gravadas com sucesso!"></v-alert> -->


                    <v-alert type="warning" title="Sucesso" v-model="alertDelete" transition="slide-y-transition"
                        border="start" variant="tonal" closable text="Registo removido com sucesso!"></v-alert>

                    <span v-if="this.mDialog != null" class="text-right font-italic pr-8 pt-0 pb-0 mb-0">Modificado por:
                        {{ this.mAuthor }} em {{ this.mLastModified }}</span>

                    <v-card-text v-if="navGoToPage.task == 'modules'">

                        <v-alert v-model="ActEmpty" class="mb-1 mt-1" border="start" variant="tonal" closable
                            close-label="Close Alert" color="warning" title="Atenção!" type="warning">
                            Preencha todos os campos abaixo!
                        </v-alert>

                        <v-alert v-model="alertSuccess" class="pa-3 ma-1 mt-0 mb-0 text-subtitle-1" border="start"
                            variant="tonal" close-label="Close Alert" color="success" type="success">
                            Alterações guardadas com sucesso!
                        </v-alert>

                        <v-tabs v-model="tabs" align-tabs="centered" class="pt-0 mt-0">
                            <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                            <v-tab prepend-icon="mdi-account-cog">Permissões</v-tab>
                            <v-tab prepend-icon="mdi-account-multiple">Membros ({{
                                this.sailpointItems.length }})</v-tab>
                            <v-tab prepend-icon="mdi-history">Histórico</v-tab>
                        </v-tabs>

                        <v-window v-model="tabs">
                            <v-window-item>
                                <!-- <v-card> -->
                                <!-- <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title> -->
                                <v-card-text v-model="details" class="border-s-lg">
                                    <!-- <v-container> -->
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4" class="pa-0">
                                            <v-text-field :disabled="false" label="ID" id="CID" v-model="mID"
                                                prepend-inner-icon="mdi-key"
                                                hint="example of helper text only on focus"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4" class="pa-0">
                                            <v-text-field label="Texto*" id="FN" name="firstNameR"
                                                :disabled="!isEditing" v-model="mText" clearable
                                                prepend-inner-icon="mdi-text" hint="*campo obrigatório" :counter="10"
                                                required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4" class="pa-0">
                                            <v-text-field :disabled="!isEditing" id="LN" name="lastNameR" :counter="10"
                                                prepend-inner-icon="mdi-arrow-left" v-model="mIcon" clearable
                                                label="Ícone*" hint="*campo obrigatório" persistent-hint
                                                required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12" class="pa-0">
                                            <v-text-field :disabled="!isEditing" id="description" v-model="mDescr"
                                                label="Descrição*" type="text" prepend-inner-icon="mdi-information"
                                                required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6" class="pa-0 ml-0">
                                            <v-text-field :disabled="!isEditing" id="cellSMS" v-model="mRoutes"
                                                label="Rotas*" type="text" prepend-inner-icon="mdi-arrow-right"
                                                @click:append-inner="defaultRoutes" append-inner-icon="mdi-magnify"
                                                required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6" class="pa-0">
                                            <v-text-field :disabled="!isEditing" id="cellEmail" v-model="mDialog"
                                                label="Dialógo*" prepend-inner-icon="mdi-email-fast-outline"
                                                required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6" class="pa-0">
                                            <v-text-field :disabled="!isEditing" id="cellWhatsApp" v-model="mColor"
                                                label="Cor*" prepend-inner-icon="mdi-color" required></v-text-field>
                                            <!-- <v-color-picker :v-model="mColor" :disabled="!isEditing"></v-color-picker> -->
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6" class="pa-0">
                                            <v-select :disabled="!isEditing" id="cellAge" v-model="mStat"
                                                :items="['Activado', 'Desactivado']" label="Estado*"
                                                prepend-inner-icon="mdi-numeric-7" required></v-select>
                                        </v-col>

                                    </v-row>
                                    <!-- </v-container> -->
                                    <small>*indicates required field</small>
                                </v-card-text>

                                <!-- </v-card> -->
                            </v-window-item>
                            <v-window-item v-model="options" class="border-s-lg">

                                <!-- mRead: false,
        mWrite: false,
        mModify: false,
        mRemove: false, -->

                                <v-checkbox-btn v-model="mRead" color="success" label="Ler"></v-checkbox-btn>
                                <v-checkbox-btn v-model="mWrite" color="success" label="Escrever"></v-checkbox-btn>
                                <v-checkbox-btn v-model="mModify" color="success" label="Modificar"></v-checkbox-btn>
                                <v-checkbox-btn v-model="mRemove" color="success" label="Remover"></v-checkbox-btn>
                                <!-- <v-checkbox-btn :model-value="isActive" label="Modificar"></v-checkbox-btn>
                                <v-checkbox-btn :model-value="isActive" label="Modificar"></v-checkbox-btn> -->


                            </v-window-item>
                            <v-window-item v-model="sailpoints" style="height:300px; overflow-y:scroll;">
                                <!-- <br> -->
                                <v-alert v-model="emptyFields" class="mb-1 mt-1" border="start" variant="tonal" closable
                                    close-label="Close Alert" color="warning" title="Atenção!" type="warning">
                                    Preencha todos os campos abaixo!
                                </v-alert>

                                <!-- <v-alert v-model="alertSuccess" class="pa-3 ma-1 text-subtitle-1" border="start"
                                    variant="tonal" close-label="Close Alert" color="black" type="success">
                                    Alterações guardadas com sucesso!
                                </v-alert> -->

                                <v-text-field :loading="loading1" class="rounded-0" v-model="memberID" clearable
                                    v-on:keyup.enter="onEnter('Member')" v-on:keyup.esc="onEscape"
                                    append-inner-icon="mdi-magnify" density="compact" label="Search templates"
                                    @focus="onFocus('Member')" @blur="onBlur(null)" variant="outlined" hide-details
                                    single-line id="btnFindModuleMember" @click:append-inner="onClick"></v-text-field>
                                <v-row style="font-size: 8pt;" class="ma-0 mt-0" color="red"><v-label></v-label></v-row>

                                <!-- ALL -->
                                <div v-if="sailpointMembers == 0"
                                    class="border-sm border-s-lg w-100 bg-white pa-5 pb-2 mt-0 mb-1 text-caption"
                                    v-for="(sail, index) in sailpointItems" height="400" :key="index" dot-color="blue">
                                    <v-row class="pa-0 pb-0 mb-0 ">
                                        <v-col cols="12" sm="7" md="7" lg="7" class="pa-0 pb-0 mb-0 ">
                                            <span class="text-subtitle-1"><v-icon>mdi-email-outline</v-icon>&nbsp;{{
                                                sail.requester }}</span>
                                        </v-col>
                                        <v-col v-if="sail.stat == 'pending' | this.sailpointStat == 'revoked'" cols="12"
                                            sm="7" md="5" lg="5" class="pa-0 ma-0 text-right">
                                            <v-btn @click="ACCOUNT_MODULE_MEMBER_REMOVE(sail);" class="ma-0 rounded-0 "
                                                color="red"
                                                variant="tonal"><v-icon>mdi-account-remove</v-icon>&nbsp;Remover
                                            </v-btn>&nbsp;<v-btn @click="ACCOUNT_MODULE_MEMBER_APPROVE('active', sail);"
                                                class="ma-0 rounded-0 " color="orange"
                                                variant="tonal"><v-icon>mdi-check-bold</v-icon>&nbsp;Aprovar
                                            </v-btn>
                                        </v-col>
                                        <v-col v-if="sail.stat == 'active'" cols="12" sm="5" md="5" lg="5"
                                            class="pa-0 ma-0 text-right">
                                            <v-btn @click="ACCOUNT_MODULE_MEMBER_REMOVE(sail);" class="ma-0 rounded-0 "
                                                color="red"
                                                variant="tonal"><v-icon>mdi-account-remove</v-icon>&nbsp;Remover
                                            </v-btn>&nbsp;<v-btn @click="ACCOUNT_MODULE_MEMBER_APPROVE('active', sail);"
                                                class="ma-0 rounded-0 " color="success"
                                                variant="tonal"><v-icon>mdi-sync</v-icon>&nbsp;Actualizar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                                <!-- YES -->
                                <div v-if="sailpointMembers == 1"
                                    class="border-sm border-s-lg w-100 bg-white pa-5 pb-2 mt-0 mb-1 text-caption">
                                    <v-row class="pa-0 pb-0 mb-0">
                                        <v-col cols="12" sm="6" md="10" lg="7" class="pa-0 pb-0 mb-0 ">
                                            <span class="text-subtitle-1"><v-icon>mdi-email-outline</v-icon>&nbsp;{{
                                                sailpointFullname }}</span>
                                        </v-col>
                                        <v-col v-if="this.sailpointStat == 'pending' | this.sailpointStat == 'revoked'"
                                            cols="12" sm="6" md="2" lg="5" class="pa-0 ma-0 text-right">
                                            <v-btn @click="ACCOUNT_MODULE_MEMBER_REMOVE(this.sailpointCurrent);"
                                                class="ma-0 rounded-0 " color="red"
                                                variant="tonal"><v-icon>mdi-account-remove</v-icon>&nbsp;Remover
                                            </v-btn>&nbsp;
                                            <v-btn
                                                @click="ACCOUNT_MODULE_MEMBER_APPROVE('active', this.sailpointCurrent);"
                                                class="ma-0 rounded-0 " color="orange"
                                                variant="tonal"><v-icon>mdi-check-bold</v-icon>&nbsp;Aprovar
                                            </v-btn>
                                        </v-col>
                                        <v-col v-if="this.sailpointStat == 'active'" cols="12" sm="6" md="2" lg="2"
                                            class="pa-0 ma-0 text-right">
                                            <v-btn @click="ACCOUNT_MODULE_MEMBER_REMOVE(this.sailpointCurrent);"
                                                class="ma-0 rounded-0 " color="red"
                                                variant="tonal"><v-icon>mdi-account-remove</v-icon>&nbsp;Remover
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                                <!-- NO -->
                                <div v-if="sailpointMembers == 2"
                                    class="border-sm border-s-lg w-100 bg-white pa-5 pb-2 mt-0 mb-1 text-caption">
                                    <v-row class="pa-0 pb-0 mb-0">
                                        <v-col cols="12" sm="6" md="10" lg="10" class="pa-0 pb-0 mb-0 ">
                                            <span class="text-subtitle-1"><v-icon>mdi-email-outline</v-icon>&nbsp;{{
                                                sailpointFullname }}</span>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="2" lg="2" class="pa-0 ma-0 text-right">
                                            <v-btn @click="ACCOUNT_MODULE_MEMBER_SAVE();" class="ma-0 rounded-0 "
                                                color="#00428c"
                                                variant="tonal"><v-icon>mdi-plus-thick</v-icon>&nbsp;Adicionar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                                <!-- EMPTY RESULTS -->
                                <div v-if="sailpointMembers == 3"
                                    class="h-75 bg-white pa-5 pb-2 mt-0 mb-1 text-caption bg-light-blue-lighten-5">
                                    <v-row class="pa-0 pb-0 mb-0 text-center h-100">
                                        <v-col cols="12" class="pa-0 pt-15 mt-10">
                                            <span class="text-subtitle-1"><v-icon>mdi-car-brake-alert</v-icon>&nbsp;Não
                                                existem utilizadores registados!</span>
                                        </v-col>

                                    </v-row>
                                </div>
                                <!-- NON EXISTENT -->
                                <div v-if="sailpointMembers == 'NA'"
                                    class="border-sm border-s-lg w-100 bg-white pa-5 pb-2 mt-0 mb-1 text-caption"
                                    height="400">
                                    <v-row class="pa-0 pb-0 mb-0 ">
                                        <v-col cols="12" sm="6" md="10" lg="10" class="pa-0 pb-0 mb-0 ">
                                            <span class="text-subtitle-1"><v-icon>mdi-help</v-icon>&nbsp;Não
                                                foram encontrados resultados para: <span
                                                    style="color:red; font-weight: 500;"><u>{{
                                                        this.memberID
                                                    }}</u></span></span>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="2" lg="2" class="pa-0 ma-0 text-right">
                                            <v-btn
                                                @click="this.sailpointMembers = 0; this.emptyFields = false; this.memberID = null;"
                                                class="ma-0 rounded-0 " color="orange"
                                                variant="tonal"><v-icon>mdi-close-circle</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-window-item>
                            <v-window-item v-model="history">
                                <!-- <v-card> -->
                                <!-- <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title> -->

                                <!-- <v-container> -->
                                <v-list lines="one" class="mx-auto pa-2" width="900" max-width="800" height="450">


                                    <v-list-subheader>Files</v-list-subheader>

                                    <!-- <v-card-text>
                            <div class="font-weight-bold ms-1 mb-2">Timeline</div>

                            <v-timeline align="start" density="compact">
                              <v-timeline-item v-for="log in customerLogs" :key="log.id" dot-color="blue"
                                size="x-small">
                                <div class="mb-4">
                                  <div class="font-weight-normal">
                                    <strong>{{ log.task }}</strong> @{{ log.admin }}
                                  </div>

                                  <div>{{ log.crdate }}</div>
                                </div>
                              </v-timeline-item>
                            </v-timeline>
                          </v-card-text> -->

                                    <v-card append-icon="mdi-check" class="mx-auto my-2" elevation="3" variant="tonal"
                                        link :title="index + 1" prepend-icon="mdi-tooltip-text-outline" dense
                                        :subtitle="log.crdate + ' @ ' + log.admin" v-for="(log, index) in customerLogs"
                                        :key="log.id" color="blue-darken-2">
                                        <v-card-text>{{ log.task }}</v-card-text>
                                    </v-card>

                                    <!-- :title="log.task" -->

                                    <!-- <v-list-item v-for="log in customerLogs" :key="log.id" :subtitle="log.crdate"
                            :title="log.task">
                            {{log.admin}}

                            <template v-slot:prepend>
                              <v-avatar color="blue">

                                <v-icon color="white">{{ "mdi-clipboard-text" }}</v-icon>
                              </v-avatar>
                            </template>

                            <v-divider outset></v-divider>

                            <template v-slot:append>
                              <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
                            </template>
                          </v-list-item> -->
                                </v-list>
                                <!-- </v-container> -->
                                <small>*indicates required field</small>


                                <!-- </v-card> -->
                            </v-window-item>
                        </v-window>
                    </v-card-text>

                    <v-card-actions class="align-content-end fixed-bar-bottom">
                        <v-spacer></v-spacer>
                        <v-btn color="indigo-darken-3" variant="text"
                            @click="handleReset; editModal = false; this.overlay = false"
                            prepend-icon="mdi-close-circle">Fechar</v-btn>

                        <v-btn variant="flat" color="success" type="submit" @click="ACCOUNT_MODULE_SAVE();"
                            :ripple="true" :disabled="loading" :loading="loading"
                            prepend-icon="mdi-content-save-outline">
                            Guardar
                            <template v-slot:loader>
                                <v-progress-linear indeterminate></v-progress-linear>
                            </template>
                        </v-btn>
                    </v-card-actions>

                    <v-window v-model="tab">
                        <v-window-item
                            v-for="                                                                                         item in items                                                                                         "
                            :key="item" :value="item">
                            {{ text }}
                        </v-window-item>
                    </v-window>

                </v-card>
            </v-dialog>

        </v-app>
    </v-form>

   


</template>

<script setup>
const footerProps = {
    itemsPerPageText: "Itens por página",
    itemsPerPageOptions: [10, 20, 50]
}

// document.getElementById('current_page').value = window.location.href

// useTokenStore
import { ref, onMounted } from 'vue';
import { useTokenStore } from '@/store/TokenStore';
import { useActionStore } from '@/store/ActionStore';
import { useModuleStore } from '@/store/TaskStore';
import { useRouteStore } from '@/store/RouteStore';
import axios from 'axios'
import { mergeProps } from 'vue'

// useTokenStore
import { useEmailStore } from '@/store/EmailStore'
import router from '@/router';
import { useRouter } from 'vue-router';
import { validate } from "vee-validate";
import { useField, useForm } from "vee-validate";
import { reactive } from 'vue'
import ProfileLinks from '@/components/ProfileLinks.vue'

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

var myPicture = '';
const selected = ref("");


onMounted(() => {

});



</script>

<script>


// const member = document.querySelector('input[type="text"]')
// member.addEventListener("focus", (event) => {
//     event.target.style.background = 'pink';
// });

// member.addEventListener("blur", (event) => {
//     event.target.style.background = '';
// });

const TokenStore = useTokenStore();
const navGoToPage = useActionStore();
const useModule = useModuleStore();
const useRoute = useRouteStore();
const newToken = { "tokenID": "ljahsdfq697e69qwerq", "user": "Vasco Gungui", "domain": "Administrator" }

export default {
    data: () => ({
        bgimage: "https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg", //https://www.verangola.net/va/images/cache/750x380/crop/images%7Ccms-image-000008157.jpg
        moduleReqReasonSubmited: false,
        moduleReqReasonError: false,
        moduleReqReasonText: '',
        moduleReqReason: false,
        alignmentsAvailable: [
            'start',
            'center',
            'end',
            'baseline',
            'stretch',
        ],
        alignment: 'center',
        dense: false,
        justifyAvailable: [
            'start',
            'center',
            'end',
            'space-around',
            'space-between',
        ],
        justify: 'center',
        showForm: null,
        activeControl: '',
        sailpointCurrent: '',
        sailpointFullname: 'Vasco Gungui',
        sailpointID: '',
        sailpointMembers: false,
        sailpointStat: false,
        memberID: '',
        loaded: false,
        loaded1: false,
        // closeDelete: false,
        mRead: false,
        mWrite: false,
        mModify: false,
        mRemove: false,
        mID: '',
        mText: '',
        mDescr: '',
        mIcon: '',
        mRoutes: '',
        mColor: '',
        mDialog: '',
        mStat: '',
        mAuthor: '',
        mLastModified: '',
        isEditing: false,
        alertDelete: false,
        tabs: '',
        editModal: false,
        myException: '',
        myEmailNew: '',
        TwoFactorAuth: '',
        alertSuccess: false,
        emptyFields: false,
        actIncPwd: false,
        chgEmail: false,
        showPwd: false,
        dialogDelete: false,
        OrdersOrder: 'Data de alteração [ordem crescente]',
        OrdersStat: 'Todos',
        expiredModal: false,
        selected: 0,
        loading: false,
        loading1: false,
        search: '',
        expanded: [],
        sailpointItems: [],
        myEntitlements: [],
        myRoutes: 'default/active',
        allContacts: [],
        serverItems: [],
        contactHeaders: [
            { title: 'Nome', align: 'start', key: 'fullname' },
            { title: 'Produtos', align: 'start', key: 'crdate' },
            { title: 'Autor', align: 'start', key: 'admin' },
            { title: 'Acções', align: 'end', key: 'actions', width: '200px' },
        ],
        sailpointHeaders: [
            { title: 'Nome', align: 'start', key: 'text' },
            { title: 'Descrição', align: 'start', key: 'descr' },
            { title: 'Data de solicitação', align: 'start', key: 'crdate' },
            { title: 'Data de aprovação', align: 'start', key: 'mdate' },
            { title: 'Permissões', align: 'start', key: 'accesses' },
            // { title: 'Icone', align: 'start', key: 'mdate' },
            // { title: 'Cor', align: 'start', key: 'mdate' },
            { title: 'Autor', align: 'start', key: 'admin' },
            { title: 'Acções', align: 'end', key: 'actions', width: '200px' },
        ],
        model: true,
        tab: 'Todos',
        proposalTabs: [
            {
                value: 'Todos',
                text: 'Todos'

            },
            {
                value: 'Rascunhos de Propostas',
                text: 'Rascunhos de Propostas',

            },
            {
                value: 'Propostas Bissonde',
                text: 'Propostas Bissonde'

            },
        ],
        licenseOrd: '',
        myPictureHelpDesk: 'https://www.alert-software.com/hubfs/helpdesk-3.jpg',
        myID: '',
        myPostOffice: '',
        myAddress: '',
        myCity: '',
        myDistrict: '',
        myCountry: '',
        overlay: true,
        JwtToken: '',
        myDomain: '',
        myLanguage: '',
        myPhone: '',
        myDepartment: '',
        myCostCenter: '',
        myName: '',
        mySurname: '',
        myLastLogin: '',
        myEmail: '',
        myEmail2: '',
        myIP: '',
        myCurrentDateTime: '',
        myBranch: '',
        myPassword: '',
        myPasswordConfirm: '',
        panel: [0, 1, 2, 3],
        // panel: [],
        navGoToPage: '',
        topItems: [
            {
                title: 'Dashboard',
                disabled: false,
                href: '/dashboard?nav=dshome',
            },
            {
                title: 'Perfil',
                disabled: false,
                href: '/profile',
            },
            {
                title: localStorage.getItem('AFN'),
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
        // emptyFields: false,
        // ActIncPwd: false,
        ActEmpty: false,
        ActExist: false,
        ActExistF: false,
        bgimage: "https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg", //https://www.verangola.net/va/images/cache/750x380/crop/images%7Ccms-image-000008157.jpg

    }),
    mounted: async function () {
        // window.location = goToPage[1]
        let xp = window.location.href
        navGoToPage.task = xp.split('=')[1] // = goToPage[1]

        this.ACCOUNT_IAM_GET(localStorage.getItem('username'), 'path', navGoToPage.task);


        if (navGoToPage.task == 'modules') {
            this.ACCOUNT_MODULES_GET_ALL();
        }

        if (window.localStorage.getItem('JwtToken') != null) {

            //Check if token is still valid
            const { exp } = this.decodeJwtResponse(window.localStorage.getItem('JwtToken'))
            if (Date.now() >= exp * 1000) {
                this.expiredModal = true
                window.location = '/signin?returl.' + window.location.href.split('/')[3]
            }

            this.JwtToken = localStorage.getItem('JwtToken')
            this.MyUserName = localStorage.getItem('AFN')
            this.MyEmail = localStorage.getItem('username')
            this.MyEmail2 = localStorage.getItem('username')
            this.myIP = localStorage.getItem('IP')

            // alert(this.MyEmail)
        }
        else {
            window.location = '/signin?returl.' + window.location.href.split('/')[3]
        }

        if (navGoToPage.task == undefined | navGoToPage.task == 'contact' | navGoToPage.task == 'myuser') {
            this.ACCOUNT_GET();
        }
        else {
            this.overlayOFF();
        }

    },
    methods: {
        onBlur: function (control) {
            // this.activeControl = control;

            // this.alertSuccess=false;
        },
        onFocus: function (control) {
            this.activeControl = control;
        },
        onEscape: function () {

            this.sailpointMembers = 0;
            this.alertSuccess = false;
            this.emptyFields = false;
            this.memberID = null;
            // if (this.sailpointMembers == 3) {
            // this.ACCOUNT_MODULES_MEMBER_GETS_ALL(this.mID)
            // }
        },
        onEnter: function (control) {

            this.onClick();

        },
        defaultRoutes: function () {
            //this.mRoutes = "modules, myuser, contacts, MY_BISSONDE, DASH_START, DASH_MODS, DASH_KPIS, dshome, contacts, dashboard, INFO_CONTACT; PRODUCT; SETTINGS; ADR_DATA; modules; myuser; contact; license; orders; proposals; approvals; shoppingList; blanket-orders; orders; deliveries; invoices; creditnotes; avatar; addresses";
        },
        onClick() {
            // this.sailpointMembers = true;
            // this.loading1 = true

            // setTimeout(() => {
            //     this.loading1 = false
            //     this.loaded1 = true
            // }, 2000)
            this.alertDelete = false

            if (this.activeControl == 'Member') {
                if (this.memberID == '' | this.memberID == null) {
                    this.emptyFields = true;
                    return;
                }

                // if (this.sailpointMembers != 3) {
                this.ACCOUNT_MODULES_MEMBER_GET_FIRST(this.memberID)
                // }
                // else {
                //     this.ACCOUNT_MODULES_MEMBER_GETS_ALL(this.mID)
                // }
            }
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        decodeJwtResponse: function (token) {
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
        },

        ACCOUNT_GET: async function (item) {

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            await axios.get('Account/' + this.MyEmail, config)
                .then(response => {
                    this.loading = true
                    if (response.request.status == '400') {

                    }
                    if (response.request.status == '401') {
                        this.expiredModal = true
                    }
                    if (response.request.status == '200') {
                        this.myBranch = response.data.branch
                        this.myLastLogin = response.data.lastLogin
                        this.myName = response.data.username.split(' ')[0].toUpperCase()
                        this.mySurname = response.data.username.split(' ')[1].toUpperCase()
                        // this.myEmail = response.data.email
                        this.myDomain = response.data.domain
                        this.myLanguage = response.data.lang
                        this.myPhone = response.data.tel
                        this.myDepartment = response.data.dept
                        this.myCostCenter = response.data.costCenter
                        this.myAddress = response.data.adr
                        this.myCity = response.data.city
                        this.myDistrict = response.data.district
                        this.myCountry = response.data.country
                        this.myPostOffice = response.data.pob
                        this.myID = response.data.id
                        this.myPassword = response.data.pass
                        this.myPasswordConfirm = response.data.pass
                        this.TwoFactorAuth = response.data.authType

                        this.overlayOFF();
                    }
                }).catch(
                    error => {
                        const status = error.response ? error.response.status : null;

                        if (status === 401) {
                            this.expiredModal = true
                            window.location = '/signin?returl.' + window.location.href.split('/')[3]
                            document.getElementById('userD').innerHTML = "Acesso não autorizado"
                        }
                        else if (status === 404) {
                            document.getElementById('userD').innerHTML = "Post não encontrado"
                        }
                        else {
                            // document.getElementById('userD').innerHTML = "Ocorreu um erro:", error
                            this.expiredModal = true
                            window.location = '/signin?returl.' + window.location.href.split('/')[3]
                        }
                        document.getElementById('userD').innerHTML = error

                        window.location = '/signin?returl.' + window.location.href.split('/')[3]
                    }
                )
        },

        ACCOUNT_IAM_GET: async function (email, router, sailpoint) {

            //INFO
            //PRODUCTS
            //SETTINGS
            //ADDRESSES
            // return;

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            this.myCurrentDateTime = today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),

                this.myEntitlements = ''
            // this.myRoutes = ''
            this.myRoutes = []


            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            // if (router == 'path') {
            await axios.get('IAM/' + email, config)
                .then(response => {

                    // this.loading = true
                    if (response.request.status == '400') {

                    }
                    if (response.request.status == '401') {
                        this.expiredModal = true
                    }
                    if (response.request.status == '200') {

                        for (let i in response.data['$values']) {
                            this.myEntitlements += response.data['$values'][i].sailpoint + '; ';
                            if (response.data['$values'][i].stat == 'active') {
                                this.myRoutes += response.data['$values'][i].routes + '/' + response.data['$values'][i].stat + '\n';
                            }
                        }

                        // alert(this.myRoutes)

                        window.localStorage.setItem('MRT', this.myRoutes.split('\n'));

                        useRoute.setRoute(this.myRoutes.split('\n'))
                        // alert(useRoute.route)


                        // if (response.data['$values'][i].routes.includes(sailpoint) & response.data['$values'][i].stat == 'active') {

                        for (let i in useRoute.route) {
                            //alert(useRoute.route[i].split(',')[0])
                            //    return;
                            // alert(i)

                            if (useRoute.route[i].split('/')[0].includes(sailpoint) & useRoute.route[i].split('/')[1] == 'active') {
                                this.showForm = true;
                                return;

                                // alert(useRoute.route)
                                // alert('The user has access')
                            }
                            else {
                                this.showForm = false;
                                // window.location = '/noaccess?nav=' + navGoToPage.task
                                // alert('The user does not have access')
                            }
                            this.overlayOFF();
                        }

                    }
                }).catch(
                    error => {
                        const status = error.response ? error.response.status : null;

                        // alert(status)
                        return;

                        if (status === 401) {
                            this.expiredModal = true
                            window.location = '/signin?returl.' + window.location.href.split('/')[3]
                            document.getElementById('userD').innerHTML = "Acesso não autorizado"
                        }
                        else if (status === 404) {
                            document.getElementById('userD').innerHTML = "Post não encontrado"
                        }
                        else {
                            // document.getElementById('userD').innerHTML = "Ocorreu um erro:", error
                            this.expiredModal = true
                            window.location = '/signin?returl.' + window.location.href.split('/')[3]
                        }
                        document.getElementById('userD').innerHTML = error
                        console.log(error)


                        window.location = '/signin?returl.' + window.location.href.split('/')[3]
                    }
                )
            // }
            // else if (router == 'url') {
            //     await axios.get('IAM/' + email + ',' + sailpoint, config)
            //         .then(response => {
            //             // this.loading = true
            //             if (response.request.status == '400') {

            //             }
            //             if (response.request.status == '401') {
            //                 this.expiredModal = true
            //             }
            //             if (response.request.status == '200') {

            //                 for (let i in response.data['$values']) {
            //                     this.myEntitlements += response.data['$values'][i].sailpoint + '; ';
            //                 }
            //                 console.log(this.myEntitlements)

            //                 this.overlayOFF();
            //             }
            //         }).catch(
            //             error => {
            //                 const status = error.response ? error.response.status : null;

            //                 // alert(status)
            //                 return;

            //                 if (status === 401) {
            //                     this.expiredModal = true
            //                     window.location = '/signin?returl.' + window.location.href.split('/')[3]
            //                     document.getElementById('userD').innerHTML = "Acesso não autorizado"
            //                 }
            //                 else if (status === 404) {
            //                     document.getElementById('userD').innerHTML = "Post não encontrado"
            //                 }
            //                 else {
            //                     // document.getElementById('userD').innerHTML = "Ocorreu um erro:", error
            //                     this.expiredModal = true
            //                     window.location = '/signin?returl.' + window.location.href.split('/')[3]
            //                 }
            //                 document.getElementById('userD').innerHTML = error
            //                 console.log(error)


            //                 window.location = '/signin?returl.' + window.location.href.split('/')[3]
            //             }
            //         )
            // }
        },

        ACCOUNT_DELETE: async function () {

            this.alertSuccess = false
            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            await axios.delete('Account/' + this.MyEmail, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertDelete = true
                            //return;
                            //reload
                            // this.CUSTOMER_GET_ALL();

                            this.serverItems.splice(this.editedIndex, 1)
                            this.closeDelete();
                            this.editModal = false;
                        }

                        this.$router.push({ path: `/signin` })
                        window.location = '/signin?returl.' + window.location.href.split('/')[3]
                    }

                )
                .catch((err) => {

                });
        },

        CUSTOMER_GET_ALL: async function () {

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.serverItems = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('Customer/' + PID + ',' + BID, config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.serverItems = response.data['$values']


                    //  for(let i in customers['$values'])
                    //  {
                    //  }
                })
                // .then(data => )
                .catch(err => console.error(err));

            this.alertSuccess = false

        },

        ACCOUNT_SAVE: async function () {

            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + + window.localStorage.getItem('JwtToken')
                }
            }

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            // var DATE_TIME = year + '-' + month + '-' + day + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            await axios.put('Account',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    email: this.myEmail,
                    pob: this.myPostOffice,
                    adr: this.myAddress,
                    city: this.myCity,
                    district: this.myDistrict,
                    country: this.myCountry,
                    costCenter: this.myCostCenter,
                    mdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {

                });
        },

        ACCOUNT_SAVE_PWD: async function () {

            if (this.myPassword != this.myPasswordConfirm) {
                this.actIncPwd = true;
                return;
            }
            else {
                this.showPwd = false;
                this.actIncPwd = false;
            }

            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + + window.localStorage.getItem('JwtToken')
                }
            }

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            // var DATE_TIME = year + '-' + month + '-' + day + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            await axios.put('Account',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    email: this.myEmail,
                    pob: this.myPostOffice,
                    adr: this.myAddress,
                    city: this.myCity,
                    district: this.myDistrict,
                    country: this.myCountry,
                    costCenter: this.myCostCenter,
                    mdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    pass: this.myPassword
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {

                });
        },

        ACCOUNT_SAVE_AUTH: async function (item) {

            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + + window.localStorage.getItem('JwtToken')
                }
            }

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            await axios.put('AccountTwoFactorAuth',
                {
                    email: this.myEmail,
                    mdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    authtype: item
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            this.ACCOUNT_GET();

                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {

                });
        },

        ACCOUNT_SAVE_EMAIL: async function (item) {

            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + + window.localStorage.getItem('JwtToken')
                }
            }

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            await axios.put('AuthChangeEmail',
                {
                    email: this.myEmail,
                    mdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    ID: window.localStorage.getItem('AID'),
                    authType: item
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {
                            this.overlay = false
                            this.myException = response.response.data.errors.AuthType[0]
                            return;
                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            this.ACCOUNT_GET();

                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {
                    alert(err)

                });
        },

        ACCOUNT_MODULE_DELETE: async function (item) {


            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + + window.localStorage.getItem('JwtToken')
                }
            }
            await axios.delete('AccountModules/' + item, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {
                            this.overlay = false
                            // this.myException = response.response.data.errors.AuthType[0]
                            return;
                        }
                        if (response.request.status == '200') {

                            this.dialogDelete = false;
                            // this.overlayOFF();
                            this.alertSuccess = true

                            // this.ACCOUNT_GET();
                            this.ACCOUNT_MODULES_GET_ALL();


                            this.overlayOFF();

                            this.editModal = false;
                        }
                    }
                )
                .catch((err) => {
                    alert(err)

                });
        },

        ACCOUNT_MODULE_SAVE: async function () {

            // this.overlayON();
            this.alertSuccess = true
            // this.saveON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + + window.localStorage.getItem('JwtToken')
                }
            }

            let myAccess = '';
            if (this.mRead == true) {
                myAccess += 'read; ';
            }
            if (this.mWrite == true) {
                myAccess += 'write; ';
            }
            if (this.mModify == true) {
                myAccess += 'modify; ';
            }
            if (this.mRemove == true) {
                myAccess += 'remove; ';
            }
            // return;

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            await axios.post('AccountModules',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    text: this.mText,
                    icon: this.mIcon,
                    descr: this.mDescr,
                    to: this.mRoutes,
                    dialog: this.mDialog,
                    stat: this.mStat,
                    bgcolor: this.mColor,
                    crdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    mdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    ID: this.mID,
                    accesses: myAccess
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {
                            // this.overlayON();
                            this.overlay = false
                            // this.myException = response.response.data.errors.AuthType[0]

                            return;
                        }
                        if (response.request.status == '200') {
                            // this.alertSuccess = false;
                            // this.overlayOFF();

                            // this.ACCOUNT_GET();
                            this.ACCOUNT_MODULES_GET_ALL();

                            // this.saveOFF();

                        }
                    }
                )
                .catch((err) => {
                    alert(err)

                });
        },

        ACCOUNT_MODULES_GET_ALL: async function () {

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.serverItems = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')
            let i = 0;
            const customers = await axios.get('AccountModules', config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.serverItems = response.data['$values']
                    this.loading = false
                    this.overlay = false

                    this.serverItems.splice(this.editedIndex, i++)

                    //  for(let i in customers['$values'])
                    //  {
                    //  }

                    this.overlayOFF();
                })
                // .then(data => )
                .catch(err => console.error(err));

            this.alertSuccess = false

        },

        ACCOUNT_MODULES_GET: async function (item) {
            this.mDialog = item.dialog;
            this.mID = item.id;
            this.mText = item.text;
            this.mDescr = item.descr;
            this.mIcon = item.icon;
            this.mRoutes = item.to;
            this.mColor = item.bgcolor;
            this.mDialog = item.dialog;
            this.mStat = item.stat;
            this.mAuthor = item.admin;

            this.mLastModified = item.mdate;

            this.mRead = false
            this.mWrite = false
            this.mModify = false
            this.mRemove = false

            let myAccess = item.accesses;
            if (myAccess.includes('read')) {
                this.mRead = true
            }
            if (myAccess.includes('write')) {
                this.mWrite = true
            }
            if (myAccess.includes('modify')) {
                this.mModify = true
            }
            if (myAccess.includes('remove')) {
                this.mRemove = true
            }

            this.ACCOUNT_MODULES_MEMBER_GETS_ALL(item.id)
        },

        ACCOUNT_MODULE_MEMBER_SAVE: async function () {

            if (this.showForm == false & this.moduleReqReason == true & this.moduleReqReasonText == '') {
                this.moduleReqReasonError = true;
                return;
            }
            else {
                this.moduleReqReasonError = false;
            }

            // this.overlayON();
            this.alertDelete = false
            // this.alertSuccess = true
            // this.saveON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.mRead = false
            this.mWrite = false
            this.mModify = false
            this.mRemove = false

            let myAccess = '';
            if (this.mRead == true) {
                myAccess += 'read; ';
            }
            if (this.mWrite == true) {
                myAccess += 'write; ';
            }
            if (this.mModify == true) {
                myAccess += 'modify; ';
            }
            if (this.mRemove == true) {
                myAccess += 'remove; ';
            }

            if (this.mRoutes == '') {
                this.mRoutes = window.location.href.split('=')[1]
                // alert(this.mRoutes)
            }

            if (this.memberID == '') {
                this.memberID = localStorage.getItem('username')
                // alert(this.mRoutes)
            }

            if (this.sailpointID == '') {
                this.sailpointID = localStorage.getItem('AID')
                // alert(this.mRoutes)
            }
            // return;

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            await axios.post('AccountModulesMembers',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    // ID: NOW,
                    moduleID: this.mID,
                    sailpoint: this.mText,
                    approvalDate: null,
                    requester: window.localStorage.getItem('AFN'),
                    approver: null,
                    routes: this.mRoutes,
                    crdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    mdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    userID: this.sailpointID,
                    userEmail: this.memberID,
                    username: this.sailpointFullname,
                    permissions: myAccess,
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    stat: 'pending'
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {
                            // this.overlayON();
                            this.overlay = false
                            // this.myException = response.response.data.errors.AuthType[0]

                            return;
                        }
                        if (response.request.status == '200') {
                            // this.alertSuccess = true;
                            // this.overlayOFF();

                            // this.ACCOUNT_MODULES_MEMBER_GET_FIRST(this.memberID)
                            if (this.showForm == true) {
                                this.ACCOUNT_MODULES_MEMBER_GETS_ALL(this.mID)
                            }
                            else {
                                // this.moduleReqReason = false;

                                this.moduleReqReason = 'done';
                            }

                            // this.ACCOUNT_GET();


                            // this.saveOFF();

                        }
                    }
                )
                .catch((err) => {
                    alert(err)

                });
        },

        ACCOUNT_MODULE_MEMBER_APPROVE: async function (task, sail) {

            this.alertDelete = false
            // this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            let myAccess = '';
            if (this.mRead == true) {
                myAccess += 'read; ';
            }
            if (this.mWrite == true) {
                myAccess += 'write; ';
            }
            if (this.mModify == true) {
                myAccess += 'modify; ';
            }
            if (this.mRemove == true) {
                myAccess += 'remove; ';
            }

            // alert(this.mRoutes)
            // return;

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            await axios.put('AccountModulesMembers',
                {
                    approvalDate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    approver: window.localStorage.getItem('AFN'),
                    routes: this.mRoutes,
                    crdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    mdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    ID: sail.id,
                    sailpoint: this.mText,
                    userEmail: sail.userEmail,
                    username: sail.username,
                    permissions: myAccess,
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    stat: task
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {
                            // this.overlayON();
                            this.overlay = false
                            // this.myException = response.response.data.errors.AuthType[0]

                            return;
                        }
                        if (response.request.status == '200') {
                            // this.alertSuccess = true;
                            // this.overlayOFF();

                            if (this.sailpointMembers == 1) {
                                // this.ACCOUNT_MODULES_MEMBER_GET_FIRST(sail.userEmail)
                                this.ACCOUNT_MODULES_MEMBER_GETS_ALL(sail.moduleId)
                            }
                            else {
                                this.ACCOUNT_MODULES_MEMBER_GETS_ALL(sail.moduleId)
                            }

                            // this.ACCOUNT_GET();


                            // this.saveOFF();

                        }
                    }
                )
                .catch((err) => {
                    alert(err)

                });
        },

        ACCOUNT_MODULE_MEMBER_REMOVE: async function (sail) {

            // this.overlayON();
            this.alertSuccess = false
            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            // return;

            await axios.delete('AccountModulesMembers/' + sail.id, config)
                .then(
                    (response) => {
                        if (response.request.status == '200') {
                            this.sailpointStat = 'pending'
                            // this.alertDelete = true
                            //return;
                            //reload
                            // this.CUSTOMER_GET_ALL();

                            this.overlayOFF();
                        }
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '500') {
                            // this.sailpointStat = 'pending'
                            // this.alertDelete = true

                            // this.ACCOUNT_MODULES_MEMBER_GET_FIRST(sail.userEmail);
                            this.ACCOUNT_MODULES_MEMBER_GETS_ALL(sail.moduleId)
                            //return;
                            //reload
                            // this.CUSTOMER_GET_ALL();

                            this.overlayOFF();
                        }
                    }

                )
                .catch((err) => {

                });
        },

        ACCOUNT_MODULES_MEMBER_GET_FIRST: async function (member) {

            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }
            this.loading1 = true
            this.sailpointItems = []

            const customers = await axios.get('AccountModulesMembers/' + member + ',' + this.mID, config)
                .then(response => {

                    if (response.request.status == '200') {
                        this.sailpointCurrent = response.data
                        this.sailpointFullname = response.data.username
                        this.sailpointID = response.data.id
                        this.sailpointStat = response.data.stat
                        this.sailpointMembers = 1
                        this.alertSuccess = false
                        this.loading1 = false
                        this.emptyFields = false;
                    }
                    else if (response.request.status == '400') {
                        this.sailpointMembers = 'NA'
                        this.alertSuccess = false
                        this.loading1 = false
                        this.loaded1 = true
                        this.emptyFields = false;
                    }
                    else if (response.request.status == '500') {
                        this.ACCOUNT_MODULES_MEMBER_GET_SECOND(member);
                        // this.sailpointMembers = 'NA'
                        this.alertSuccess = false
                        this.loading1 = false
                        this.loaded1 = true
                        this.emptyFields = false;
                    }
                    this.sailpointItems = response.data
                    // else {
                    //     this.sailpointMembers = false
                    //     this.loading1 = false
                    // }
                })
                .catch(err => console.error(err));
        },

        ACCOUNT_MODULES_MEMBER_GET_SECOND: async function (member) {

            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }
            this.loading1 = true
            this.sailpointItems = []

            const customers = await axios.get('Account/' + member, config)
                .then(response => {

                    if (response.request.status == '200') {
                        this.sailpointFullname = response.data.username
                        this.sailpointID = response.data.id
                        this.sailpointMembers = 2
                        this.alertSuccess = false
                        this.loading1 = false
                        this.emptyFields = false;
                    }
                    else if (response.request.status == '400' | response.request.status == '500') {
                        this.sailpointMembers = 'NA'
                        this.alertSuccess = false
                        this.loading1 = false
                        this.loaded1 = true
                        this.emptyFields = false;
                    }
                    this.sailpointItems = response.data
                })
                .catch(err => console.error(err));
        },

        ACCOUNT_MODULES_MEMBER_GETS_ALL: async function (moduleID) {

            this.sailpointMembers = 0;

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.sailpointItems = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('AccountModulesMembers/' + moduleID, config)
                .then(response => {

                    // = response.data
                    // this.loading = true
                    if (response.request.status == '400') {
                        this.sailpointItems = responde.data.status
                    }
                    if (response.request.status == '200') {
                        this.sailpointItems = response.data
                    }

                    //  for(let i in customers['$values'])
                    //  {
                    //  }

                    if (response.data == '') {
                        this.sailpointMembers = 3
                        // return;
                    }
                    // else{
                    //     this.sailpointMembers = 1
                    // }
                })
                .catch(err => console.error(err));

            this.alertSuccess = false

        },

        ModulesNew() {
            this.mRead = false
            this.mWrite = false
            this.mModify = false
            this.mRemove = false

            this.sailpointMembers = 0;
            this.sailpointItems = [];
            this.isEditing = true;
            this.mText = null;
            this.mDescr = null;
            this.mIcon = null;
            this.mRoutes = null;
            this.mColor = null;
            this.mDialog = null;
            this.mStat = null;

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            this.mID = NOW;
        },

        saveOFF: function (event) {
            // setTimeout(() => {
            this.alertSuccess = false;
            // }, (9500));
        },

        overlayOFF: function (event) {
            setTimeout(() => {
                this.overlay = false,
                    this.viewMainForm = true,
                    setTimeout(() => {
                        this.alertSuccess = false
                    }, (3500));
            }, (500));
        },

        overlayON: function (event) {
            setTimeout(() => {
                this.overlay = true,
                    this.viewMainForm = true
            }, (500));
        },

        logOff: function () {
            localStorage.removeItem("token");
            localStorage.removeItem("JwtToken");
            localStorage.removeItem("module");
            localStorage.removeItem("username");
            localStorage.removeItem("myPicture");
            localStorage.removeItem("AFN");
            localStorage.removeItem("AID");
            localStorage.removeItem("IP");
            localStorage.removeItem("MOB");
            localStorage.removeItem("MRT");
            localStorage.removeItem("MSC");
            localStorage.removeItem("BID");
            localStorage.removeItem("PID");
            localStorage.removeItem("PWE");
            const off = 'off';
            window.location = '/signin?returl.' + window.location.href.split('/')[3]
            this.$router.push({ path: `/signin` })
        },
        checkInput: function () {
            // window.localStorage.setItem('JwtToken', newToken);
            if (TokenStore == 'Contacts') {
                // this.isOkToSubmit = this.firstName && this.lastName
            }
        },

        // logOff: function () {
        //     localStorage.removeItem("token");
        //     localStorage.removeItem("JwtToken");
        //     localStorage.removeItem("module");
        //     localStorage.removeItem("username");
        //     const off = 'off';
        //     window.location = '/login?returl.' + window.location.href.split('/')[3]
        //     this.$router.push({ path: `/signin` })
        // }
    },
    watch: {

        memberID(newValue, oldValue) {
            if (newValue == null) {
                this.sailpointMembers = 0;
                this.ACCOUNT_MODULES_MEMBER_GETS_ALL(this.mID)
            }
        },

        dialogDelete(val) {
            val || this.closeDelete()
        },

        allContacts(newValue, oldValue) {
            this.overlayON();
            if (newValue.length > 0 & this.loading == true) {

                var table = document.getElementById("cTable")
                // alert(table.offsetHeight)
                if (this.allcontacts != undefined && table.offsetHeight > 300) {
                    this.overlayOFF();
                }
            }
        },
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

<style scoped>
::-webkit-scrollbar {
    width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 1px;
    border-radius: 1px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 1px;
    border-radius: 1px;
    background: lightgreen;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
}

/* .v-dialog.v-toolbar {
    position: sticky;
    top: 0;
    z-index: 999;
} */
.fixed-bar {
    position: sticky;
    position: -webkit-sticky;
    /* for Safari */
    top: 0em;
    z-index: 2;
}

.fixed-bar-bottom {
    position: sticky;
    position: -webkit-sticky;
    /* for Safari */
    bottom: 0em;
    z-index: 2;
    background-color: white;
}

v-data-table thead th {
    font-size: 20px !important;

}

:active-class {
    background-color: yellow;
}

.v-text-field {
    height: 50px;
    font-size: 2rem;
}

.v-expansion-panels {
    font-size: 1.2em;
}

.disabled {
    background-color: red;
}
</style>