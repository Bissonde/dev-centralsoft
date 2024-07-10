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

            <!-- PROGRESS BAR -->
            <v-progress-linear :active="loading" :indeterminate="loading" color="blue-lighten-3" id="topProgress"
                style="display: none;" indeterminate></v-progress-linear>

            <!-- LOGIN -->
            <div id="dvLogin" style="height: 100vh;" class="d-flex align-center justify-center w-100">

                <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->


                <!-- class="pa-5 pb-8 ma-2" -->
                <v-card id="dop" class="pa-3 pb-0 ma-4" elevation="8" max-width="448" rounded="sm" margin-left="4"
                    style="opacity:0.9;">

                    <v-toolbar color="deep-blue-accent-4"
                        style="background-image: linear-gradient(40deg, #cccca0  35%, #acd4ff 100%);" cards dark flat>
                        <v-btn @click="handleReset, emptyFields = false, alert = 'log'" icon>
                            <v-icon>mdi-account</v-icon>
                        </v-btn>
                        <v-card-title class="mx-auto my-8" id="userD">
                            Iniciar Sessão
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn @click="handleReset" icon>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-img class="mx-auto my-6" max-width="228"
                        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>


                    <v-alert v-model="emptyFields" class="mb-5 mt-5" border="start" variant="tonal" closable
                        close-label="Close Alert" color="warning" title="Atenção!" type="warning">
                        Preencha todos os campos abaixo!
                    </v-alert>

                    <v-alert v-model="ActExist" class="mb-5 mt-5" border="start" variant="tonal" closable
                        close-label="Close Alert" color="error" title="Conta inválida!" type="error">
                        Esta conta não existe, tente novamente!
                    </v-alert>
                    <v-card title="" prepend-icon="" class="text-h6 mr-0" flat>
                        <div class="text-subtitle-1 text-medium-emphasis">Nome completo</div>

                        <v-text-field id="RFN" density="compact" v-model="regFullName.value.value" clearable
                            :error-messages="regFullName.errorMessage.value" placeholder="Nome Completo" required
                            prepend-inner-icon="mdi-account-outline" variant="underlined">
                        </v-text-field>

                        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                        <v-text-field id="REM" density="compact" v-model="regEmail.value.value"
                            :error-messages="regEmail.errorMessage.value" placeholder="Email address" required
                            prepend-inner-icon="mdi-email-outline" clearable variant="underlined"></v-text-field>

                        <v-row>
                            <v-col cols="md-5" class="pt-4">
                                <div class="text-subtitle-1 text-medium-emphasis">País</div>
                                <select name="countryCode" id="PWC" class="text-subtitle-2 text-medium-emphasis"
                                    style="width: 150px;">
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
                                        <!-- <option data-countryCode="GB" value="44">UK (+44)</option> -->
                                        <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                                        <option data-countryCode="AE" value="971">United Arab Emirates (+971)
                                        </option>
                                        <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                                        <!-- <option data-countryCode="US" value="1">USA (+1)</option> -->
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
                            <v-col cols="md-7">
                                <div class="text-subtitle-1 text-medium-emphasis">Telefone</div>
                                <v-text-field id="PWT" density="compact" v-model="regPhone.value.value"
                                    :error-messages="regPhone.errorMessage.value" placeholder="Telemóvel"
                                    prepend-inner-icon="mdi-phone-outline" required clearable
                                    variant="underlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Palavra-passe

                        <v-btn class="text-caption text-decoration-none text-blue" variant="text"
                            @click="ActExist = false, isFormValid = false, alert = 'pwd'; loginError = false;">
                            <v-icon icon="mdi-help-circle"></v-icon>&nbsp;Esqueceu a palavra-passe?</v-btn>
                    </div>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Tema

                        <v-autocomplete v-model="cellLikes"
                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                            label="Interesses" prepend-inner-icon="mdi-set-center" multiple></v-autocomplete>
                    </div>

                    <v-text-field id="LPW" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" density="compact" placeholder="Introduza palavra-passe"
                        v-model="logPwd.value.value" clearable :error-messages="logPwd.errorMessage.value"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        @click:append-inner="visible = !visible" required></v-text-field>

                    <!-- <v-card-text class="text-center pt-0"> -->
                    <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                    <v-alert v-if="loginError" rounded="0" class="text-caption font-weight-regular" text="Após 3 tentativas consecutivas de login malsucedidas, sua conta será temporariamente
                            bloqueada por três horas." type="warning" variant="tonal">
                        <!-- <hr/> Se precisar fazer login agora, você também pode clicar em Esqueceu a senha de -->
                        <!-- login? abaixo para redefinir a senha de login. -->
                    </v-alert>

                    <!-- LOGIN BUTTONS -->
                    <v-card-text class="text-center pt-0">

                        <v-row>
                            <v-col cols="md-6">
                                <div class="text-caption text-decoration-none text-blue">
                                    Já tem uma conta?
                                </div>
                                <v-btn type="submit" :loading="loading" :disabled="isFormValid"
                                    @click="load, loading = !loading, isFormValid = !isFormValid, AuthLogin()"
                                    rounded="0" block class="mb-0 flex-grow-1" color="blue-darken-4" size="large"
                                    variant="flat">
                                    <v-icon icon="mdi-content-save"></v-icon>&nbsp;Guardar
                                </v-btn>
                            </v-col>

                            <v-col cols="md-6">
                                <div class="text-caption text-decoration-none text-blue">
                                    És novo aqui?
                                </div>
                                <v-btn variant="tonal" size="large" block rounded="0" class="text-decoration-none"
                                    rel="noopener noreferrer" target="/register"
                                    @click="alert = 'reg'; loginError = false; emptyFields = false;"
                                    color="red-darken-2">
                                    <v-icon icon="mdi-cancel"></v-icon>&nbsp;Cancelar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>


                </v-card>
            </div>
        </v-app>
    </v-form>

    <div id="emailTmp">

    </div>
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

var MyUserName = '';
var JwtToken = '';
var myPicture = '';
var myEmail = '';

onMounted(() => {
    // alert(TokenStore.tokenID) 
    // if (window.localStorage.getItem('JwtToken') != null) {

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
        window.location = '/signin?returnUrl=profile'


        // this.returnURL('signin')
        // this.$router.push({ path: `/login` })
    }

    //     // window.location = '/dashboard'


            // let config = {
            //     headers: {
            //         'Accept': 'application/json'

            //     }

            // }

        //    axios.get('Account/' + MyUserName, )
        //         .then((response) => {
        //             console.log(response.data)
        //         })
        //         .catch((err) => console.log(err.response));

        //         axios.request({
        //            url: 'Account/' + MyUserName,
        //            method: 'get',
        //            baseURL: axios.defaults.baseURL,
        //            headers: {
        //             'Authorization': 'Bearer ' + localStorage.getItem('JwtToken')
        //            } 
        //         });



    // console.log(MyUserName);

    let config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
        }
    }


    axios.get('account/' + MyUserName, config)
        .then(
            res => {
                document.getElementById('userD').innerHTML = res.data.username
                document.getElementById('RFN').value = res.data.username
                document.getElementById('REM').value = res.data.email
                document.getElementById('PWT').value = res.data.tel

                // this.regFullName = res.data.username
                // document.getElementById('PWE').value = res.data.username
                // alert(res.response)
            }
        ).catch(
            error => {
                const status = error.response ? error.response.status : null;

                if (status === 401) {
                    document.getElementById('userD').innerHTML = "Acesso não autorizado"
                }
                else if (status === 404) {
                    document.getElementById('userD').innerHTML = "Post não encontrado"
                }
                else {
                    document.getElementById('userD').innerHTML = "Ocorreu um erro:", error
                }
                document.getElementById('userD').innerHTML = error
                console.log(error)


                window.location = '/signin?returnUrl=profile'
            }
        )




});

</script>

<script>
const TokenStore = useTokenStore();
const newToken = { "tokenID": "ljahsdfq697e69qwerq", "user": "Vasco Gungui", "domain": "Administrator" }

// alert(tok[1])
export default {
    data: () => ({
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
    methods: {

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
            //  alert(TokenStore.tokenID);
            // alert(useModule.dialog)
            if (TokenStore == 'Contacts') {
                // this.isOkToSubmit = this.firstName && this.lastName
            }
            // alert(this.isOkToSubmit)
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