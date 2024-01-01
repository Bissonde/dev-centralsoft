<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>

  <div v-show="true" bg-color="white"></div>

  <v-sheet>
    <v-form fast-fail @submit.prevent v-show="viewMainForm">
      <v-app theme="light">
        <v-app-bar flat class="border-b" density="compact">
          <!-- <v-app-bar density="compact" prominent> -->
          <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" class="text-h5" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>
            <v-icon icon="mdi-view-grid" size="large" start />
            <b>Central Soft</b></v-app-bar-title>

          <v-spacer></v-spacer>
          <v-text-field hide-details label="Procurar..." single-line></v-text-field>


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
                <v-avatar v-bind="props">
                     
            <v-tooltip location="top">
              <template v-slot:activator="{ props: tooltip }">
                
                    <v-img id="myImg" cover v-bind:style="{ backgroundImage: 'url(' + myPicture + ')'}" v-bind="mergeProps(menu, tooltip)"></v-img>
               
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
                <v-list-item v-bind="props" prepend-icon="mdi-account" title="Clients" ></v-list-item>
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
          <v-container class="mx-auto mb-0 py-0" elevation="12" fluid style="width: 97%">


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

            <v-sheet class="pa-1 mt-1 pb-1 mb-1" elevation="12" height="auto" width="100%">
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

              <v-row>
                <v-col cols="8">
                  <!-- <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon>mdi-finance</v-icon>&nbsp;Estatísticas</h1> -->
                  <v-btn variant="text"  v-on:click="moduleStore.setModule(topMenus[0]);" v-model="useModule.name" @click="openDialog(n); viewModal = !viewModal">
                    <v-icon color="primary">
                      mdi-chart-box-outline
                    </v-icon>
                    &nbsp;Ver Relatórios
                  </v-btn>
                  <v-btn variant="text" v-on:click="moduleStore.setModule(topMenus[1]);" v-model="useModule.name" @click="openDialog(n); viewModal = !viewModal">
                    <v-icon color="primary">
                      mdi-account-switch
                    </v-icon>
                    &nbsp;Sessões
                  </v-btn>
                  <v-btn variant="text" v-on:click="moduleStore.setModule(topMenus[2]);" v-model="useModule.name" @click="openDialog(n); viewModal = !viewModal">
                    <v-icon color="primary">
                      mdi-cog
                    </v-icon>
                    &nbsp;Configurações
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <v-btn variant="text" @click="openDialog(n); viewModal = !viewModal">
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

                </v-col>
              </v-row>


            </v-sheet>

            <v-sheet class="pa-4 pb-10" elevation="12" height="auto" width="100%">

              <v-row>
                <v-col cols="9">
                  <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                      class="text-h3">mdi-chart-bubble</v-icon>&nbsp;Dashboard
                  </h1>
                  <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última actualização:
                    22/05/2023</i>
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
              <v-divider class="mb-6"></v-divider>


              <v-row cols="12" sm="6" md="6" lg="6">
                <v-sheet class="mx-auto" max-width="100%" height="auto">
                  <v-slide-group show-arrows>
                    <v-slide-group-item v-for="(n, index) in tabMenus" :key="n" v-slot="{ isSelected, toggle }">
                      <v-hover v-slot="{ isHovering, props }">
                        <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                          style="background-color: #CFD8DC; height: auto; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px; border-top-left-radius: 10px 10px; border-top-right-radius: 10px 10px;"
                          class="pa-0 ml-1 pr-1 mr-1 mb-0 mx-auto">

                          <!-- #263238 -->

                          <v-btn variant="text" class="float-sm-right"
                            @click.stop="openDialog(n.dialog); moduleStore.setModule(n); editModal = !editModal;">
                            <v-icon color="orange-darken-4" end>
                              mdi-open-in-new
                            </v-icon>
                          </v-btn>

                          <v-card-title>
                            <v-icon class="text-h5">{{ n.icon }}</v-icon>&nbsp;{{ n.title }}
                            <v-label class="text-h6">{{ n.text }}</v-label>
                          </v-card-title>
                          <v-card-actions class="d-flex justify-end">
                            <v-btn variant="text"
                              @click.stop="openDialog(n); moduleStore.setModule(n.dialog); editModal = !editModal;"
                              v-on:click="moduleStore.setModule(n);" v-model="useModule.name"
                              v-bind="props">Adicionar</v-btn>
                            <v-btn variant="plain" class="float-sm-left">
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
            <v-sheet class="pa-4" elevation="12" height="auto" width="100%">
              <v-row cols="12" sm="12" md="12" lg="12">
                <v-col cols="9">
                  <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                      class="text-h3">mdi-chart-bar</v-icon>&nbsp;Gráficos</h1>
                  <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última actualização:
                    22/05/2023</i>
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

              <v-divider class="mb-6"></v-divider>

              <v-sheet class="d-flex d-lg-flex flex-wrap">
                <v-sheet class="flex-1-0" style="height: auto">

                  <v-hover v-slot="{ isHovering, props }">
                    <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                      style="height: 100%; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;"
                      class="pa-1 mt-2 pr-1 mr-1 mb-14 mx-auto transition-swing">
                      <!-- 0000000000 -->
                      <!-- <v-card align-center> -->

                      <v-row>
                        <v-col cols="8">
                          <h6 class=" text-subtitle-2 font-weight-bold mb-1"><v-icon>mdi-chart-pie</v-icon>&nbsp;Volume
                          </h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="text" class="float-sm-right text-caption" @click="openDialog(n); viewModal = !viewModal">
                            <v-icon color="primary">
                              mdi-open-in-new
                            </v-icon>
                            &nbsp;
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row cols="10" sm="3" md="3" lg="3">
                        <v-sheet cols="3" class="mx-auto mb-0 ma-0 pa-3" height="250" width="98%">
                          <ChartComponent style="width:auto; max-width:auto;"></ChartComponent>

                          <!-- <br> -->
                          <br>
                          <h3>Top Key Performance Indicators</h3>
                          <v-table density="compact" style="width:auto; max-height:150px; overflow-y:scroll;">
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Name
                                </th>
                                <th class="text-left">
                                  Calories
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in desserts" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td>{{ item.calories }}</td>
                              </tr>
                            </tbody>
                          </v-table>
                        </v-sheet>
                      </v-row>
                      <!-- </v-sheet>
                        </v-sheet>
                      </v-sheet> -->
                    </div>
                  </v-hover>
                </v-sheet>

                <v-sheet class="flex-1-0" style="width:auto;height:auto;">
                  <v-sheet class="d-flex flex-wrap">
                    <v-sheet class="flex-1-1 ma-1 pa-1">
                      <v-row>
                        <v-col cols="8">
                          <h6 class="text-body-2 font-weight-bold mb-1"><v-icon>mdi-play-speed</v-icon>&nbsp;Volume
                          </h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="text" class="float-sm-right text-caption"
                            @click="openDialog(n); viewModal = !viewModal">
                            <v-icon color="primary">
                              mdi-open-in-new
                            </v-icon>
                            &nbsp;
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-hover v-slot="{ isHovering, props }">
                        <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                          style="height: 200px; width:auto;   border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;"
                          class="pa-0 mt-0 pr-1 mx-auto transition-swing">
                          <!-- 1111111111 -->
                          <ChartComponent1></ChartComponent1>
                        </div>
                      </v-hover>
                    </v-sheet>

                    <v-sheet class="flex-1-1 ma-1 pa-1" style="max-width:500px;">
                      <v-row>
                        <v-col cols="8">
                          <h6 class="text-body-2 font-weight-bold mb-1"><v-icon>mdi-poll</v-icon>&nbsp;Volume</h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="text" class="float-sm-right text-caption"
                            @click="openDialog(n); viewModal = !viewModal">
                            <v-icon color="primary">
                              mdi-open-in-new
                            </v-icon>
                            &nbsp;
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-hover v-slot="{ isHovering, props }">
                        <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                          style="height: 200px; width:auto; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;"
                          class="pa-1 mt-0 pr-1 mr-1 mb-2 mx-auto pa-6 transition-swing">
                          <!-- 2222222222 -->
                          <ChartComponent2></ChartComponent2>
                        </div>
                      </v-hover>
                    </v-sheet>
                  </v-sheet>
                  
                                      <br>

                  <v-sheet class="d-flex flex-wrap">
                    <v-sheet class="flex-1-1 ma-1 pa-1">
                      <v-row>
                        <v-col cols="8">
                          <h6 class="text-body-2 font-weight-bold mb-1"><v-icon>mdi-speedometer</v-icon>&nbsp;Volume
                          </h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="text" class="float-sm-right text-caption"
                            @click="openDialog(n); viewModal = !viewModal">
                            <v-icon color="primary">
                              mdi-open-in-new
                            </v-icon>
                            &nbsp;
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-hover v-slot="{ isHovering, props }">
                        <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                          style="height: 200px; width:auto; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;"
                          class="pa-1 mt-0 pr-1 mr-1 mb-2 mx-auto pa-6 transition-swing">
                          <!-- 3333333333 -->
                          <ChartComponent3></ChartComponent3>
                        </div>
                      </v-hover>
                    </v-sheet>

                    <v-sheet class="flex-1-1 ma-1 pa-1">
                      <v-row>
                        <v-col cols="8">
                          <h6 class="text-body-2 font-weight-bold mb-1">
                            <v-icon>mdi-sitemap-outline</v-icon>&nbsp;Volume
                          </h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="text" class="float-sm-right text-caption"
                            @click="openDialog(n); viewModal = !viewModal">
                            <v-icon color="primary">
                              mdi-open-in-new
                            </v-icon>
                            &nbsp;
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-hover v-slot="{ isHovering, props }">
                        <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                          style="height: 200px; width:auto; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;"
                          class="pa-1 mt-0 pr-1 mr-1 mb-2 mx-auto pa-6 transition-swing">
                          <!-- 4444444444 -->
                          <ChartComponent4></ChartComponent4>
                        </div>
                      </v-hover>
                    </v-sheet>

                  </v-sheet>
                </v-sheet>
                <br>
              </v-sheet>
            </v-sheet>

            <br>
            <v-sheet class="pa-4" elevation="12" height="auto" width="100%">
              <v-row>
                <v-col cols="9">
                  <h1 class="text-h6 text-md-h5 font-weight-bold mb-1"><v-icon
                      class="text-h3">mdi-finance</v-icon>&nbsp;Estatísticas
                  </h1>
                  <i class="float-sm-left text-body-2"><v-icon icon="mdi-clock-fast"></v-icon>&nbsp;Última
                    actualização:
                    22/05/2023</i>
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

              <v-divider class="mb-6"></v-divider>

              <v-row cols="12" sm="3" md="3" lg="3" class="ma-0 pa-0 ml-0" style="background-color: white;">
                <v-col class="pr-0 pt-0 ma-0" v-for="n in  statsMenu" :key="n">
                  <v-hover v-slot="{ isHovering, props }">
                    <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`" class="mx-auto transition-swing"
                      style="border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-card v-bind="props" :class="n.class">

                          <v-icon class="text-h5">{{ n.icon }}</v-icon>&nbsp;{{ n.nr }}
                          <br><b class="text-body-2">{{ n.text }}</b>

                          <v-overlay :model-value="isHovering" contained scrim="#036358"
                            class="align-center justify-center">
                            <v-btn variant="flat" color="bg-secondary" v-on:click="moduleStore.setModule(n);" v-model="useModule.name"
                              @click="openDialog(n); viewModal = !viewModal"><v-icon>mdi-information-outline</v-icon>&nbsp;Detalhes</v-btn>
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

            <v-sheet class="pa-4 pb-10" elevation="12" height="auto" width="100%">
              <v-row>
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
                        <v-toolbar-title bg-color="deep-purple-darken-4" v-model="useModule.name"><v-icon
                            class="text-h4">{{ useModule.icon
                            }}</v-icon>&nbsp;{{
  useModule.text }}</v-toolbar-title>
                      </template>

                      <!-- <input id="MID" v-model="useModule.name" /> -->
                      <v-btn role="link" @click="handleClick(); isEditing = !isEditing" class="activateBtn"
                        :style="{ color: activateBtn ? 'white' : 'blue', color: activateBtn ? 'black' : 'white' }"
                        color="white" variant="text" icon="mdi-pencil"></v-btn>

                      <v-btn color="white" icon="mdi-alert-circle-outline"></v-btn>

                      <v-btn color="white" icon="mdi-delete-outline"></v-btn>

                      <template v-if="$vuetify.display.smAndUp">
                        <v-divider class="mx-3 align-self-center" length="24" thickness="2" vertical></v-divider>

                        <v-btn color="white" icon="mdi-folder-outline"></v-btn>

                        <v-btn color="white" icon="mdi-tag-outline"></v-btn>

                        <v-btn color="white" icon="mdi-dots-vertical"></v-btn>
                      </template>
                    </v-toolbar>

                    <v-alert type="success" title="Sucesso" v-if="alert == true" transition="slide-y-transition"
                      border="start" variant="tonal" v-model="alert" closable
                      text="As suas alterações foram gravadas com sucesso!"></v-alert>

                    <v-card-text v-if="useModule.dialog == 'Contacts'">

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
                                    :disabled="!isEditing" v-model="firstName" :counter="10" :rules="firstNameRules"
                                    prepend-inner-icon="mdi-account" required></v-text-field>
                                </v-form></v-col>
                              <v-col cols="12" sm="6" md="4" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Nome do meio"
                                  hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" class="pa-0">
                                <v-text-field :disabled="!isEditing" v-model="lastName" :counter="10"
                                  :rules="lastNameRules" label="Último nome*" hint="example of persistent helper text"
                                  persistent-hint required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Telefone*" type="telephone"
                                  prepend-inner-icon="mdi-phone" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="5" md="6" class="pa-0 ml-0">
                                <v-text-field :disabled="!isEditing" label="SMS*" type="telephone"
                                  prepend-inner-icon="mdi-message-text" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="E-mail*"
                                  prepend-inner-icon="mdi-email-fast-outline" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="WhatsApp*" prepend-inner-icon="mdi-whatsapp"
                                  required></v-text-field>
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
                            <small>*indicates required field</small>
                          </v-card-text>

                          <!-- </v-card> -->
                        </v-window-item>
                      </v-window>
                    </v-card-text>

                    <v-card-text v-if="useModule.dialog == 'Groups'">

                      <v-tabs v-model="tabs" align-tabs="centered">
                        <v-tab prepend-icon="mdi-information-outline">Detalhes</v-tab>
                        <v-tab prepend-icon="mdi-account-cog">Opções</v-tab>
                        <v-tab prepend-icon="mdi-account-multiple">Membros</v-tab>
                      </v-tabs>

                      <v-window v-model="tabs">
                        <v-window-item v-model="details">
                          <v-card>
                            <v-card-text>

                              <v-row>
                                <v-col cols="12" sm="12" md="12" class="pa-0">
                                  <v-text-field :disabled="!isEditing" label="Nome do Grupo*" v-model="firstName"
                                    :counter="10" :rules="firstNameRules" prepend-inner-icon="mdi-account-multiple"
                                    required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" class="pa-0">
                                  <v-text-field :disabled="!isEditing" label="Descrição" v-model="lastName" :counter="10"
                                    :rules="lastNameRules" prepend-inner-icon="mdi-information-variant"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" :items="['Admin', 'Gerente', 'Convidado']"
                                    label="Departamento" prepend-inner-icon="mdi-domain" multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" :items="['Interno', 'Externo', 'Admin']"
                                    label="Tipo de Conta" prepend-inner-icon="mdi-account-badge-outline"
                                    multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" :items="['Convidado', 'Administrador']"
                                    label="Domínio" prepend-inner-icon="mdi-security" multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" :items="['English', 'Português', 'François']"
                                    label="Linguagem" prepend-inner-icon="mdi-translate" multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" :items="['Painel', 'Windows']"
                                    label="Modo de Abertura" prepend-inner-icon="mdi-open-in-new"
                                    multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing"
                                    :items="['Marketing', 'Autentificação', 'Cobrança']" label="Campanha"
                                    prepend-inner-icon="mdi-message-star-outline" multiple></v-autocomplete>
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
                                    " label="Módulo Padrão" prepend-inner-icon="mdi-view-grid"
                                    multiple></v-autocomplete>
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
                                <v-col cols="12" sm="12" md="12" class="pa-0">
                                  <v-text-field :disabled="!isEditing" label="Título da Campanha" v-model="firstName"
                                    :counter="10" :rules="firstNameRules" hint="example of helper text only on focus"
                                    prepend-inner-icon="mdi-format-title"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" v-model="lastName" :counter="10"
                                    :rules="lastNameRules"
                                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                    label="Grupo" prepend-inner-icon="mdi-account-multiple" multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing"
                                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                    label="Contactos" prepend-inner-icon="mdi-account" multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-text-field :disabled="!isEditing" label="Data*" type="date"
                                    prepend-inner-icon="mdi-calendar" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-text-field :disabled="!isEditing" label="Hora" type="time"
                                    prepend-inner-icon="mdi-clock-outline"
                                    hint="example of helper text only on focus"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing"
                                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                    label="SMS" prepend-inner-icon="mdi-message-settings-outline"
                                    multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="12" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing"
                                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                    label="E-mail" prepend-inner-icon="mdi-email-outline" multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="12" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing"
                                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                    label="Telefone" prepend-inner-icon="mdi-phone" multiple></v-autocomplete>
                                </v-col>
                              </v-row>
                              <!-- </v-container> -->
                              <small>*indicates required field</small>
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

                    <v-card-text
                      v-if="useModule.dialog == 'Messages' | useModule.dialog == 'Chamadas' | useModule.dialog == 'WhatsApp' | useModule.dialog == 'E-mail'">

                      <v-tabs v-model="tabs" align-tabs="centered">
                        <v-tab>Detalhes</v-tab>
                        <v-tab>Opções</v-tab>
                      </v-tabs>

                      <v-window v-model="tabs">
                        <v-window-item v-model="details">
                          <v-card>

                            <v-card-text>
                              <!-- <v-container> -->
                              <v-row>
                                <v-col cols="12" sm="12" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing"
                                    :items="['SMS', 'Telefone', 'WhatsApp', 'E-mail']" label="Categoria"
                                    prepend-inner-icon="mdi-cube-send" multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" class="pa-0">
                                  <v-text-field :disabled="!isEditing" label="Título" v-model="firstName" :counter="10"
                                    :rules="firstNameRules" hint="example of helper text only on focus"
                                    prepend-inner-icon="mdi-format-title"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" class="pa-0">
                                  <v-textarea :disabled="!isEditing" label="Mensagem*" v-model="lastName" :counter="10"
                                    :rules="lastNameRules" prepend-inner-icon="mdi-message-text-outline"
                                    required></v-textarea>
                                </v-col>
                              </v-row>
                              <!-- </v-container> -->
                              <small>*indicates required field</small>
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
                                    prepend-inner-icon="mdi-account" required></v-text-field>
                                </v-form></v-col>
                              <v-col cols="12" sm="6" md="4" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Nome do meio"
                                  hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" class="pa-0">
                                <v-text-field :disabled="!isEditing" label="Último nome*" v-model="lastName"
                                  :rules="lastNameRules" hint="example of persistent helper text" persistent-hint
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
                            <small>*indicates required field</small>
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
                              <small>*indicates required field</small>
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
                                  :rules="lastNameRules" label="Último nome*" hint="example of persistent helper text"
                                  persistent-hint required></v-text-field>
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
                                  'Zaire']" label="Província *"
                                    prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" :items="['Homem', 'Mulher']" label="Município *"
                                    prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" :items="['São João', 'B. Acádemico']" label="Distrito/Bairro *"
                                    prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                </v-col>
                              <v-col cols="12" sm="4" md="6" class="pa-0">
                                <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                  :rules="lastNameRules" label="Endereço" persistent-hint required></v-text-field>
                              </v-col>
                            </v-row>
                            <!-- </v-container> -->
                            <small>*indicates required field</small>
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
                                'Vitamina A']" label="Vacinas"
                                  prepend-inner-icon="mdi-needle"></v-autocomplete>
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
                            <small>*indicates required field</small>
                          </v-card-text>

                          <!-- </v-card> -->
                        </v-window-item>
                          <v-window-item v-model="hemotransfusão">
                            <v-card-text>
                              <v-row>
                                <v-col cols="12" sm="6" md="6" class="pa-0">
                                  <v-autocomplete :disabled="!isEditing" :items="['1','2','3','4','5','6','7','8','9','10']" label="Número de Hemotransfusões"
                                    prepend-inner-icon="mdi-set-center"></v-autocomplete>
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
                                  'Holter']" label="Imagiologia"
                                    prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                </v-col>
                              </v-row>
                              <br>
                              <h3>Serviços de urgências</h3>
                                <!-- <v-divider></v-divider> -->
                                <br>
                              <v-row>  <v-col cols="12" sm="6" md="6" class="pa-0">
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
                                <v-row>  <v-col cols="12" sm="6" md="6" class="pa-0">
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
                                    'Vitamina A']" label="Vacinas"
                                    prepend-inner-icon="mdi-needle"></v-autocomplete>
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
                              <small>*indicates required field</small>
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
                                    :rules="lastNameRules" label="Último nome*" hint="example of persistent helper text"
                                    persistent-hint required></v-text-field>
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
                                      'Zaire']" label="Província *"
                                      prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6" class="pa-0">
                                    <v-autocomplete :disabled="!isEditing" :items="['Homem', 'Mulher']" label="Município *"
                                      prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6" class="pa-0">
                                    <v-autocomplete :disabled="!isEditing" :items="['São João', 'B. Acádemico']" label="Distrito/Bairro *"
                                      prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" sm="4" md="6" class="pa-0">
                                    <v-text-field :disabled="!isEditing" v-model="lastName" :counter="20"
                                      :rules="lastNameRules" label="Endereço" persistent-hint required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6" class="pa-0">
                                    <v-autocomplete :disabled="!isEditing" :items="['Emanuel Catumbela', 'Nelito Catumbela']" label="Médico *"
                                      prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6" class="pa-0">
                                    <v-text-field :disabled="!isEditing" label="Data*" type="date"
                                      prepend-inner-icon="mdi-calendar" required></v-text-field>
                                  </v-col>
                              </v-row>
                              <!-- </v-container> -->
                              <small>*indicates required field</small>
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
                                    'Vitamina A']" label="Vacinas"
                                    prepend-inner-icon="mdi-needle"></v-autocomplete>
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
                              <small>*indicates required field</small>
                            </v-card-text>

                            <!-- </v-card> -->
                          </v-window-item>
                            <v-window-item v-model="hemotransfusão">
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12" sm="6" md="6" class="pa-0">
                                    <v-autocomplete :disabled="!isEditing" :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" label="Número de Hemotransfusões"
                                      prepend-inner-icon="mdi-set-center"></v-autocomplete>
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
                                      'Holter']" label="Imagiologia"
                                      prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                  </v-col>
                                </v-row>
                                <br>
                                <h3>Serviços de urgências</h3>
                                  <!-- <v-divider></v-divider> -->
                                  <br>
                                <v-row>  <v-col cols="12" sm="6" md="6" class="pa-0">
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
                                          'Morgue']" label="Destino"
                                          prepend-inner-icon="mdi-set-center"></v-autocomplete>
                                      </v-col>
                                  </v-row>
                                
                                  <br>
                                  <h3>Serviços de internamentos</h3>
                                    <!-- <v-divider></v-divider> -->
                                    <br>
                                  <v-row>  <v-col cols="12" sm="6" md="6" class="pa-0">
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
                                      'Vitamina A']" label="Vacinas"
                                      prepend-inner-icon="mdi-needle"></v-autocomplete>
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
                                <small>*indicates required field</small>
                              </v-card-text>

                              <!-- </v-card> -->
                            </v-window-item>
                        </v-window>
                      </v-card-text>

                    <v-card-actions class="align-content-end">
                      <v-spacer></v-spacer>
                      <v-btn color="warning" variant="tonal" @click="editModal = false; onclose();"
                        prepend-icon="mdi-close-circle">Cancelar</v-btn>
                      <v-btn variant="tonal" color="success" type="submit"
                        @click="checkInput(); if (isOkToSubmit != '') { alert = !alert; loading = !loading; dialog = !dialog; hide_alert(); }"
                        :ripple="true" :disabled="loading" :loading="loading" prepend-icon="mdi-content-save-outline">
                        Guardar
                        <template v-slot:loader>
                          <v-progress-linear indeterminate></v-progress-linear>
                        </template>
                      </v-btn>
                    </v-card-actions>

                    <v-window v-model="tab">
                      <v-window-item
                        v-for="                                                                                         item                                                                                          in                                                                                          items                                                                                         "
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

                      <v-toolbar-title bg-color="deep-purple-darken-4"><v-icon class="text-h4">{{ useModule.icon
                      }}</v-icon>&nbsp;{{ useModule.text }}</v-toolbar-title>

                      <template v-slot:append>
                        <!-- <v-icon icon="mdi-close-circle"></v-icon> -->
                        <v-btn color="white" variant="text" @click="viewModal = false; onclose();"
                          prepend-icon="mdi-close-circle"></v-btn>
                      </template>

                    </v-toolbar>
                    <v-card-text style="height:600px;">
                      <v-container>
                        <!-- <ChartComponent></ChartComponent> -->
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue-darken-1" variant="text" @click="viewModal = false">
                        Close
                      </v-btn>
                      <v-btn color="blue-darken-1" variant="text" @click="viewModal = false">
                        Save
                      </v-btn>
                    </v-card-actions>
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
                  hint="example of persistent helper text"
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


              <v-table style="text-align: left;" density="compact" :elevation="isHovering ? 24 : 14" class="mx-auto pa-1">
                <thead>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Phone</th>
                  <th>Categoria</th>
                  <th>Ações</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Vasco Gungui</td>
                    <td>cubenda@gmail.com</td>
                    <td>0000-0000-0000</td>
                    <td>Administrador</td>
                    <td><v-btn color="primary" density="compact">Editar</v-btn></td>
                  </tr>
                  <tr>
                    <td>Dina Gungui</td>
                    <td>cubenda@gmail.com</td>
                    <td>0000-0000-0000</td>
                    <td><v-chip>Convidado</v-chip></td>
                    <td><v-btn icon="mdi-pencil" color="primary"></v-btn></td>
                  </tr>
                </tbody>
              </v-table>

            </v-sheet>
          </v-container>

          <br>
          <br>
        </v-main>
      </v-app>
    </v-form>
  </v-sheet>
</template>

<script setup>
//
// import { ref } from 'vue';
import { ref, onMounted } from "vue";
import { useField, useForm } from 'vee-validate'
import { mergeProps } from 'vue'

import ChartComponent from '@/components/ChartComponent.vue'
import ChartComponent1 from '@/components/ChartComponent1.vue'
import ChartComponent2 from '@/components/ChartComponent2.vue'
import ChartComponent3 from '@/components/ChartComponent3.vue'
import ChartComponent4 from '@/components/ChartComponent4.vue'



import { useModuleStore } from '@/store/TaskStore';
const moduleStore = useModuleStore()

import { useTokenStore } from '@/store/TokenStore'
const TokenStore = useTokenStore()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true
      return 'O Nome deve conter o mínimo de 3 caracteres.'
    }
  }
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
onMounted(() => {
  // this.$router.go(0)
   if(window.localStorage.getItem('JwtToken') != null)
   {
    JwtToken = localStorage.getItem('JwtToken')
    MyUserName = localStorage.getItem('username')
    myPicture = localStorage.getItem('myPicture')
    myEmail = localStorage.getItem('myEmail')
    document.getElementById("myImg").src = myPicture;
    // document["myImg"].src = myPicture;
    // var tok = JSON.parse(localStorage.getItem('token'))
    alert(myPicture)
   }
   else{
    window.location = '/login'
    // this.$router.push({ path: `/login` })
   }
});
</script>

<script>
const useModule = useModuleStore()

export default {
  data: () => ({
    modNameX: '',
    isActiveBtn: false,
    isEditing: false,
    viewMainForm: false,
    isOkToSubmit: false,
    firstName: '',
    lastName: '',
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
    // statsMenu: [
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
    // tabMenus: [
    //   // { text: 'Dashboard', icon: 'mdi-view-dashboard', to: '/', descr: 'Secção de Gráficos', dialog: 'isDialogOpen' },
    //   { text: 'Contactos', icon: 'mdi-account', to: 'contacts', descr: 'Directório de Contactos', dialog: 'Contacts', size: '400px' },
    //   { text: 'Grupos', icon: 'mdi-account-group', to: 'groups', descr: 'Directório de Grupos de Contactos', dialog: 'Groups', size: '400px' },
    //   { text: 'Campanhas', icon: 'mdi-account-voice', to: 'campaigns', descr: 'Campanhas', dialog: 'Campaigns' },
    //   // { text: 'Agendamento', icon: 'mdi-account-clock', to: 'calendar', descr: 'Agendamento', dialog: 'Booking' },
    //   { text: 'Mensagens', icon: 'mdi-message-plus', to: 'message', descr: 'Mensagens', dialog: 'Messages' },
    //   { text: 'Chamadas', icon: 'mdi-phone-settings', to: 'calls', descr: 'Chamadas Automaticas', dialog: 'Chamadas' },
    //   { text: 'WhatsApp', icon: 'mdi-whatsapp', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', dialog: 'WhatsApp' },
    //   { text: 'E-mail', icon: 'mdi-email-fast-outline', to: 'email', descr: 'E-mails', dialog: 'E-mail' },
    //   { text: 'Histórico', icon: 'mdi-history', to: 'history', descr: 'Acesse ao hsitóricos de operações', dialog: 'Histórico' },
    //   { text: 'Contas', icon: 'mdi-key', to: 'account', descr: 'Contas de utilizadores', dialog: 'Contas' },
    //   { text: 'Definições', icon: 'mdi-cog', to: 'settings', descr: 'Configirações gerais', dialog: 'Settings' }
    // ],
    

    topMenus: [
      { text: 'Ver Relatórios', icon: 'mdi-chart-box-outline', to: 'contacts', descr: 'Ver Relatórios', dialog: 'Doente', size: '400px' },
      { text: 'Sessões', icon: 'mdi-account-switch', to: 'contacts', descr: 'Sessões', dialog: 'Doente', size: '400px' },
      { text: 'Configurações', icon: 'mdi-cog', to: 'contacts', descr: 'Configurações', dialog: 'Doente', size: '400px' }
    ],
    tabMenus: [
      // { text: 'Dashboard', icon: 'mdi-view-dashboard', to: '/', descr: 'Secção de Gráficos', dialog: 'isDialogOpen' },
      { text: 'Doentes', icon: 'mdi-account-injury-outline', to: 'contacts', descr: 'Directório de Contactos', dialog: 'Doente', size: '400px' },
      { text: 'Consulta Externa', icon: 'mdi-account-arrow-right', to: 'whatsapp', descr: 'Enviar mensagens via WhatsApp', dialog: 'Consulta Externa' },
      { text: 'Banco de Urgência', icon: 'mdi-hospital', to: 'groups', descr: 'Directório de Grupos de Contactos', dialog: 'Groups', size: '400px' },
      { text: 'Camas', icon: 'mdi-bed', to: 'campaigns', descr: 'Campanhas', dialog: 'Campaigns' },
      // { text: 'Agendamento', icon: 'mdi-account-clock', to: 'calendar', descr: 'Agendamento', dialog: 'Booking' },
      { text: 'Análises Clínicas', icon: 'mdi-stethoscope', to: 'message', descr: 'Mensagens', dialog: 'Messages' },
      { text: 'Laboratório', icon: 'mdi-microscope', to: 'calls', descr: 'Chamadas Automaticas', dialog: 'Chamadas' },
      { text: 'Internamento', icon: 'mdi-account-arrow-left', to: 'email', descr: 'E-mails', dialog: 'E-mail' },
      { text: 'Histórico', icon: 'mdi-history', to: 'history', descr: 'Acesse ao hsitóricos de operações', dialog: 'Histórico' },
      { text: 'Contas', icon: 'mdi-key', to: 'account', descr: 'Contas de utilizadores', dialog: 'Contas' },
      { text: 'Definições', icon: 'mdi-cog', to: 'settings', descr: 'Configirações gerais', dialog: 'Settings' }
    ],
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


  watch: {
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
    }
  },
  mounted: function () {
    this.overlayd();

    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        // $modNameX = null,
        this.isLoaded = true;
        // alert(true)
      }
    }

    // alert(window.localStorage.getItem('dialog'))
    if (window.localStorage.getItem('dialog') != '') {
    }

    // alert(this.modName)

    // $(this.$ref.modal)
    //   this.firstName = '',
    //   this.lastName = ''
  },
  methods: {
    mergeProps,
    beforeOpen(event) {
      alert('Opening...')
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
      this.firstName = '',
        this.lastName = ''
    },
    checkInput: function () {
      // alert(useModule.dialog)
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
      // alert(this.isOkToSubmit)
    },

    logOff : function() {
      localStorage.removeItem("token");
      localStorage.removeItem("JwtToken");
      localStorage.removeItem("module");
      localStorage.removeItem("username");
      const off = 'off';
      // window.location = '/login'
      this.$router.push({ path: `/login` })
    },
    handleClick: function (event) {
      this.isActiveBtn = !this.isActiveBtn;
    },
    overlayd: function (event) {
      setTimeout(() => {
        this.overlay = false,
          this.viewMainForm = true
      }, (500));
    },
    hide_alert: function (event) {
      var closeAlert = window.setInterval(() => {
        this.alert = false;
        // this.isOkToSubmit = false;
        // this.firstName = '';
        // this.lastName = '';
        alertModal = !alertModal;
        clearInterval(closeAlert);
      }, 3000);
    },
    closeModal: function () {
      var self = this;
      self.alertModal = true;
      setTimeout(function () {
        self.alertModal = false;
      }, 5 * 1000);
    },
    openDialog: function (item) {
      // localStorage.setItem('module', item.dialog)
      // $modNameX = localStorage.module
      //useModule = item.dialog
      // alert(this.modName)


      // this.$set(this.modName, item.dialog);
      //useModule = item.dialog

      // this.$store.commit(item.dialog)
      // app.config.globalProperties.$modNameX = localStorage.module;
      //useModule = item;

      // document.getElementById('MID').innerText = item.dialog
      // console.log(app.config.globalProperties.$modNameX)
      // alert(app.config.globalProperties.$modNameX)

      // alert(this.useModule.name)
    },
    // increment(){
    //   this.$store.commit('increment')
    //   console.log(this.$store.state.count)
    // }
  }
}
</script>

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

.v-btn{
  font-size: 14px;
  font-weight: 500;
}
</style>