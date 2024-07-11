<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="#008D44 #red" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-form ref="form" fast-fail @submit.prevent="SUBMIT_DATA">

        <div v-show="true" bg-color="white"></div>

        <v-app :theme="theme">
            <v-app-bar flat class="border-b" density="compact" style="border-top:5px solid darkorange">
                <template v-slot:prepend>
                    <v-app-bar-nav-icon variant="text" class="text-h5"
                        @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                </template>

                <v-app-bar-title v-if="devType == 'Desktop'">
                    <v-icon icon="mdi-view-grid" size="large" start />
                    <b>Bissonde</b></v-app-bar-title>

                <v-spacer></v-spacer>
                <v-divider v-if="devType == 'Desktop'" vertical class="mx-1"></v-divider>
                <v-toolbar-items fixed>
                    <v-btn v-if="devType == 'Desktop'">Dashboard</v-btn>
                    <v-btn v-if="devType == 'Desktop'">Settings</v-btn>
                    <v-btn v-if="devType != 'Desktop'" icon="mdi-chart"></v-btn>
                    <v-btn v-if="devType != 'Desktop'" icon="mdi-cog"></v-btn>
                </v-toolbar-items>

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
                </template>

            </v-app-bar>



            <v-navigation-drawer v-model="drawer" floating permanent>
                <v-layout>
                    <v-card elevation="0" width="100%">

                        <v-list density="compact" nav>
                            <v-list-item v-for="(item, i) in leftMenuItems" :key="item.i" :to="item.to" color="primary"
                                rounded="sm">

                                <template v-slot:prepend>
                                    <v-icon :icon="item.icon"></v-icon>
                                </template>

                                <v-list-item-title v-text="item.text"></v-list-item-title>

                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-layout>
            </v-navigation-drawer>
            <!-- <v-main style="height: 750px"></v-main> -->




            <v-main style="background-color: #fff;">

                <v-container class="mx-auto mb-0 py-0" elevation="12" fluid style="width: 100%">


                    <v-sheet class="pa-0 mt-1 pb-1 mb-0" elevation="0" height="auto" width="100%">






                        <v-row class="mt-0 pt-0">
                            <v-col cols="8" v-if="devType == 'Desktop'">
                                <!-- <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon>mdi-finance</v-icon>&nbsp;Estatísticas</h1> -->
                                <v-btn variant="tonal" v-on:click="moduleStore.setModule(topMenus[0]);" color="#B71C1C"
                                    v-model="useModule.name" @click="openDialog(n); viewModal = !viewModal">
                                    <v-icon color="red">
                                        mdi-chart-box-outline
                                    </v-icon>
                                    &nbsp;Ver Relatórios
                                </v-btn>
                                <v-btn variant="tonal" v-on:click="moduleStore.setModule(topMenus[1]);" color="#4527A0"
                                    v-model="useModule.name" @click="openDialog(n); viewModal = !viewModal">
                                    <v-icon color="primary">
                                        mdi-account-switch
                                    </v-icon>
                                    &nbsp;Sessões
                                </v-btn>
                                <v-btn variant="tonal" v-on:click="moduleStore.setModule(topMenus[2]);" color="#4E342E"
                                    v-model="useModule.name" @click="openDialog(n); viewModal = !viewModal">
                                    <v-icon color="primary">
                                        mdi-cog
                                    </v-icon>
                                    &nbsp;Configurações
                                </v-btn>
                            </v-col>
                            <v-col cols="12" v-if="devType != 'Desktop'" class="pl-12 ma-0">
                                <!-- <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon>mdi-finance</v-icon>&nbsp;Estatísticas</h1> -->
                                <v-btn variant="text" density="compact" style="min-width:0" class="pr-0 pl-0"
                                    v-on:click="moduleStore.setModule(topMenus[0]);" v-model="useModule.name"
                                    @click="openDialog(n); viewModal = !viewModal">
                                    <v-icon color="primary">
                                        mdi-chart-box-outline
                                    </v-icon>
                                </v-btn>
                                <v-btn variant="text" density="compact" style="min-width:0"
                                    v-on:click="moduleStore.setModule(topMenus[1]);" v-model="useModule.name"
                                    @click="openDialog(n); viewModal = !viewModal">
                                    <v-icon color="primary">
                                        mdi-account-switch
                                    </v-icon>
                                </v-btn>
                                <v-btn variant="text" density="compact" style="min-width:0"
                                    v-on:click="moduleStore.setModule(topMenus[2]);" v-model="useModule.name"
                                    @click="openDialog(n); viewModal = !viewModal">
                                    <v-icon color="primary">
                                        mdi-cog
                                    </v-icon>
                                </v-btn>
                                <v-btn variant="text" density="compact" style="min-width:0" @click="isDark();">
                                    <!-- <v-icon color="orange-darken" end>
                      mdi-plus-circle
                    </v-icon> -->
                                    <v-icon color="primary">
                                        mdi-weather-night
                                    </v-icon>
                                </v-btn>
                                <v-btn variant="text" density="compact" style="min-width:0"
                                    @click="openDialog(n); viewModal = !viewModal">
                                    <v-icon color="primary">
                                        mdi-translate
                                    </v-icon>
                                </v-btn>
                                <v-btn variant="text" density="compact" style="min-width:0" class="pr-0 pl-0"
                                    @click="openDialog(n); viewModal = !viewModal">
                                    <v-icon color="primary">
                                        mdi-battery-charging-90
                                    </v-icon>
                                    &nbsp;{{ messageCounter }}
                                </v-btn>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col v-if="devType == 'Desktop'" class="float-sm-right">
                                <v-btn variant="text" @click="isDark();" style="min-width:0" class="pr-2 pl-2">
                                    <!-- <v-icon color="orange-darken" end>
                      mdi-plus-circle
                    </v-icon> -->
                                    <v-icon color="primary">
                                        mdi-weather-night
                                    </v-icon>
                                </v-btn>
                                <v-btn variant="text" @click="openDialog(n); viewModal = !viewModal" style="min-width:0"
                                    class="pr-2 pl-2">
                                    <v-icon color="primary">
                                        mdi-translate
                                    </v-icon>
                                </v-btn>
                                <v-btn variant="text" @click="openDialog(n); viewModal = !viewModal" style="min-width:0"
                                    class="pr-2 pl-2">
                                    <v-icon color="primary">
                                        mdi-battery-charging-90
                                    </v-icon>
                                    &nbsp;{{ messageCounter }}
                                </v-btn>

                            </v-col>
                        </v-row>


                    </v-sheet>


                    <v-sheet v-if="devType == 'Desktop'" class="pa-3 pt-4 mb-1 bg-orange" elevation="1" height="50"
                        width="100%">
                        <i class="float-sm-left text-caption text-sm"><v-icon icon="mdi-information"></v-icon>&nbsp;
                            <b>Informação:</b>&nbsp;Se tiver alguma dúvida ou questão relacionada com o portal
                            ou com a sua
                            encomenda, utilize os contactos: bissonde.direct-pt@bissonde.ao ou o
                            Número Suporte Bissonde: +351 932 641 788</i>
                    </v-sheet>

                    <v-sheet v-if="devType != 'Desktop'" class="pa-4 pt-1 pb-9 mb-1 bg-orange" elevation="12"
                        height="120" width="100%">
                        <i class="float-sm-left text-caption text-sm"><v-icon icon="mdi-information"></v-icon>&nbsp;
                            <b>Informação:</b>&nbsp;Se tiver alguma dúvida ou questão relacionada com o portal Bissonde
                            ou com a sua
                            encomenda, utilize os seguintes contactos: bissonde.direct-pt@bissonde.ao ou o
                            Número Suporte Bissonde: +351 932 641 788</i>
                    </v-sheet>

                    <v-row cols="12" sm="6" md="6" lg="6">
                        <v-col cols="12" sm="12" md="12" lg="9" class="pr-1" v-if="devType == 'Desktop'" height="120"
                            max-height="120">
                            <v-sheet class="pa-4 pb-1 mb-2" elevation="4" width="100%">

                                <v-row v-if="devType == 'Desktop'">
                                    <v-col cols="12" class="pb-0 mb-0 pt-0 pl-8">
                                        <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                                                class="text-h">mdi-view-dashboard</v-icon>&nbsp;A sua página
                                            inicial<v-btn color="black" variant="text" class="text-h6 pr-0"
                                                density="default" @click="goPlayModal = !goPlayModal; GoPlayNew();"
                                                icon="mdi-pencil">
                                            </v-btn>
                                        </h1>
                                    </v-col>
                                </v-row>
                                <v-row v-if="devType != 'Desktop'">
                                    <v-col cols="9">
                                        <h1 class="text-h6 text-md-h5 font-weight-bold mb-0"><v-icon
                                                class="text-h6">mdi-chart-bubble</v-icon>&nbsp;A sua página inicial
                                        </h1>
                                        <i class="float-sm-left text-body-2"><v-icon
                                                icon="mdi-clock-fast"></v-icon>&nbsp;
                                            22/05/2023</i>
                                    </v-col>
                                    <v-col>

                                        <v-btn color="purple-darken-4" variant="text" class="float-sm-center pr-0"
                                            density="default" @click="goPlayModal = !goPlayModal; GoPlayNew();"
                                            icon="mdi-plus-circle">
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <!-- <v-divider class="mb-6"></v-divider> -->


                                <v-row cols="12" sm="12" md="12" lg="12" class="pb-5 mb-3" v-if="devType == 'Desktop'">
                                    <v-sheet class="d-flex flex-wrap pl-3 pr-1 ma-6 pt-0 mt-0 pb-0 mb-0" height="127"
                                        max-height="127" style="align-items: center;">
                                        <div v-for="(n, index) in myHomePage " :key="n">
                                            <v-row align="center" justify="center" dense>
                                                <!-- <v-col cols="12" md="12"> -->
                                                <v-hover v-slot="{ isHovering, props }">
                                                    <v-card :href="'dashboard/' + n.to" :color="n.bgcolor"
                                                        class="mx-auto justify-center pa-2 mr-4 mb-4 rounded-0"
                                                        width="312" max-width="312" height="142" border="start"
                                                        variant="flat" hover>
                                                        <!-- <v-img :aspect-ratio="16 / 9"
                                                    src="https://cdn.vuetifyjs.com/images/cards/kitchen.png" cover>
                                                    <v-expand-transition>
                                                        <div v-if="isHovering"
                                                            class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                                                            style="height: 100%;">
                                                            $14.99
                                                        </div>
                                                    </v-expand-transition>
                                                </v-img> -->
                                                        <v-card-item>
                                                            <v-card-title>
                                                                <v-icon class="text-h6">{{ n.icon }}</v-icon>
                                                                &nbsp;&nbsp;{{ n.text }}
                                                            </v-card-title>

                                                            <v-card-subtitle>
                                                                {{ n.descr}}
                                                            </v-card-subtitle>
                                                        </v-card-item>

                                                        <v-card-text>
                                                            Para aceder a este menu clique aqui
                                                        </v-card-text>
                                                    </v-card>
                                                </v-hover>
                                                <!-- </v-col> -->
                                            </v-row>
                                            <!-- {{ n.icon }} -->
                                        </div>
                                    </v-sheet>
                                </v-row>


                                <v-row cols="12" sm="6" md="6" lg="6" class="pt-0 mt-0" v-if="devType != 'Desktop'">
                                    <v-sheet class="d-flex flex-wrap ml-0 ma-3 pa-1 pt-0 mt-4 justify-center"
                                        style="align-items: center;">
                                        <div v-for="(n, index) in myHomePage " :key="n">
                                            <v-row align="center" justify="center" dense>

                                                <!-- <v-col cols="12" md="12"> -->
                                                <v-hover v-slot="{ isHovering, props }">
                                                    <v-card :href="'dashboard/' + n.to" :color="n.bgcolor"
                                                        class="mx-auto pl-6 ml-3 mb-1 mt-0 pt-0 rounded-0" width="146"
                                                        border="start" variant="flat" hover>
                                                        <!-- <v-img :aspect-ratio="16 / 9"
                                                    src="https://cdn.vuetifyjs.com/images/cards/kitchen.png" cover>
                                                    <v-expand-transition>
                                                        <div v-if="isHovering"
                                                            class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                                                            style="height: 100%;">
                                                            $14.99
                                                        </div>
                                                    </v-expand-transition>
                                                </v-img> -->
                                                        <v-card-item>
                                                            <v-card-title>
                                                                <v-icon class="text-h3 align-center">{{ n.icon
                                                                    }}</v-icon>

                                                            </v-card-title>

                                                            <v-card-subtitle>
                                                                {{ n.text }}
                                                            </v-card-subtitle>
                                                        </v-card-item>
                                                    </v-card>
                                                </v-hover>
                                                <!-- </v-col> -->
                                            </v-row>
                                            <!-- {{ n.icon }} -->
                                        </div>
                                    </v-sheet>
                                </v-row>
                            </v-sheet>
                        </v-col>
                        <v-col v-if="devType != 'Desktop'">
                            <v-sheet class="pa-4 pb-1 mb-2" elevation="2" height="auto" width="100%">

                                <v-row v-if="devType == 'Desktop'">
                                    <v-col cols="12" class="pb-0 mb-0 pl-8">
                                        <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                                                class="text-h3">mdi-view-dashboard</v-icon>&nbsp;A sua página
                                            inicial<v-btn color="black" variant="text" class="text-h6 pr-0"
                                                density="default" @click="goPlayModal = !goPlayModal; GoPlayNew();"
                                                icon="mdi-pencil">
                                            </v-btn>
                                        </h1>
                                    </v-col>
                                </v-row>
                                <v-row v-if="devType != 'Desktop'">
                                    <v-col cols="9">
                                        <h1 class="text-h6 text-md-h5 font-weight-bold mb-0"><v-icon
                                                class="text-h6">mdi-chart-bubble</v-icon>&nbsp;A sua página inicial
                                        </h1>
                                        <i class="float-sm-left text-body-2"><v-icon
                                                icon="mdi-clock-fast"></v-icon>&nbsp;
                                            22/05/2023</i>
                                    </v-col>
                                    <v-col>

                                        <v-btn color="purple-darken-4" variant="text" class="float-sm-center pr-0"
                                            density="default" @click="goPlayModal = !goPlayModal; GoPlayNew();"
                                            icon="mdi-plus-circle">
                                        </v-btn>
                                    </v-col>
                                </v-row>


                                <!-- <v-divider class="mb-6"></v-divider> -->


                                <v-row cols="12" sm="6" md="6" lg="6" class="pb-5 mb-3" v-if="devType == 'Desktop'">
                                    <v-sheet class="d-flex flex-wrap pl-3 pr-3 ma-6 pt-0 mt-0"
                                        style="align-items: center;">
                                        <div v-for="(n, index) in myHomePage " :key="n">
                                            <v-row align="center" justify="center" dense>

                                                <!-- <v-col cols="12" md="12"> -->
                                                <v-hover v-slot="{ isHovering, props }">
                                                    <v-card :href="'dashboard/' + n.to" :color="n.bgcolor"
                                                        class="mx-auto pa-2 mt-5 mr-4 mb-4 rounded-0" width="100%"
                                                        border="start" variant="flat" hover>
                                                        <!-- <v-img :aspect-ratio="16 / 9"
                                                    src="https://cdn.vuetifyjs.com/images/cards/kitchen.png" cover>
                                                    <v-expand-transition>
                                                        <div v-if="isHovering"
                                                            class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                                                            style="height: 100%;">
                                                            $14.99
                                                        </div>
                                                    </v-expand-transition>
                                                </v-img> -->
                                                        <v-card-item>
                                                            <v-card-title>
                                                                <v-icon class="text-h6">{{ n.icon }}</v-icon>
                                                                &nbsp;&nbsp;{{ n.text }}
                                                            </v-card-title>

                                                            <v-card-subtitle>
                                                                {{ n.descr }}
                                                            </v-card-subtitle>
                                                        </v-card-item>

                                                        <v-card-text>
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                                            do.
                                                        </v-card-text>
                                                    </v-card>
                                                </v-hover>
                                                <!-- </v-col> -->
                                            </v-row>
                                            <!-- {{ n.icon }} -->
                                        </div>
                                    </v-sheet>
                                </v-row>

                                <v-row cols="12" sm="6" md="6" lg="6" class="pt-0 mt-0" v-if="devType != 'Desktop'">
                                    <v-sheet class="d-flex flex-wrap ml-0 ma-3 pa-1 pt-0 mt-4 justify-center"
                                        style="align-items: center;">
                                        <div v-for="(n, index) in myHomePage " :key="n">
                                            <v-row align="center" justify="center" dense>

                                                <!-- <v-col cols="12" md="12"> -->
                                                <v-hover v-slot="{ isHovering, props }">
                                                    <v-card :href="'dashboard/' + n.to" :color="n.bgcolor"
                                                        class="mx-auto pl-6 ml-3 mb-1 mt-0 pt-0 rounded-0" width="146"
                                                        border="start" variant="flat" hover>
                                                        <!-- <v-img :aspect-ratio="16 / 9"
                                                    src="https://cdn.vuetifyjs.com/images/cards/kitchen.png" cover>
                                                    <v-expand-transition>
                                                        <div v-if="isHovering"
                                                            class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                                                            style="height: 100%;">
                                                            $14.99
                                                        </div>
                                                    </v-expand-transition>
                                                </v-img> -->
                                                        <v-card-item>
                                                            <v-card-title>
                                                                <v-icon class="text-h3 align-center">{{ n.icon
                                                                    }}</v-icon>

                                                            </v-card-title>

                                                            <v-card-subtitle>
                                                                {{ n.text }}
                                                            </v-card-subtitle>
                                                        </v-card-item>
                                                    </v-card>
                                                </v-hover>
                                                <!-- </v-col> -->
                                            </v-row>
                                            <!-- {{ n.icon }} -->
                                        </div>
                                    </v-sheet>
                                </v-row>

                                <v-row v-if="devType != 'Desktop'">
                                    <v-col cols="9">
                                        <h1 class="text-h6 text-md-h5 font-weight-bold mb-0 pt-0"><v-icon
                                                class="text-h6">mdi-progress-clock</v-icon>&nbsp;Stats
                                        </h1>
                                        <i class="float-sm-left text-body-2"><v-icon
                                                icon="mdi-clock-fast"></v-icon>&nbsp;
                                            22/05/2023</i>
                                    </v-col>
                                    <v-col>

                                        <v-btn color="purple-darken-4" variant="text" class="float-sm-center pr-0"
                                            density="default" @click="goPlayModal = !goPlayModal; GoPlayNew();"
                                            icon="mdi-plus-circle">
                                        </v-btn>
                                    </v-col>
                                </v-row>




                                <v-row cols="12" sm="6" md="6" lg="6" class="pt-0 mt-0" v-if="devType != 'Desktop'">
                                    <v-sheet class="d-flex flex-wrap ml-0 ma-3 pa-1 pt-0 mt-4 justify-center"
                                        style="align-items: center;">

                                        <v-card class="rounded-0 pa-0 ma-0 pl-0 pb-1" elevation="0" width="300px">
                                            <v-card-title class="text-overline">
                                                <!-- Progress -->

                                                <div class="text-green-darken-3 text-h4 font-weight-bold">90%</div>

                                                <div class="text-h6 text-medium-emphasis font-weight-regular">
                                                    $2,938.00 remaining
                                                </div>
                                            </v-card-title>
                                            <br>
                                            <v-card-text>
                                                <div :style="`right: calc(${review} - 32px)`"
                                                    class="position-absolute mt-n8 text-caption text-green-darken-3">
                                                    Eligibility review
                                                </div>
                                                <v-progress-linear color="green-darken-3" height="22" model-value="90"
                                                    rounded="lg">
                                                    <v-badge :style="`right: ${review}`" class="position-absolute"
                                                        color="white" dot inline></v-badge>
                                                </v-progress-linear>

                                                <div class="d-flex justify-space-between py-3">
                                                    <span class="text-green-darken-3 font-weight-medium">
                                                        $26,442.00 remitted
                                                    </span>

                                                    <span class="text-medium-emphasis"> $29,380.00 total </span>
                                                </div>
                                            </v-card-text>


                                        </v-card>
                                    </v-sheet>
                                </v-row>
                            </v-sheet>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="3" class="pl-0" v-if=" devType=='Desktop'">
                            <v-sheet class=" pa-4 pb-1 mb-2 pb-0 mt-0 pl-0" elevation="4" height="auto" max-height="229"
                                width="100%">


                                <!-- <v-col cols="12" class="pl-8"> -->
                                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1 mt-0 " style="position:absolute; z-index: 1; right:20px; top: 170px;"><v-icon
                                                class="text-h3">mdi-progress-clock</v-icon>&nbsp;Stats<v-btn
                                                color="black" variant="text" class="text-h6 pr-0" density="default"
                                                @click="goPlayModal = !goPlayModal; GoPlayNew();" icon="mdi-pencil">
                                            </v-btn>
                                        </h1>

                                <v-card class="rounded-0 pa-0 ma-0 pl-3 pb-1" elevation="0">
                                    <v-card-title class="text-overline">
                                        <!-- Progress -->

                                        <div class="text-green-darken-3 text-h4 font-weight-bold">90%</div>

                                        <div class="text-h6 text-medium-emphasis font-weight-regular">
                                            $2,938.00 remaining
                                        </div>
                                    </v-card-title>
                                    <br>
                                    <v-card-text>
                                        <div :style="`right: calc(${review} - 32px)`"
                                            class="position-absolute mt-n8 text-caption text-green-darken-3">
                                            Eligibility review
                                        </div>
                                        <v-progress-linear color="green-darken-3" height="22" model-value="90"
                                            rounded="lg">
                                            <v-badge :style="`right: ${review}`" class="position-absolute" color="white"
                                                dot inline></v-badge>
                                        </v-progress-linear>

                                        <div class="d-flex justify-space-between py-3">
                                            <span class="text-green-darken-3 font-weight-medium">
                                                $26,442.00 remitted
                                            </span>

                                            <span class="text-medium-emphasis"> $29,380.00 total </span>
                                        </div>
                                    </v-card-text>


                                </v-card>
                                <!-- </v-col> -->


                                <!-- <v-divider class="mb-6"></v-divider> -->


                                <!-- <v-row cols="12" sm="6" md="6" lg="6" class="pb-10 mb-2" v-if="devType == 'Desktop'">
                                    <v-sheet class="d-flex flex-wrap pl-3 pr-3 ma-6 " height="70" max-height="115"
                                        style="align-items: center;">

                                    </v-sheet>
                                </v-row> -->
                            </v-sheet>
                        </v-col>
                    </v-row>

                    <v-sheet class="pa-4 pb-0 " elevation="12" height="auto" width="100%">

                        <v-row v-if="devType == 'Desktop'">
                            <v-col cols="12" class="pb-5 mb-0 pl-8 pt-0">
                                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                                        class="text-h3">mdi-chart-bubble</v-icon>&nbsp;Acesso rápido<v-btn color="black"
                                        variant="text" class="text-h6 pr-0" density="default"
                                        @click="goPlayModal = !goPlayModal; GoPlayNew();" icon="mdi-pencil">
                                    </v-btn>
                                </h1>
                                <!-- <i class="float-sm-left text-caption text-sm"><v-icon
                                        icon="mdi-clock-fast"></v-icon>&nbsp;
                                    Se tiver alguma dúvida ou questão relacionada com o portal Bissonde ou com a sua
                                    encomenda, utilize os seguintes contactos: bissonde.direct-pt@bissonde.ao ou o
                                    Número Suporte Bissonde: +351 932 641 788</i> -->
                            </v-col>
                        </v-row>
                        <v-row v-if="devType != 'Desktop'">
                            <v-col cols="9">
                                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                                        class="text-h6">mdi-chart-bubble</v-icon>&nbsp;Acesso rápido
                                </h1>
                                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;
                                    22/05/2023</i>
                            </v-col>
                            <v-col>

                                <v-btn color="purple-darken-4" variant="text" class="float-sm-center pr-0"
                                    density="default" @click="goPlayModal = !goPlayModal; GoPlayNew();"
                                    icon="mdi-plus-circle">
                                </v-btn>
                            </v-col>
                        </v-row>
                        <!-- <v-divider class="mb-6"></v-divider> -->


                        <v-row cols="12" sm="6" md="6" lg="6" class="pt-0 mt-0" v-if="devType == 'Desktop'">
                            <v-sheet class="d-flex flex-wrap pl-3 pr-3 ma-6 pt-0 mt-0" style="align-items: center;">
                                <div v-for="(n, index) in tabMenus " :key="n">
                                    <v-row align="center" justify="center" class="pb-0" dense>

                                        <!-- <v-col cols="12" md="12"> -->
                                        <v-hover v-slot="{ isHovering, props }">
                                            <v-card :href="'dashboard/' + n.to" :color="n.bgcolor"
                                                class="mx-auto justify-center pa-2 mr-4 mb-4 rounded-0" width="202"
                                                max-width="202" height="142" border="start" variant="flat" hover>
                                                <!-- bg-blue-grey-lighten-4 -->
                                                <!-- <v-img :aspect-ratio="16 / 9"
                                                    src="https://cdn.vuetifyjs.com/images/cards/kitchen.png" cover>
                                                    <v-expand-transition>
                                                        <div v-if="isHovering"
                                                            class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                                                            style="height: 100%;">
                                                            $14.99
                                                        </div>
                                                    </v-expand-transition>
                                                </v-img> -->
                                                <v-card-item>
                                                    <v-card-title>
                                                        <v-icon class="text-h6">{{ n.icon }}</v-icon>
                                                        &nbsp;&nbsp;{{ n.text }}
                                                    </v-card-title>

                                                    <v-card-subtitle>
                                                        {{ n.descr}}
                                                    </v-card-subtitle>
                                                </v-card-item>

                                                <v-card-text>
                                                    Para aceder a este menu clique aqui
                                                </v-card-text>
                                            </v-card>
                                        </v-hover>
                                        <!-- </v-col> -->
                                    </v-row>
                                    <!-- {{ n.icon }} -->
                                </div>
                            </v-sheet>
                        </v-row>

                        <v-row cols="12" sm="6" md="6" lg="6" class="pt-0 mt-2" v-if="devType != 'Desktop'">
                            <v-sheet class="d-flex flex-wrap ml-0 ma-3 pa-1 pt-0 mt-0 justify-center"
                                style="align-items: center;">
                                <div v-for="(n, index) in tabMenus " :key="n">
                                    <v-row align="center" justify="center" dense>

                                        <!-- <v-col cols="12" md="12"> -->
                                        <v-hover v-slot="{ isHovering, props }">
                                            <v-card :href="'dashboard/' + n.to" :color="n.bgcolor"
                                                class="mx-auto pl-6 ml-3 mb-3 rounded-0" width="146" border="start"
                                                variant="flat" hover>
                                                <!-- <v-img :aspect-ratio="16 / 9"
                                                    src="https://cdn.vuetifyjs.com/images/cards/kitchen.png" cover>
                                                    <v-expand-transition>
                                                        <div v-if="isHovering"
                                                            class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                                                            style="height: 100%;">
                                                            $14.99
                                                        </div>
                                                    </v-expand-transition>
                                                </v-img> -->
                                                <v-card-item>
                                                    <v-card-title>
                                                        <v-icon class="text-h3 align-center">{{ n.icon }}</v-icon>

                                                    </v-card-title>

                                                    <v-card-subtitle>
                                                        {{ n.text }}
                                                    </v-card-subtitle>
                                                </v-card-item>
                                            </v-card>
                                        </v-hover>
                                        <!-- </v-col> -->
                                    </v-row>
                                    <!-- {{ n.icon }} -->
                                </div>
                            </v-sheet>
                        </v-row>


                    </v-sheet>
                    <!-- 
                    <v-sheet class="pa-4 pb-1 mb-2 mt-5" elevation="12" height="auto" width="100%">

                        <v-row v-if="devType == 'Desktop'">
                            <v-col cols="12" class="pb-0 mb-0 pl-8">
                                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                                        class="text-h3">mdi-view-dashboard</v-icon>&nbsp;Visão Geral<v-btn color="black"
                                        variant="text" class="text-h6 pr-0" density="default"
                                        @click="goPlayModal = !goPlayModal; GoPlayNew();" icon="mdi-pencil">
                                    </v-btn>
                                </h1>
                            </v-col>
                        </v-row>
                        <v-row v-if="devType != 'Desktop'">
                            <v-col cols="9">
                                <h1 class="text-h6 text-md-h5 font-weight-bold mb-0"><v-icon
                                        class="text-h6">mdi-chart-bubble</v-icon>&nbsp;Visão Geral
                                </h1>
                                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;
                                    22/05/2023</i>
                            </v-col>
                            <v-col>

                                <v-btn color="purple-darken-4" variant="text" class="float-sm-center pr-0"
                                    density="default" @click="goPlayModal = !goPlayModal; GoPlayNew();"
                                    icon="mdi-plus-circle">
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-row cols="12" sm="6" md="6" lg="6" class="pt-0 mt-0" v-if="devType == 'Desktop'">
                            <v-sheet
                                class="d-flex flex-wrap ml-0 ma-3 pa-1 pt-0 pl-9 mt-4 justify-start w-200 rounded-0"
                                style="align-items: center; width:100%">
                                <v-card class="rounded-0">
                                    <v-tabs v-model="tab" bg-color="#ccc" class="rounded-0">
                                        <v-tab value="one">Lista de Compras</v-tab>
                                        <v-tab value="two">Ofertas</v-tab>
                                        <v-tab value="three">Encomendas</v-tab>
                                        <v-tab value="four">Aprovações Pendentes</v-tab>
                                        <v-tab value="five">Devoluções</v-tab>
                                    </v-tabs>

                                    <v-card-text class="rounded-0">
                                        <v-tabs-window v-model="tab">
                                            <v-tabs-window-item value="one">
                                                One
                                            </v-tabs-window-item>

                                            <v-tabs-window-item value="two">
                                                Two
                                            </v-tabs-window-item>

                                            <v-tabs-window-item value="three">
                                                Three
                                            </v-tabs-window-item>
                                        </v-tabs-window>
                                    </v-card-text>
                                </v-card>
                            </v-sheet>
                        </v-row>
                    </v-sheet> -->

                    <v-sheet class="pa-4 pb-4 mb-2 mt-5" elevation="0" height="200" width="100%"
                        v-if="devType == 'Desktop'">

                        <v-icon>mdi-circle-small</v-icon><a class="text-decoration" href="#">Serviço ao
                            cliente</a><br>
                        <v-icon>mdi-circle-small</v-icon><a class="text-decoration" href="#">Informações de
                            pagamento e
                            envio</a><br>
                        <v-icon>mdi-circle-small</v-icon><a class="text-decoration" href="#">Centro de ajuda</a><br>
                        <v-btn class="mt-5 mb-5 rounded-0">Newsletter</v-btn><br>
                        A nossa oferta é apenas válida para clientes empresariais e entidades públicas.<br>
                        <br>
                        <b>Preços em EUR + IVA à taxa legal em vigor.</b><br>
                        <v-row class="pt-5 pb-15" cols="12" sm="6" md="6" lg="6">
                            <v-col cols="10"><a class="text-decoration" href="#">Ficha
                                    técnica</a>&nbsp;<v-icon>mdi-circle-small</v-icon>&nbsp;<a class="text-decoration"
                                    href="#">Política de
                                    privacidade</a>&nbsp;<v-icon>mdi-circle-small</v-icon>&nbsp;<a
                                    class="text-decoration" href="#">Condições
                                    Gerais de Venda</a>
                                &nbsp;<v-icon>mdi-circle-small</v-icon>&nbsp;<span
                                    class="text-decoration-overline">Support ID:</span> f972b8238e</v-col>
                            <v-col class="text-right text-decoration-overline ">
                                &copy; 2024 Bissonde SO
                            </v-col>
                        </v-row>

                        <v-spacer></v-spacer>
                    </v-sheet>

                    <v-sheet class="pa-4 pb-4 mb-2 mt-5" elevation="0" height="200" width="100%"
                        v-if="devType != 'Desktop'">

                        <a class="text-decoration" href="#">Serviço ao cliente</a><br>
                        <a class="text-decoration" href="#">Informações de pagamento e envio</a><br>
                        <a class="text-decoration" href="#">Centro de ajuda</a><br>
                        <v-btn class="mt-5 mb-5 rounded-0">Newsletter</v-btn><br>
                        A nossa oferta é apenas válida para clientes empresariais e entidades públicas.<br>
                        Preços em EUR + IVA à taxa legal em vigor.<br>
                        <v-row class="pt-5 pb-15" cols="12" sm="6" md="6" lg="6">
                            <v-col cols="10"><v-icon>mdi-circle-small</v-icon><a class="text-decoration" href="#">Ficha
                                    técnica</a><br><v-icon>mdi-circle-small</v-icon><a class="text-decoration"
                                    href="#">Política de privacidade</a><v-icon>mdi-circle-small</v-icon><br><a
                                    class="text-decoration" href="#"><v-icon>mdi-circle-small</v-icon>Condições
                                    Gerais de Venda</a>
                                <br><v-icon>mdi-circle-small</v-icon><span class="text-decoration">Support
                                    ID:</span> f972b8238e</v-col>
                            <v-col class="text-right">
                                &copy; 2024 Bissonde SO
                            </v-col>
                        </v-row>

                        <v-spacer></v-spacer>
                    </v-sheet>
                </v-container>
            </v-main>
        </v-app>
    </v-form>
</template>

<script setup>
//
// import { ref } from 'vue';
import { ref, onMounted } from "vue";
import { validate } from "vee-validate";
import { useField, useForm } from 'vee-validate'
import { mergeProps } from 'vue'
import axios from 'axios'

import { useModuleStore } from '@/store/TaskStore';
import { useTokenStore } from '@/store/TokenStore'

import ChartComponent from '@/components/ChartComponent.vue'
import ChartComponent1 from '@/components/ChartComponent1.vue'
import ChartComponent2 from '@/components/ChartComponent2.vue'
import ChartComponent3 from '@/components/ChartComponent3.vue'
import ChartComponent4 from '@/components/ChartComponent4.vue'

const messageCounter = window.localStorage.getItem('MSC')


const moduleStore = useModuleStore()

const TokenStore = useTokenStore()


const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        // LOGIN
        firstNameR(value) {
            if (value?.length >= 2) return true
            return 'Campo obrigatório'
        },
        lastNameR(value) {
            if (value?.length >= 2) return true
            return 'Campo obrigatório'
        },
    }
})

const firstNameR = useField('firstNameR')
const lastNameR = useField('lastNameR')

const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
})

// Vue.prototype.$modNameX = 'Vasco'
// const $modNameX = ref({
//   dialog: window.localStorage.getItem('dialog')
// });

const name = useField('name')
const editModal = ref(false)
const alertModal = ref(false)
const filterModal = ref(false)
const veditModal = ref(false)
const mdGroups = ref(false)
const vmdGroups = ref(false)
const isDialogOpenMsg = ref(false)
const isDialogOpenPhn = ref(false)

const emailRules = [
    value => {
        if (value) {
            return true
        }

        return 'O e-mail é obrigatório';
    },
    value => {
        if (value.includes('@')) {
            return true;
        }

        return 'E-mail inválido'
    }
];

const msg = 'Produto'
setTimeout(() => {
    // "Hello"
}, 300);

var MyUserName = '';
var JwtToken = '';
var myPicture = '';
var myEmail = '';
var PID = '';
var BID = '';
onMounted(() => {
    // this.$router.go(0)

    if (window.localStorage.getItem('JwtToken') != null) {
        PID = window.localStorage.getItem('PID')
        BID = window.localStorage.getItem('BID')

        JwtToken = localStorage.getItem('JwtToken')
        MyUserName = localStorage.getItem('username')
        myPicture = localStorage.getItem('myPicture')
        myEmail = localStorage.getItem('myEmail')
        document.getElementById("myImg").src = myPicture;
        window.localStorage.removeItem('PWE')
        window.localStorage.removeItem('PWD')
        // document["myImg"].src = myPicture;
        // var tok = JSON.parse(localStorage.getItem('token'))

    }
    else {
        window.location = '/signin?returnUrl=dashboard'


        // this.returnURL('signin')
        // this.$router.push({ path: `/login` })
    }
});
</script>

<script>
const useModule = useModuleStore()
// let mc = window.localStorage.getItem('MSC')

export default {
    data: () => ({
        review: '30%',
        tab: '',
        multipleSendDW: true,
        msgCounter: '0',
        devType: 'Desktop',
        hrefGoTo: '#',
        noMsgCredit: false,
        countrycode: '244',
        theme: 'light',
        dwID: '',
        dwStat: 'Novo',
        dwMode: '',
        dwCategory: 'SMS',
        dwGroup: '',
        dwDate: '',
        dwTime: '',
        dwCampaign: '',
        dwMessage: '',

        dwContact: '',
        dwSms: '',
        dwPhone: '',
        dwWhatsApp: '',
        dwEmail: '',
        dwTitle: '',

        dWingsMode: 'Singular',
        goPlayID: '',
        viewPlayModal: false,
        goPlayModal: false,
        details: null,
        options: null,
        activateBtn: '#ccc',
        msgID: '',
        msgTitle: '',
        msgCategory: 'SMS',
        msgText: '',
        campID: '',
        campTitle: '',
        campaignStart: '',
        campaignEnd: '',
        campaignSms: '',
        campaignEmail: '',
        campaignTelephone: '',
        // campGroup
        selected: [],
        deleteValue: null,
        itemValue: null,
        search: '',
        dialogDelete: false,
        totalItems: 0,
        itemsPerPage: 5,
        customerAll: '',
        vtooltip: false,
        vtooltipE: false,
        vtooltipEdit: false,
        vtooltipInfo: false,
        vtooltipDel: false,
        vtooltipFolder: false,
        vtooltipTag: false,
        vtooltipDots: false,
        btnEdit: false,
        btnDelete: false,
        customerID: '',
        groupID: '',
        groupName: '',
        groupDescr: '',
        alertSuccess: false,
        alertDelete: false,
        ActEmpty: false,
        isOkToSubmit: false,
        emptyFields: false,
        isFormValid: false,
        // cellRole: null,
        isHovering: null,
        cellCampaign: null,
        modNameX: null,
        isActiveBtn: false,
        isEditing: false,
        viewMainForm: false,
        isOkToSubmit: false,
        firstName: '',
        lastName: '',
        cellphone: '',
        cellSMS: '',
        cellEmail: '',
        cellWhatsApp: '',
        cellAge: '',
        cellRole: null,
        cellLikes: null,
        cellGroup: null,
        cellGroupList: [],
        cellGroupListID: [],
        cellContactList: [],
        cellContactListID: null,
        cellCampaignList: [],
        cellCampaignListID: [],
        cellMessageList: [],
        cellMessageListID: [],
        firstNameRules: [
            value => {
                if (value?.length > 3) return true
                return 'Mínimo de 3 caracteres.'
            }
        ],
        lastNameRules: [
            value => {
                if (value) return true
                return 'Mínimo de 3 caracteres.'
            }
        ],
        overlay: true,
        viewModal: false,
        filterModal: false,
        dialog: false,
        loading: false,
        alert: false,
        showModal: false,
        model: 'rounded-0',
        props: false,
        text: '',
        modalText: '',
        drawer: false,
        statItems: [
            { text: 'Real-Time', icon: 'mdi-clock' },
            { text: 'Audience', icon: 'mdi-account' },
            { text: 'Conversions', icon: 'mdi-flag' },
        ],
        leftMenuItems: [
            { text: 'Home', icon: 'mdi-view-dashboard', to: '/' },
            { text: 'Contactos', icon: 'mdi-account', to: 'dashboard/contacts', bgcolor: 'red' },
            { text: 'Grupos', icon: 'mdi-account-group', to: 'dashboard/groups', bgcolor: 'red' },
            { text: 'Campanhas', icon: 'mdi-account-voice', to: 'dashboard/campaigns', bgcolor: 'red' },
            { text: 'Agendamento', icon: 'mdi-account-clock', to: 'dashboard/calendar', bgcolor: 'red' },
            { text: 'Mensagem', icon: 'mdi-message-plus', to: 'dashboard/message', bgcolor: 'red' },
            { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'dashboard/calls', bgcolor: 'red' },
            { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'dashboard/whatsapp', bgcolor: 'red' },
            { text: 'E-mail', icon: 'mdi-email-fast-outline', to: 'dashboard/email', bgcolor: 'red' },
            { text: 'Histórico', icon: 'mdi-history', to: 'dashboard/history', bgcolor: 'red' },
            { text: 'Configuarções', icon: 'mdi-cog', to: 'dashboard/settings', bgcolor: 'red' },
        ],
        group: null,
        customerLogs: [
            {
                color: 'blue',
                icon: 'mdi-clipboard-text',
                subtitle: 'Jan 20, 2014',
                title: 'Vacation itinerary',
            },
            {
                color: 'amber',
                icon: 'mdi-gesture-tap-button',
                subtitle: 'Jan 10, 2014',
                title: 'Kitchen remodel',
            },
        ],
        headers: [
            { title: 'ID', align: 'start', key: 'id', width: '50px' },
            { title: 'Nome Completo', align: 'start', key: 'fullname' },
            { title: 'Telemóvel', align: 'start', key: 'cell' },
            { title: 'E-mail', align: 'start', key: 'email' },
            { title: 'Acções', align: 'end', key: 'actions', width: '200px' },
        ],
        groupMembersHeaders: [
            { title: 'ID', align: 'start', key: 'id', width: '50px' },
            { title: 'Nome Completo', align: 'start', key: 'fullname', width: '200px' },
            { title: 'Telemóvel', align: 'start', key: 'cell' },
            { title: 'E-mail', align: 'start', key: 'email' },
            { title: 'Acções', align: 'end', key: 'actions', width: '150px' },
        ],
        customerLogs: [],
        customerGroupsHeaders: [
            { title: 'ID', align: 'start', key: 'groupId' },
            { title: 'Nome', align: 'start', key: 'name' },
            { title: 'Descrição', align: 'start', key: 'descr' },
            { title: 'Criação', align: 'start', key: 'crdate' },
            { title: 'Acções', align: 'end', key: 'actions', width: '150px' },
        ],
        customeCampaignsHeaders: [
            { title: 'ID', align: 'start', key: 'id' },
            { title: 'Campanha', align: 'start', key: 'name' },
            { title: 'Início', align: 'start', key: 'sDate' },
            { title: 'Fim', align: 'start', key: 'eDate' },
            { title: 'Acções', align: 'end', key: 'actions', width: '200px' },
        ],
        customeMessagesHeaders: [
            { title: 'ID', align: 'start', key: 'id' },
            { title: 'Mensagem', align: 'start', key: 'name' },
            { title: 'Categoria', align: 'start', key: 'cat' },
            { title: 'Modificação', align: 'start', key: 'mdate' },
            { title: 'Descrição', align: 'start', key: 'descr' },
            { title: 'Acções', align: 'end', key: 'actions', width: '200px' },
        ],
        customeMessagesHistoryHeaders: [
            { title: 'ID', align: 'start', key: 'id' },
            { title: 'Mensagem', align: 'start', key: 'name' },
            { title: 'Criação', align: 'start', key: 'crdate' },
            { title: 'Estado', align: 'start', key: 'stat' },
            { title: 'Qt.', align: 'start', key: 'dest' },
            { title: 'Data Envio', align: 'start', key: 'sdate' },
            { title: 'Acções', align: 'end', key: 'actions', width: '200px' },
        ],
        serverItems: [],
        serverItems1: [],
        groupMembers: [],
        groupMembersList: [],
        topKPI: [],
        allSMS: [],
        allPhone: [],
        allWhatsApp: [],
        allEmail: [],
        allContacts: [],
        //   {
        //     name: 'Speedster',
        //     speed: 35,
        //     length: 22,
        //     price: 300000,
        //     year: 2021,
        //   },
        //   {
        //     name: 'OceanMaster',
        //     speed: 25,
        //     length: 35,
        //     price: 500000,
        //     year: 2020,
        //   },
        //   {
        //     name: 'Voyager',
        //     speed: 20,
        //     length: 45,
        //     price: 700000,
        //     year: 2019,
        //   },
        //   {
        //     name: 'WaveRunner',
        //     speed: 40,
        //     length: 19,
        //     price: 250000,
        //     year: 2022,
        //   },
        //   {
        //     name: 'SeaBreeze',
        //     speed: 28,
        //     length: 31,
        //     price: 450000,
        //     year: 2018,
        //   },
        //   {
        //     name: 'HarborGuard',
        //     speed: 18,
        //     length: 50,
        //     price: 800000,
        //     year: 2017,
        //   },
        //   {
        //     name: 'SlickFin',
        //     speed: 33,
        //     length: 24,
        //     price: 350000,
        //     year: 2021,
        //   },
        //   {
        //     name: 'StormBreaker',
        //     speed: 22,
        //     length: 38,
        //     price: 600000,
        //     year: 2020,
        //   },
        //   {
        //     name: 'WindSail',
        //     speed: 15,
        //     length: 55,
        //     price: 900000,
        //     year: 2019,
        //   },
        //   {
        //     name: 'FastTide',
        //     speed: 37,
        //     length: 20,
        //     price: 280000,
        //     year: 2022,
        //   },
        // ],
        items: [
            {
                title: 'Contactos',
                value: 'foo',
                icon: 'mdi-account',
                src: 'https://media.istockphoto.com/id/1363430976/photo/password-online-form-cyber-security-concept-image.jpg?b=1&s=612x612&w=0&k=20&c=kAepB70tUM3pNVrNv-TjyjEZQMKzh8bu8YG3d5LwSIM='
            },
            {
                title: 'Mensagens',
                value: 'foo',
                icon: 'mdi-message-text-fast',
                src: 'https://media.istockphoto.com/id/1217093906/photo/womens-hand-typing-on-mobile-smartphone-live-chat-chatting-on-application-communication.jpg?b=1&s=612x612&w=0&k=20&c=musuQuCTEcuaKrsnd1xZdCp51ToAt1qv_od0HKkQD9Q='
            },
            {
                title: 'Chamadas',
                value: 'bar',
                icon: 'mdi-phone-outgoing',
                src: 'https://media.istockphoto.com/id/1031214170/photo/emergency-and-urgency-dialing-911-on-smartphone-screen-shallow-depth-of-field.jpg?b=1&s=612x612&w=0&k=20&c=_mX-_XF6iZ6ouCre5gdhGGS0cN36Yfo56YybWVA02RU='
            },
            {
                title: 'WhatsApp',
                value: 'fizz',
                icon: 'mdi-whatsapp',
                src: 'https://images.pexels.com/photos/46924/pexels-photo-46924.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
                title: 'E-mail',
                value: 'buzz',
                icon: 'mdi-email',
                src: 'https://media.istockphoto.com/id/1282799241/photo/email-marketing-concept.jpg?b=1&s=612x612&w=0&k=20&c=6k8_7LDfTCRvtXC1FWVEuA0UHAn_WlezoHriI1-Coyg='
            },
        ],
        statsMenuC: [],
        // [
        //   { text: 'Mensagens', icon: 'mdi-forum', to: 'message', descr: 'Mensagens', nr: '1.276', color: 'bg-purple-accent-4', dialog: 'Messages', class: 'justify-space-around pa-4 text-center bg-brown-lighten-3 text-h6 rounded-0' },
        //   { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', nr: '1.276', color: 'bg-secondary', dialog: 'Chamadas', class: 'justify-space-around pa-4 text-center bg-deep-purple-lighten-4 text-h6 rounded-0' },
        //   { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', nr: '1.276', color: 'bg-teal-darken-3', dialog: 'WhatsApp', class: 'justify-space-around pa-4 bg-teal-lighten-4 text-center text-h6 rounded-0' },
        //   { text: 'E-mails', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', nr: '1.276', color: 'bg-primary', dialog: 'E-mail', class: 'justify-space-around pa-4 text-center bg-red-lighten-4 text-h6 rounded-0' }
        // ],
        statsMenu: [
            { text: 'Pacientes', icon: 'mdi-account-injury-outline', to: 'message', descr: 'Mensagens', nr: '1.276', color: 'bg-purple-accent-4', dialog: 'Messages', class: 'justify-space-around pa-4 text-center bg-brown-lighten-3 text-h6 rounded-0' },
            { text: 'Camas', icon: 'mdi-bed', to: 'calls', descr: 'Chamadas Automaticas', nr: '1.276', color: 'bg-secondary', dialog: 'Chamadas', class: 'justify-space-around pa-4 text-center bg-deep-purple-lighten-4 text-h6 rounded-0' },
            { text: 'Análises Clinicas', icon: 'mdi-stethoscope', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', nr: '1.276', color: 'bg-teal-darken-3', dialog: 'WhatsApp', class: 'justify-space-around pa-4 bg-teal-lighten-4 text-center text-h6 rounded-0' },
            { text: 'Laboratório', icon: 'mdi-microscope', to: 'email', descr: 'E-mails', nr: '1.276', color: 'bg-primary', dialog: 'E-mail', class: 'justify-space-around pa-4 text-center bg-red-lighten-4 text-h6 rounded-0' }
        ],
        myHomePage: [
            { text: 'Perfil', icon: 'mdi-view-dashboard', to: 'profile', descr: 'Secção de Gráficos', dialog: 'isDialogOpen', bgcolor: '#001D40' },
            { text: 'Contacto', icon: 'mdi-send', to: 'contact', descr: 'Envio de Mensagensd', dialog: 'dWings', size: '400px', bgcolor: '#004D40' }
        ],
        tabMenus: [
            // { text: 'Dashboard', icon: 'mdi-view-dashboard', to: '/', descr: 'Secção de Gráficos', dialog: 'isDialogOpen' },
            //{ text: 'D-Wings', icon: 'mdi-send', to: 'd-Wings', descr: 'Envio de Mensagensd', dialog: 'dWings', size: '400px' },
            { text: 'Contactos', icon: 'mdi-account', to: 'contacts', descr: 'Directório de Contactos', dialog: 'Contacts', size: '400px', bgcolor: '#001D40' },
            { text: 'Grupos', icon: 'mdi-account-group', to: 'groups', descr: 'Directório de Grupos de Contactos', dialog: 'Groups', size: '400px', bgcolor: '#002D41' },
            { text: 'Campanhas', icon: 'mdi-account-voice', to: 'campaigns', descr: 'Campanhas', dialog: 'Campaigns', bgcolor: '#003D42' },
            // { text: 'Agendamento', icon: 'mdi-account-clock', to: 'calendar', descr: 'Agendamento', dialog: 'Booking' },
            { text: 'Mensagens', icon: 'mdi-message-plus', to: 'message', descr: 'Mensagens', dialog: 'Messages', bgcolor: '#004D43' },
            { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', dialog: 'Chamadas', bgcolor: '#005D44' },
            { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', dialog: 'WhatsApp', bgcolor: '#006D45' },
            { text: 'E-mail', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', dialog: 'E-mail', bgcolor: '#007D46' },
            { text: 'Histórico', icon: 'mdi-history', to: 'history', descr: 'Acesse ao hsitóricos de operações', dialog: 'Histórico', bgcolor: '#008D47' },
            // { text: 'Contas', icon: 'mdi-key', to: 'account', descr: 'Contas de utilizadores', dialog: 'Contas' },
            // { text: 'Definições', icon: 'mdi-cog', to: 'settings', descr: 'Configirações gerais', dialog: 'Settings' }
        ],

        topMenus: [
            { text: 'Ver Relatórios', icon: 'mdi-chart-box-outline', to: 'contacts', descr: 'Ver Relatórios', dialog: 'Doente', size: '400px', bgcolor: 'red' },
            { text: 'Sessões', icon: 'mdi-account-switch', to: 'contacts', descr: 'Sessões', dialog: 'Doente', size: '400px', bgcolor: '#001D40' },
            { text: 'Configurações', icon: 'mdi-cog', to: 'contacts', descr: 'Configurações', dialog: 'Doente', size: '400px', bgcolor: '#001D40' }
        ],

        playModal: [
            { text: 'Ver Relatórios', icon: 'mdi-chart-box-outline', to: 'contacts', descr: 'Ver Relatórios', dialog: 'Doente', size: '400px' }
        ],
        // tabMenus: [
        //   // { text: 'Dashboard', icon: 'mdi-view-dashboard', to: '/', descr: 'Secção de Gráficos', dialog: 'isDialogOpen' },
        //   { text: 'Doentes', icon: 'mdi-account-injury-outline', to: 'contacts', descr: 'Directório de Contactos', dialog: 'Doente', size: '400px' },
        //   { text: 'Consulta Externa', icon: 'mdi-account-arrow-right', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', dialog: 'Consulta Externa' },
        //   { text: 'Banco de Urgência', icon: 'mdi-hospital', to: 'groups', descr: 'Directório de Grupos de Contactos', dialog: 'Groups', size: '400px' },
        //   { text: 'Camas', icon: 'mdi-bed', to: 'campaigns', descr: 'Campanhas', dialog: 'Campaigns' },
        //   // { text: 'Agendamento', icon: 'mdi-account-clock', to: 'calendar', descr: 'Agendamento', dialog: 'Booking' },
        //   { text: 'Análises Clínicas', icon: 'mdi-stethoscope', to: 'message', descr: 'Mensagens', dialog: 'Messages' },
        //   { text: 'Laboratório', icon: 'mdi-microscope', to: 'calls', descr: 'Chamadas Automaticas', dialog: 'Chamadas' },
        //   { text: 'Internamento', icon: 'mdi-account-arrow-left', to: 'email', descr: 'E-mails', dialog: 'E-mail' },
        //   { text: 'Histórico', icon: 'mdi-history', to: 'history', descr: 'Acesse ao hsitóricos de operações', dialog: 'Histórico' },
        //   { text: 'Contas', icon: 'mdi-key', to: 'account', descr: 'Contas de utilizadores', dialog: 'Contas' },
        //   { text: 'Definições', icon: 'mdi-cog', to: 'settings', descr: 'Configirações gerais', dialog: 'Settings' }
        // ],
        tabs: null,
        itemr: [
            {
                title: 'Dados Pessoais',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                icon: 'mdi-information-outline',
                src: 'https://media.istockphoto.com/id/1363430976/photo/password-online-form-cyber-security-concept-image.jpg?b=1&s=612x612&w=0&k=20&c=kAepB70tUM3pNVrNv-TjyjEZQMKzh8bu8YG3d5LwSIM='
            },
            {
                title: 'Registos',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                icon: 'mdi-format-list-bulleted',
                src: 'https://media.istockphoto.com/id/1363430976/photo/password-online-form-cyber-security-concept-image.jpg?b=1&s=612x612&w=0&k=20&c=kAepB70tUM3pNVrNv-TjyjEZQMKzh8bu8YG3d5LwSIM='
            },
        ],
        selectedItem: null,
        veditModal: true,

        desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
            },
            {
                name: 'Eclair',
                calories: 262,
            },
            {
                name: 'Cupcake',
                calories: 305,
            },
            {
                name: 'Gingerbread',
                calories: 356,
            },
            {
                name: 'Jelly bean',
                calories: 375,
            },
            {
                name: 'Lollipop',
                calories: 392,
            },
            {
                name: 'Honeycomb',
                calories: 408,
            },
            {
                name: 'Donut',
                calories: 452,
            },
            {
                name: 'KitKat',
                calories: 518,
            },
        ]
        // vmdGroups: false,
    }),

    validations: {

    },

    watch: {
        dialogDelete(val) {
            val || this.closeDelete()
        },
        cellValue(newa, old) {
            console.log(newa)
            console.log(old)
        },
        group() {
            this.drawer = false
        },
        loading(val) {
            if (!val) return
            setTimeout(() => (this.loading = false), 3000)
        },
        dialog(val) {
            if (!val) return
            setTimeout(() => (this.dialog = false), 3000)
        },
        overlay(val) {
            val && setTimeout(() => {
                this.overlay = false
            }, (3000));
        },
        editModal(visible) {
            if (visible) {

            }

        },
    },

    computed: {
        // formTitle() {
        //   return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        // },
        virtualBoats() {
            return [...Array(100).keys()].map(i => {
                const boat = { ...this.boats[i % this.boats.length] }
                boat.name = `${boat.name} #${i}`
                return boat
            })
        },
    },

    mounted: async function () {
        // let DEV = document.createElement('script')
        // DEV.setAttribute('src', '/src/Detect/detect.js')
        // document.head.appendChild(DEV)

        // // var user = detect.parse(navigator.userAgent)  
        // // window.localStorage.setItem('MOB', user.device.type);

        var isMobile = window.orientation > -1;
        // alert(isMobile ? 'Mobile' : 'Desktop');
        this.devType = (isMobile ? 'Mobile' : 'Desktop')

        // this.devType = window.localStorage.getItem('MOB')
        // this.msgCounter = this.messageCounter
        // // alert(this.devType)

        this.overlayOFF();

        // this.overlayON();

        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                // $modNameX = null,
                this.isLoaded = true;
            }
        }

        if (window.localStorage.getItem('dialog') != '') {
        }


        this.KPI_GET_ALL();

        this.EMAIL_GET_ALL();

        this.WHATSAPP_GET_ALL();

        this.PHONE_GET_ALL();

        this.SMS_GET_ALL();

        this.CONTACTS_GET_ALL();
        // $(this.$ref.modal)
        //   this.firstName = '',
        //   this.lastName = ''
    },

    methods: {

        isDark() {
            if (this.theme == 'dark') {
                this.theme = 'light'
            }
            else {
                this.theme = 'dark'
            }
        },

        showSelected() {
            alert(this.selected)
        },

        editItem(item) {
            this.editedIndex = this.serverItems.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.editModal = !this.editModal
        },

        deleteItem(item) {
            this.editedIndex = this.serverItems.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            this.deleteValue = item
        },

        deleteMultiple(item) {
            this.dialogDelete = true
            if (this.selected == null) {
                this.CUSTOMER_DELETE(item.id)
            }
            else {
                this.CUSTOMER_DELETE_MULTIPLE();
            }
        },

        deleteItemConfirm() {
            this.serverItems.splice(this.editedIndex, 1)
            this.closeDelete()

            // console.log(item)

            // if (useModule.dialog == 'Contacts') {
            //   this.CUSTOMER_DELETE(item.ID)
            // }
            // else if (useModule.dialog == 'Groups') {
            //   this.CUSTOMER_GROUP_DELETE(item.groupId)
            // }
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

                    // console.log(response.data['$values'])

                    //  console.log(customers)

                    //  for(let i in customers['$values'])
                    //  {
                    //  }
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));

            this.alertSuccess = false

        },

        CUSTOMER_GET: async function (item) {

            this.alertDelete = false
            this.customerID = item.ID

            this.customerID = item.id
            this.firstName = item.name
            this.lastName = item.surname
            this.cellphone = item.cell.replace(/ /g, '').replace(/()-/g, '').replace(/[()]/g, '')
            this.cellSMS = item.sms.replace(/ /g, '').replace(/()-/g, '').replace(/[()]/g, '')
            this.cellEmail = item.email
            this.cellWhatsApp = item.whatsApp.replace(/ /g, '').replace(/()-/g, '').replace(/[()]/g, '')
            this.cellAge = item.dob
            this.cellLikes = item.likes
            this.cellCampaign = item.campaign
            this.cellRole = item.role
            this.cellGroup = item.groupId
            this.countrycode = item.countrycode

            this.CUSTOMER_LOG_GET(this.customerID)
            this.CUSTOMER_GROUP_GET_LIST_ALL();
            this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();


            // let config = {
            //   headers: {
            //     'Accept': 'application/json',
            //     'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
            //   }
            // }


            // const customers = await axios.get('Customer/' + item.id, config)
            //   .then(response => {
            //     // = response.data
            //     this.loading = true
            //     // this.serverItems = response.data['$values']


            //     //  console.log(customers)

            //     //  for(let i in customers['$values'])
            //     //  {
            //     //  }
            //   })
            //   // .then(data => console.log(data))
            //   .catch(err => console.error(err));

        },

        CUSTOMER_DELETE: async function (id) {

            this.alertSuccess = false
            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            await axios.delete('Customer/' + this.deleteValue.id, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertDelete = true
                            //reload
                            // this.CUSTOMER_GET_ALL();

                            this.serverItems.splice(this.editedIndex, 1)
                            this.closeDelete();
                            this.editModal = false;
                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_MESSAGE_HISTORY_DELETE: async function (id) {

            this.alertSuccess = false
            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            await axios.delete('CustomerMessageHistory/' + this.deleteValue.id, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertDelete = true
                            //reload
                            // this.CUSTOMER_GET_ALL();

                            this.serverItems.splice(this.editedIndex, 1)
                            this.closeDelete();
                            this.editModal = false;
                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_LOG_GET_ALL: async function (id) {

            this.customerLogs = null;

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            const customersLogs = await axios.get('CustomerLog', config)
                .then(response => {
                    this.customerLogs = response.data['$values']

                    // console.log(response.data['$values'])
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_LOG_GET: async function (id) {

            this.customerLogs = null;

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            const customersLogs = await axios.get('CustomerLog/' + id, config)
                .then(response => {
                    this.customerLogs = response.data['$values']
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_GROUP_GET_ALL: async function (id) {

            this.overlayON();

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            this.serverItems = []

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            const customersGroups = await axios.get('CustomerGroup/' + PID + ',' + BID, config)
                .then(response => {
                    this.serverItems = response.data['$values']

                    // console.log(response.data['$values'])
                    this.overlayOFF();
                })
                .catch(err => console.error(err));
        },

        ACCOUNT_MEMBERS_GET_LIST: async function () {

            this.overlayON();

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            this.cellGroupList = []
            this.cellGroupListID = []

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            const customersGroups = await axios.get('CustomerGroup/' + PID + ',' + BID, config)
                .then(response => {
                    var LST = response.data['$values']
                    var json = JSON.stringify(this.cellGroupList)

                    for (let i in LST) {
                        this.cellGroupList.push(LST[i].name)
                        this.cellGroupListID.push(LST[i].groupId)

                    }
                    this.overlayOFF();
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_GROUP_GET_LIST_ALL: async function () {

            this.overlayON();

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            this.cellGroupList = []
            this.cellGroupListID = []

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            const customersGroups = await axios.get('CustomerGroup/' + PID + ',' + BID, config)
                .then(response => {
                    var LST = response.data['$values']
                    var json = JSON.stringify(this.cellGroupList)

                    for (let i in LST) {
                        this.cellGroupList.push(LST[i].name)
                        this.cellGroupListID.push(LST[i].groupId)

                    }
                    this.overlayOFF();
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_GET_LIST_ALL: async function () {

            this.overlayON();

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            this.cellContactList = []
            this.cellContactListID = []

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            const customersGroups = await axios.get('Customer/' + PID + ',' + BID, config)
                .then(response => {
                    var LST = response.data['$values']
                    var json = JSON.stringify(this.cellContactList)

                    for (let i in LST) {
                        this.cellContactList.push([LST[i].fullname, '+' + LST[i].countrycode + LST[i].cell])
                        // this.cellContactListID.push(LST[i].Id)

                    }
                    // console.log(this.cellContactList)

                    this.overlayOFF();
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_CAMPAIGN_GET_LIST_ALL: async function () {

            this.overlayON();

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            this.cellCampaignList = []
            this.cellCampaignListID = []

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            const customersGroups = await axios.get('CustomerCampaigns/' + PID + ',' + BID, config)
                .then(response => {
                    var LST = response.data['$values']
                    var json = JSON.stringify(this.cellCampaignList)

                    for (let i in LST) {
                        this.cellCampaignList.push(LST[i].name)
                        this.cellCampaignListID.push(LST[i].Id)

                    }

                    this.overlayOFF();
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_MESSAGE_GET_LIST_ALL: async function () {

            this.overlayON();

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            this.cellMessageList = []
            this.cellMessageListID = []

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            const customersGroups = await axios.get('CustomerMessages1/' + PID + ',' + BID, config)
                .then(response => {
                    var LST = response.data['$values']
                    var json = JSON.stringify(this.cellMessageList)

                    for (let i in LST) {
                        this.cellMessageList.push(LST[i].name)
                        this.cellMessageListID.push(LST[i].Id)
                    }

                    this.overlayOFF();
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_MESSAGE_GET_DESCR: async function (item) {

            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            alert(item)


            const customersGroups = await axios.get('CustomerMessages1/' + item, config)
                .then(response => {

                    this.overlayOFF();
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_GROUP_MEMBERS_GET_ALL: async function (groupID) {

            if (groupID == '') {
                return;
            }
            this.groupMembers = []
            this.groupMembersList = []
            // alert(groupID)

            this.overlayON();

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            // var gname = decodeURI(groupID)
            // alert(gname)

            const customersGroups = await axios.get('CustomerMembers/' + groupID, config)
                .then(response => {
                    this.serverItems1 = response.data['$values']
                    this.groupMembers = response.data['$values']

                    for (let i in this.groupMembers) {
                        this.groupMembersList.push('+' + this.groupMembers[i].countrycode + this.groupMembers[i].sms)

                    }
                    // console.log(this.groupMembers)

                    this.overlayOFF();
                })
                .catch(err => console.error(err));
        },

        CUSTOMER_GROUP_SAVE: async function () {

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

            await axios.post('CustomerGroup',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    groupID: this.groupID,
                    name: this.groupName,
                    descr: this.groupDescr,
                    crdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    tagger: ''

                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            //reload
                            this.CUSTOMER_GROUP_GET_ALL()

                            this.CUSTOMER_LOG_GET(this.customerID);


                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_GROUP_GET: async function (item) {

            this.overlayON();

            this.alertDelete = false
            this.groupID = item.groupId
            this.groupName = item.name
            this.groupDescr = item.descr

            var gName = item.name

            this.CUSTOMER_GROUP_MEMBERS_GET_ALL(gName)

            this.CUSTOMER_LOG_GET(this.customerID)


            this.overlayOFF();

        },

        CUSTOMER_CAMPAIGN_GET: async function (item) {

            this.overlayON();

            this.alertDelete = false
            this.campID = item.id
            this.campTitle = item.name
            this.cellGroup = item.groupId
            this.campaignStart = item.sDate
            this.campaignEnd = item.eDate
            this.campaignSms = item.sms
            this.campaignEmail = item.email
            this.campaignTelephone = item.call

            // var gName = item.name

            // this.CUSTOMER_GROUP_MEMBERS_GET_ALL(gName)
            this.CUSTOMER_GROUP_GET_LIST_ALL();
            // this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
            this.CUSTOMER_MESSAGE_GET_LIST_ALL();
            // this.CUSTOMER_GET_LIST_ALL();

            // this.CUSTOMER_LOG_GET(this.customerID)


            this.overlayOFF();
        },

        CUSTOMER_GROUP_DELETE: async function (id) {

            this.overlayON();

            this.alertSuccess = false
            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',

                }
            }
            // this.hide_alert();

            await axios.delete('CustomerGroup/' + this.deleteValue.groupId,
                {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken'),
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertDelete = true
                            //reload
                            // this.CUSTOMER_GROUP_GET_ALL();

                            this.serverItems.splice(this.editedIndex, 1)
                            this.closeDelete();
                            this.editModal = false;

                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_CAMPAIGN_DELETE: async function (item) {

            this.overlayON();

            // console.log(this.deleteValue)

            this.alertSuccess = false
            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',

                }
            }
            // this.hide_alert();

            await axios.delete('CustomerCampaigns/' + this.deleteValue.id,
                {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken'),
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertDelete = true
                            //reload
                            // this.CUSTOMER_CAMPAIGN_GET_ALL();
                            this.serverItems.splice(this.editedIndex, 1)
                            this.closeDelete();
                            this.editModal = false;

                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_CAMPAIGN_SAVE: async function () {

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

            await axios.post('CustomerCampaigns',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    Id: this.campID,
                    Name: this.campTitle,
                    Descr: this.msgText,
                    Crdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    Admin: window.localStorage.getItem('AFN'),
                    AdminId: window.localStorage.getItem('AID'),
                    GroupId: this.cellGroup,
                    SDate: this.campaignStart,
                    EDate: this.campaignEnd,
                    Sms: this.campaignSms,
                    Email: this.campaignEmail,
                    call: this.campaignTelephone,
                    tagger: ''

                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            //reload
                            this.CUSTOMER_CAMPAIGN_GET_ALL()

                            // this.CUSTOMER_LOG_GET(this.customerID);

                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_CAMPAIGN_GET_ALL: async function () {

            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.serverItems = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('CustomerCampaigns/' + PID + ',' + BID, config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.serverItems = response.data['$values']

                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));


            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        CUSTOMER_CAMPAIGN1_GET: async function (item) {

            this.overlayON();

            // alert(item)

            let config = {
                headers: {
                    'Accept': 'application/json',

                }
            }
            // this.hide_alert();

            if (item == '') {
                return;
            }

            await axios.get('CustomerCampaign1/' + item,
                {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken'),
                }, config)
                .then(
                    (response) => {
                        var json = response.data['$values']
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {

                            this.msgText = json[0]["descr"]
                            this.dwMessage = json[0]["descr"]

                            this.overlayOFF();
                        }
                    }
                )
                .catch((err) => {

                });

        },

        CUSTOMER_MESSAGE_GET_ALL: async function (item) {

            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.serverItems = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('CustomerMessages/' + PID + ',' + BID + ',' + item, config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.serverItems = response.data['$values']

                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));


            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        SMS_GET_ALL: async function (item) {
            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.allSMS = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('CustomerMessages/' + PID + ',' + BID + ',SMS', config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.allSMS = response.data['$values']
                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));

            // { text: 'Mensagens', icon: 'mdi-forum', to: 'message', descr: 'Mensagens', nr: '1.276', color: 'bg-purple-accent-4', dialog: 'Messages', class: 'justify-space-around pa-4 text-center bg-brown-lighten-3 text-h6 rounded-0' },
            // { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', nr: '1.276', color: 'bg-secondary', dialog: 'Chamadas', class: 'justify-space-around pa-4 text-center bg-deep-purple-lighten-4 text-h6 rounded-0' },
            // { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', nr: '1.276', color: 'bg-teal-darken-3', dialog: 'WhatsApp', class: 'justify-space-around pa-4 bg-teal-lighten-4 text-center text-h6 rounded-0' },
            // { text: 'E-mails', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', nr: '1.276', color: 'bg-primary', dialog: 'E-mail', class: 'justify-space-around pa-4 text-center bg-red-lighten-4 text-h6 rounded-0' }

            this.statsMenuC.push({ text: 'Mensagens', icon: 'mdi-forum', to: 'message', descr: 'Mensagens', nr: this.allSMS.length, color: 'bg-purple-accent-4', dialog: 'Messages', class: 'justify-space-around pa-4 text-center bg-brown-lighten-3 text-h6 rounded-0' })

            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        PHONE_GET_ALL: async function () {
            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.allPhone = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('CustomerMessages/' + PID + ',' + BID + ',Telefone', config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.allPhone = response.data['$values']
                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));

            // { text: 'Mensagens', icon: 'mdi-forum', to: 'message', descr: 'Mensagens', nr: '1.276', color: 'bg-purple-accent-4', dialog: 'Messages', class: 'justify-space-around pa-4 text-center bg-brown-lighten-3 text-h6 rounded-0' },
            // { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', nr: '1.276', color: 'bg-secondary', dialog: 'Chamadas', class: 'justify-space-around pa-4 text-center bg-deep-purple-lighten-4 text-h6 rounded-0' },
            // { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', nr: '1.276', color: 'bg-teal-darken-3', dialog: 'WhatsApp', class: 'justify-space-around pa-4 bg-teal-lighten-4 text-center text-h6 rounded-0' },
            // { text: 'E-mails', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', nr: '1.276', color: 'bg-primary', dialog: 'E-mail', class: 'justify-space-around pa-4 text-center bg-red-lighten-4 text-h6 rounded-0' }

            this.statsMenuC.push({ text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', nr: this.allPhone.length, color: 'bg-secondary', dialog: 'Chamadas', class: 'justify-space-around pa-4 text-center bg-deep-purple-lighten-4 text-h6 rounded-0' })


            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        WHATSAPP_GET_ALL: async function () {
            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.allWhatsApp = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('CustomerMessages/' + PID + ',' + BID + ',WhatsApp', config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.allWhatsApp = response.data['$values']
                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));


            // { text: 'Mensagens', icon: 'mdi-forum', to: 'message', descr: 'Mensagens', nr: '1.276', color: 'bg-purple-accent-4', dialog: 'Messages', class: 'justify-space-around pa-4 text-center bg-brown-lighten-3 text-h6 rounded-0' },
            // { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', nr: '1.276', color: 'bg-secondary', dialog: 'Chamadas', class: 'justify-space-around pa-4 text-center bg-deep-purple-lighten-4 text-h6 rounded-0' },
            // { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', nr: '1.276', color: 'bg-teal-darken-3', dialog: 'WhatsApp', class: 'justify-space-around pa-4 bg-teal-lighten-4 text-center text-h6 rounded-0' },
            // { text: 'E-mails', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', nr: '1.276', color: 'bg-primary', dialog: 'E-mail', class: 'justify-space-around pa-4 text-center bg-red-lighten-4 text-h6 rounded-0' }

            this.statsMenuC.push({ text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', nr: this.allWhatsApp.length, color: 'bg-teal-darken-3', dialog: 'WhatsApp', class: 'justify-space-around pa-4 bg-teal-lighten-4 text-center text-h6 rounded-0' })


            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        EMAIL_GET_ALL: async function () {
            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.allEmail = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('CustomerMessages/' + PID + ',' + BID + ',E-mail', config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.allEmail = response.data['$values']
                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));

            // { text: 'Mensagens', icon: 'mdi-forum', to: 'message', descr: 'Mensagens', nr: '1.276', color: 'bg-purple-accent-4', dialog: 'Messages', class: 'justify-space-around pa-4 text-center bg-brown-lighten-3 text-h6 rounded-0' },
            // { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', nr: '1.276', color: 'bg-secondary', dialog: 'Chamadas', class: 'justify-space-around pa-4 text-center bg-deep-purple-lighten-4 text-h6 rounded-0' },
            // { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', nr: '1.276', color: 'bg-teal-darken-3', dialog: 'WhatsApp', class: 'justify-space-around pa-4 bg-teal-lighten-4 text-center text-h6 rounded-0' },
            // { text: 'E-mails', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', nr: '1.276', color: 'bg-primary', dialog: 'E-mail', class: 'justify-space-around pa-4 text-center bg-red-lighten-4 text-h6 rounded-0' }

            this.statsMenuC.push({ text: 'E-mails', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', nr: this.allEmail.length, color: 'bg-primary', dialog: 'E-mail', class: 'justify-space-around pa-4 text-center bg-red-lighten-4 text-h6 rounded-0' })


            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        CONTACTS_GET_ALL: async function () {
            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.allContacts = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('Customer/' + PID + ',' + BID, config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.allContacts = response.data['$values']
                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));
            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        CUSTOMER_MESSAGE_GET: async function (item) {
            this.overlayON();

            // console.log(item)

            this.alertDelete = false
            this.msgID = item.id
            this.msgTitle = item.name
            this.msgText = item.descr
            this.msgCategory = item.cat
            // var gName = item.name

            // this.CUSTOMER_GROUP_MEMBERS_GET_ALL(gName)

            // this.CUSTOMER_LOG_GET(this.customerID)
            this.CUSTOMER_GROUP_GET_LIST_ALL();

            this.overlayOFF();

        },

        CUSTOMER_MESSAGE1_GET: async function (item) {


            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',

                }
            }
            // this.hide_alert();


            if (item == '') {
                return;
            }

            await axios.get('CustomerMessages1/' + item,
                {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken'),
                }, config)
                .then(
                    (response) => {
                        var json = response.data['$values']
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {

                            this.overlayOFF();

                            this.msgText = json[0]["descr"]
                            this.dwMessage = json[0]["descr"]

                        }
                    }
                )
                .catch((err) => {

                });

        },

        CUSTOMER_MESSAGE_DELETE: async function (item) {
            this.overlayON();

            // console.log(this.deleteValue)

            this.alertSuccess = false
            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',

                }
            }
            // this.hide_alert();

            await axios.delete('CustomerMessages/' + this.deleteValue.id,
                {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken'),
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertDelete = true
                            //reload
                            // this.CUSTOMER_CAMPAIGN_GET_ALL();
                            this.serverItems.splice(this.editedIndex, 1)
                            this.closeDelete();
                            this.editModal = false;
                        }

                        this.overlayOFF();
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_MESSAGE_SAVE: async function () {
            this.overlayON();

            var msg = parseInt(window.localStorage.getItem('MSC'))
            if (msg <= 0) {
                this.alertSuccess = false;
                this.noMsgCredit = true;
                return;
            }

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

            await axios.post('CustomerMessages',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    ID: this.msgID,
                    name: this.msgTitle,
                    descr: this.msgText,
                    crdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    mdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    cat: this.msgCategory,
                    stat: 'new',
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    tagger: ''

                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            //reload
                            this.CUSTOMER_MESSAGE_GET_ALL(this.itemValue)

                            // this.CUSTOMER_LOG_GET(this.customerID);
                        }
                        this.overlayOFF();
                    }
                )
                .catch((err) => {

                });
        },

        SMS_SEND: async function () {
            this.overlayON();
            var msg = parseInt(window.localStorage.getItem('MSC'))
            if (msg <= 0) {
                this.alertSuccess = false;
                this.noMsgCredit = true;
                return;
            }

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

            let ADDRESS;

            if (this.dWingsMode == 'Singular') {
                if (this.dwSms != null) {
                    this.dwContact = this.dwSms
                }
                if (this.dwWhatsApp != null) {
                    this.dwContact = this.dwWhatsApp
                }

                if (this.dwSms[1] == undefined | this.dwMessage == '') {
                    return;
                }

                ADDRESS = this.dwSms[1];
            }
            else if (this.dWingsMode == 'Múltiplos') {

                ADDRESS = this.groupMembersList.toString();
            }

            await axios.post('Twilio',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    ID: this.dwID,
                    Dest: ADDRESS,
                    message1: this.dwMessage,
                    IP: this.dwCategory,
                    crdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    ADMIN: window.localStorage.getItem('username'),
                    MsgCredit: window.localStorage.getItem('MSC')
                }, config)
                .then(
                    (response) => {

                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {

                            if (msg > 0) {
                                let x = parseInt(window.localStorage.getItem('MSC')) - 1;
                                window.localStorage.setItem('MSC', x)
                            }
                            this.alertSuccess = true,
                                this.msgCounter = response.data,
                                this.messageCounter = response.data,

                                this.CUSTOMER_MESSAGE_HISTORY_SAVE();

                            location.reload();
                            this.overlayOFF();

                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_MESSAGE_HISTORY_SAVE: async function () {

            var msg = parseInt(this.msgCounter)
            if (msg <= 0) {
                this.alertSuccess = false;
                this.noMsgCredit = true;
                return;
            }

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

            // alert(this.dwSms)

            let ADDRESS;
            let MESSAGE;

            if (this.dWingsMode == 'Singular') {
                if (this.dwSms != null) {
                    this.dwContact = this.dwSms
                }
                if (this.dwWhatsApp != null) {
                    this.dwContact = this.dwWhatsApp
                }

                if (this.dwSms[1] == undefined | this.dwMessage == '') {
                    return;
                }

                ADDRESS = this.dwSms[1];
                MESSAGE = this.dwMessage;
            }
            else if (this.dWingsMode == 'Múltiplos') {

                ADDRESS = this.groupMembersList.toString();
                MESSAGE = this.dwCampaign;
            }

            // if (this.dwSms[1] == undefined | this.dwMessage == '') {
            //   return;
            // }

            await axios.post('CustomerMessageHistory',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    ID: this.dwID,
                    name: this.dwTitle,
                    descr: MESSAGE,
                    dest: ADDRESS,
                    crdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    mdate: today.toLocaleDateString('pt-pt', { year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    sdate: this.dwDate,
                    stime: this.dwTime,
                    cat: this.dwCategory,
                    stat: this.dwStat,
                    campaign: this.dwCampaign,
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    tagger: ''

                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            //reload
                            // this.CUSTOMER_MESSAGE_GET_ALL(this.itemValue)
                            this.CUSTOMER_MESSAGE_HISTORY_GET_ALL();
                            this.KPI_GET_ALL();

                            // this.CUSTOMER_LOG_GET(this.customerID);

                            messageCounter = window.localStorage.getItem('MSC')
                            msgCounter = window.localStorage.getItem('MSC')
                        }
                    }
                )
                .catch((err) => {

                });
        },


        CUSTOMER_MESSAGE_HISTORY_GET_ALL: async function () {
            this.overlayON();

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.serverItems = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('CustomerMessageHistory/' + PID + ',' + BID, config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.serverItems = response.data['$values']
                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));


            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        KPI_GET_ALL: async function () {

            this.overlayON();
            useModule.dialog = 'dWings'

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                }
            }

            this.topKPI = []

            var PID = window.localStorage.getItem('PID')
            var BID = window.localStorage.getItem('BID')

            const customers = await axios.get('CustomerMessageHistory/' + PID + ',' + BID, config)
                .then(response => {
                    // = response.data
                    this.loading = true
                    this.topKPI = response.data['$values']

                    this.overlayOFF();
                })
                // .then(data => console.log(data))
                .catch(err => console.error(err));


            setTimeout(() => {
                this.alertSuccess = false
            }, (5000));

        },

        CUSTOMER_MESSAGE_HISTORY_GET: async function (item) {

            // console.log(item)
            this.CUSTOMER_GROUP_GET_LIST_ALL();
            this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
            this.CUSTOMER_MESSAGE_GET_LIST_ALL();
            // this.CUSTOMER_GET_LIST_ALL();

            this.alertDelete = false
            this.dwID = item.id,
                this.dwStat = item.stat,
                this.dwMode = item.mode,
                this.dwCategory = item.cat,
                this.dwGroup = item.groupID,
                this.dwDate = item.sdate,
                this.dwTime = item.stime,
                this.dwCampaign = item.campaign,
                this.dwMessage = item.descr,

                this.dwContact = item.contact,
                this.dwSms = item.sms,
                this.dwPhone = item.phone,
                this.dwWhatsApp = item.whatsapp,
                this.dwEmail = item.email,
                this.dwTitle = item.name,

                // var gName = item.name

                // this.CUSTOMER_GROUP_MEMBERS_GET_ALL(gName)

                // this.CUSTOMER_LOG_GET(this.customerID)


                this.CUSTOMER_MESSAGE_HISTORY_GET_ALL();


            // this.CUSTOMER_GET_LIST_ALL();

        },

        ACCOUNT_DUPLICATE: function () {
            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            this.customerID = NOW
        },

        CUSTOMER_DELETE_MULTIPLE: async function () {

            for (let item in this.selected) {
                this.CUSTOMER_DELETE(this.selected[item].id)
                this.serverItems.splice(item, 1)
            }
            this.CUSTOMER_GET_ALL();
            this.selected = null;
            return;

            this.alertSuccess = false
            this.alertDelete = false

            let config = {
                headers: {
                    'Accept': 'application/json',

                }
            }
            // this.hide_alert();

            await axios.delete('Customer/' + id,
                {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken'),
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertDelete = true
                            //reload
                            this.CUSTOMER_GET_ALL();
                            this.closeDelete();
                            this.editModal = false;
                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_SAVE: async function () {


            this.alertSuccess = false
            this.alertDelete = false

            // this.$refs.$reset()

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + + window.localStorage.getItem('JwtToken')
                }
            }

            // var firstName = document.getElementById('FN').value
            // var lastName = document.getElementById('LN').value
            // var cellphone = document.getElementById('cellphone').value
            // var cellSMS = document.getElementById('cellSMS').value
            // var cellEmail = document.getElementById('cellEmail').value
            // var cellWhatsApp = document.getElementById('cellWhatsApp').value
            // var cellAge = document.getElementById('cellAge').value


            // firstName = document.getElementById('FN').value
            // lastName = document.getElementById('LN').value
            // cellphone = document.getElementById('cellphone').value
            // cellSMS = document.getElementById('cellSMS').value
            // cellEmail = document.getElementById('cellEmail').value
            // cellWhatsApp = document.getElementById('cellWhatsApp').value
            // cellAge = document.getElementById('cellAge').value
            // // var cellGroup = document.getElementById('cellGroup').innerHTML
            // var cellFlex = document.getElementById('cellFlex').innerHTML

            // alert(firstName)

            var RL = null;
            var CM = null;
            var LK = null;
            var GR = null;

            // if (this.cellRole != null) {
            //   RL = this.cellRole.join(', ')
            // }

            // if (this.cellCampaign != null) {
            //   CM = this.cellCampaign.join(', ')
            // }

            // if (this.cellLikes != null) {
            //   LK = this.cellLikes.join(', ')
            // }

            // if (this.cellGroup != null) {
            //   GR = this.cellGroup.join(', ')
            // }


            // alert(lastName)
            // return;
            this.hide_alert();

            await axios.post('Customer',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    ID: this.customerID,
                    name: this.firstName,
                    surname: this.lastName,
                    fullname: this.firstName + ' ' + this.lastName,
                    cell: this.cellphone,
                    email: this.cellEmail,
                    sms: this.cellSMS,
                    whatsapp: this.cellWhatsApp,
                    dob: this.cellAge,
                    groupId: this.cellGroup,
                    Role: this.cellRole,
                    Campaign: this.cellCampaign,
                    Likes: this.cellLikes,
                    countrycode: this.countrycode
                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            //reload
                            this.CUSTOMER_GET_ALL()
                        }
                    }
                )
                .catch((err) => {

                });
        },

        CUSTOMER_LOG_SAVE: async function (tasking) {

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
            var DATE_TIME = year + '-' + month + '-' + day + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

            await axios.post('CustomerLog',
                {
                    partnerID: window.localStorage.getItem('PID'),
                    branch: window.localStorage.getItem('BID'),
                    customerID: this.customerID,
                    ID: NOW,
                    crdate: today.toLocaleDateString('pt-pt', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) + ' - ' + today.toLocaleTimeString('pt-pt'),
                    task: tasking,
                    admin: window.localStorage.getItem('AFN'),
                    adminID: window.localStorage.getItem('AID'),
                    tagger: window.localStorage.getItem('BID')

                }, config)
                .then(
                    (response) => {
                        if (response.request.status == '400') {

                        }
                        if (response.request.status == '200') {
                            this.alertSuccess = true

                            //reload
                            this.CUSTOMER_GET_ALL()

                            this.CUSTOMER_LOG_GET(this.customerID);
                        }
                    }
                )
                .catch((err) => {

                });
        },

        GoPlayNew() {
            this.isEditing = true
            this.alertDelete = false;
            this.firstName = null

            this.dwID = ''
            this.dwMode = ''
            this.dwCategory = 'SMS'
            this.dwGroup = ''
            this.dwDate = ''
            this.dwTime = ''
            this.dwCampaign = ''

            this.dwMessage = ''
            this.dwStat = 'Novo'

            this.dwContact = ''
            this.dwSms = ''
            this.dwPhone = ''
            this.dwWhatsApp = ''
            this.dwEmail = ''
            this.dwTitle = ''

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            this.dwID = NOW;
            this.CUSTOMER_GROUP_GET_LIST_ALL();
            this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
            this.CUSTOMER_MESSAGE_GET_LIST_ALL();
            this.CUSTOMER_GET_LIST_ALL();
        },

        CustomerNew() {

            this.alertDelete = false;
            this.firstName = null
            this.lastName = null
            this.cellphone = null
            this.cellSMS = null
            this.cellEmail = null
            this.cellWhatsApp = null
            this.cellAge = null
            this.cellLikes = null
            this.cellCampaign = null
            this.cellRole = null
            this.cellGroup = null

            this.dwID = null
            this.dwStat = null
            this.dwMode = null
            this.dwCategory = null
            this.dwGroup = null
            this.dwDate = null
            this.dwTime = null
            this.dwCampaign = null
            this.dwMessage = null

            this.dwContact = null
            this.dwSms = null
            this.dwPhone = null
            this.dwWhatsApp = null
            this.dwEmail = null
            this.dwTitle = null

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            this.customerID = NOW
            this.groupID = NOW
            this.campID = NOW
            this.msgID = NOW
            this.dwID = NOW
            this.msgTitle = useModule.name

            if (this.isEditing == false) {
                this.isEditing = true
                this.btnEdit = false
                this.btnDelete = false
            }
            //this.CUSTOMER_GROUP_GET_LIST_ALL();
            // this.CUSTOMER_MESSAGE_GET_LIST_ALL();
            // this.CUSTOMER_GET_LIST_ALL();

            // this.CUSTOMER_GROUP_GET_LIST_ALL();
            // this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
            // this.CUSTOMER_GET_LIST_ALL();
        },

        GroupNew() {
            this.groupID = null; // GID
            this.groupName = null; //GN
            this.groupDescr = null; //GD
            this.serverItems1 = [];
            // this.alertDelete = false;
            // this.firstName = null
            // this.lastName = null
            // this.cellphone = null
            // this.cellSMS = null
            // this.cellEmail = null
            // this.cellWhatsApp = null
            // this.cellAge = null
            // this.cellLikes = null
            // this.cellCampaign = null
            // this.cellRole = null
            // this.cellGroup = null

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            this.groupID = NOW
            if (this.isEditing == false) {
                this.isEditing = true
                this.btnEdit = false
                this.btnDelete = false
            }
        },

        CampaingNew() {

            this.alertDelete = false;
            this.firstName = null
            this.lastName = null
            this.cellphone = null
            this.cellSMS = null
            this.cellEmail = null
            this.cellWhatsApp = null
            this.cellAge = null
            this.cellLikes = null
            this.cellCampaign = null
            this.cellRole = null
            this.cellGroup = null

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            this.customerID = NOW
            this.groupID = NOW
            if (this.isEditing == false) {
                this.isEditing = true
                this.btnEdit = false
                this.btnDelete = false
            }
            //this.CUSTOMER_GROUP_GET_LIST_ALL();
        },

        MessageNew() {

            this.alertDelete = false;
            this.msgTitle = ''
            this.msgCategory = ''
            this.msgText = ''

            var today = new Date();
            var year = today.getFullYear();
            var month = (today.getMonth() + 1)
            var day = today.getDate()
            var time = today.getHours() + today.getMinutes() + today.getSeconds();
            var NOW = year + '' + month + '' + day + '' + time
            this.customerID = NOW
            this.msgID = NOW
            if (this.isEditing == false) {
                this.isEditing = true
                this.btnEdit = false
                this.btnDelete = false
            }
            // this.CUSTOMER_GROUP_GET_LIST_ALL();
        },

        handleSubmit() {

        },

        viewItemData() {
            alert(this.cellContactListID);
        },
        async validate() {

            const { valid } = await this.$refs.form.validate()

            if (valid) alert('Form is valid')
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        reset() {
            // this.$refs.form.reset()
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        submit: function () {
            alert(true)
            this.$refs.form.$el.submit();
        },
        returnURL: function (page) {
            var returnUrl = window.location.href
            var goToPage = returnUrl.split('=')
            if (window.location.href.includes('returnUrl')) {
                window.location = goToPage[1]
            }
            else {
                window.location = page
            }
        },

        mergeProps,

        beforeOpen(event) {
            alert('Opening...')
        },

        SUBMIT_DATA: function () {

            if (useModule.dialog == 'Contacts') {
                //LOGIN
                var firstName1 = document.getElementById('FN').value
                var lastName1 = document.getElementById('LN').value


                // if (firstName1.trim() === '')
                // {
                //   alert(true)
                // }

                if ((firstName1 == '' | lastName1 == '')) {
                    this.ActEmpty = true
                    this.isFormValid = false
                    return
                }
                else {
                    this.ActEmpty = false
                    this.isOkToSubmit = true
                }
                this.CUSTOMER_SAVE();

                //LOG
                this.CUSTOMER_LOG_SAVE('Actualizar informações do cliente');
            }
            else if (useModule.dialog == 'Groups') {

                //LOGIN
                var firstName1 = document.getElementById('GN').value
                var lastName1 = document.getElementById('GD').value

                if ((firstName1 == '' | lastName1 == '')) {
                    this.ActEmpty = true
                    this.isFormValid = false
                    return
                }
                else {
                    this.ActEmpty = false
                    this.isOkToSubmit = true
                }
                this.CUSTOMER_GROUP_SAVE();
            }
            else if (useModule.dialog == 'Campaigns') {

                //LOGIN
                var firstName1 = document.getElementById('CT').value
                var lastName1 = document.getElementById('CG').value

                // if ((firstName1 == '' | lastName1 == '')) {
                //   this.ActEmpty = true
                //   this.isFormValid = false
                //   return
                // }
                // else {
                //   this.ActEmpty = false
                //   this.isOkToSubmit = true
                // }
                this.CUSTOMER_CAMPAIGN_SAVE();
            }
            else if (useModule.dialog == 'Messages' | useModule.dialog == 'Chamadas' | useModule.dialog == 'WhatsApp' | useModule.dialog == 'E-mail') {

                //LOGIN
                var firstName1 = this.msgCategory
                var lastName1 = this.msgTitle

                // if ((firstName1 == '' | lastName1 == '')) {
                //   this.ActEmpty = true
                //   this.isFormValid = false
                //   return
                // }
                // else {
                //   this.ActEmpty = false
                //   this.isOkToSubmit = true
                // }
                this.CUSTOMER_MESSAGE_SAVE();
            }
            else if (useModule.dialog == 'dWings') {

                //LOGIN
                var firstName1 = this.msgCategory
                var lastName1 = this.msgTitle

                // if ((firstName1 == '' | lastName1 == '')) {
                //   this.ActEmpty = true
                //   this.isFormValid = false
                //   return
                // }
                // else {
                //   this.ActEmpty = false
                //   this.isOkToSubmit = true
                // }
                this.CUSTOMER_MESSAGE_HISTORY_SAVE();
            }
        },
        // getGraph: function () {
        //   new Chart(ctx, {
        //     type: 'bar',
        //     data: {
        //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //       datasets: [{
        //         label: '# of Votes',
        //         data: [12, 19, 3, 5, 2, 3],
        //         borderWidth: 1
        //       }]
        //     },
        //     options: {
        //       scales: {
        //         y: {
        //           beginAtZero: true
        //         }
        //       }
        //     }
        //   })
        // },
        onclose: function () {
            this.firstNameX = '',
                this.lastNameX = ''
            this.ActEmpty = false
            this.alertSuccess = false
        },
        checkInput: function () {
            if (this.modName == 'Contacts') {
                this.isOkToSubmit = this.firstName && this.lastName
            }
            else if (this.modName == 'Groups') {
                this.isOkToSubmit = this.firstName && this.lastName
            }
            else if (useModule.dialog == 'Campaings') {
                this.isOkToSubmit = this.firstName && this.lastName
            }
            else if (useModule.dialog == 'Messages' | useModule.dialog == 'Chamadas' | useModule.dialog == 'WhatsApp' | useModule.dialog == 'E-mail') {
                this.isOkToSubmit = this.firstName && this.lastName
            }
            else if (useModule.dialog == 'Histórico') {
                this.isOkToSubmit = this.firstName && this.lastName
            }
            else if (useModule.dialog == 'Contas') {
                this.isOkToSubmit = this.firstName && this.lastName
            }
            else if (useModule.dialog == 'Settings') {
                this.isOkToSubmit = this.firstName && this.lastName
            }
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
        handleClick: function (event) {
            this.isActiveBtn = !this.isActiveBtn;
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
        hide_alert: function (event) {

            var closeAlert = window.setInterval(() => {
                this.alert = false;
                // this.isOkToSubmit = false;
                // this.firstName = '';
                // this.lastName = '';
                self.alertModal = false;
                clearInterval(closeAlert);
            }, 1000);

            // setTimeout(() => {
            this.alertSuccess = true

            // }, 15000)
        },
        closeModal: function () {
            var self = this;
            self.alertModal = true;
            setTimeout(function () {
                self.alertModal = false;
            }, 5 * 1000);
        },
        openDialog: function (item) {

            this.itemValue = item.dialog;
            this.CUSTOMER_GROUP_GET_LIST_ALL();
            this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
            this.CUSTOMER_MESSAGE_GET_LIST_ALL();
            this.CUSTOMER_GET_LIST_ALL();


            if (item.dialog == 'Contacts') {
                this.CUSTOMER_GET_ALL();
            }
            if (item.dialog == 'Groups') {
                this.CUSTOMER_GROUP_GET_ALL();
            }
            if (item.dialog == 'Campaigns') {
                this.CUSTOMER_CAMPAIGN_GET_ALL();

                // this.CUSTOMER_GROUP_GET_LIST_ALL();
                this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
                this.CUSTOMER_MESSAGE_GET_LIST_ALL();
                // this.CUSTOMER_GET_LIST_ALL();
            }
            if (item.dialog == 'Messages' | item.dialog == 'Chamadas' | item.dialog == 'WhatsApp' | item.dialog == 'E-mail') {
                this.CUSTOMER_MESSAGE_GET_ALL(item.dialog);
                this.CUSTOMER_GROUP_GET_LIST_ALL();
            }
            if (item.dialog == 'dWings') {

                this.CUSTOMER_GROUP_GET_LIST_ALL();
                this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
                this.CUSTOMER_MESSAGE_GET_LIST_ALL();
                this.CUSTOMER_GET_LIST_ALL();
            }

            // localStorage.setItem('module', item.dialog)
            // $modNameX = localStorage.module
            //useModule = item.dialog



            // if (document.getElementById('CID').style.display == "block")
            // {
            // document.getElementById('CID').innerHTML = NOW
            // }


            // this.$set(this.modName, item.dialog);
            //useModule = item.dialog

            // this.$store.commit(item.dialog)
            // app.config.globalProperties.$modNameX = localStorage.module;
            //useModule = item;

            // document.getElementById('MID').innerText = item.dialog
            // console.log(app.config.globalProperties.$modNameX)
        },

        openViewDialog: function (item) {

            this.itemValue = item.dialog;
            this.search = null;

            if (item.dialog == 'Contacts') {
                this.CUSTOMER_GET_ALL();
            }
            if (item.dialog == 'Groups') {
                this.CUSTOMER_GROUP_GET_ALL();
            }
            if (item.dialog == 'Campaigns') {
                this.CUSTOMER_CAMPAIGN_GET_ALL();

                // this.CUSTOMER_GROUP_GET_LIST_ALL();
                // this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
                // this.CUSTOMER_MESSAGE_GET_LIST_ALL();
                // this.CUSTOMER_GET_LIST_ALL();
            }
            if (item.dialog == 'Messages' | item.dialog == 'Chamadas' | item.dialog == 'WhatsApp' | item.dialog == 'E-mail') {
                this.CUSTOMER_MESSAGE_GET_ALL(item.dialog);
            }
            if (item.dialog == 'Histórico') {
                this.CUSTOMER_MESSAGE_HISTORY_GET_ALL();
            }
            if (item.dialog == 'dWings') {
                this.CUSTOMER_MESSAGE_HISTORY_GET_ALL();
            }
        },

        openEditDialog: function (item) {

            this.itemValue = item.dialog;

            if (item.dialog == 'Contacts') {
                this.CUSTOMER_GET_ALL();
            }
            if (item.dialog == 'Groups') {
                this.CUSTOMER_GROUP_GET_ALL();
            }
            if (item.dialog == 'Campaigns') {
                this.CUSTOMER_CAMPAIGN_GET_ALL();
            }
            if (item.dialog == 'Messages' | item.dialog == 'Chamadas' | item.dialog == 'WhatsApp' | item.dialog == 'E-mail') {
                this.CUSTOMER_MESSAGE_GET_ALL(item.dialog);
                this.CUSTOMER_GROUP_GET_LIST_ALL();
            }
            if (item.dialog == 'dWings') {

                this.CUSTOMER_GROUP_GET_LIST_ALL();
                this.CUSTOMER_CAMPAIGN_GET_LIST_ALL();
                this.CUSTOMER_MESSAGE_GET_LIST_ALL();
                // this.CUSTOMER_GET_LIST_ALL();
            }
        },
    },

    validations() {
        return {
            firstName: { required },
            lastName: { required }
        }
    }
}
</script>

<style>
@import 'vuetify/dist/vuetify.min.css';
</style>

<style>
.v-theme--light {
    /* background-color: blue !important; */
    --v-hover-opacity: 0.2;
    --v-theme-overlay-multiplier: 4;
    -o-animation:ease-in-out;
}
/* .activateBtn {} */

.v-label {
    font-size: small;
}

/*
.v-icon {
  font-size: small;
} */

.v-card-subtitle {
    font-size: small;
}

/*
.v-btn {
  font-size: small;
} */

.v-text-field {
    font-size: small;
}

.v-icon {
    font-size: 20px;
}

.v-btn {
    font-size: 14px;
    font-weight: 500;
}
</style>
