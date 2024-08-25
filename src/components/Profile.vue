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

            <!-- 
            <v-sheet class="pt-0 mt-5 text-center h2 container">
                O meu perfil
            </v-sheet> -->

            <v-sheet class="pa-10 pt-12 pb-0  text-button text-caption">
                <v-breadcrumbs :items="topItems">
                    <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-breadcrumbs>
            </v-sheet>
            <v-sheet class="pb-0" elevation="0" cols="12" sm="3" md="3" lg="3" style="background-color: white;">
                <!-- DEFAULT -->
                <v-sheet elevation="2" class="pa-10 ma-10 pt-0 pl-3 pr-3 mt-0 mb-0 pb-0 text-caption "
                    style="font: 18px">

                    <v-row cols="3" sm="3" md="3" lg="3">
                        <v-col cols="12" sm="3" md="3" lg="2" class="pa-0 ma-0 rounded-0 "
                            style="background-color: #E3F2FD;">

                            <v-expansion-panels v-model="panel" multiple elevation="0" class="pa-0 pr-0 pt-3 pl-0">
                                <p class="h5 pa-5 pb-0">My Bissonde</p>
                                <v-expansion-panel class="pa-0 ma-0 rounded-0  border-t-sm"
                                    style="color: darkgreen; font-size:11pt; font-weight: 500;">
                                    <v-expansion-panel-title color="font-xl"
                                        style="background-color: #E3F2FD; font-size:12pt"><v-icon>mdi-information</v-icon>&nbsp;Informação
                                        &
                                        Contacto</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="profile"
                                            class="text-decoration-none">A minha página
                                            inicial</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="?nav=contact"
                                            class="text-decoration-none">Contacto</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="?nav=license"
                                            class="text-decoration-none">Licenças e
                                            contratos</a>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel class="pa-0 ma-0 rounded-0 "
                                    style="color: darkgreen; font-size:11pt; font-weight: 500;">
                                    <v-expansion-panel-title color=""
                                        style="background-color: #E3F2FD; font-size:12pt"><v-icon>mdi-checkbox-multiple-marked-circle</v-icon>&nbsp;Produtos
                                        e
                                        Compras</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="?nav=proposals"
                                            class="text-decoration-none">Propostas</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">As minhas aprovações</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">Lista de compras</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">Encomendas em
                                            reservas</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">Encomendas</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">Guias de remessa</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">Facturas</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">Notas de crédito</a><br>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel class="pa-0 ma-0 rounded-0"
                                    style="color: darkgreen; font-size:11pt; font-weight: 500;">
                                    <v-expansion-panel-title color=""
                                        style="background-color: #E3F2FD; font-size:12pt"><v-icon>mdi-account-cog</v-icon>&nbsp;Utilizador
                                        &
                                        Definições</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">O meu utilizador</a><br>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">Avatar & Logótipo</a><br>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                                <v-expansion-panel class="pa-0 ma-0 rounded-0"
                                    style="color: darkgreen; font-size:11pt; font-weight: 500;">
                                    <v-expansion-panel-title color=""
                                        style="background-color: #E3F2FD; font-size:12pt; font-weight:500"><v-icon>mdi-map-marker</v-icon>&nbsp;Endereço
                                        &
                                        Dados</v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-icon>mdi-circle-small</v-icon>&nbsp;<a href="#"
                                            class="text-decoration-none">Endereços de entrega</a><br>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                        <v-col cols="12" sm="9" md="9" lg="10" v-if="this.navGoToPage == undefined"
                            class="pa-0 pl-0 ma-0 " style="background-color:  #E3F2FD;">
                            <p class="h5 pa-5 pb-0">O meu perfil - {{ MyUserName }}</p>
                            <p class="pl-5 text-caption">Edite o utilizador tendo em consideração os campos
                                obrigadtórios (*). Um
                                endereço de
                                e-mail só
                                pode ser utlizado para um utilizador.</p>
                            <v-sheet class="ma-1 pb-1 mb-0 pt-1" style="background-color: #FAFAFA;" elevation="2">
                                <v-row class="ma-1 pb-0 border-lg border-b-lg"
                                    style="font-size: 8pt; background-color: #E3F2FD;">

                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-3 pl-8 ma-0 ">
                                        <v-label><b><v-icon>mdi-account</v-icon>&nbsp;Dados pessoais</b></v-label>
                                    </v-col>

                                    <v-col cols="12" sm="2" md="2" lg="1" class="pt-3 pr-5 ma-0 text-right">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col>

                                </v-row>
                                <v-row style="font-size: 8pt;" class="ma-3" color="red">

                                    <v-col cols="12" sm="6" md="6" lg="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field label="Empresa*" v-model="myBranch" variant="underlined"
                                            color="red" prepend-inner-icon="mdi-domain" hint="*campo obrigatório"
                                            :counter="10" readonly required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" prepend-inner-icon="mdi-login" variant="underlined"
                                            v-model="myLastLogin" label="Último login*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field label="Nome própio*" id="FN" v-model="myName" variant="underlined"
                                            clearable hint="*campo obrigatório" :counter="10" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" variant="underlined" v-model="mySurname"
                                            label="Apelido*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field label="Domínio" v-model="myDomain" clearable readonly
                                            variant="underlined" prepend-inner-icon="mdi-domain"
                                            hint="*campo obrigatório" :counter="10" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" prepend-inner-icon="mdi-translate"
                                            variant="underlined" v-model="myLanguage" clearable label="Linguagem*"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field label="E-mail" id="FN" v-model="MyEmail" clearable
                                            variant="underlined" prepend-inner-icon="mdi-at" hint="*campo obrigatório"
                                            :counter="10" required></v-text-field>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="9" md="6" class="pa-2 pb-0 mb-0">
                                <v-text-field label="E-mail CC" id="FN" name="firstNameR" v-model="firstName" clearable
                                    variant="underlined" prepend-inner-icon="mdi-domain" hint="*campo obrigatório"
                                    :counter="10" required></v-text-field>
                            </v-col> -->
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" prepend-inner-icon="mdi-phone" variant="underlined"
                                            v-model="myPhone" clearable label="Telefone*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" prepend-inner-icon="mdi-slash-forward-box"
                                            variant="underlined" v-model="myDepartment" clearable label="Departamento*"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" prepend-inner-icon="mdi-currency-eur"
                                            variant="underlined" v-model="myCostCenter" clearable
                                            label="Centro de Custos*" required></v-text-field>
                                    </v-col>

                                    <v-btn @click="ACCOUNT_SAVE" class="ma-1 rounded-0"
                                        variant="flat"><v-icon>mdi-content-save</v-icon>&nbsp;GUARDAR
                                    </v-btn>&nbsp;&nbsp;
                                    <v-btn class="ma-1 rounded-0"
                                        variant="tonal"><v-icon>mdi-lock-reset</v-icon>&nbsp;Repor
                                        Palavra-passe</v-btn>&nbsp;&nbsp;
                                    <v-btn class="ma-1 rounded-0" variant="tonal"><v-icon>mdi-at</v-icon>&nbsp;Alterar
                                        E-mail</v-btn>&nbsp;&nbsp;

                                    <v-btn class="ma-1 rounded-0" color="red"
                                        variant="flat"><v-icon>mdi-close-thick</v-icon>&nbsp;Eliminar os meus
                                        dados</v-btn>
                                </v-row>
                            </v-sheet>
                            <!-- Autenticação de dois factores -->
                            <v-sheet class="ma-1 pb-1 mb-0 pt-0 border-t-lg" style="background-color: #FAFAFA;"
                                elevation="2">
                                <v-row class="ma-1 pb-0 pt-0 border-lg"
                                    style="font-size: 8pt; background-color: #E3F2FD;">

                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-3 pl-8 ma-0 "
                                        style="font-size: 8pt;">
                                        <v-label><v-icon>mdi-shield-lock</v-icon>&nbsp;<b>Autenticação de dois
                                                factores</b></v-label>
                                    </v-col>

                                    <v-col cols="12" sm="2" md="2" lg="1" class="pt-3 pr-5 ma-0 text-right">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col>

                                </v-row>
                                <v-row style="font-size: 8pt;" class="ma-3  border-t-thin" color="red">

                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field label="Empresa*" v-model="myBranch" variant="underlined"
                                            color="red" prepend-inner-icon="mdi-domain" hint="*campo obrigatório"
                                            :counter="10" readonly required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" prepend-inner-icon="mdi-login" variant="underlined"
                                            v-model="myLastLogin" label="Último login*" required></v-text-field>
                                    </v-col>

                                </v-row>
                            </v-sheet>
                            <!-- Notificações de e-mail -->
                            <v-sheet class="ma-1 pb-1 mb-2 pt-0 border-t-lg" style="background-color: #FAFAFA;"
                                elevation="2">
                                <v-row class="ma-1 pb-0 pt-0 border-lg"
                                    style="font-size: 8pt; background-color: #E3F2FD;">

                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-3 pl-8 ma-0 ">
                                        <v-label><b><v-icon>mdi-bell-ring</v-icon>&nbsp;Notificações de
                                                e-mail</b></v-label>
                                    </v-col>

                                    <v-col cols="12" sm="2" md="2" lg="1" class="pt-3 pr-5 ma-0 text-right">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col>

                                </v-row>

                                <p class="pl-3  border-t-thin"><br>As seguintes pessoas possue direitos
                                    administrativos
                                    para editar este
                                    utilizador:<br>
                                    <v-icon>mdi-circle-small</v-icon>&nbsp;Gungui, Vasco - <a
                                        href="mailto:vasco.gungui@bissonde.ao">vasco.gungui@bissonde.ao</a><br>
                                    <v-icon>mdi-circle-small</v-icon>&nbsp;Averbach, Panagiotis - <a
                                        href="mailto:panagiotis.averbach@bissonde.ao">panagiotis.averbach@bissonde.ao</a><br>
                                    <v-icon>mdi-circle-small</v-icon>&nbsp;Rafael, Carmo - <a
                                        href="mailto:carmo.rafael@bissonde.ao">carmo.rafael@bissonde.ao</a><br>
                                    <v-icon>mdi-circle-small</v-icon>&nbsp;Miguel, Hugo - <a
                                        href="mailto:hugo.miguel@bissonde.ao">hugo.miguel@bissonde.ao</a><br>
                                    <v-icon>mdi-circle-small</v-icon>&nbsp;Cabir, Neuza - <a
                                        href="mailto:neuza.cabir@bissonde.ao">neuza.cabir@bissonde.ao</a>
                                </p>

                            </v-sheet>
                        </v-col>
                        <v-col cols="12" sm="9" md="9" lg="10" v-if="this.navGoToPage == 'contact'"
                            style="background-color: #FAFAFA;" class="pa-0 pl-0 ma-0 ">
                            <!-- <p class="h4">Os meus contactos</p> -->
                            <!-- <p>Edite o utilizdor tendo em consideração os campos obrigadtórios (*). Um endereço de -->
                            <!-- e-mail só -->
                            <!-- pode ser utlizado para um utilizador.</p> -->
                            <v-sheet class="ma-1 pb-1 mb-0 pt-0" style="background-color: #FAFAFA;" elevation="2">
                                <v-row class="ma-1 pb-0 pt-0  border-lg"
                                    style="font-size: 8pt; background-color: #E3F2FD;">


                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-3 pl-8 ma-0 ">
                                        <v-label><b><v-icon>mdi-account</v-icon>&nbsp;Contactos</b></v-label>
                                    </v-col>

                                    <v-col cols="12" sm="1" md="2" lg="1" class="pt-3 pr-5 ma-0 text-right">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col>

                                </v-row>
                                <v-row style="font-size: 8pt;" class="pa-0 ma-3 ">
                                    <v-col cols="12" sm="12" md="12" class=" pb-0 border-t-thin border-black">
                                        <v-text-field label="Endereço*" v-model="myAddress" clearable
                                            variant="underlined" prepend-inner-icon="mdi-domain"
                                            hint="*campo obrigatório" :counter="10" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" prepend-inner-icon="mdi-map" variant="underlined"
                                            v-model="myCity" clearable label="Cidade*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field label="Distrito/Província/Estado*" id="FN" v-model="myDistrict"
                                            prepend-inner-icon="mdi-home-group" variant="underlined" clearable
                                            hint="*campo obrigatório" :counter="10" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" variant="underlined" v-model="myPostOffice"
                                            prepend-inner-icon="mdi-email-variant" clearable label="Caixa Postal*"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field label="País" v-model="myCountry" clearable variant="underlined"
                                            prepend-inner-icon="mdi-domain" hint="*campo obrigatório" :counter="10"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field label="E-mail" id="FN" v-model="MyEmail2" clearable
                                            variant="underlined" prepend-inner-icon="mdi-at" hint="*campo obrigatório"
                                            :counter="10" required></v-text-field>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="9" md="6" class="pa-2 pb-0 mb-0">
                                <v-text-field label="E-mail CC" id="FN" name="firstNameR" v-model="firstName" clearable
                                    variant="underlined" prepend-inner-icon="mdi-domain" hint="*campo obrigatório"
                                    :counter="10" required></v-text-field>
                            </v-col> -->
                                    <v-col cols="12" sm="6" md="6" class="pa-2 pb-0 mb-0">
                                        <v-text-field :counter="10" prepend-inner-icon="mdi-phone" variant="underlined"
                                            v-model="myPhone" clearable label="Telefone*" required></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-btn @click="ACCOUNT_SAVE" class="ma-4 rounded-0" variant="flat">GUARDAR
                                    ALTERAÇÕES</v-btn>&nbsp;&nbsp;
                            </v-sheet>
                            <!-- <br> -->

                            <v-sheet class="ma-1 pb-1 mb-2 pt-1" style="background-color: #FAFAFA;" elevation="2">
                                <v-row class="ma-1 pb-0 pt-0  border-lg"
                                    style="font-size: 8pt; background-color: #E3F2FD;">


                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-3 pl-8 ma-0 ">
                                        <v-label><b><v-icon>mdi-account-badge</v-icon>&nbsp;Gestor de
                                                conta</b></v-label>
                                    </v-col>

                                    <v-col cols="12" sm="1" md="2" lg="1" class="pt-3 pr-5 ma-0 text-right">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col>

                                </v-row>
                                <v-row style="font-size: 8pt;" class="pa-0  ma-5 ">

                                    <v-col cols="12" sm="6" md="4" lg="2" class="pa-0 pt-0 pb-0 mb-0">

                                        <v-img :width="400" aspect-ratio="16/9" cover
                                            src="https://www.alert-software.com/hubfs/helpdesk-3.jpg"></v-img>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="9" md="6" class="pa-2 pb-0 mb-0">
                                <v-text-field label="E-mail CC" id="FN" name="firstNameR" v-model="firstName" clearable
                                    variant="underlined" prepend-inner-icon="mdi-domain" hint="*campo obrigatório"
                                    :counter="10" required></v-text-field>
                            </v-col> -->
                                    <v-col cols="12" sm="6" md="8" class="pa-5 pt-0 mb-0">
                                        <v-label><b>Vasco Gungui</b></v-label><br>
                                        <v-label><b>E-mail:</b>&nbsp; vasco.gungui@bissonde.ao</v-label><br>
                                        <v-label><b>Contacto:</b>&nbsp;+244923097248</v-label><br>

                                        <v-btn @click="ACCOUNT_SAVE" class="mt-2 rounded-0"
                                            variant="flat"><v-icon>mdi-email</v-icon>&nbsp;Escrever
                                            E-mail</v-btn>&nbsp;&nbsp;
                                        <v-btn @click="ACCOUNT_SAVE" class="mt-2 rounded-0"
                                            variant="flat"><v-icon>mdi-phone</v-icon>&nbsp;Telefonar</v-btn>&nbsp;&nbsp;
                                    </v-col>
                                </v-row>
                            </v-sheet>
                            <!-- <br> -->
                            <v-sheet class="ma-1 pb-0 mb-0 pt-1 mt-0 " style="background-color: white;" elevation="2">
                                <v-row class="ma-1 pb-0 pt-0  border-lg"
                                    style="font-size: 8pt; background-color: #E3F2FD;">

                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-3 pl-8 ma-0 ">
                                        <v-label><b><v-icon>mdi-map-marker</v-icon>&nbsp;Endereços</b></v-label>
                                    </v-col>

                                    <v-col cols="12" sm="1" md="2" lg="1" class="pt-3 pr-5 ma-0 text-right">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col>

                                </v-row>
                                <v-row style="font-size: 8pt;" class="pa-0 ma-1">

                                    <v-col cols="12" sm="5" md="5" class="pa-0 pb-0 ma-3">

                                        <v-label><b>Angola</b></v-label><br>
                                        <v-label><b>Endereço:</b>&nbsp;Casa nº 119 Bairro Azul, Luanda</v-label><br>
                                        <v-label><b>Telefone:</b>&nbsp;+244923097248</v-label><br>
                                        <v-label><b>Fax:</b>&nbsp;+244923097248</v-label><br>
                                        <v-label><b>E-mail:</b>&nbsp;vendas_ao@bissonde.ao</v-label><br>

                                        <v-btn @onclick="window.open('tel:244923097248')" class="mt-1 rounded-0"
                                            variant="tonal"><v-icon>mdi-phone</v-icon>&nbsp;Contactar
                                        </v-btn>&nbsp;&nbsp;
                                        <v-btn href="https://maps.app.goo.gl/83H9wHw1yLnX2XoP6" class="mt-1 rounded-0"
                                            target="_blank" variant="tonal"><v-icon>mdi-directions</v-icon>&nbsp;Como
                                            chegar</v-btn>&nbsp;&nbsp;
                                    </v-col>
                                    <!-- <v-col cols="12" sm="9" md="6" class="pa-2 pb-0 mb-0">
                                <v-text-field label="E-mail CC" id="FN" name="firstNameR" v-model="firstName" clearable
                                    variant="underlined" prepend-inner-icon="mdi-domain" hint="*campo obrigatório"
                                    :counter="10" required></v-text-field>
                            </v-col> -->
                                    <v-col cols="12" sm="5" md="5" class="pa-0 pb-0 ma-3">
                                        <v-label><b>Portugal</b></v-label><br>
                                        <v-label><b>Endereço:</b>&nbsp;Rua Engenheiro Quartin Graça 58A 1º
                                            E</v-label><br>
                                        <v-label><b>Telefone:</b>&nbsp;+351932641788</v-label><br>
                                        <v-label><b>Fax:</b>&nbsp;+351932641788</v-label><br>
                                        <v-label><b>E-mail:</b>&nbsp;vendas_pt@bissonde.ao</v-label><br>

                                        <v-btn href="tel:351932641788" class="mt-1 rounded-0"
                                            variant="tonal"><v-icon>mdi-phone</v-icon>&nbsp;Contactar
                                        </v-btn>&nbsp;&nbsp; <v-btn href="https://maps.app.goo.gl/S3LSoTYcc4pdHPn57"
                                            class="mt-1 rounded-0" target="_blank"
                                            variant="tonal"><v-icon>mdi-directions</v-icon>&nbsp;Como
                                            chegar</v-btn>&nbsp;&nbsp;
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-col>
                        <v-col v-if="this.navGoToPage == 'license'" class="pa-0 pl-0 ma-0 ">
                            <!-- <p class="h4">Os meus contactos</p> -->
                            <!-- <p>Edite o utilizdor tendo em consideração os campos obrigadtórios (*). Um endereço de -->
                            <!-- e-mail só -->
                            <!-- pode ser utlizado para um utilizador.</p> -->
                            <div class="ma-1 pb-1 mb-0 pt-0" style="background-color: white;">

                                <v-row class="ma-1 pb-0 pt-0  border-lg"
                                    style="font-size: 8pt; background-color: #E3F2FD;">


                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-3 pl-8 ma-0 ">
                                        <v-label><b><v-icon>mdi-license</v-icon>&nbsp;Síntese de contratos e
                                                licenças</b></v-label>
                                    </v-col>

                                    <v-col cols="12" sm="1" md="2" lg="1" class="pt-3 pr-5 ma-0 text-right">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col>

                                </v-row>
                                <v-row style="font-size: 8pt;" class="pa-4 ma-4 mb-0 pl-0 border-black ">
                                    <v-col cols="12" sm="12" md="2" lg="1" class="pb-0">
                                        <v-label>Ordenação:</v-label>
                                    </v-col>
                                    <v-col cols="12" sm="9" md="9" class="pt-0 pb-0 mb-0">
                                        <v-autocomplete v-model="licenseOrd" variant="underlined" density="compact"
                                            :items="['Cliente', 'Empresa', 'Interno']"></v-autocomplete>
                                    </v-col>

                                </v-row>

                                <v-btn @click="" class="ml-8 mb-3 pl-0 ml-0 rounded-0 text-caption"
                                    variant="text"><v-icon>mdi-download</v-icon>&nbsp;Guardar
                                    a lista como CSV</v-btn>&nbsp;&nbsp;
                            </div>

                            <div class="ma-1 pb-0 mb-0 pt-0 border-t-lg" style="background-color: white;">
                                <v-row style="font-size: 8pt; color: black;">

                                    <v-col cols="12" sm="11" md="11" lg="11" class="pt-6 pl-8 ma-0 text-caption">
                                        <v-label><v-icon>mdi-alert</v-icon>&nbsp;Não existem licenças de
                                            contracto.</v-label>
                                    </v-col>

                                    <!-- <v-col class="pt-6 pr-5 ma-0 ">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col> -->

                                </v-row>
                            </div>
                        </v-col>
                        <v-col v-if="this.navGoToPage == 'proposals'" class="pa-0 pl-0 ma-0 ">
                            <!-- <p class="h4">Os meus contactos</p> -->
                            <!-- <p>Edite o utilizdor tendo em consideração os campos obrigadtórios (*). Um endereço de -->
                            <!-- e-mail só -->
                            <!-- pode ser utlizado para um utilizador.</p> -->
                            <div class="ma-1 pb-1 mb-0 pt-0" style="background-color: white;">
                                <v-row class="ma-1 pb-0 pt-0  border-lg"
                                    style="font-size: 8pt; background-color: #E3F2FD;">


                                    <v-col cols="12" sm="10" md="10" lg="11" class="pt-3 pl-8 ma-0 ">
                                        <v-label><b><v-icon>mdi-file-document-multiple-outline</v-icon>&nbsp;Propostas</b></v-label>
                                    </v-col>

                                    <v-col cols="12" sm="1" md="2" lg="1" class="pt-3 pr-5 ma-0 text-right">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col>

                                </v-row>

                                <v-row style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                    <v-col cols="12" sm="12" md="12" class="pb-0">
                                        <v-row style="font-size: 8pt;" class="pa-0 ma-0 mb-0">
                                        </v-row>
                                       
                                        &nbsp;<v-btn style="display:inline-block;width: 120px"
                                                @click=" ACCOUNT_SAVE" class="ma-0 rounded-0 mt-0"
                                            variant="flat"><v-icon>mdi-content-save</v-icon>&nbsp;Pesquiar
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="9" md="4" class="pt-0 pb-0 mb-0">


                                    </v-col>

                                </v-row>

                                <v-btn @click="" class="ml-8 mb-3 rounded-0 text-caption"
                                    variant="text"><v-icon>mdi-download</v-icon>&nbsp;Estado da
                                    Proposta</v-btn>&nbsp;&nbsp;
                            </div>

                            <div class="ma-1 pb-0 mb-0 pt-0 border-t-lg" style="background-color: white;">
                                <v-row style="font-size: 8pt; color: black;">

                                    <v-col cols="12" sm="11" md="11" lg="11" class="pt-6 pl-8 ma-0 text-caption">
                                        <v-label><v-icon>mdi-alert</v-icon>&nbsp;Não existem licenças de
                                            contracto.</v-label>
                                    </v-col>

                                    <!-- <v-col class="pt-6 pr-5 ma-0 ">
                                        <v-label><v-icon>mdi-chevron-right</v-icon></v-label>
                                    </v-col> -->

                                </v-row>
                            </div>
                        </v-col>
                    </v-row>


                </v-sheet>

            </v-sheet>
            <br>

            <v-sheet class="ma-10 pa-10 pt-0" elevation="0" v-if="devType != 'Desktop'">

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

var myPicture = '';


onMounted(() => { 

});

</script>

<script>
const TokenStore = useTokenStore();
const newToken = { "tokenID": "ljahsdfq697e69qwerq", "user": "Vasco Gungui", "domain": "Administrator" }

export default {
    data: () => ({
        licenseOrd: '',
        myPictureHelpDesk: 'https://www.alert-software.com/hubfs/helpdesk-3.jpg',
        myPostOffice: '',
        myAddress: '',
        myCity:'',
        myDistrict:'',
        myCountry:'',
        overlay: true,
        JwtToken: '',
        myDomain: '',
        myLanguage : '',
        myPhone : '',
        myDepartment : '',
        myCostCenter: '',
        myName:'',
        mySurname:'',
        myLastLogin:'',
        myEmail: '',
        myEmail2: '',
        myBranch:'',
        panel: [0, 1, 2, 3],
        // panel: [],
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


        if (window.localStorage.getItem('JwtToken') != null) {

            this.JwtToken = localStorage.getItem('JwtToken')
            this.MyUserName = localStorage.getItem('AFN')
            this.MyEmail = localStorage.getItem('username')
            this.MyEmail2 = localStorage.getItem('username')
        }
        else {
            window.location = '/signin?returnUrl&' + window.location.href.split('/')[3]
        }  

        this.ACCOUNT_GET();
    },
    methods: {

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

                    window.location = '/signin?returnUrl&' + window.location.href.split('/')[3]
                }
                if (response.request.status == '200') {
                    this.myBranch = response.data.branch
                    this.myLastLogin = response.data.lastLogin
                    this.myName = response.data.username.split(' ')[0].toUpperCase()
                    this.mySurname = response.data.username.split(' ')[1].toUpperCase()
                    this.myEmail = response.data.email
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

                    this.overlayOFF();
                }
              }).catch(
                    error => {
                        const status = error.response ? error.response.status : null;

                      if (status === 401) {
                          window.location = '/signin?returnUrl&' + window.location.href.split('/')[3]
                            document.getElementById('userD').innerHTML = "Acesso não autorizado"
                        }
                        else if (status === 404) {
                            document.getElementById('userD').innerHTML = "Post não encontrado"
                        }
                        else {
                            // document.getElementById('userD').innerHTML = "Ocorreu um erro:", error

                          window.location = '/signin?returnUrl&' + window.location.href.split('/')[3]
                        }
                        document.getElementById('userD').innerHTML = error
                        console.log(error)


                      window.location = '/signin?returnUrl&' + window.location.href.split('/')[3]
                    }
                )
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
        overlayOFF: function (event) {
            setTimeout(() => {
                this.overlay = false,
                    this.viewMainForm = true
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
            const off = 'off';
            // window.location = '/login'
            this.$router.push({ path: `/signin` })
        },
        checkInput: function () {
            // window.localStorage.setItem('JwtToken', newToken);
            if (TokenStore == 'Contacts') {
                // this.isOkToSubmit = this.firstName && this.lastName
            }
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

<style scoped>
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