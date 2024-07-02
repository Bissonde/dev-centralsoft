<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>


  <v-form ref="form" fast-fail @submit.prevent="SUBMIT_DATA">

    <div v-show="true" bg-color="white"></div>

    <v-app :theme="theme">
      <v-app-bar flat class="border-b" density="compact" style="border-top:5px solid darkorange">
        <!-- <v-app-bar density="compact" prominent> -->
        <template v-slot:prepend>
          <v-app-bar-nav-icon variant="text" class="text-h5" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title v-if="devType == 'Desktop'">
          <v-icon icon="mdi-view-grid" size="large" start />
          <b>Central Soft</b></v-app-bar-title>

        <v-spacer></v-spacer>
        <v-divider v-if="devType == 'Desktop'" vertical class="mx-1"></v-divider>
        <v-toolbar-items fixed>
          <v-btn v-if="devType == 'Desktop'">Dashboard</v-btn>
          <v-btn v-if="devType == 'Desktop'">Settings</v-btn>
          <v-btn v-if="devType != 'Desktop'" icon="mdi-chart"></v-btn>
          <v-btn v-if="devType != 'Desktop'" icon="mdi-cog"></v-btn>
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
                <v-list-item v-on:click="logOff()" prepend-icon="mdi-power">Terminar Sessão</v-list-item>
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

          <v-list-item prepend-icon="mdi-account" class="text-subtitle-1" to="/accounts">Accounts</v-list-item>
          <v-list-item prepend-icon="mdi-account-group" class="text-subtitle-1" to="/groups">Groups</v-list-item>

          <v-list-group value="Users" class="text-subtitle-1">
            <template #activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-account" title="Clients"></v-list-item>
            </template>
            <v-list-item prepend-icon="mdi-chart-bar" class="text-subtitle-1" to="/reports">Report</v-list-item>
            <v-list-item prepend-icon="mdi-currency-usd" class="text-subtitle-1" to="/cashflow">Cashflow</v-list-item>
            <!-- </v-list-group> v-for="n in items" :key="n" v-slot="{}"> -->

          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <!--
    <v-slide-group-item v-for="n in items" :key="n" v-slot="{ isSelected, toggle }">
        <v-list :items="items">
          <v-icon>{{ items.title }}</v-icon>
        </v-list>
      </v-slide-group-item> -->

      <!-- <div class="text-center"> -->


      <!-- <div class="py-3"></div> -->

      <!-- <code class="text-subtitle-1">.{{ model }}</code> -->
      <!-- </div> -->

      <v-main style="background-color: #fff;">
        <!-- <v-container style="background-color: white;"> -->
        <v-container class="mx-auto mb-0 py-0" elevation="12" fluid style="width: 100%">


          <!-- <br> -->
          <!-- <v-sheet class="pa-4 pb-4 pt-0" elevation="12" height="auto" width="100%">
          <v-row>
            <v-col>
              <v-text-field hide-details prepend-icon="mdi-magnify"
                label="Procurar..." single-line></v-text-field>
            </v-col>
          </v-row>
        </v-sheet> -->

          <!-- <v-divider class="mb-2"></v-divider> -->

          <v-sheet class="pa-0 mt-1 pb-1 mb-1" elevation="10" height="auto" width="100%">
            <!-- <template v-slot:prepend>
              <v-icon color="primary">
                mdi-dots-grid
              </v-icon>
            </template> -->
            <!-- <v-spacer></v-spacer> -->



            <!-- <v-row>
              <v-col cols="8">

              </v-col>
              <v-col cols="3">
                <v-btn variant="text" @click="openDialog(n); viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-dots-grid
                  </v-icon>
                </v-btn>

                <v-btn variant="text" @click="openDialog(n); viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-weather-night
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row> -->

            <v-row class="mt-0 pt-0">
              <v-col cols="8" v-if="devType == 'Desktop'">
                <!-- <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon>mdi-finance</v-icon>&nbsp;Estatísticas</h1> -->
                <v-btn variant="text" v-on:click="moduleStore.setModule(topMenus[0]);" v-model="useModule.name"
                  @click="openDialog(n); viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-chart-box-outline
                  </v-icon>
                  &nbsp;Ver Relatórios
                </v-btn>
                <v-btn variant="text" v-on:click="moduleStore.setModule(topMenus[1]);" v-model="useModule.name"
                  @click="openDialog(n); viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-account-switch
                  </v-icon>
                  &nbsp;Sessões
                </v-btn>
                <v-btn variant="text" v-on:click="moduleStore.setModule(topMenus[2]);" v-model="useModule.name"
                  @click="openDialog(n); viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-cog
                  </v-icon>
                  &nbsp;Configurações
                </v-btn>
              </v-col>
              <v-col cols="12" v-if="devType != 'Desktop'">
                <!-- <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon>mdi-finance</v-icon>&nbsp;Estatísticas</h1> -->
                <v-btn variant="text" density="compact" style="min-width:0"
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
              <v-col v-if="devType == 'Desktop'">
                <v-btn variant="text" @click="isDark();">
                  <!-- <v-icon color="orange-darken" end>
                      mdi-plus-circle
                    </v-icon> -->
                  <v-icon color="primary">
                    mdi-weather-night
                  </v-icon>
                </v-btn>
                <v-btn variant="text" @click="openDialog(n); viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-translate
                  </v-icon>
                </v-btn>
                <v-btn variant="text" @click="openDialog(n); viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-battery-charging-90
                  </v-icon>
                  &nbsp;{{ messageCounter }}
                </v-btn>

              </v-col>
            </v-row>


          </v-sheet>

          <v-sheet class="pa-4 pb-10" elevation="12" height="auto" width="100%">

            <v-row v-if="devType == 'Desktop'">
              <v-col cols="9">
                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                    class="text-h3">mdi-chart-bubble</v-icon>&nbsp;Dashboard
                </h1>
                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;
                  22/05/2023</i>
              </v-col>
              <v-col>
                <!-- <v-btn variant="text" class="float-sm-right pa-0 ma-0 w-0" @click="viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-open-in-new
                  </v-icon>
                  &nbsp;
                </v-btn>
                &nbsp;
                <v-btn variant="text" class="float-sm-right pa-0 ma-0 w-0" @click="filterModal = !filterModal">
                  <v-icon color="primary">
                    mdi-filter
                  </v-icon>
                  &nbsp;
                </v-btn> -->
                <v-btn color="purple-darken-4" variant="tonal" class="float-sm-right"
                  @click="goPlayModal = !goPlayModal; GoPlayNew();">
                  <v-icon>
                    mdi-plus-circle
                  </v-icon>&nbsp;D-Wings
                  &nbsp;
                </v-btn>
                <!-- <v-btn color="purple-darken-4" variant="tonal" class="float-sm-right"
                  @click="goPlayModal = !goPlayModal; GoPlayNew();">
                  <v-icon>
                    mdi-plus-circle
                  </v-icon>
                  &nbsp;
                </v-btn> -->
                <!-- <v-btn color="purple-darken-4" variant="tonal" class="float-sm-right"
                  @click="goPlayModal = !goPlayModal" @click.stop="GoPlayNew()">
                  <v-icon>
                    mdi-plus-circle
                  </v-icon>&nbsp;D-Wings
                  &nbsp;
                </v-btn> -->
                &nbsp;
              </v-col>
            </v-row>
            <v-row v-if="devType != 'Desktop'">
              <v-col cols="9">
                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                    class="text-h3">mdi-chart-bubble</v-icon>&nbsp;Dashboard
                </h1>
                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;
                  22/05/2023</i>
              </v-col>
              <v-col>
                <!-- <v-btn variant="text" class="float-sm-right pa-0 ma-0 w-0" @click="viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-open-in-new
                  </v-icon>
                  &nbsp;
                </v-btn>
                &nbsp;
                <v-btn variant="text" class="float-sm-right pa-0 ma-0 w-0" @click="filterModal = !filterModal">
                  <v-icon color="primary">
                    mdi-filter
                  </v-icon>
                  &nbsp;
                </v-btn> -->
                <v-btn color="purple-darken-4" variant="text" class="float-sm-center pr-0" density="default"
                  @click="goPlayModal = !goPlayModal; GoPlayNew();" icon="mdi-plus-circle">
                </v-btn>
                <!-- <v-btn icon="mdi-open-in-new"></v-btn> -->
                <!-- <v-btn color="purple-darken-4" variant="tonal" class="float-sm-right"
                  @click="goPlayModal = !goPlayModal" @click.stop="GoPlayNew()">
                  <v-icon>
                    mdi-plus-circle
                  </v-icon>&nbsp;D-Wings
                  &nbsp;
                </v-btn> -->
                &nbsp;
              </v-col>
            </v-row>
            <v-divider class="mb-6"></v-divider>


            <v-row cols="12" sm="6" md="6" lg="6">
              <v-sheet class="mx-auto" max-width="100%" height="auto">
                <v-slide-group show-arrows>
                  <v-slide-group-item v-for="(n, index) in tabMenus " :key="n" v-slot="{ isSelected, toggle }">
                    <v-hover v-slot="{ isHovering, props }">
                      <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                        style="background-color: #CFD8DC; height: auto; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px; border-top-left-radius: 10px 10px; border-top-right-radius: 10px 10px;"
                        class="pa-0 ml-1 pr-1 mr-1 mb-0 mx-auto">

                        <!-- #263238 -->
                        <!-- openDialog(n.dialog); moduleStore.setModule(n); editModal=!editModal; -->
                        <v-btn variant="text" class="float-sm-right"
                          @click.stop="openViewDialog(n); moduleStore.setModule(n.dialog); viewModal = !viewModal;"
                          v-on:click="moduleStore.setModule(n);" v-model="moduleStore.name" style="font-size: 8pt;"
                          v-bind="props">
                          <v-icon color="orange-darken-4" size="medium" class="me-0 pr-0 mr-0 pt-4" end>
                            mdi-open-in-new
                          </v-icon>
                        </v-btn>

                        <v-card-title>
                          <v-btn variant="text" class="float-sm-right"
                            @click.stop="openViewDialog(n); moduleStore.setModule(n.dialog); viewModal = !viewModal;"
                            v-on:click="moduleStore.setModule(n);" v-model="moduleStore.name" style="font-size: 8pt;"
                            v-bind="props">
                            <v-icon class="text-h6">{{ n.icon }}</v-icon>
                            &nbsp; {{ n.title }}
                            <v-label class="text-subtitle-1">{{ n.text }} </v-label>
                          </v-btn>

                        </v-card-title>
                        <v-card-actions class="d-flex justify-end">
                          <v-btn variant="plain" density="compact"
                            @click.stop="openDialog(n); moduleStore.setModule(n.dialog); editModal = !editModal; CustomerNew()"
                            v-on:click="moduleStore.setModule(n);" v-model="useModule.name" style="font-size: 8pt;"
                            class="text-button-2" v-bind="props"><u>Adicionar</u></v-btn>
                          <v-btn variant="tonal" density="compact" class="float-sm-left text-button-2"
                            style="font-size: 8pt;"
                            @click.stop="openViewDialog(n); moduleStore.setModule(n.dialog); viewModal = !viewModal;"
                            v-on:click="moduleStore.setModule(n);" v-model="useModule.name">
                            Detalhes
                          </v-btn>
                        </v-card-actions>
                        <!-- </v-card> -->
                      </div>
                    </v-hover>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>

            </v-row>

          </v-sheet>

          <br>
          <v-sheet class="pa-4 pb-0" elevation="12" height="auto" width="100%">
            <v-row v-if="devType == 'Desktop'" cols="12" sm="12" md="12" lg="12">
              <v-col cols="11">
                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                    class="text-h3">mdi-chart-bar</v-icon>&nbsp;Gráficos</h1>
                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última actualização:
                </i>
              </v-col>
              <v-col>
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-open-in-new">
                </v-btn>&nbsp;
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-filter">
                </v-btn>

                 <!-- <v-btn variant="text" class="float-sm-right" @click="viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-open-in-new
                  </v-icon>
                  &nbsp;
                </v-btn>
                &nbsp;
                <v-btn variant="text" class="float-sm-right" @click="filterModal = !filterModal">
                  <v-icon color="primary">
                    mdi-filter
                  </v-icon>
                  &nbsp;
                </v-btn> -->
              </v-col>
            </v-row>

            <v-row v-if="devType != 'Desktop'" cols="12" sm="12" md="12" lg="12">
              <v-col cols="8">
                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                    class="text-h3">mdi-chart-bar</v-icon>&nbsp;Gráficos</h1>
                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última actualização:
                </i>
              </v-col>
              <v-col>
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-open-in-new">
                </v-btn>&nbsp;
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-filter">
                </v-btn>
              </v-col>
            </v-row>

            <v-divider class="mb-5"></v-divider>

            <div class="row">
              <v-col>
                <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`" style="height: 200px;"
                  class="mx-auto transition-swing mr-0">
                  <!-- 0000000000 -->
                  <!-- <v-card align-center> -->
                  <v-row>
                    <v-col cols="6">
                      <h4>Top KPIs</h4>
                    </v-col>
                    <v-col cols="6">
                      <v-btn variant="plain" density="compact" class="float-sm-right text-caption"
                        @click="openDialog(n); viewModal = !viewModal">
                        <v-icon color="primary">
                          mdi-open-in-new
                        </v-icon>
                        &nbsp;
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row cols="10" sm="3" md="3" lg="3">
                    <v-sheet cols="10" class="mx-auto ml-5 mr-8" height="250"
                      style="height:20px;  max-height: auto; width: 100%">
                      <!-- <ChartComponent style="width:auto; max-width:auto;"></ChartComponent> -->

                      <v-table density="compact" class="mr-5" v-if="devType == 'Desktop'"
                        style="font-size: 10pt; width: 180%; table-layout: fixed; overflow-x:hidden; display: inline-block; height: 135px;">
                        <thead>
                          <tr>
                            <th class="text-left" style="width:25%; position: sticky;">
                              Data
                            </th>
                            <th class="text-left" style="width:40%;">
                              Mensagem
                            </th>
                            <!-- <th class="text-left">
                              Quant.
                            </th> -->
                            <th class="text-left">
                              Contacto
                            </th>
                            <th class="text-left" style="width:25%;">
                              Autor
                            </th>
                            <th class="text-left">
                              Acções
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in topKPI" :key="item.id">
                            <!-- <td>{{ item.id }}</td> -->
                            <td>{{ item.crdate }}</td>
                            <td>{{ item.name }}</td>
                            <!-- <td>1</td> -->
                            <td>{{ item.dest }}</td>
                            <td>{{ item.admin }}</td>
                            <td>

                              <!-- <v-btn color="primary" class="me-2" variant="tonal" icon="mdi-play" density="compact"
                                @click="editModal = !editModal; isEditing = false; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn> -->

                              <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline"
                                density="compact"
                                @click="editModal = !editModal; isEditing = false; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn>

                              <!-- <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                                density="compact"
                                @click="editModal = !editModal; this.isEditing = true; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn>

                              <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                                @click="deleteItem(item);"></v-btn> -->

                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                      <v-table density="compact" class="mr-5" v-if="devType != 'Desktop'"
                        style="font-size: 10pt; width: 180%; table-layout: fixed; overflow-x:hidden; display: inline-block; height: 135px; max-width:255px;">
                        <thead>
                          <tr>
                            <th class="text-left" style="width:25%; position: sticky;">
                              Data
                            </th>
                            <th class="text-left" style="width:40%;">
                              Mensagem
                            </th>
                            <!-- <th class="text-left">
                              Quant.
                            </th> -->
                            <th class="text-left">
                              Contacto
                            </th>
                            <th class="text-left" style="width:25%;">
                              Autor
                            </th>
                            <th class="text-left">
                              Acções
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in topKPI" :key="item.id">
                            <!-- <td>{{ item.id }}</td> -->
                            <td>{{ item.crdate }}</td>
                            <td>{{ item.name }}</td>
                            <!-- <td>1</td> -->
                            <td>{{ item.dest }}</td>
                            <td>{{ item.admin }}</td>
                            <td>

                              <!-- <v-btn color="primary" class="me-2" variant="tonal" icon="mdi-play" density="compact"
                                @click="editModal = !editModal; isEditing = false; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn> -->

                              <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline"
                                density="compact"
                                @click="editModal = !editModal; isEditing = false; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn>

                              <!-- <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                                density="compact"
                                @click="editModal = !editModal; this.isEditing = true; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn>

                              <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                                @click="deleteItem(item);"></v-btn> -->

                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-sheet>
                  </v-row>
                  <!-- </v-sheet>
                        </v-sheet>
                      </v-sheet> -->
                </div>
              </v-col>
              <v-col>

                <v-sheet height="auto" width="auto" class=" mx-auto transition-swing pb-0"
                  :class="`elevation-${isHovering ? 6 : 2}`">

                  <v-row cols="12" sm="12" md="12" lg="12">
                    <v-col cols="7">
                      <h4>Resumo</h4>

                      <!-- <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última
                      actualização:
                      22/05/2023</i> -->
                    </v-col>
                    <v-col cols="5">
                      <v-btn variant="text" class="float-sm-right" @click="viewModal = !viewModal">
                        <v-icon color="primary">
                          mdi-open-in-new
                        </v-icon>
                        &nbsp;
                      </v-btn>
                      &nbsp;
                      <v-btn variant="text" class="float-sm-right" @click="filterModal = !filterModal">
                        <v-icon color="primary">
                          mdi-filter
                        </v-icon>
                        &nbsp;
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-sheet class="d-flex flex-wrap">
                    <v-sheet class="flex-1-1">
                      <!-- <div>1</div> -->



                      <v-row cols="12" sm="3" md="3" lg="3" class="ma-2 pa-2 pb-0" style="background-color: white;">
                        <v-col v-for="n in statsMenuC" :key="n" class="ma-0 pa-0">
                          <v-hover v-slot="{ isHovering, props }">
                            <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                              class="mx-auto transition-swing"
                              style="border-bottom:solid #0277BD 5px; width: 100%; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;">
                              <v-hover v-slot="{ isHovering, props }">
                                <v-card v-bind="props" :class="n.class">

                                  <v-icon class="text-h5">{{ n.icon }}</v-icon>&nbsp;{{ n.nr }}
                                  <br><b class="text-body-2">{{ n.text }}</b>

                                  <v-overlay :model-value="isHovering" contained scrim="#036358"
                                    class="align-center justify-center">
                                    <v-btn variant="flat" color="bg-secondary" v
                                      @click.stop="openViewDialog(n); moduleStore.setModule(n.dialog); viewModal = !viewModal;"
                                      v-on:click="moduleStore.setModule(n);"
                                      v-model="useModule.name"><v-icon>mdi-information-outline</v-icon>&nbsp;Detalhes</v-btn>
                                  </v-overlay>
                                </v-card>
                              </v-hover>
                            </div>
                          </v-hover>
                        </v-col>
                      </v-row>
                    </v-sheet>

                  </v-sheet>


                  <br>

                </v-sheet>
              </v-col>


            </div>

          </v-sheet>

          <br>
          <v-sheet class="pa-4" elevation="12" height="auto" width="auto">
            <v-row v-if="devType == 'Desktop'" cols="12" sm="12" md="12" lg="12">
              <v-col cols="11">
                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                    class="text-h3">mdi-finance</v-icon>&nbsp;Estatísticas
                </h1>
                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última
                  actualização:
                  22/05/2023</i>
              </v-col>
              <v-col>
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-open-in-new">
                </v-btn>&nbsp;
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-filter">
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="devType != 'Desktop'" cols="12" sm="12" md="12" lg="12">
              <v-col cols="8">
                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                    class="text-h3">mdi-finance</v-icon>&nbsp;Estatísticas
                </h1>
                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última
                  actualização:
                  22/05/2023</i>
              </v-col>
              <v-col>
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-open-in-new">
                </v-btn>&nbsp;
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-filter">
                </v-btn>
              </v-col>
            </v-row>

            <v-divider class="mb-6"></v-divider>

            <v-row cols="12" sm="3" md="3" lg="3" class="ma-0 pa-0 ml-0" style="background-color: white;">
              <v-col class="pr-0 pt-0 ma-0" v-for="n in statsMenuC" :key="n">
                <v-hover v-slot="{ isHovering, props }">
                  <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`" class="mx-auto transition-swing"
                    style="border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card v-bind="props" :class="n.class">

                        <v-icon class="text-h5">{{ n.icon }}</v-icon>&nbsp;{{ n.nr }}
                        <br><b class="text-body-2">{{ n.text }}</b>

                        <v-overlay :model-value="isHovering" contained scrim="#036358"
                          class="align-center justify-center">
                          <v-btn variant="flat" color="bg-secondary"
                            @click.stop="openViewDialog(n); moduleStore.setModule(n.dialog); viewModal = !viewModal;"
                            v-on:click="moduleStore.setModule(n);"
                            v-model="useModule.name"><v-icon>mdi-information-outline</v-icon>&nbsp;Detalhes</v-btn>
                        </v-overlay>
                      </v-card>
                    </v-hover>
                  </div>
                </v-hover>
              </v-col>
            </v-row>

          </v-sheet>
          <br>

          <!-- <v-divider></v-divider> -->
          <!-- <br> -->

          <!--
        <div style="height:300px;">
          <v-img cover src="https://media.istockphoto.com/id/1311598658/photo/businessman-trading-online-stock-market-on-teblet-screen-digital-investment-concept.jpg?b=1&s=612x612&w=0&k=20&c=bpQMsH07ziELXla0SZJt84-w0JkxsVXs05c7T2Iygks="></v-img>
        </div> -->

          <v-sheet class="pa-4 pb-10" elevation="12" height="400px" width="100%">
            <v-row v-if="devType == 'Desktop'" cols="12" sm="12" md="12" lg="12">
              <v-col cols="9">
                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                    class="text-h3">mdi-history</v-icon>&nbsp;Recentes</h1>
                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última
                  actualização:
                  22/052023</i>
              </v-col>
              <v-col>
                <v-btn variant="text" class="float-sm-right" @click="viewModal = !viewModal">
                  <v-icon color="primary">
                    mdi-open-in-new
                  </v-icon>
                  &nbsp;
                </v-btn>
                &nbsp;
                <v-btn variant="text" class="float-sm-right" @click="filterModal = !filterModal">
                  <v-icon color="primary">
                    mdi-filter
                  </v-icon>
                  &nbsp;
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="devType != 'Desktop'" cols="12" sm="12" md="12" lg="12">
              <v-col cols="8">
                <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                    class="text-h3">mdi-history</v-icon>&nbsp;Recentes</h1>
                <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última
                  actualização:
                  22/052023</i>
              </v-col>
              <v-col>
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-open-in-new">
                </v-btn>&nbsp;
                <v-btn color="primary" variant="text" density="compact" class="float-sm-center pr-0"
                   @click="viewModal = !viewModal" icon="mdi-filter"></v-btn>
              </v-col>
            </v-row>

            <v-divider class="mb-6"></v-divider>

            <div class="d-flex justify-space-between">
              <!-- <v-card-title>
              <h1 class="text-h6 text-md-h5 font-weight-bold mb-6">Recentes</h1>
            </v-card-title> -->
              <!-- <v-btn @click="isDialogOpen = true" v-bind="props" icon="mdi-plus-thick"></v-btn> -->

              <!-- EDIT MODAL DIALOG -->
              <v-dialog width='850' v-model="editModal" v-on:close="" v-on:open="beforeOpen" persistent>
                <template #activator="{ props }">
                </template>

                <v-card>
                  <v-toolbar color="primary">
                    <template v-slot:prepend>
                      <v-toolbar-title class="text-h6" bg-color="deep-purple-darken-4" v-model="useModule.name"><v-icon
                          class="text-h4">{{ useModule.icon
                          }}</v-icon>&nbsp;Editar&nbsp;{{
                        useModule.text }}</v-toolbar-title>
                    </template>

                    <v-tooltip v-model="vtooltipE" location="bottom">
                      <template v-slot:activator="{ props }">

                        <v-btn v-bind="props" role="link" @click="handleClick(); isEditing = !isEditing"
                          class="activateBtn" label="Editar" :disabled="btnEdit"
                          :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                          color="white" variant="text" icon="mdi-pencil"></v-btn>

                      </template>
                      <span>Editar</span>
                    </v-tooltip>

                    <!-- <input id="MID" v-model="useModule.name" /> -->

                    <v-tooltip v-model="vtooltipInfo" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" color="white" icon="mdi-alert-circle-outline"></v-btn>
                      </template>
                      <span>Informações</span>
                    </v-tooltip>


                    <v-tooltip v-model="vtooltipDel" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" color="white" @click="dialogDelete = true;" icon="mdi-delete-outline"
                          :visible="btnDelete"></v-btn>
                      </template>
                      <span>Remover</span>
                    </v-tooltip>

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

                          <v-btn v-bind="props" role="link" @click="editModal = false; onclose();" :disabled="btnEdit"
                            :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                            color="white" variant="text" icon="mdi-close-circle"></v-btn>

                        </template>
                        <span>Fechar</span>
                      </v-tooltip>
                    </template>
                  </v-toolbar>

                  <v-alert type="success" title="Sucesso" v-model="alertSuccess" transition="slide-y-transition"
                    border="start" variant="tonal" closable
                    text="As suas alterações foram gravadas com sucesso!"></v-alert>

                  <v-alert type="warning" title="Sucesso" v-model="alertDelete" transition="slide-y-transition"
                    border="start" variant="tonal" closable text="Registo removido com sucesso!"></v-alert>

                  <v-card-text v-if="useModule.dialog == 'Contacts'">
                    <v-alert v-model="ActEmpty" class="mb-5 mt-5" border="start" variant="tonal" closable
                      close-label="Close Alert" color="warning" title="Atenção!" type="warning">
                      Preencha todos os campos abaixo!
                    </v-alert>

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                      <v-tab prepend-icon="mdi-account-cog">Opções</v-tab>
                      <v-tab prepend-icon="mdi-account-multiple">Sailpoints</v-tab>
                      <v-tab prepend-icon="mdi-history">Histórico</v-tab>
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">
                        <!-- <v-card> -->
                        <!-- <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title> -->
                        <v-card-text>
                          <!-- <v-container> -->
                          <v-row>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field :disabled="false" label="ID" id="CID" v-model="customerID"
                                prepend-inner-icon="mdi-key" hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field label="Primeiro nome*" id="FN" name="firstNameR" :disabled="!isEditing"
                                v-model="firstName" clearable prepend-inner-icon="mdi-account" hint="*campo obrigatório"
                                :error-messages="firstNameR.errorMessage.value" :counter="10" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field :disabled="!isEditing" id="LN" name="lastNameR" :counter="10"
                                prepend-inner-icon="mdi-account" v-model="lastName" clearable
                                :error-messages="lastNameR.errorMessage.value" label="Último nome*"
                                hint="*campo obrigatório" persistent-hint required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <div class="text-subtitle-1 text-medium-emphasis">País</div>

                              <select name="countryCode" id="PWC" class="text-subtitle-1 d-50" v-model="countrycode"
                                style="width: auto; font-size:25px;">
                                <option data-countryCode="AO" value="244" Selected>Angola (+244)</option>
                                <option data-countryCode="PT" value="351">Portugal (+351)</option>
                                <optgroup label="Outros Países">
                                  <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                                  <option data-countryCode="AD" value="376">Andorra (+376)</option>
                                  <option data-countryCode="AO" value="244">Angola (+244)</option>
                                  <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                                  <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)
                                  </option>
                                  <option data-countryCode="AR" value="54">Argentina (+54)</option>
                                  <option data-countryCode="AM" value="374">Armenia (+374)</option>
                                  <option data-countryCode="AW" value="297">Aruba (+297)</option>
                                  <option data-countryCode="AU" value="61">Australia (+61)</option>
                                  <option data-countryCode="AT" value="43">Austria (+43)</option>
                                  <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                                  <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                                  <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                                  <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                                  <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                                  <option data-countryCode="BY" value="375">Belarus (+375)</option>
                                  <option data-countryCode="BE" value="32">Belgium (+32)</option>
                                  <option data-countryCode="BZ" value="501">Belize (+501)</option>
                                  <option data-countryCode="BJ" value="229">Benin (+229)</option>
                                  <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                                  <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                                  <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                                  <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>
                                  <option data-countryCode="BW" value="267">Botswana (+267)</option>
                                  <option data-countryCode="BR" value="55">Brazil (+55)</option>
                                  <option data-countryCode="BN" value="673">Brunei (+673)</option>
                                  <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                                  <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                                  <option data-countryCode="BI" value="257">Burundi (+257)</option>
                                  <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                                  <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                                  <option data-countryCode="CA" value="1">Canada (+1)</option>
                                  <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                                  <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                                  <option data-countryCode="CF" value="236">Central African Republic (+236)
                                  </option>
                                  <option data-countryCode="CL" value="56">Chile (+56)</option>
                                  <option data-countryCode="CN" value="86">China (+86)</option>
                                  <option data-countryCode="CO" value="57">Colombia (+57)</option>
                                  <option data-countryCode="KM" value="269">Comoros (+269)</option>
                                  <option data-countryCode="CG" value="242">Congo (+242)</option>
                                  <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                                  <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                                  <option data-countryCode="HR" value="385">Croatia (+385)</option>
                                  <option data-countryCode="CU" value="53">Cuba (+53)</option>
                                  <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>
                                  <option data-countryCode="CY" value="357">Cyprus South (+357)</option>
                                  <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>
                                  <option data-countryCode="DK" value="45">Denmark (+45)</option>
                                  <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                                  <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                                  <option data-countryCode="DO" value="1809">Dominican Republic (+1809)
                                  </option>
                                  <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                                  <option data-countryCode="EG" value="20">Egypt (+20)</option>
                                  <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                                  <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                                  <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                                  <option data-countryCode="EE" value="372">Estonia (+372)</option>
                                  <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                                  <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                                  <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                                  <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                                  <option data-countryCode="FI" value="358">Finland (+358)</option>
                                  <option data-countryCode="FR" value="33">France (+33)</option>
                                  <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                                  <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                                  <option data-countryCode="GA" value="241">Gabon (+241)</option>
                                  <option data-countryCode="GM" value="220">Gambia (+220)</option>
                                  <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                                  <option data-countryCode="DE" value="49">Germany (+49)</option>
                                  <option data-countryCode="GH" value="233">Ghana (+233)</option>
                                  <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                                  <option data-countryCode="GR" value="30">Greece (+30)</option>
                                  <option data-countryCode="GL" value="299">Greenland (+299)</option>
                                  <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                                  <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                                  <option data-countryCode="GU" value="671">Guam (+671)</option>
                                  <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                                  <option data-countryCode="GN" value="224">Guinea (+224)</option>
                                  <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>
                                  <option data-countryCode="GY" value="592">Guyana (+592)</option>
                                  <option data-countryCode="HT" value="509">Haiti (+509)</option>
                                  <option data-countryCode="HN" value="504">Honduras (+504)</option>
                                  <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                                  <option data-countryCode="HU" value="36">Hungary (+36)</option>
                                  <option data-countryCode="IS" value="354">Iceland (+354)</option>
                                  <option data-countryCode="IN" value="91">India (+91)</option>
                                  <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                                  <option data-countryCode="IR" value="98">Iran (+98)</option>
                                  <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                                  <option data-countryCode="IE" value="353">Ireland (+353)</option>
                                  <option data-countryCode="IL" value="972">Israel (+972)</option>
                                  <option data-countryCode="IT" value="39">Italy (+39)</option>
                                  <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                                  <option data-countryCode="JP" value="81">Japan (+81)</option>
                                  <option data-countryCode="JO" value="962">Jordan (+962)</option>
                                  <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                                  <option data-countryCode="KE" value="254">Kenya (+254)</option>
                                  <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                                  <option data-countryCode="KP" value="850">Korea North (+850)</option>
                                  <option data-countryCode="KR" value="82">Korea South (+82)</option>
                                  <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                                  <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                                  <option data-countryCode="LA" value="856">Laos (+856)</option>
                                  <option data-countryCode="LV" value="371">Latvia (+371)</option>
                                  <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                                  <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                                  <option data-countryCode="LR" value="231">Liberia (+231)</option>
                                  <option data-countryCode="LY" value="218">Libya (+218)</option>
                                  <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                                  <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                                  <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                                  <option data-countryCode="MO" value="853">Macao (+853)</option>
                                  <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                                  <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                                  <option data-countryCode="MW" value="265">Malawi (+265)</option>
                                  <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                                  <option data-countryCode="MV" value="960">Maldives (+960)</option>
                                  <option data-countryCode="ML" value="223">Mali (+223)</option>
                                  <option data-countryCode="MT" value="356">Malta (+356)</option>
                                  <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                                  <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                                  <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                                  <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                                  <option data-countryCode="MX" value="52">Mexico (+52)</option>
                                  <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                                  <option data-countryCode="MD" value="373">Moldova (+373)</option>
                                  <option data-countryCode="MC" value="377">Monaco (+377)</option>
                                  <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                                  <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                                  <option data-countryCode="MA" value="212">Morocco (+212)</option>
                                  <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                                  <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                                  <option data-countryCode="NA" value="264">Namibia (+264)</option>
                                  <option data-countryCode="NR" value="674">Nauru (+674)</option>
                                  <option data-countryCode="NP" value="977">Nepal (+977)</option>
                                  <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                                  <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                                  <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                                  <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                                  <option data-countryCode="NE" value="227">Niger (+227)</option>
                                  <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                                  <option data-countryCode="NU" value="683">Niue (+683)</option>
                                  <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                                  <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                                  <option data-countryCode="NO" value="47">Norway (+47)</option>
                                  <option data-countryCode="OM" value="968">Oman (+968)</option>
                                  <option data-countryCode="PW" value="680">Palau (+680)</option>
                                  <option data-countryCode="PA" value="507">Panama (+507)</option>
                                  <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                                  <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                                  <option data-countryCode="PE" value="51">Peru (+51)</option>
                                  <option data-countryCode="PH" value="63">Philippines (+63)</option>
                                  <option data-countryCode="PL" value="48">Poland (+48)</option>
                                  <option data-countryCode="PT" value="351">Portugal (+351)</option>
                                  <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                                  <option data-countryCode="QA" value="974">Qatar (+974)</option>
                                  <option data-countryCode="RE" value="262">Reunion (+262)</option>
                                  <option data-countryCode="RO" value="40">Romania (+40)</option>
                                  <option data-countryCode="RU" value="7">Russia (+7)</option>
                                  <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                                  <option data-countryCode="SM" value="378">San Marino (+378)</option>
                                  <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)
                                  </option>
                                  <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                                  <option data-countryCode="SN" value="221">Senegal (+221)</option>
                                  <option data-countryCode="CS" value="381">Serbia (+381)</option>
                                  <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                                  <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                                  <option data-countryCode="SG" value="65">Singapore (+65)</option>
                                  <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>
                                  <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                                  <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                                  <option data-countryCode="SO" value="252">Somalia (+252)</option>
                                  <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                                  <option data-countryCode="ES" value="34">Spain (+34)</option>
                                  <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                                  <option data-countryCode="SH" value="290">St. Helena (+290)</option>
                                  <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>
                                  <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>
                                  <option data-countryCode="SD" value="249">Sudan (+249)</option>
                                  <option data-countryCode="SR" value="597">Suriname (+597)</option>
                                  <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                                  <option data-countryCode="SE" value="46">Sweden (+46)</option>
                                  <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                                  <option data-countryCode="SI" value="963">Syria (+963)</option>
                                  <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                                  <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                                  <option data-countryCode="TH" value="66">Thailand (+66)</option>
                                  <option data-countryCode="TG" value="228">Togo (+228)</option>
                                  <option data-countryCode="TO" value="676">Tonga (+676)</option>
                                  <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)
                                  </option>
                                  <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                                  <option data-countryCode="TR" value="90">Turkey (+90)</option>
                                  <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>
                                  <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                                  <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands
                                    (+1649)</option>
                                  <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                                  <option data-countryCode="UG" value="256">Uganda (+256)</option>
                                  <option data-countryCode="GB" value="44">UK (+44)</option>
                                  <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                                  <option data-countryCode="AE" value="971">United Arab Emirates (+971)
                                  </option>
                                  <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                                  <option data-countryCode="US" value="1">USA (+1)</option>
                                  <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                                  <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                                  <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                                  <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                                  <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                                  <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)
                                  </option>
                                  <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)
                                  </option>
                                  <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)
                                  </option>
                                  <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                                  <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                                  <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                                  <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                                </optgroup>
                              </select>


                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" id="cellphone" v-model="cellphone" label="Telefone*"
                                type="telephone" prepend-inner-icon="mdi-phone" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5" md="6" class="pa-0 ml-0">
                              <v-text-field :disabled="!isEditing" id="cellSMS" v-model="cellSMS" label="SMS*"
                                type="telephone" prepend-inner-icon="mdi-message-text" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" id="cellEmail" v-model="cellEmail" label="E-mail*"
                                prepend-inner-icon="mdi-email-fast-outline" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" id="cellWhatsApp" v-model="cellWhatsApp"
                                label="WhatsApp*" prepend-inner-icon="mdi-whatsapp" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-select :disabled="!isEditing" id="cellAge" v-model="cellAge"
                                :items="['0-17', '18-29', '30-54', '54+']" label="Idade*"
                                prepend-inner-icon="mdi-numeric-7" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" v-model="cellLikes" label="Interesses"
                                prepend-inner-icon="mdi-set-center" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" v-model="cellCampaign" :items="cellCampaignList"
                                prepend-inner-icon="mdi-forum"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" id="cellRole" v-model="cellRole"
                                :items="['Admin', 'Gerente', 'Convidado']" label="Cargo"
                                prepend-inner-icon="mdi-account-key"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" v-model="cellGroup" :items="cellGroupList"
                                :item-value="cellGroupListID" label="Grupo"
                                prepend-inner-icon="mdi-account-multiple"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <small>*indicates required field</small>
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                      <v-window-item v-model="options">
                        <v-card-text>
                          <!-- <v-container> -->
                          <v-row>

                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" v-model="cellGroup"
                                :items="['Cliente', 'Empresa', 'Interno']" label="Gestor de Vendas"
                                prepend-inner-icon="mdi-account-key-outline" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="5" md="6" class="pa-0 ml-0">
                              <v-text-field :disabled="!isEditing" id="cellSMS" v-model="cellSMS" label="Vendas*"
                                type="telephone" prepend-inner-icon="mdi-currency-eur" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" id="cellEmail" v-model="cellEmail"
                                label="E-mail Corporativo" prepend-inner-icon="mdi-email-fast-outline"
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" id="cellWhatsApp" v-model="cellWhatsApp"
                                label="WhatsApp Empresa*" prepend-inner-icon="mdi-whatsapp" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" v-model="cellLikes"
                                :items="['B2B', 'B2C', 'Inbound-Selling', 'Enterprise Sales', 'Direct Sales', 'Management']"
                                label="Tipo de Cliente" prepend-inner-icon="mdi-set-center" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" v-model="cellCampaign"
                                :items="['Marketing', 'Autenticação', 'Cobrança']" label="Turn over"
                                prepend-inner-icon="mdi-forum" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" id="cellRole" v-model="cellRole"
                                :items="['Português', 'English', 'Français']" label="Idioma"
                                prepend-inner-icon="mdi-account-key" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" id="cellphone" v-model="cellphone"
                                label="Unidades Compradas" type="telephone" prepend-inner-icon="mdi-percent-box-outline"
                                required></v-text-field>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <small>*indicates required field</small>
                        </v-card-text>
                      </v-window-item>
                      <v-window-item v-model="sailpoints"></v-window-item>
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

                          <v-card append-icon="mdi-check" class="mx-auto my-2" elevation="3" variant="tonal" link
                            :title="index + 1" prepend-icon="mdi-tooltip-text-outline" dense
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

                  <v-card-text v-if="useModule.dialog == 'Groups'">

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                      <v-tab prepend-icon="mdi-account-cog">Opções</v-tab>
                      <v-tab prepend-icon="mdi-account-multiple">Membros&nbsp;({{
                        serverItems1.length
                        }})</v-tab>
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">
                        <v-card>
                          <v-card-text>

                            <v-row>

                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="false" label="ID" id="GID" v-model="groupID"
                                  prepend-inner-icon="mdi-key"
                                  hint="example of helper text only on focus"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="12" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Nome do Grupo*" id="GN" v-model="groupName"
                                  :counter="10" :rules="firstNameRules" prepend-inner-icon="mdi-account-multiple"
                                  required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Descrição" id="GD" v-model="groupDescr"
                                  :counter="10" :rules="lastNameRules"
                                  prepend-inner-icon="mdi-information-variant"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing"
                                  :items="['IT', 'Finaças', 'RH', 'Contabilidade', 'Administração', 'Logistíca']"
                                  label="Departamento" prepend-inner-icon="mdi-domain"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" :items="['Interno', 'Externo', 'Admin']"
                                  label="Tipo de Conta" prepend-inner-icon="mdi-account-badge-outline"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" :items="['Convidado', 'Administrador']"
                                  label="Domínio" prepend-inner-icon="mdi-security"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" :items="['English', 'Português', 'François']"
                                  label="Linguagem" prepend-inner-icon="mdi-translate"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" :items="['Painel', 'Windows']"
                                  label="Modo de Abertura" prepend-inner-icon="mdi-open-in-new"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing"
                                  :items="['Marketing', 'Autentificação', 'Cobrança']" label="Campanha"
                                  prepend-inner-icon="mdi-message-star-outline"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" :items="['Administração',
                                  'Gestão de Inventário',
                                  'Posto de Vendas',
                                  'Centro de Custos',
                                  'Gestão Hospitalar',
                                  'Contabilidade',
                                  'Finanças',
                                  'Recursos Humanos',
                                  'Utilidades',
                                  'Outros Módulos',
                                  'Directório',
                                  'Centro de Mensagens',
                                  'Centro de Relatórios',
                                  'Documentos',
                                  'Gestão de Cyber',
                                  'Gestão Acádemica',
                                  'Gestão Hoteleira',
                                  'Gestão de Ginásio',
                                  'Gestão de Rent-a-Car',
                                  'Gestão de Creche',
                                  'Acádemia de Música',
                                  'Centro de Vistos',
                                  'Estação de Serviço',
                                  'Gestão de Lavandaria',
                                  'Tesouraria',
                                  'Secretária',
                                  'Escola Sabatina']
                                  " label="Módulo Padrão" prepend-inner-icon="mdi-view-grid" multiple></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing"
                                  :items="['Marketing', 'Autentificação', 'Cobrança']" label="Flex"
                                  prepend-inner-icon="mdi-shuffle" multiple></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-window-item>
                      <v-window-item v-model="options">
                        <v-card>
                          <v-card-text>


                            <v-divider></v-divider>

                            <v-list lines="three" select-strategy="classic">
                              <v-list-subheader>General</v-list-subheader>

                              <v-list-item value="notifications">
                                <template v-slot:prepend="{ isActive }">

                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Notificações</v-list-item-title>

                                <v-list-item-subtitle>
                                  Notify me about updates to apps or games that I downloaded
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="sound">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Flex</v-list-item-title>

                                <v-list-item-subtitle>
                                  Auto-update apps at any time. Data charges may apply
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="widgets">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Auto-add widgets</v-list-item-title>

                                <v-list-item-subtitle>
                                  Automatically add home screen widgets when downloads complete
                                </v-list-item-subtitle>
                              </v-list-item>
                            </v-list>

                          </v-card-text>
                        </v-card>
                      </v-window-item>
                      <v-window-item v-model="members">

                        <v-data-table :headers="groupMembersHeaders" :items="serverItems1" :search="search" show-select
                          return-object :loading="loading" v-model="selected" height="500px" fixed-header
                          :sort-by="[{ key: 'name', order: 'asc' }]">
                          <template v-slot:top>
                            <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                              <v-toolbar-title>
                                <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify"
                                  clearable density="compact" variant="outlined" hide-details
                                  single-line></v-text-field>
                              </v-toolbar-title>
                              <v-divider class="mx-4" inset vertical></v-divider>


                              <!-- <v-spacer></v-spacer> -->

                              <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                              <v-divider class="mx-4" inset vertical></v-divider>

                              <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                                @click="editModal = !editModal; CustomerNew();">

                              </v-btn>

                              <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                                @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                              </v-btn>

                              <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                                @click="CUSTOMER_GET_ALL();">
                              </v-btn>

                              <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                                @click="editModal = !editModal; CustomerNew();">

                              </v-btn>
                              <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                                @click="showSelected">

                              </v-btn>
                              <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                                <v-card title="Remover Cliente" text="Tem a certeza que deseja remover este
                                cliente?" prepend-icon="mdi-close-thick" max-width="450">
                                  <v-card-title class="text-h5"></v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="CUSTOMER_DELETE(this.deleteValue.id)">Sim</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-toolbar>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                              @click="editModal = !editModal; isEditing = false; CUSTOMER_GET(item);"></v-btn>

                            <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                              density="compact"
                              @click="editModal = !editModal; this.isEditing = true; CUSTOMER_GET(item);"></v-btn>

                            <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                              @click="deleteItem(item);"></v-btn>

                            <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                          </template>

                          <template v-slot:no-data>

                          </template>

                        </v-data-table>
                      </v-window-item>
                    </v-window>
                  </v-card-text>

                  <v-card-text v-if="useModule.dialog == 'Campaigns'">

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab>Detalhes</v-tab>
                      <v-tab>Opções</v-tab>
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">
                        <v-card>
                          <!-- <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title> -->
                          <v-card-text>
                            <!-- <v-container> -->
                            <v-row>

                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="false" label="ID" id="CID" v-model="campID"
                                  prepend-inner-icon="mdi-key"
                                  hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" id="CT" label="Título da Campanha"
                                  v-model="campTitle" :counter="10" :rules="firstNameRules"
                                  hint="example of helper text only on focus"
                                  prepend-inner-icon="mdi-format-title"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" id="CG" v-model="cellGroup"
                                  :items="cellGroupList" :counter="10" :rules="lastNameRules" label="Grupo"
                                  prepend-inner-icon="mdi-account-multiple"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" :items="cellContactList" label="Contactos"
                                  prepend-inner-icon="mdi-account" multiple></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Data de Início" type="date"
                                  v-model="campaignStart" prepend-inner-icon="mdi-calendar" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Data de Fim" type="date"
                                  v-model="campaignEnd" prepend-inner-icon="mdi-clock-outline"
                                  hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" v-model="campaignSms" :items="cellMessageList"
                                  :change="CUSTOMER_MESSAGE1_GET(campaignSms)" label="SMS"
                                  prepend-inner-icon="mdi-message-settings-outline"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="12" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" v-model="campaignEmail" :items="cellMessageList"
                                  label="E-mail" prepend-inner-icon="mdi-email-outline"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="12" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" v-model="campaignTelephone"
                                  :items="cellMessageList" label="Telefone"
                                  prepend-inner-icon="mdi-phone"></v-autocomplete>
                              </v-col>
                            </v-row>
                            <!-- </v-container> -->
                            <!-- <small>*indicates required field</small> -->
                          </v-card-text>

                        </v-card>
                      </v-window-item>
                      <v-window-item v-model="options">
                        <v-card>
                          <v-card-text>

                            <v-divider></v-divider>

                            <v-list lines="three" select-strategy="classic">
                              <v-list-subheader>General</v-list-subheader>
                              <v-textarea :disabled="!isEditing" label="Mensagem*" v-model="msgText" :counter="200"
                                :rules="lastNameRules" prepend-inner-icon="mdi-message-text-outline"
                                required></v-textarea>

                              <v-list-item value="notifications">
                                <template v-slot:prepend="{ isActive }">

                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Notificações</v-list-item-title>

                                <v-list-item-subtitle>
                                  Notify me about updates to apps or games that I downloaded
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="sound">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Flex</v-list-item-title>

                                <v-list-item-subtitle>
                                  Auto-update apps at any time. Data charges may apply
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="widgets">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Auto-add widgets</v-list-item-title>

                                <v-list-item-subtitle>
                                  Automatically add home screen widgets when downloads complete
                                </v-list-item-subtitle>
                              </v-list-item>
                            </v-list>

                          </v-card-text>
                        </v-card>
                      </v-window-item>
                    </v-window>
                  </v-card-text>

                  <v-card-text
                    v-if="useModule.dialog == 'Messages' | useModule.dialog == 'Chamadas' | useModule.dialog == 'WhatsApp' | useModule.dialog == 'E-mail'">

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                      <v-tab prepend-icon="mdi-history">Histórico</v-tab>
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">
                        <v-card>

                          <v-card-text>
                            <!-- <v-container> -->
                            <v-row>

                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="false" label="ID" id="GID" v-model="msgID"
                                  prepend-inner-icon="mdi-key"
                                  hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <!-- <v-col cols="12" sm="12" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Hora" type="date"
                                  hint="example of helper text only on focus"></v-text-field>
                                <v-date-picker v-model="date" :allowed-dates="allowedDates" max="2028-03-20"
                                  min="2016-06-15"></v-date-picker>
                              </v-col> -->
                              <v-col cols="12" sm="12" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" v-model="msgCategory"
                                  :items="['SMS', 'Telefone', 'WhatsApp', 'E-mail']" label="Categoria"
                                  prepend-inner-icon="mdi-cube-send"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-autocomplete :disabled="!isEditing" v-model="cellGroup" :items="cellGroupList"
                                  :item-value="cellGroupListID" label="Grupo"
                                  prepend-inner-icon="mdi-account-multiple"></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Título" v-model="msgTitle" :counter="10"
                                  :rules="firstNameRules" hint="example of helper text only on focus"
                                  prepend-inner-icon="mdi-format-title"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12" class="pa-0">
                                <v-textarea :disabled="!isEditing" label="Mensagem*" v-model="msgText" :counter="10"
                                  :rules="lastNameRules" prepend-inner-icon="mdi-message-text-outline"
                                  required></v-textarea>
                              </v-col>
                            </v-row>
                            <!-- </v-container> -->
                            <!-- <small>*indicates required field</small> -->
                          </v-card-text>

                        </v-card>
                      </v-window-item>
                      <v-window-item v-model="options">
                        <v-card>
                          <v-card-text>

                            <v-divider></v-divider>

                            <v-list lines="three" select-strategy="classic">
                              <v-list-subheader>General</v-list-subheader>

                              <v-list-item value="notifications">
                                <template v-slot:prepend="{ isActive }">

                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Notificações</v-list-item-title>

                                <v-list-item-subtitle>
                                  Notify me about updates to apps or games that I downloaded
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="sound">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Flex</v-list-item-title>

                                <v-list-item-subtitle>
                                  Auto-update apps at any time. Data charges may apply
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="widgets">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Auto-add widgets</v-list-item-title>

                                <v-list-item-subtitle>
                                  Automatically add home screen widgets when downloads complete
                                </v-list-item-subtitle>
                              </v-list-item>
                            </v-list>

                          </v-card-text>
                        </v-card>
                      </v-window-item>
                    </v-window>
                  </v-card-text>

                  <v-card-text v-if="useModule.dialog == 'Contas'">

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                      <v-tab prepend-icon="mdi-account-cog">Opções</v-tab>
                      <v-tab prepend-icon="mdi-account-multiple">Sailpoints</v-tab>
                      <v-tab prepend-icon="mdi-history">Histórico</v-tab>
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">
                        <!-- <v-card> -->
                        <!-- <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title> -->
                        <v-card-text>
                          <!-- <v-container> -->
                          <v-row>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-form fast-fail @submit.prevent>
                                <v-text-field label="Primeiro nome*" name="fname" v-validate="required"
                                  :disabled="!isEditing" v-model="firstName" :counter="10"
                                  :error-messages="name.errorMessage.value" :rules="firstNameRules"
                                  prepend-inner-icon="mdi-lock" required></v-text-field>
                              </v-form></v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Nome do meio"
                                hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Último nome*" v-model="lastName"
                                :rules="lastNameRules" hint="*campo obrigatório" persistent-hint
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Telefone*" type="telephone"
                                prepend-inner-icon="mdi-phone" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5" md="6" class="pa-0 ml-0">
                              <v-text-field :disabled="!isEditing" label="SMS*" prepend-inner-icon="mdi-message-text"
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="E-mail*" prepend-inner-icon="mdi-password"
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="WhatsApp*" prepend-inner-icon="mdi-whatsapp"
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Password*" type="password"
                                prepend-inner-icon="mdi-lock-outline" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Repeat Password*" type="password"
                                prepend-inner-icon="mdi-lock-outline" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-select :disabled="!isEditing" :items="['0-17', '18-29', '30-54', '54+']" label="Idade*"
                                prepend-inner-icon="mdi-numeric-7" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing"
                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                label="Interesses" prepend-inner-icon="mdi-set-center" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Marketing', 'Autenticação', 'Cobrança']"
                                label="Campanha" prepend-inner-icon="mdi-forum" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Admin', 'Gerente', 'Convidado']"
                                label="Cargo" prepend-inner-icon="mdi-account-key" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Cliente', 'Empresa', 'Interno']"
                                label="Grupo" prepend-inner-icon="mdi-account-multiple" multiple></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing"
                                :items="['Marketing', 'Autentificação', 'Cobrança']" label="Flex"
                                prepend-inner-icon="mdi-shuffle" multiple></v-autocomplete>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                    </v-window>
                  </v-card-text>

                  <v-card-text v-if="useModule.dialog == 'Histórico'">

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab>Detalhes</v-tab>
                      <v-tab>Opções</v-tab>
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">
                        <v-card>
                          <!-- <v-card-title>
<span class="text-h5">User Profile</span>
</v-card-title> -->
                          <v-card-text>
                            <!-- <v-container> -->
                            <v-row>
                              <v-col cols="12" sm="6">
                                <v-autocomplete :disabled="!isEditing"
                                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                  label="Grupo" multiple></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-autocomplete :disabled="!isEditing"
                                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                  label="Contactos" multiple></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field :disabled="!isEditing" label="Data*" type="date" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field :disabled="!isEditing" label="Hora" type="time"
                                  hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12">
                                <v-autocomplete :disabled="!isEditing"
                                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                  label="SMS" multiple></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="12">
                                <v-autocomplete :disabled="!isEditing"
                                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                  label="E-mail" multiple></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="12">
                                <v-autocomplete :disabled="!isEditing"
                                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                  label="Telefone" multiple></v-autocomplete>
                              </v-col>
                            </v-row>
                            <!-- </v-container> -->
                            <!-- <small>*indicates required field</small> -->
                          </v-card-text>
                          <!-- <v-card-actions>
<v-spacer></v-spacer>
<v-btn
color="blue-darken-1"
variant="text"
@click="dialog = false"
>
Close
</v-btn>
<v-btn
color="blue-darken-1"
variant="text"
@click="dialog = false"
>
Save
</v-btn>
</v-card-actions> -->
                        </v-card>
                      </v-window-item>
                      <v-window-item v-model="options">
                        <v-card>
                          <v-card-text>

                            <v-divider></v-divider>

                            <v-list lines="three" select-strategy="classic">
                              <v-list-subheader>General</v-list-subheader>

                              <v-list-item value="notifications">
                                <template v-slot:prepend="{ isActive }">

                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Notificações</v-list-item-title>

                                <v-list-item-subtitle>
                                  Notify me about updates to apps or games that I downloaded
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="sound">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Flex</v-list-item-title>

                                <v-list-item-subtitle>
                                  Auto-update apps at any time. Data charges may apply
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="widgets">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Auto-add widgets</v-list-item-title>

                                <v-list-item-subtitle>
                                  Automatically add home screen widgets when downloads complete
                                </v-list-item-subtitle>
                              </v-list-item>
                            </v-list>

                          </v-card-text>
                        </v-card>
                      </v-window-item>
                    </v-window>
                  </v-card-text>


                  <v-card-text v-if="useModule.dialog == 'Settings'">

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab>Detalhes</v-tab>
                      <v-tab>Opções</v-tab>
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">

                      </v-window-item>
                      <v-window-item v-model="options">
                        <v-card>
                          <v-card-text>

                            <v-divider></v-divider>

                            <v-list lines="three" select-strategy="classic">
                              <v-list-subheader>General</v-list-subheader>

                              <v-list-item value="notifications">
                                <template v-slot:prepend="{ isActive }">

                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Notificações</v-list-item-title>

                                <v-list-item-subtitle>
                                  Notify me about updates to apps or games that I downloaded
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="sound">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Flex</v-list-item-title>

                                <v-list-item-subtitle>
                                  Auto-update apps at any time. Data charges may apply
                                </v-list-item-subtitle>
                              </v-list-item>

                              <v-list-item value="widgets">
                                <template v-slot:prepend="{ isActive }">
                                  <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                  </v-list-item-action>
                                </template>

                                <v-list-item-title>Auto-add widgets</v-list-item-title>

                                <v-list-item-subtitle>
                                  Automatically add home screen widgets when downloads complete
                                </v-list-item-subtitle>
                              </v-list-item>
                            </v-list>

                          </v-card-text>
                        </v-card>
                      </v-window-item>
                    </v-window>
                  </v-card-text>

                  <v-card-text v-if="useModule.dialog == 'Doente'">

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                      <v-tab prepend-icon="mdi-account-cog">Serviço</v-tab>
                      <v-tab prepend-icon="mdi-water">Codificação</v-tab>
                      <!-- <v-tab prepend-icon="mdi-water"></v-tab> -->
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-form fast-fail @submit.prevent>
                                <v-text-field label="Primeiro nome*" name="fname" v-validate="required"
                                  :disabled="!isEditing" v-model="firstName" :counter="10" :rules="firstNameRules"
                                  prepend-inner-icon="mdi-account" required></v-text-field>
                              </v-form></v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Nome do meio"
                                hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="10"
                                :rules="lastNameRules" label="Último nome*" hint="*campo obrigatório" persistent-hint
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Telefone*" type="telephone"
                                prepend-inner-icon="mdi-phone" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="E-mail"
                                prepend-inner-icon="mdi-email-fast-outline" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-select :disabled="!isEditing" :items="['0-17', '18-29', '30-54', '54+']" label="Idade*"
                                prepend-inner-icon="mdi-numeric-7" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Data de nascimento*" type="date"
                                prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Homem', 'Mulher']" label="Sexo"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Domicilio',
                                'Unidade hospitalar',
                                'Via pública']" label="Proveniência*"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Bengo',
                                'Benguela',
                                'Bié',
                                'Cabinda',
                                'Cuando Cubango',
                                'Cuanza Norte',
                                'Cuanza Sul',
                                'Cunene',
                                'Huambo',
                                'Huíla',
                                'Luanda',
                                'Lunda Norte',
                                'Lunda Sul',
                                'Malanje',
                                'Moxico',
                                'Namibe',
                                'Uíge',
                                'Zaire']" label="Província *" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Homem', 'Mulher']" label="Município *"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['São João', 'B. Acádemico']"
                                label="Distrito/Bairro *" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                :rules="lastNameRules" label="Endereço" persistent-hint required></v-text-field>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                      <v-window-item v-model="service">
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['BU',
                                'Medicina',
                                'Cirurgia',
                                'Pediatria',
                                'PAV',
                                'Consulta Externa',
                                'Fisioterapia',
                                'Bloco Operatório']" label="Serviço"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                :rules="lastNameRules" label="Diagnóstico de entrada" persistent-hint
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Data de entrada*" type="date"
                                prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Data de saída*" type="date"
                                prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                :rules="lastNameRules" label="Diagnóstico de saída" persistent-hint
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Clínicos',
                                'Imagem',
                                'Hemotransfusão']" multiple label="Exames complementares"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Melhorado',
                                'Óbito',
                                'Transferência']" label="Tipo de alta"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                :rules="lastNameRules" label="Número de Cama" persistent-hint required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['BCG',
                                'Pentavalente',
                                'Pneumo 13',
                                'Poliomielite',
                                'Rotavirus',
                                'Febre - amarela',
                                'Vitamina A']" label="Vacinas" prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Traumatismo',
                                'Queda',
                                'Acidentes de viação',
                                'Agressão física',
                                'Atropelamento',
                                'Ferimento por arma branca',
                                'Ferimento por arma de fogo']" label="Causas de ocorrências aos Bancos de Urgências"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Imobilização gessada',
                                'Suturas',
                                'Incisão e drenagem',
                                'Curativos']" label="Procedimentos cirúrgicos"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Cirurgias Urgentes',
                                'Cirurgias Electivas',
                                'Tipo de cirurgia',
                                'Diagnóstico']" label="Bloco Operatório"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Vivo',
                                'Morto']" label="Desfecho da cirurgia"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Internamento',
                                'Cuidados Intensivos',
                                'Morgue']" label="Desfecho da cirurgia"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                      <v-window-item v-model="hemotransfusão">
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing"
                                :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
                                label="Número de Hemotransfusões" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Papas de globulos',
                                'Sangue total',
                                'Soro hemático']" label="Tipo de hemotransfusão"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Pesquisa de plasmódio',
                                'Hemograma',
                                'Urina sumária / total']" label="Análises clínicas"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Rx',
                                'TAC',
                                'Ecografia',
                                'Electrocardiografia',
                                'Electrocardiograma',
                                'Ecocardiograma',
                                'Holter']" label="Imagiologia" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <br>
                          <h3>Serviços de urgências</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row> <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Pediatria',
                                'Medicina',
                                'Cirurgia',
                                'Ortopedia',
                                'Ginecologia e Obstetrícia',
                                'ORL',
                                'Estomatologia']" label="Bancos de Urgência"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                          </v-row>

                          <br>
                          <h3>Serviços de internamentos</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row> <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Medicina',
                                'Pediatria',
                                'Cirurgia Geral',
                                'Ortopedia Geral',
                                'Ginecologia e Obstetrícia',
                                'ORL',
                                'Estomatologia',
                                'Medicina',
                                'Cirurgia Pediátrica',
                                'Ortopedia Pediátrica',
                                'Hemodiálise',
                                'Cardiologia',
                                'Dermatologia',
                                'Nutrição',
                                'Neonatologia',
                                'Cuidados Intensivos']" label="Bancos de Urgência"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                          </v-row>

                          <br>
                          <h3>PAV</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['BCG',
                                'Pentavalente',
                                'Pneumo 13',
                                'Poliomielite',
                                'Rotavirus',
                                'Febre - amarela',
                                'Vitamina A']" label="Vacinas" prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <br>
                          <h3>Consulta Externa</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Ginecologia',
                                'Obstetrícia',
                                'Fisiatria',
                                'Ortopedia',
                                'Medicina',
                                'Pediatria',
                                'Pré-natal',
                                'Planeamento familiar',
                                'Estomatologia',
                                'Oftalmologia',
                                'Optometria',
                                'Defectologia',
                                'Dermatologia',
                                'Cardiologia',
                                'Neurologia',
                                'Infecciologia',
                                'Psicologia',
                                'Cirurgia Geral',
                                'Cirurgia Pediátrica',
                                'ORL',
                                'Urologia',
                                'Gastroenterologia',
                                'Neurocirurguia',
                                'Nefrologia',
                                'Psiquiatria',
                                'Pneumologia',
                                'Programa do HIV']" label="Especialidades"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <br>
                          <h3>Procedimentos cirúrgicos</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row>

                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Imobilização gessada',
                                'Suturas',
                                'Incisão e drenagem',
                                'Curativos']" label="Procedimentos cirúrgicos"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>

                          </v-row>
                          <v-row>

                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <h3>Bloco Operatório</h3>
                              <v-autocomplete :disabled="!isEditing" :items="['Imobilização gessada',
                                'Suturas',
                                'Incisão e drenagem',
                                'Curativos']" label="Procedimentos cirúrgicos"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <v-row>

                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <h3>Cuidados intensivos</h3>
                              <v-autocomplete :disabled="!isEditing" :items="['Banco de Urgência',
                                'Enfermaria',
                                'Bloco Operatório']" label="Proveniencia do doente"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                    </v-window>
                  </v-card-text>

                  <v-card-text v-if="useModule.dialog == 'Consulta Externa'">

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                      <v-tab prepend-icon="mdi-account-cog">Serviço</v-tab>
                      <v-tab prepend-icon="mdi-water">Codificação</v-tab>
                      <!-- <v-tab prepend-icon="mdi-water"></v-tab> -->
                    </v-tabs>

                    <v-window v-model="tabs">
                      <v-window-item v-model="details">
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-form fast-fail @submit.prevent>
                                <v-text-field label="Primeiro nome*" name="fname" v-validate="required"
                                  :disabled="!isEditing" v-model="firstName" :counter="10" :rules="firstNameRules"
                                  prepend-inner-icon="mdi-account" required></v-text-field>
                              </v-form></v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Nome do meio"
                                hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="10"
                                :rules="lastNameRules" label="Último nome*" hint="*campo obrigatório" persistent-hint
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Telefone*" type="telephone"
                                prepend-inner-icon="mdi-phone" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="E-mail"
                                prepend-inner-icon="mdi-email-fast-outline" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-select :disabled="!isEditing" :items="['0-17', '18-29', '30-54', '54+']" label="Idade*"
                                prepend-inner-icon="mdi-numeric-7" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Data de nascimento*" type="date"
                                prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Homem', 'Mulher']" label="Sexo"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Domicílio',
                                'Unidade hospitalar',
                                'Via pública']" label="Proveniência*"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Bengo',
                                'Benguela',
                                'Bié',
                                'Cabinda',
                                'Cuando Cubango',
                                'Cuanza Norte',
                                'Cuanza Sul',
                                'Cunene',
                                'Huambo',
                                'Huíla',
                                'Luanda',
                                'Lunda Norte',
                                'Lunda Sul',
                                'Malanje',
                                'Moxico',
                                'Namibe',
                                'Uíge',
                                'Zaire']" label="Província *" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Homem', 'Mulher']" label="Município *"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['São João', 'B. Acádemico']"
                                label="Distrito/Bairro *" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                :rules="lastNameRules" label="Endereço" persistent-hint required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Emanuel Catumbela', 'Nelito Catumbela']"
                                label="Médico *" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Data*" type="date"
                                prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                      <v-window-item v-model="service">
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['BU',
                                'Medicina',
                                'Cirurgia',
                                'Pediatria',
                                'PAV',
                                'Consulta Externa',
                                'Fisioterapia',
                                'Bloco Operatório']" label="Serviço"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                :rules="lastNameRules" label="Diagnóstico de entrada" persistent-hint
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Data de entrada*" type="date"
                                prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" label="Data de saída*" type="date"
                                prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                :rules="lastNameRules" label="Diagnóstico de saída" persistent-hint
                                required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Clínicos',
                                'Imagem',
                                'Hemotransfusão']" multiple label="Exames complementares"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Melhorado',
                                'Óbito',
                                'Transferência']" label="Tipo de alta"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                :rules="lastNameRules" label="Número de Cama" persistent-hint required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['BCG',
                                'Pentavalente',
                                'Pneumo 13',
                                'Poliomielite',
                                'Rotavirus',
                                'Febre - amarela',
                                'Vitamina A']" label="Vacinas" prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Traumatismo',
                                'Queda',
                                'Acidentes de viação',
                                'Agressão física',
                                'Atropelamento',
                                'Ferimento por arma branca',
                                'Ferimento por arma de fogo']" label="Causas de ocorrências aos Bancos de Urgências"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Imobilização gessada',
                                'Suturas',
                                'Incisão e drenagem',
                                'Curativos']" label="Procedimentos cirúrgicos"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Cirurgias Urgentes',
                                'Cirurgias Electivas',
                                'Tipo de cirurgia',
                                'Diagnóstico']" label="Bloco Operatório"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Vivo',
                                'Morto']" label="Desfecho da cirurgia"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Internamento',
                                'Cuidados Intensivos',
                                'Morgue']" label="Desfecho da cirurgia"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                      <v-window-item v-model="hemotransfusão">
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing"
                                :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
                                label="Número de Hemotransfusões" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Papas de globulos',
                                'Sangue total',
                                'Soro hemático']" label="Tipo de hemotransfusão"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Pesquisa de plasmódio',
                                'Hemograma',
                                'Urina sumária / total']" label="Análises clínicas"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Rx',
                                'TAC',
                                'Ecografia',
                                'Electrocardiografia',
                                'Electrocardiograma',
                                'Ecocardiograma',
                                'Holter']" label="Imagiologia" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <br>
                          <h3>Serviços de urgências</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row> <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Pediatria',
                                'Medicina',
                                'Cirurgia',
                                'Ortopedia',
                                'Ginecologia e Obstetrícia',
                                'ORL',
                                'Estomatologia']" label="Bancos de Urgência"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Internamento',
                                'Cuidados Intensivos',
                                'Morgue']" label="Destino" prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                          </v-row>

                          <br>
                          <h3>Serviços de internamentos</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row> <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="[
                                'Medicina',
                                'Pediatria',
                                'Cirurgia Geral',
                                'Ortopedia Geral',
                                'Ginecologia e Obstetrícia',
                                'ORL',
                                'Estomatologia',
                                'Medicina',
                                'Cirurgia Pediátrica',
                                'Ortopedia Pediátrica',
                                'Hemodiálise',
                                'Cardiologia',
                                'Dermatologia',
                                'Nutrição',
                                'Neonatologia',
                                'Cuidados Intensivos']" label="Bancos de Urgência"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                          </v-row>

                          <br>
                          <h3>PAV</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['BCG',
                                'Pentavalente',
                                'Pneumo 13',
                                'Poliomielite',
                                'Rotavirus',
                                'Febre - amarela',
                                'Vitamina A']" label="Vacinas" prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <br>
                          <h3>Consulta Externa</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Ginecologia',
                                'Obstetrícia',
                                'Fisiatria',
                                'Ortopedia',
                                'Medicina',
                                'Pediatria',
                                'Pré-natal',
                                'Planeamento familiar',
                                'Estomatologia',
                                'Oftalmologia',
                                'Optometria',
                                'Defectologia',
                                'Dermatologia',
                                'Cardiologia',
                                'Neurologia',
                                'Infecciologia',
                                'Psicologia',
                                'Cirurgia Geral',
                                'Cirurgia Pediátrica',
                                'ORL',
                                'Urologia',
                                'Gastroenterologia',
                                'Neurocirurguia',
                                'Nefrologia',
                                'Psiquiatria',
                                'Pneumologia',
                                'Programa do HIV']" label="Especialidades"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <br>
                          <h3>Procedimentos cirúrgicos</h3>
                          <!-- <v-divider></v-divider> -->
                          <br>
                          <v-row>

                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete :disabled="!isEditing" :items="['Imobilização gessada',
                                'Suturas',
                                'Incisão e drenagem',
                                'Curativos']" label="Procedimentos cirúrgicos"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>

                          </v-row>
                          <v-row>

                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <h3>Bloco Operatório</h3>
                              <v-autocomplete :disabled="!isEditing" :items="['Imobilização gessada',
                                'Suturas',
                                'Incisão e drenagem',
                                'Curativos']" label="Procedimentos cirúrgicos"
                                prepend-inner-icon="mdi-needle"></v-autocomplete>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                    </v-window>
                  </v-card-text>

                  <v-card-actions class="align-content-end">
                    <v-spacer></v-spacer>
                    <v-btn color="indigo-darken-3" variant="text" @click="handleReset; editModal = false; onclose();"
                      prepend-icon="mdi-close-circle">Fechar</v-btn>

                    <v-btn variant="flat" color="success" type="submit"
                      @click="validate(); checkInput(); SUBMIT_DATA(); if (isOkToSubmit != '') { handleSubmit(), alert = !alert; loading = !loading; dialog = !dialog; }"
                      :ripple="true" :disabled="loading" :loading="loading" prepend-icon="mdi-content-save-outline">
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

              <!-- VIEW MODAL DIALOG -->
              <v-dialog v-model="viewModal" width="1024" transition="dialog-middle-transition" scrollable>
                <template v-slot:activator="{ props }">

                </template>
                <v-card>
                  <v-toolbar color="primary">

                    <v-toolbar-title class="text-h6" bg-color="deep-purple-darken-4"><v-icon class="text-h4">{{
                        useModule.icon
                        }}

                      </v-icon>&nbsp;{{ useModule.text }}:&nbsp;{{ serverItems.length }}</v-toolbar-title>

                    <v-tooltip v-model="vtooltip" location="bottom">
                      <template v-slot:activator="{ props }">

                        <v-btn v-bind="props" role="link" @click="" :disabled="btnEdit"
                          :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                          color="white" variant="text" icon="mdi-arrow-expand"></v-btn>

                        <v-btn v-bind="props" role="link" @click="viewModal = false; onclose();" :disabled="btnEdit"
                          :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                          color="white" variant="text" icon="mdi-close-circle"></v-btn>

                      </template>
                      <span>Fechar</span>
                    </v-tooltip>

                  </v-toolbar>

                  <v-card-text style="height:auto;" v-if="useModule.dialog == 'dWings'" class="pt-1 mt-1">

                    <!-- <ChartComponent></ChartComponent> -->
                    <!-- <v-data-table-virtual :headers="headers" :items="virtualBoats" height="500"
                      item-value="name"></v-data-table-virtual> -->

                    <v-data-table :headers="customeMessagesHistoryHeaders" :items="serverItems" :search="search"
                      show-select return-object :loading="loading" v-model="selected" height="500px" fixed-header
                      :sort-by="[{ key: 'name', order: 'asc' }]">
                      <template v-slot:top>
                        <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                          <v-toolbar-title>
                            <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify" clearable
                              density="compact" variant="outlined" hide-details single-line></v-text-field>
                          </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>


                          <!-- <v-spacer></v-spacer> -->

                          <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                          <v-divider class="mx-4" inset vertical></v-divider>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                            @click="editModal = !editModal; CustomerNew();">

                          </v-btn>

                          <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                            @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                            @click="CUSTOMER_GET_ALL();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                            @click="editModal = !editModal; CustomerNew();">

                          </v-btn>
                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                            @click="showSelected">

                          </v-btn>
                          <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                            <v-card title="Remover Histórico" text="Tem a certeza que deseja remover este
                                histórico?" prepend-icon="mdi-close-thick" max-width="450">
                              <v-card-title class="text-h5"></v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                  @click="CUSTOMER_MESSAGE_HISTORY_DELETE(this.deleteValue.id)">Sim</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" class="me-2" variant="tonal" icon="mdi-play" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn>

                        <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn>

                        <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                          density="compact"
                          @click="editModal = !editModal; this.isEditing = true; CUSTOMER_MESSAGE_HISTORY_GET(item);"></v-btn>

                        <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                          @click="deleteItem(item);"></v-btn>

                        <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                      </template>

                      <template v-slot:no-data>

                      </template>

                    </v-data-table>


                    <!-- <v-data-table v-model:expanded="expanded" :headers="headers" :items="serverItems" item-value="name"
                      show-expand>
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            More info about {{ item.name }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table> -->

                    <!-- <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems"></v-data-table-server> -->

                    <!-- <small>*indicates required field</small> -->

                  </v-card-text>

                  <v-card-text style="height:auto;" v-if="useModule.dialog == 'Contacts'" class="pt-1 mt-1">

                    <!-- <ChartComponent></ChartComponent> -->
                    <!-- <v-data-table-virtual :headers="headers" :items="virtualBoats" height="500"
                      item-value="name"></v-data-table-virtual> -->

                    <v-data-table :headers="headers" :items="serverItems" :search="search" show-select return-object
                      :loading="loading" v-model="selected" height="500px" fixed-header
                      :sort-by="[{ key: 'name', order: 'asc' }]">
                      <template v-slot:top>
                        <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                          <v-toolbar-title>
                            <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify" clearable
                              density="compact" variant="outlined" hide-details single-line></v-text-field>
                          </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>


                          <!-- <v-spacer></v-spacer> -->

                          <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                          <v-divider class="mx-4" inset vertical></v-divider>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                            @click="editModal = !editModal; CustomerNew();">

                          </v-btn>

                          <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                            @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                            @click="CUSTOMER_GET_ALL();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                            @click="editModal = !editModal; CustomerNew();">

                          </v-btn>
                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                            @click="showSelected">

                          </v-btn>
                          <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                            <v-card title="Remover Cliente" text="Tem a certeza que deseja remover este
                                cliente?" prepend-icon="mdi-close-thick" max-width="450">
                              <v-card-title class="text-h5"></v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                  @click="CUSTOMER_DELETE(this.deleteValue.id)">Sim</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                          @click="isEditing = false; editModal = !editModal; CUSTOMER_GET(item);"></v-btn>

                        <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                          density="compact"
                          @click="isEditing = true; editModal = !editModal; CUSTOMER_GET(item);"></v-btn>

                        <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                          @click="deleteItem(item);"></v-btn>

                        <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                      </template>

                      <template v-slot:no-data>

                      </template>

                    </v-data-table>


                    <!-- <v-data-table v-model:expanded="expanded" :headers="headers" :items="serverItems" item-value="name"
                      show-expand>
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            More info about {{ item.name }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table> -->

                    <!-- <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems"></v-data-table-server> -->

                    <!-- <small>*indicates required field</small> -->

                  </v-card-text>

                  <v-card-text style="height:auto;" v-if="useModule.dialog == 'Groups'" class="pt-1 mt-1">

                    <!-- <ChartComponent></ChartComponent> -->
                    <!-- <v-data-table-virtual :headers="headers" :items="virtualBoats" height="500"
                      item-value="name"></v-data-table-virtual> -->

                    <v-data-table :headers="customerGroupsHeaders" :items="serverItems" :search="search" show-select
                      return-object :loading="loading" v-model="selected" height="500px" fixed-header
                      :sort-by="[{ key: 'name', order: 'asc' }]">
                      <template v-slot:top>
                        <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                          <v-toolbar-title>
                            <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify" clearable
                              density="compact" variant="outlined" hide-details single-line></v-text-field>
                          </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>


                          <!-- <v-spacer></v-spacer> -->

                          <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                          <v-divider class="mx-4" inset vertical></v-divider>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                            @click="editModal = !editModal; GroupNew();">

                          </v-btn>

                          <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                            @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                            @click="CUSTOMER_GROUP_GET_ALL();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                            @click="editModal = !editModal; CustomerNew();">

                          </v-btn>
                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                            @click="showSelected">

                          </v-btn>
                          <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                            <v-card title="Remover Grupo" text="Tem a certeza que deseja remover este
                                grupo?" prepend-icon="mdi-close-thick" max-width="450">
                              <v-card-title class="text-h5"></v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                  @click="CUSTOMER_GROUP_DELETE(this.deleteValue.id)">Sim</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_GROUP_GET(item);"></v-btn>

                        <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                          density="compact"
                          @click="editModal = !editModal; this.isEditing = true; CUSTOMER_GROUP_GET(item);"></v-btn>

                        <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                          @click="deleteItem(item);"></v-btn>

                        <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                      </template>

                      <template v-slot:no-data>

                      </template>

                    </v-data-table>


                    <!-- <v-data-table v-model:expanded="expanded" :headers="headers" :items="serverItems" item-value="name"
                      show-expand>
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            More info about {{ item.name }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table> -->

                    <!-- <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems"></v-data-table-server> -->

                    <!-- <small>*indicates required field</small> -->

                  </v-card-text>

                  <v-card-text style="height:auto;" v-if="useModule.dialog == 'Campaigns'" class="pt-1 mt-1">

                    <!-- <ChartComponent></ChartComponent> -->
                    <!-- <v-data-table-virtual :headers="headers" :items="virtualBoats" height="500"
                      item-value="name"></v-data-table-virtual> -->

                    <v-data-table :headers="customeCampaignsHeaders" :items="serverItems" :search="search" show-select
                      return-object :loading="loading" v-model="selected" height="500px" fixed-header
                      :sort-by="[{ key: 'name', order: 'asc' }]">
                      <template v-slot:top>
                        <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                          <v-toolbar-title>
                            <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify" clearable
                              density="compact" variant="outlined" hide-details single-line></v-text-field>
                          </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>


                          <!-- <v-spacer></v-spacer> -->

                          <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                          <v-divider class="mx-4" inset vertical></v-divider>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                            @click="editModal = !editModal; CampaingNew();">

                          </v-btn>

                          <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                            @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                            @click="CUSTOMER_CAMPAIGN_GET_ALL();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                            @click="editModal = !editModal; CampaingNew();">

                          </v-btn>
                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                            @click="showSelected">

                          </v-btn>
                          <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                            <v-card title="Remover Campanha" text="Tem a certeza que deseja remover esta campanha?"
                              prepend-icon="mdi-close-thick" max-width="450">
                              <v-card-title class="text-h5"></v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                  @click="CUSTOMER_CAMPAIGN_DELETE(this.deleteValue.id)">Sim</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" class="me-2" variant="tonal" icon="mdi-play" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                          density="compact"
                          @click="editModal = !editModal; this.isEditing = true; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                          @click="deleteItem(item);"></v-btn>

                        <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                      </template>

                      <template v-slot:no-data>

                      </template>

                    </v-data-table>


                    <!-- <v-data-table v-model:expanded="expanded" :headers="headers" :items="serverItems" item-value="name"
                      show-expand>
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            More info about {{ item.name }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table> -->

                    <!-- <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems"></v-data-table-server> -->

                    <!-- <small>*indicates required field</small> -->

                  </v-card-text>

                  <v-card-text style="height:auto;"
                    v-if="useModule.dialog == 'Messages' | useModule.dialog == 'Chamadas' | useModule.dialog == 'WhatsApp' | useModule.dialog == 'E-mail'"
                    class="pt-1 mt-1">

                    <!-- <ChartComponent></ChartComponent> -->
                    <!-- <v-data-table-virtual :headers="headers" :items="virtualBoats" height="500"
                      item-value="name"></v-data-table-virtual> -->

                    <v-data-table :headers="customeMessagesHeaders" :items="serverItems" :search="search" show-select
                      return-object :loading="loading" v-model="selected" height="500px" fixed-header
                      :sort-by="[{ key: 'name', order: 'asc' }]">
                      <template v-slot:top>
                        <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                          <v-toolbar-title>
                            <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify" clearable
                              density="compact" variant="outlined" hide-details single-line></v-text-field>
                          </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>


                          <!-- <v-spacer></v-spacer> -->

                          <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                          <v-divider class="mx-4" inset vertical></v-divider>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                            @click="editModal = !editModal; MessageNew();">

                          </v-btn>

                          <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                            @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                            @click="CUSTOMER_MESSAGE_GET_ALL(this.itemValue);">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                            @click="editModal = !editModal; MessageNew();">

                          </v-btn>
                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                            @click="showSelected">

                          </v-btn>
                          <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                            <v-card title="Remover Mensagem" text="Tem a certeza que deseja remover esta mensagem?"
                              prepend-icon="mdi-close-thick" max-width="450">
                              <v-card-title class="text-h5"></v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                  @click="CUSTOMER_MESSAGE_DELETE(this.deleteValue.id)">Sim</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" class="me-2" variant="tonal" icon="mdi-play" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_MESSAGE_GET(item);"></v-btn>

                        <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_MESSAGE_GET(item);"></v-btn>

                        <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                          density="compact"
                          @click="editModal = !editModal; this.isEditing = true; CUSTOMER_MESSAGE_GET(item);"></v-btn>

                        <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                          @click="deleteItem(item);"></v-btn>

                        <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                      </template>

                      <template v-slot:no-data>

                      </template>

                    </v-data-table>


                    <!-- <v-data-table v-model:expanded="expanded" :headers="headers" :items="serverItems" item-value="name"
                      show-expand>
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            More info about {{ item.name }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table> -->

                    <!-- <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems"></v-data-table-server> -->

                    <!-- <small>*indicates required field</small> -->

                  </v-card-text>

                  <v-card-text style="height:auto;" v-if="useModule.dialog == 'Histórico'" class="pt-1 mt-1">

                    <!-- <ChartComponent></ChartComponent> -->
                    <!-- <v-data-table-virtual :headers="headers" :items="virtualBoats" height="500"
                      item-value="name"></v-data-table-virtual> -->

                    <v-data-table :headers="customeMessagesHistoryHeaders" :items="serverItems" :search="search"
                      show-select return-object :loading="loading" v-model="selected" height="500px" fixed-header
                      :sort-by="[{ key: 'name', order: 'asc' }]">
                      <template v-slot:top>
                        <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                          <v-toolbar-title>
                            <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify" clearable
                              density="compact" variant="outlined" hide-details single-line></v-text-field>
                          </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>


                          <!-- <v-spacer></v-spacer> -->

                          <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                          <v-divider class="mx-4" inset vertical></v-divider>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                            @click="editModal = !editModal; CampaingNew();">

                          </v-btn>

                          <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                            @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                            @click="CUSTOMER_CAMPAIGN_GET_ALL();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                            @click="editModal = !editModal; CampaingNew();">

                          </v-btn>
                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                            @click="showSelected">

                          </v-btn>
                          <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                            <v-card title="Remover Campanha" text="Tem a certeza que deseja remover esta campanha?"
                              prepend-icon="mdi-close-thick" max-width="450">
                              <v-card-title class="text-h5"></v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                  @click="CUSTOMER_CAMPAIGN_DELETE(this.deleteValue.id)">Sim</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                          density="compact"
                          @click="editModal = !editModal; this.isEditing = true; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                          @click="deleteItem(item);"></v-btn>

                        <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                      </template>

                      <template v-slot:no-data>

                      </template>

                    </v-data-table>


                    <!-- <v-data-table v-model:expanded="expanded" :headers="headers" :items="serverItems" item-value="name"
                      show-expand>
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            More info about {{ item.name }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table> -->

                    <!-- <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems"></v-data-table-server> -->

                    <!-- <small>*indicates required field</small> -->

                  </v-card-text>

                  <v-card-text style="height:auto;" v-if="useModule.dialog == 'Contas'" class="pt-1 mt-1">

                    <!-- <ChartComponent></ChartComponent> -->
                    <!-- <v-data-table-virtual :headers="headers" :items="virtualBoats" height="500"
                      item-value="name"></v-data-table-virtual> -->

                    <v-data-table :headers="customeCampaignsHeaders" :items="serverItems" :search="search" show-select
                      return-object :loading="loading" v-model="selected" height="500px" fixed-header
                      :sort-by="[{ key: 'name', order: 'asc' }]">
                      <template v-slot:top>
                        <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                          <v-toolbar-title>
                            <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify" clearable
                              density="compact" variant="outlined" hide-details single-line></v-text-field>
                          </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>


                          <!-- <v-spacer></v-spacer> -->

                          <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                          <v-divider class="mx-4" inset vertical></v-divider>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                            @click="editModal = !editModal; CampaingNew();">

                          </v-btn>

                          <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                            @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                            @click="CUSTOMER_CAMPAIGN_GET_ALL();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                            @click="editModal = !editModal; CampaingNew();">

                          </v-btn>
                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                            @click="showSelected">

                          </v-btn>
                          <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                            <v-card title="Remover Campanha" text="Tem a certeza que deseja remover esta campanha?"
                              prepend-icon="mdi-close-thick" max-width="450">
                              <v-card-title class="text-h5"></v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                  @click="CUSTOMER_CAMPAIGN_DELETE(this.deleteValue.id)">Sim</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                          density="compact"
                          @click="editModal = !editModal; this.isEditing = true; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                          @click="deleteItem(item);"></v-btn>

                        <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                      </template>

                      <template v-slot:no-data>

                      </template>

                    </v-data-table>


                    <!-- <v-data-table v-model:expanded="expanded" :headers="headers" :items="serverItems" item-value="name"
                      show-expand>
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            More info about {{ item.name }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table> -->

                    <!-- <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems"></v-data-table-server> -->

                    <!-- <small>*indicates required field</small> -->

                  </v-card-text>

                  <v-card-text style="height:auto;" v-if="useModule.dialog == 'Settings'" class="pt-1 mt-1">

                    <!-- <ChartComponent></ChartComponent> -->
                    <!-- <v-data-table-virtual :headers="headers" :items="virtualBoats" height="500"
                      item-value="name"></v-data-table-virtual> -->

                    <v-data-table :headers="customeCampaignsHeaders" :items="serverItems" :search="search" show-select
                      return-object :loading="loading" v-model="selected" height="500px" fixed-header
                      :sort-by="[{ key: 'name', order: 'asc' }]">
                      <template v-slot:top>
                        <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                          <v-toolbar-title>
                            <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify" clearable
                              density="compact" variant="outlined" hide-details single-line></v-text-field>
                          </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>


                          <!-- <v-spacer></v-spacer> -->

                          <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                          <v-divider class="mx-4" inset vertical></v-divider>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                            @click="editModal = !editModal; CampaingNew();">

                          </v-btn>

                          <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                            @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                            @click="CUSTOMER_CAMPAIGN_GET_ALL();">
                          </v-btn>

                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                            @click="editModal = !editModal; CampaingNew();">

                          </v-btn>
                          <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                            @click="showSelected">

                          </v-btn>
                          <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                            <v-card title="Remover Campanha" text="Tem a certeza que deseja remover esta campanha?"
                              prepend-icon="mdi-close-thick" max-width="450">
                              <v-card-title class="text-h5"></v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                <v-btn color="blue-darken-1" variant="text"
                                  @click="CUSTOMER_CAMPAIGN_DELETE(this.deleteValue.id)">Sim</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                          @click="editModal = !editModal; isEditing = false; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                          density="compact"
                          @click="editModal = !editModal; this.isEditing = true; CUSTOMER_CAMPAIGN_GET(item);"></v-btn>

                        <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                          @click="deleteItem(item);"></v-btn>

                        <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                      </template>

                      <template v-slot:no-data>

                      </template>

                    </v-data-table>


                    <!-- <v-data-table v-model:expanded="expanded" :headers="headers" :items="serverItems" item-value="name"
                      show-expand>
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Expandable Table</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                          <td :colspan="columns.length">
                            More info about {{ item.name }}
                          </td>
                        </tr>
                      </template>
                    </v-data-table> -->

                    <!-- <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems"></v-data-table-server> -->

                    <!-- <small>*indicates required field</small> -->

                  </v-card-text>


                  <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="viewModal = false">
                      Fechar
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="viewModal = false">
                      Guardar
                    </v-btn>
                  </v-card-actions> -->
                </v-card>
              </v-dialog>

              <!-- ALERT MODAL DIALOG -->
              <v-dialog width='750' v-model="alertModal" v-if="alert">
                <template #activator="{ props }">
                </template>

                <v-fade-transition hide-on-leave>
                  <v-card v-if="alertModal" append-icon="$close" class="mx-auto" elevation="16" width="600"
                    title="Send a receipt">
                    <template v-slot:append>
                      <v-btn icon="$close" variant="text" @click="alertModal = false"></v-btn>
                    </template>

                    <v-divider></v-divider>

                    <div class="py-12 text-center">
                      <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>

                      <div class="text-h4 font-weight-bold">This receipt was sent</div>
                    </div>

                    <v-divider></v-divider>

                    <div class="pa-4 text-end">
                      <v-btn class="text-none" color="medium-emphasis" min-width="92" rounded variant="outlined"
                        @click="alertModal = false">
                        Close
                      </v-btn>
                    </div>
                  </v-card>
                </v-fade-transition>

              </v-dialog>

              <!-- FILTER MODAL DIALOG -->
              <v-dialog width='750' v-model="filterModal">
                <template #activator="{ props }">
                </template>

                <v-fade-transition hide-on-leave>
                  <v-card v-if="filterModal" append-icon="$close" class="mx-auto" elevation="16" width="600"
                    title="Send a receipt">
                    <template v-slot:append>
                      <v-btn icon="$close" variant="text" @click="filterModal = false"></v-btn>
                    </template>

                    <v-divider></v-divider>

                    <div class="py-12 text-center">
                      <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>

                      <div class="text-h4 font-weight-bold">This receipt was sent</div>
                    </div>

                    <v-divider></v-divider>

                    <div class="pa-4 text-end">
                      <v-btn class="text-none" color="medium-emphasis" min-width="92" rounded variant="outlined"
                        @click="filterModal = false">
                        Close
                      </v-btn>
                    </div>
                  </v-card>
                </v-fade-transition>

              </v-dialog>

              <!-- LOADER MODAL DIALOG -->
              <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
                <v-card color="primary">
                  <v-card-text>
                    A Processar...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>


              <!-- GO-PLAY MODAL DIALOG -->
              <v-dialog width='850' v-model="goPlayModal" v-on:close="" v-on:open="beforeOpen" persistent>
                <template #activator="{ props }">
                </template>

                <v-card>
                  <v-toolbar color="purple-darken-4">
                    <template v-slot:prepend>
                      <v-toolbar-title class="text-h6" bg-color="purple-darken-4"><v-icon
                          class="text-h4">mdi-send-circle</v-icon>&nbsp;D-WINGS</v-toolbar-title>
                    </template>

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

                          <v-btn v-bind="props" role="link" @click="goPlayModal = false; onclose();" :disabled="btnEdit"
                            :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                            color="white" variant="text" icon="mdi-close-circle"></v-btn>

                        </template>
                        <span>Fechar</span>
                      </v-tooltip>
                    </template>
                  </v-toolbar>


                  <v-alert type="info" v-if="dwGroup != '' & dWingsMode == 'Múltiplos'" transition="slide-y-transition"
                    border="start" variant="tonal" closable>Esta mensagem será enviada para {{
                    this.groupMembersList.length
                    }} contactos! </v-alert>

                  <v-alert type="error" title="Sucesso" v-model="noMsgCredit" transition="slide-y-transition"
                    border="start" variant="tonal" closable
                    text="Não tens crédito disponível para enviar mensagens!"></v-alert>

                  <v-alert type="success" title="Sucesso" v-model="alertSuccess" transition="slide-y-transition"
                    border="start" variant="tonal" closable
                    text="As suas alterações foram gravadas com sucesso!"></v-alert>

                  <v-alert type="warning" title="Sucesso" v-model="alertDelete" transition="slide-y-transition"
                    border="start" variant="tonal" closable text="Registo removido com sucesso!"></v-alert>

                  <v-card-text>
                    <v-alert v-model="ActEmpty" class="mb-5 mt-5" border="start" variant="tonal" closable
                      close-label="Close Alert" color="warning" title="Atenção!" type="warning">
                      Preencha todos os campos abaixo!
                    </v-alert>

                    <v-tabs v-model="tabs" align-tabs="centered">
                      <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                      <v-tab prepend-icon="mdi-history">Histórico</v-tab>
                    </v-tabs>

                    <v-window v-model="tabs" class="pb-0 mb-0">
                      <v-window-item v-model="details">
                        <!-- <v-card> -->
                        <!-- <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title> -->


                        <v-card-text>
                          <!-- <v-container> -->
                          <v-row v-if="devType == 'Desktop'">
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field variant="solo" :disabled="false" label="ID" id="CID" v-model="dwID"
                                prepend-inner-icon="mdi-key" hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-autocomplete variant="solo" :disabled="!isEditing" id="cellFlex"
                                v-model="dWingsMode" :items="['Singular', 'Múltiplos']" label="Modo de envio"
                                prepend-inner-icon="mdi-shuffle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwCategory"
                                :items="['SMS', 'Telefone', 'WhatsApp', 'E-mail']" :item-value="'SMS'" label="Categoria"
                                prepend-inner-icon="mdi-cube-send"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0" v-show="dWingsMode == 'Múltiplos'">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwGroup"
                                :items="cellGroupList" :change="CUSTOMER_GROUP_MEMBERS_GET_ALL(dwGroup)"
                                :item-value="cellGroupListID" label="Grupo"
                                prepend-inner-icon="mdi-account-multiple"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == '' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwContact"
                                label="Contactos" :items="cellContactList[1]" :item-value="cellContactList[0]"
                                prepend-inner-icon="mdi-account"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == 'SMS' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwSms"
                                label="Contactos" :items="cellContactList" :item-value="cellContactList[0]"
                                prepend-inner-icon="mdi-account"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == 'Telefone' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwPhone"
                                label="Telefone" :items="cellContactList" :item-value="cellContactListID"
                                prepend-inner-icon="mdi-phone"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == 'WhatsApp' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwWhatsApp"
                                label="WhatsApp" :items="cellContactList" :item-value="cellContactListID"
                                prepend-inner-icon="mdi-whatsapp"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == 'E-mail' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwEmail" label="E-mail"
                                prepend-inner-icon="mdi-email-fast-outline"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field variant="solo" :disabled="!isEditing" label="Data de Envio" type="date"
                                v-model="dwDate" prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field variant="solo" :disabled="!isEditing" label="Hora" type="time"
                                v-model="dwTime" prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0" v-if="dWingsMode == 'Singular'">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwTitle"
                                :items="cellMessageList" :change="CUSTOMER_MESSAGE1_GET(dwTitle)"
                                :menu-props="{ closeOnContentClick: true }" label="Mensagem"
                                append-icon-inner="mdi-comment-search"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete variant="solo" v-model="dwStat"
                                :items="['Novo', 'Em Espera', 'Cancelado', 'Concluído']" label="Estado"
                                prepend-inner-icon="mdi-state-machine"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete variant="solo" :disabled="!isEditing" v-model="dwCampaign"
                                v-if="dWingsMode == 'Múltiplos'" :items="cellCampaignList"
                                :change="CUSTOMER_CAMPAIGN1_GET(dwCampaign)" label="Campanha"
                                prepend-inner-icon="mdi-forum"></v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="12" md="12" class="pa-0 ma-0">
                              <v-textarea variant="solo" :disabled="!isEditing" label="Descrição*"
                                v-model="dwMessage" :counter="200" :readonly="true" :rules="lastNameRules"
                                prepend-inner-icon="mdi-message-text-outline" required></v-textarea>
                            </v-col>
                          </v-row>

                          <v-row v-if="devType != 'Desktop'">
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field density="compact" :disabled="false" label="ID" id="CID" v-model="dwID"
                                prepend-inner-icon="mdi-key" hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-autocomplete density="compact" :disabled="!isEditing" id="cellFlex"
                                v-model="dWingsMode" :items="['Singular', 'Múltiplos']" label="Modo de envio"
                                prepend-inner-icon="mdi-shuffle"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-autocomplete density="compact" :disabled="!isEditing" v-model="dwCategory"
                                :items="['SMS', 'Telefone', 'WhatsApp', 'E-mail']" :item-value="'SMS'" label="Categoria"
                                prepend-inner-icon="mdi-cube-send"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0" v-show="dWingsMode == 'Múltiplos'">
                              <v-autocomplete variant="underlined" :disabled="!isEditing" v-model="dwGroup"
                                :items="cellGroupList" :change="CUSTOMER_GROUP_MEMBERS_GET_ALL(dwGroup)"
                                :item-value="cellGroupListID" label="Grupo"
                                prepend-inner-icon="mdi-account-multiple"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == '' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="underlined" :disabled="!isEditing" v-model="dwContact"
                                label="Contactos" :items="cellContactList[1]" :item-value="cellContactList[0]"
                                prepend-inner-icon="mdi-account"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == 'SMS' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="underlined" :disabled="!isEditing" v-model="dwSms"
                                label="Contactos" :items="cellContactList" :item-value="cellContactList[0]"
                                prepend-inner-icon="mdi-account"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == 'Telefone' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="underlined" :disabled="!isEditing" v-model="dwPhone"
                                label="Telefone" :items="cellContactList" :item-value="cellContactListID"
                                prepend-inner-icon="mdi-phone"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == 'WhatsApp' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="underlined" :disabled="!isEditing" v-model="dwWhatsApp"
                                label="WhatsApp" :items="cellContactList" :item-value="cellContactListID"
                                prepend-inner-icon="mdi-whatsapp"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0"
                              v-if="msgCategory == 'E-mail' & dWingsMode == 'Singular'">
                              <v-autocomplete variant="underlined" :disabled="!isEditing" v-model="dwEmail"
                                label="E-mail" prepend-inner-icon="mdi-email-fast-outline"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field variant="underlined" :disabled="!isEditing" label="Data de Envio"
                                type="date" v-model="dwDate" prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                              <v-text-field variant="underlined" :disabled="!isEditing" label="Hora" type="time"
                                v-model="dwTime" prepend-inner-icon="mdi-calendar" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0" v-if="dWingsMode == 'Singular'">
                              <v-autocomplete variant="underlined" :disabled="!isEditing" v-model="dwTitle"
                                :items="cellMessageList" :change="CUSTOMER_MESSAGE1_GET(dwTitle)"
                                :menu-props="{ closeOnContentClick: true }" label="Mensagem"
                                append-icon-inner="mdi-comment-search"
                                prepend-inner-icon="mdi-set-center"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete variant="underlined" v-model="dwStat"
                                :items="['Novo', 'Em Espera', 'Cancelado', 'Concluído']" label="Estado"
                                prepend-inner-icon="mdi-state-machine"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-0">
                              <v-autocomplete variant="underlined" :disabled="!isEditing" v-model="dwCampaign"
                                v-if="dWingsMode == 'Múltiplos'" :items="cellCampaignList"
                                :change="CUSTOMER_CAMPAIGN1_GET(dwCampaign)" label="Campanha"
                                prepend-inner-icon="mdi-forum"></v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="12" md="12" class="pa-0 ma-0">
                              <v-textarea variant="outlined" :disabled="!isEditing" label="Descrição*"
                                v-model="dwMessage" :counter="200" :readonly="true" :rules="lastNameRules"
                                prepend-inner-icon="mdi-message-text-outline" required></v-textarea>
                            </v-col>
                          </v-row>
                          <!-- </v-container> -->
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>

                        <!-- </v-card> -->
                      </v-window-item>
                      <v-window-item v-model="options">
                        <v-card-text>
                          <!-- <v-container> -->
                          <v-row>
                            <v-data-table :headers="headers" :items="serverItems1" :search="search" show-select
                              return-object :loading="loading" v-model="selected" height="500px" fixed-header
                              :sort-by="[{ key: 'name', order: 'asc' }]">
                              <template v-slot:top>
                                <v-toolbar flat style="border-bottom:solid #0277BD 5px;">
                                  <v-toolbar-title>
                                    <v-text-field v-model="search" label="Procurar" prepend-inner-icon="mdi-magnify"
                                      clearable density="compact" variant="outlined" hide-details
                                      single-line></v-text-field>
                                  </v-toolbar-title>
                                  <v-divider class="mx-4" inset vertical></v-divider>


                                  <!-- <v-spacer></v-spacer> -->

                                  <span id="totalr"><b>Escolha:</b>&nbsp;{{ selected.length }}</span>

                                  <v-divider class="mx-4" inset vertical></v-divider>

                                  <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-plus-thick" dark
                                    @click="editModal = !editModal; CustomerNew();">

                                  </v-btn>

                                  <v-btn class="mb-2" color="danger" size="large" prepend-icon="mdi-content-copy" dark
                                    @click="editModal = !editModal; ACCOUNT_DUPLICATE();">
                                  </v-btn>

                                  <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-cloud-refresh" dark
                                    @click="CUSTOMER_GET_ALL();">
                                  </v-btn>

                                  <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-upload" dark
                                    @click="editModal = !editModal; CustomerNew();">

                                  </v-btn>
                                  <v-btn class="mb-2" color="primary" size="large" prepend-icon="mdi-download" dark
                                    @click="showSelected">

                                  </v-btn>
                                  <v-dialog v-model="dialogDelete" max-width="500px" width="auto">
                                    <v-card title="Remover Cliente" text="Tem a certeza que deseja remover este
                                cliente?" prepend-icon="mdi-close-thick" max-width="450">
                                      <v-card-title class="text-h5"></v-card-title>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                                        <v-btn color="blue-darken-1" variant="text"
                                          @click="CUSTOMER_DELETE(this.deleteValue.id)">Sim</v-btn>
                                        <v-spacer></v-spacer>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </v-toolbar>
                              </template>
                              <template v-slot:item.actions="{ item }">
                                <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline"
                                  density="compact"
                                  @click="editModal = !editModal; isEditing = false; CUSTOMER_GET(item);"></v-btn>

                                <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                                  density="compact"
                                  @click="editModal = !editModal; this.isEditing = true; CUSTOMER_GET(item);"></v-btn>

                                <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                                  @click="deleteItem(item);"></v-btn>

                                <!-- <v-btn color="primary" @click="initialize">
                          Reset
                        </v-btn> -->

                              </template>

                              <template v-slot:no-data>

                              </template>

                            </v-data-table>

                          </v-row>
                          <!-- </v-container> -->
                          <small>*indicates required field</small>
                        </v-card-text>
                      </v-window-item>
                    </v-window>
                  </v-card-text>

                  <v-card-actions class="align-content-end pt-0 mt-0">
                    <v-spacer></v-spacer>
                    <v-btn color="indigo-darken-3" variant="text" @click="handleReset; goPlayModal = false; onclose();"
                      prepend-icon="mdi-close-circle">Fechar</v-btn>

                    <v-btn variant="flat" color="success" type="submit"
                      @click="validate(); checkInput(); SMS_SEND(); CUSTOMER_MESSAGE_HISTORY_SAVE(); if (isOkToSubmit != '') { handleSubmit(), alert = !alert; loading = !loading; dialog = !dialog; }"
                      :ripple="true" :disabled="loading" :loading="loading" prepend-icon="mdi-content-save-outline">
                      Submeter
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
              <!-- <v-dialog
      v-model="isDialogOpenMsg"
      width="1024"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="*campo obrigatório"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

            </div>



            <v-sheet class="pa-4 pb-0" elevation="0" height="auto" width="100%">


              <v-table density="compact" class="mr-5" v-if="devType == 'Desktop'"
                style="font-size: 10pt; width: 180%; table-layout: fixed; overflow-x:hidden; display: inline-block; height: 245px;">
                <thead>
                  <tr>
                    <!-- <th class="text-left">
                      ID
                    </th> -->
                    <th class="text-left">
                      Nome Completo
                    </th>
                    <th class="text-left">
                      Contacto
                    </th>
                    <!-- <th class="text-left">
                              Quant.
                            </th> -->
                    <th class="text-left">
                      Email
                    </th>
                    <th class="text-left">
                      Autor
                    </th>
                    <th class="text-left">
                      Acções
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in allContacts" :key="item.id">
                    <!-- <td>{{ item.id }}</td> -->
                    <td>{{ item.fullname }}</td>
                    <td>{{ item.home }}</td>
                    <!-- <td>1</td> -->
                    <td>{{ item.email }}</td>
                    <td>{{ item.admin }}</td>
                    <td>

                      <v-btn color="primary" class="me-2" variant="tonal" icon="mdi-play" density="compact"
                        @click="useModule.dialog = 'Contacts'; useModule.title = 'Contacto'; editModal = !editModal; isEditing = false; CUSTOMER_GET(item);"></v-btn>

                      <!-- <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                        @click="useModule.dialog = 'Contacts'; useModule.title = 'Contacto'; editModal = !editModal; isEditing = false;  CUSTOMER_GET(item);"></v-btn>

                      <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                        density="compact" openEditDialog
                        @click="useModule.dialog = 'Contacts'; useModule.title = 'Contacto'; editModal = !editModal; this.isEditing = true; CUSTOMER_GET(item);"></v-btn>

                      <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                        @click="deleteItem(item);"></v-btn> -->

                    </td>
                  </tr>
                </tbody>
              </v-table>
              <v-table density="compact" v-if="devType != 'Desktop'"
                style="font-size: 10pt; width: 200%; table-layout: fixed; overflow-x:hidden; display: inline-block; height: 135px; max-width:265px;">
                <thead>
                  <tr>

                    <th class="text-left">
                      Nome Completo
                    </th>
                    <th class="text-left">
                      Contacto
                    </th>
                    <!-- <th class="text-left">
                              Quant.
                            </th> -->
                    <th class="text-left">
                      Email
                    </th>
                    <th class="text-left">
                      Autor
                    </th>
                    <th class="text-left">
                      Acções
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in allContacts" :key="item.id">
                    <!-- <td>{{ item.id }}</td> -->
                    <td>{{ item.fullname }}</td>
                    <td>{{ item.home }}</td>
                    <!-- <td>1</td> -->
                    <td>{{ item.email }}</td>
                    <td>{{ item.admin }}</td>
                    <td>

                      <v-btn color="primary" class="me-2" variant="tonal" icon="mdi-play" density="compact"
                        @click="useModule.dialog = 'Contacts'; useModule.title = 'Contacto'; editModal = !editModal; isEditing = false; CUSTOMER_GET(item);"></v-btn>

                      <!-- <v-btn color="primary" class="me-2" variant="text" icon="mdi-eye-outline" density="compact"
                        @click="useModule.dialog = 'Contacts'; useModule.title = 'Contacto'; editModal = !editModal; isEditing = false;  CUSTOMER_GET(item);"></v-btn>

                      <v-btn color="bg-orange-darken-4" class="me-2" variant="text" icon="mdi-pencil-outline"
                        density="compact" openEditDialog
                        @click="useModule.dialog = 'Contacts'; useModule.title = 'Contacto'; editModal = !editModal; this.isEditing = true; CUSTOMER_GET(item);"></v-btn>

                      <v-btn color="danger" variant="text" icon="mdi-delete-outline" density="compact"
                        @click="deleteItem(item);"></v-btn> -->

                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>

          </v-sheet>
        </v-container>

        <br>
        <br>
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
    multipleSendDW: true,
    msgCounter: '0',
    devType: '',
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
    tabMenus: [
      // { text: 'Dashboard', icon: 'mdi-view-dashboard', to: '/', descr: 'Secção de Gráficos', dialog: 'isDialogOpen' },
      //{ text: 'D-Wings', icon: 'mdi-send', to: 'd-Wings', descr: 'Envio de Mensagensd', dialog: 'dWings', size: '400px' },
      { text: 'Contactos', icon: 'mdi-account', to: 'contacts', descr: 'Directório de Contactos', dialog: 'Contacts', size: '400px' },
      { text: 'Grupos', icon: 'mdi-account-group', to: 'groups', descr: 'Directório de Grupos de Contactos', dialog: 'Groups', size: '400px' },
      { text: 'Campanhas', icon: 'mdi-account-voice', to: 'campaigns', descr: 'Campanhas', dialog: 'Campaigns' },
      // { text: 'Agendamento', icon: 'mdi-account-clock', to: 'calendar', descr: 'Agendamento', dialog: 'Booking' },
      { text: 'Mensagens', icon: 'mdi-message-plus', to: 'message', descr: 'Mensagens', dialog: 'Messages' },
      { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', dialog: 'Chamadas' },
      { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', dialog: 'WhatsApp' },
      { text: 'E-mail', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', dialog: 'E-mail' },
      { text: 'Histórico', icon: 'mdi-history', to: 'history', descr: 'Acesse ao hsitóricos de operações', dialog: 'Histórico' },
      { text: 'Contas', icon: 'mdi-key', to: 'account', descr: 'Contas de utilizadores', dialog: 'Contas' },
      { text: 'Definições', icon: 'mdi-cog', to: 'settings', descr: 'Configirações gerais', dialog: 'Settings' }
    ],

    topMenus: [
      { text: 'Ver Relatórios', icon: 'mdi-chart-box-outline', to: 'contacts', descr: 'Ver Relatórios', dialog: 'Doente', size: '400px' },
      { text: 'Sessões', icon: 'mdi-account-switch', to: 'contacts', descr: 'Sessões', dialog: 'Doente', size: '400px' },
      { text: 'Configurações', icon: 'mdi-cog', to: 'contacts', descr: 'Configurações', dialog: 'Doente', size: '400px' }
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
    
    // var user = detect.parse(navigator.userAgent)  
    // window.localStorage.setItem('MOB', user.device.type);
    
    // this.devType = user.device.type

    this.devType = window.localStorage.getItem('MOB')
    this.msgCounter = this.messageCounter
    // alert(this.devType)

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
