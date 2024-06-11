
console.log(true);



 <v-sheet class="flex-1-0 mb-1 pb-1 pt-0 mt-0" style="height: auto">

                  <v-row>
                    <v-col cols="8">
                      <h6 class=" text-subtitle-2 font-weight-bold mb-0"><v-icon>mdi-chart-pie</v-icon>&nbsp;Volume
                      </h6>
                    </v-col>
                    <v-col cols="4">
                      <v-btn variant="plain" density="compact" class="float-sm-right text-caption"
                        @click="openDialog(n); viewModal = !viewModal">
                        <v-icon color="primary">
                          mdi-open-in-new
                        </v-icon>
                        &nbsp;
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-hover v-slot="{ isHovering, props }">
                    <!-- class="pa-1 mt-2 pr-1 mr-1 mb-10 mx-auto transition-swing"> -->
                    <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                      style="height: 463px; border-bottom:solid #0277BD 5px;"
                      class="ma-1 pa-1 mt-0 mx-auto transition-swing mr-2">
                      <!-- 0000000000 -->
                      <!-- <v-card align-center> -->

                      <v-row cols="10" sm="3" md="3" lg="3">
                        <!-- <v-sheet cols="3" class="mx-auto mb-0 ma-0 pa-3" height="250" width="98%">
                          <ChartComponent style="width:auto; max-width:auto;"></ChartComponent>

                          <br>
                          <h4>Top KPIs</h4>
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
                        </v-sheet> -->
                      </v-row>
                      <!-- </v-sheet>
                        </v-sheet>
                      </v - sheet > -->
                    </div >
                  </v - hover >
                </v - sheet >

                <v-sheet class="flex-1-0" style="width:auto;height:auto;">
                  <v-sheet class="d-flex flex-wrap">
                    <v-sheet class="flex-1-1 ma-1 pa-1 pb-1 pt-0 mt-0">
                      <v-row>
                        <v-col cols="8">
                          <h6 class="text-body-2 font-weight-bold"><v-icon>mdi-play-speed</v-icon>&nbsp;Volume
                          </h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="plain" density="compact" class="float-sm-right text-caption"
                            @click="openDialog(n); viewModal = !viewModal">
                            <v-icon color="primary">
                              mdi-open-in-new
                            </v-icon>
                            &nbsp;
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-hover v-slot="{ isHovering, props }">

                        <!-- style="height: 200px; width:auto;   border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;" -->
                        <div v-bind="props" :class="`elevation-${isHovering ? 6 : 2}`"
                          style="height: 200px; border-bottom:solid #0277BD 5px;" class="mx-auto transition-swing">
                          <!-- 1111111111 -->
                          <!-- <ChartComponent1></ChartComponent1> -->
                        </div>
                      </v-hover>
                    </v-sheet>

                    <v-sheet class="flex-1-1 ma-1 pa-1 pb-1 pt-0 mt-0" style="max-width:500px;">
                      <v-row>
                        <v-col cols="8">
                          <h6 class="text-body-2 font-weight-bold"><v-icon>mdi-poll</v-icon>&nbsp;Volume</h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="plain" density="compact" class="float-sm-right text-caption"
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
                          style="height: 200px; border-bottom:solid #0277BD 5px;" class="mx-auto transition-swing">

                          <!-- 2222222222 -->
                          <!-- <ChartComponent2></ChartComponent2> -->
                        </div>
                      </v - hover >
                    </v - sheet >
                  </v - sheet >

                  <br>

                  <v-sheet class="d-flex flex-wrap">
                    <v-sheet class="flex-1-1 ma-1 pa-1 pb-0 pt-0 mt-0">
                      <v-row>
                        <v-col cols="8">
                          <h6 class="text-body-2 font-weight-bold mb-1"><v-icon>mdi-speedometer</v-icon>&nbsp;Volume
                          </h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="plain" density="compact" class="float-sm-right text-caption"
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
                          style="height: 200px; border-bottom:solid #0277BD 5px;" class="mx-auto transition-swing">
                          <!-- 3333333333 -->
                          <!-- <ChartComponent3></ChartComponent3> -->
                        </div>
                      </v-hover>
                    </v-sheet>

                    <v-sheet class="flex-1-1 ma-1 pa-1 pb-1 pt-0 mt-0">
                      <v-row>
                        <v-col cols="8">
                          <h6 class="text-body-2 font-weight-bold mb-1">
                            <v-icon>mdi-sitemap-outline</v-icon>&nbsp;Volume
                          </h6>
                        </v-col>
                        <v-col cols="4">
                          <v-btn variant="plain" density="compact" class="float-sm-right text-caption"
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
                          style="height: 200px; border-bottom:solid #0277BD 5px;" class="mx-auto transition-swing">
                          <!-- 4444444444 -->
                          <!-- <ChartComponent4></ChartComponent4> -->
                        </div>
                      </v - hover >
                    </v - sheet >

                  </v - sheet >
                </v - sheet >