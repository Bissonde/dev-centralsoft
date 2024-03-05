<template>
    <!-- <div> -->

    <!-- </div> -->

    <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="{
        background: {
            color: {
                // value: '#0d47a1'
            }
        },
        fullScreen: {
            enable: true,
            zIndex: 0
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: 'push'
                },
                onHover: {
                    enable: true,
                    mode: 'grab'
                },
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: '#ffffff'
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: 'bounce',
                random: false,
                speed: 3,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                },
                value: 60
            },
            opacity: {
                value: 0.9
            },
            shape: {
                type: 'circle'
            },
            size: {
                value: { min: 1, max: 5 }
            }

        },
        detectRetina: true
    }" />


    <v-form ref="form" fast-fail @submit.prevent="submit" class="circular"
        v-bind:style="{ 'background-image': 'url(' + bgimage + ')' }">


        <!-- LOGIN -->
        <div id="dvLogin" class="d-flex align-center justify-center" width="600" max-width="456" v-if="alert == 'log'"
            style="height: 100vh;" :style="bottom - gradient">

            <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->


            <v-card class="pa-5 pb-8 ma-2" elevation="8" max-width="448" rounded="sm" margin-left="4"
                style="opacity:0.9;">

                <v-progress-linear color="blue-lighten-3" id="topProgress" style="display: none;"
                    indeterminate></v-progress-linear>

                <v-toolbar color="deep-blue-accent-4" cards dark flat>
                    <v-btn @click="handleReset, alert = 'log'" icon>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <v-card-title class="text-h6 font-weight-regular">
                        Iniciar Sessão
                    </v-card-title>
                    <v-spacer></v-spacer>

                </v-toolbar>


                <v-img class="mx-auto my-6" max-width="228"
                    src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>


                <v-alert v-model="emptyFields" border="start" variant="tonal" closable close-label="Close Alert"
                    color="warning" title="Atenção!" type="warning">
                    Preencha e-mail / palavra-passe <a>reset</a>
                </v-alert>

                <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                <v-text-field density="compact" id="LGU" v-model="logUser.value.value" v-bind="$attrs" clearable
                    :error-messages="logUser.errorMessage.value" placeholder="Introduza e-mail" required
                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Palavra-passe

                    <v-btn class="text-caption text-decoration-none text-blue" variant="text"
                        @click="alert = 'pwd'; loginError = false;">
                        <v-icon icon="mdi-help-circle"></v-icon>&nbsp;Esqueceu a palavra-passe?</v-btn>
                </div>

                <v-text-field id="LPW" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Introduza palavra-passe"
                    v-model="logPwd.value.value" clearable :error-messages="logPwd.errorMessage.value"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    required></v-text-field>

                <!-- <v-card-text class="text-center pt-0"> -->
                <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                <v-alert v-if="loginError" rounded="0" class="text-caption font-weight-regular" text="Após 3 tentativas consecutivas de login malsucedidas, sua conta será temporariamente
                            bloqueada por três horas." type="error" variant="tonal">
                    <!-- <hr/> Se precisar fazer login agora, você também pode clicar em Esqueceu a senha de -->
                    <!-- login? abaixo para redefinir a senha de login. -->
                </v-alert>


                <!-- </v-card-text> -->
                <!-- <v-card class="mb-4" width="200" color="surface-variant" variant="text">
                        <v-card-text style="color: white;" class="text-medium-emphasis text-caption surface-variant" color="surface-variant">
                            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                <!-- Aviso: Preencha todos os campos para prosseguir com o início de sessão. -->
                <!-- </v-card-text> -->
                <!-- </v-card> -->

                <!-- LOGIN BUTTONS -->
                <v-card-text class="text-center pt-0">

                    <v-row>
                        <v-col cols="md-6">
                            <div class="text-caption text-decoration-none text-blue">
                                Já tem uma conta?
                            </div>
                            <v-btn type="submit" :loading="loading" @click="AuthLogin(), load, loading=!loading" rounded="0" block
                                class="mb-0 flex-grow-1" color="blue-darken-4" size="large" variant="flat">
                                <v-icon icon="mdi-login"></v-icon>&nbsp;Entrar
                            </v-btn>
                        </v-col>

                        <v-col cols="md-6">
                            <div class="text-caption text-decoration-none text-blue">
                                És novo aqui?
                            </div>
                            <v-btn variant="tonal" size="large" block rounded="0" class="text-blue text-decoration-none"
                                rel="noopener noreferrer" target="/register"
                                @click="alert = 'reg'; loginError = false; emptyFields = false;">
                                <v-icon icon="mdi-account-plus"></v-icon>&nbsp;Inscreva-se<v-icon
                                    icon="mdi-chevron-right"></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>

                <div class="or" style="font-size: 10pt; font-weight: 500;">OU</div>

                <v-card-text class="text-center pt-5">
                    <GoogleLogin :callback="callback" block data-width="300" id="g_id_onload" data-type="icon"
                        class="text-center pt-0" data-shape="rectangular" style="font-size: 18pt;" />
                </v-card-text>

                <!-- <v-card class="mb-4 rounded-0" color="surface-variant" variant="tonal">
                    <v-card-text class="text-medium-emphasis text-caption">
                        Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
                       ---
                    </v-card-text>
                </v-card> -->


            </v-card>
        </div>

        <!-- RESET PWD -->
        <div class="d-flex align-center justify-center" width="600" max-width="456" v-if="alert == 'pwd'"
            style="height: 100vh;" :style="bottom - gradient">

            <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->


            <v-card class="pa-5 pb-8 ma-2" elevation="8" max-width="448" rounded="sm" margin-left="4"
                style="opacity:0.9;">

                <v-progress-linear color="blue-lighten-3" id="topProgress" style="display: none;"
                    indeterminate></v-progress-linear>

                <v-toolbar color="deep-blue-accent-4" cards dark flat>
                    <v-btn @click="handleReset, alert = 'log'" icon>
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-card-title class="text-h6 font-weight-regular">
                        Recuperar Conta
                    </v-card-title>
                    <v-spacer></v-spacer>

                </v-toolbar>

                <v-img class="mx-auto my-6" max-width="228"
                    src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>


                <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                <v-text-field density="compact" v-model="pwdEmail.value.value" clearable
                    :error-messages="pwdEmail.errorMessage.value" placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>


                <div class="text-subtitle-1 text-medium-emphasis">Telefone</div>

                <v-text-field density="compact" v-model="pwdPhone.value.value" clearable
                    :error-messages="pwdPhone.errorMessage.value" placeholder="Telemóvel"
                    prepend-inner-icon="mdi-phone-outline" variant="outlined"></v-text-field>

                <v-card class="mb-4" color="red-accent-4" v-if="loginError" variant="tonal">
                    <v-card-text class="text-medium-emphasis text-caption">
                        <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                        <v-icon>mdi-alert</v-icon>&nbsp;E-mail/Palavra-passe errados!
                    </v-card-text>
                </v-card>

                <!-- <v-card class="mb-4" color="surface-variant" variant="tonal"> -->
                <!-- <v-card-text class="text-medium-emphasis text-caption"> -->
                <!-- Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password. -->
                <!-- Aviso: Irá receber um link por e-mail / sms para proceder a alteração da sua palavra-passe. -->
                <!-- </v-card-text> -->
                <!-- </v-card> -->


                <v-card-text class="text-center">

                    <v-row>
                        <v-col cols="md-6">
                            <v-btn variant="outlined" color="red-accent-4" size="large" block rounded="0"
                                class="text-red text-decoration-none" rel="noopener noreferrer" target="/register"
                                @click="alert = 'log'; loginError = false;">
                                <v-icon icon="mdi-arrow-left-circle"></v-icon>&nbsp;Voltar
                            </v-btn>

                        </v-col>

                        <v-col cols="md-6">
                            <v-btn type="submit" rounded="0" block class="mb-0" color="blue-darken-4" size="large"
                                v-if="alert == 'pwd'" variant="flat">
                                <v-icon icon="mdi-lock-reset"></v-icon>&nbsp;Recuperar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>

        <!-- REGISTER -->
        <div class="d-flex align-center justify-center" width="600" max-width="456" v-if="alert == 'reg'"
            style="height: 100vh;" :style="bottom - gradient">


            <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->

            <v-card class="pa-2 pb-0 ma-2" elevation="2" width="500" max-width="448" rounded="sm" margin-left="4"
                style="opacity:0.9; margin-bottom:-20px">

                <v-progress-linear color="blue-lighten-3" id="topProgress" style="display: none;"
                    indeterminate></v-progress-linear>

                <v-toolbar id="dvToolbar" color="deep-blue-accent-4" cards dark flat>
                    <v-btn @click="handleReset, alert = 'log'" icon>
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-card-title class="text-h6 font-weight-regular">
                        Inscreva-se
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="handleReset" icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-toolbar>
                <br>

                <v-alert v-model="ActExist" border="start" variant="tonal" closable close-label="Close Alert"
                    color="error" title="Erro!" type="error">
                    Esta conta já existe!
                </v-alert>

                <br>
                <!--                 
                <v-alert border="start" variant="tonal" close-label="Close Alert"
                    color="primary" title="Atenção!" type="warning">
                    Prencha todos os campos abaixo! <a>reset</a>
                </v-alert> -->

                <v-alert v-model="ActEmpty" border="start" variant="tonal" closable close-label="Close Alert"
                    color="warning" title="Atenção!" type="warning">
                    Preencha todos os campos abaixo!
                </v-alert>

                <v-alert v-model="ActIncPwd" border="start" variant="tonal" closable close-label="Close Alert"
                    color="warning" title="Atenção!" type="warning">
                    As palavras-passes não correspondem!
                </v-alert>




                <v-stepper id="dvReg" prev-text="Anterior" next-text="Próximo" editable
                    :items="['1º Passo ', '2º Passo', '3º Passo']">
                    <template v-slot:item.1>
                        <v-card title="Dados Pessoais" prepend-icon="mdi-account" class="text-h6 mr-0" flat>
                            <div class="text-subtitle-1 text-medium-emphasis">Nome completo</div>

                            <v-text-field id="RFN" density="compact" v-model="regFullName.value.value" clearable
                                :error-messages="regFullName.errorMessage.value" placeholder="Nome Completo" required
                                prepend-inner-icon="mdi-account-outline" variant="outlined">
                            </v-text-field>

                            <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                            <v-text-field id="REM" density="compact" v-model="regEmail.value.value"
                                :error-messages="regEmail.errorMessage.value" placeholder="Email address" required
                                prepend-inner-icon="mdi-email-outline" clearable variant="outlined"></v-text-field>

                            <v-row>
                                <v-col cols="md-5" class="pt-4">
                                    <div class="text-subtitle-1 text-medium-emphasis">País</div>
                                    <select name="countryCode" id="" class="text-subtitle-4 text-medium-emphasis"
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
                                    <v-text-field id="RPH" density="compact" v-model="regPhone.value.value"
                                        :error-messages="regPhone.errorMessage.value" placeholder="Telemóvel"
                                        prepend-inner-icon="mdi-phone-outline" required clearable
                                        variant="outlined"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                    </template>

                    <template v-slot:item.2>
                        <v-card title="Segurança" prepend-icon="mdi-security" style="width:auto" flat>


                            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                                Palavra-passe
                            </div>

                            <v-text-field id="RPWD1" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visible ? 'text' : 'password'" v-model="regPwd.value.value"
                                :error-messages="regPwd.errorMessage.value" required density="compact"
                                placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                                variant="outlined" clearable @click:append-inner="visible = !visible"
                                hint="As palvra-passes devem ser identicas"></v-text-field>

                            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                                Palavra-passe<b>Repetir</b>

                                <!-- <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                    Esqueceu a palavra-passe?</a> -->
                            </div>

                            <v-text-field id="RPWD2" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visible ? 'text' : 'password'" clearable v-model="regPwd2.value.value"
                                :error-messages="regPwd2.errorMessage.value" required density="compact"
                                placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                                variant="outlined" @click:append-inner="visible = !visible"
                                hint="As palvra-passes devem ser identicas"></v-text-field>

                            <div class="text-subtitle-1 text-medium-emphasis">Dica</div>

                            <v-text-field id="RHT" density="compact" v-model="regFullName.value.value" clearable
                                :error-messages="regFullName.errorMessage.value"
                                placeholder="Ajuda a lembrar a palavra-passe" required prepend-inner-icon="mdi-lastpass"
                                variant="outlined">
                            </v-text-field>

                        </v-card>
                    </template>

                    <template v-slot:item.3>
                        <v-card title="Detalhes" prepend-icon="mdi-check-circle" style="width:auto" flat>
                            <div class="text-subtitle-1 text-medium-emphasis" density="comfortable">Sexo</div>
                            <v-combobox id="RSEX" variant="solo" density="compact" :items=sexCombo
                                v-model="Sex.value.value" :error-messages="Sex.errorMessage.value"
                                required></v-combobox>


                            <div class="text-subtitle-1 text-medium-emphasis">Data de nascimento</div>
                            <v-text-field id="RDOB" density="compact" v-model="DOB.value.value" clearable
                                :error-messages="DOB.errorMessage.value" label="Data*" type="date"
                                prepend-inner-icon="mdi-calendar" required></v-text-field>

                            <div class="text-subtitle-1 text-medium-emphasis">Interesses</div>
                            <v-combobox id="RLK" persistent-hint hide-selected :hide-no-data="false"
                                variant="solo-filled" density="compact" chips v-model="Likes.value.value" clearable
                                :error-messages="Likes.errorMessage.value" required multiple
                                :items=myInterests></v-combobox>

                            <!-- <br> -->

                            <v-checkbox id="RTAC" v-model="agreementR.value.value"
                                :error-messages="agreementR.errorMessage.value" color="deep-purple">
                                <template v-slot:label>
                                    Concordo aos &nbsp;
                                    <a href="#" @click.stop.prevent="dialog = true">Termos</a>
                                    &nbsp;e&nbsp;
                                    <a href="#" @click.stop.prevent="dialog = true">Privacidade</a>
                                </template>
                            </v-checkbox>



                            <div class="text-caption text-decoration-none text-blue">
                                Criar nova conta?
                            </div>
                            <v-btn variant="tonal" :loading="loading"
                                @click="loading = !loading, AuthLogin(), load, validate, onflicker" block
                                class="mb-0 rounded-0" color="blue-darken-4" size="large">
                                <v-icon icon="mdi-checkbox-marked-circle-outline"></v-icon>&nbsp;Validar
                            </v-btn>


                        </v-card>

                    </template>
                </v-stepper>


                <!-- DONE -->
                <div id="dvDone" style="display: none;">

                    <!-- <v-img class="mx-auto my-6" max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->


                    <v-card class="pa-5 pb-8 ma-2" elevation="8" max-width="448" rounded="sm" margin-left="4"
                        style="opacity:0.9;">

                        <v-spacer></v-spacer>

                        <v-img class="mx-auto my-6" max-width="228"
                            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

                        <v-divider></v-divider>

                        <div class="py-12 text-center">
                            <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="108"></v-icon>

                            <div class="text-h6 font-weight-bold">Conta criada com sucesso!</div>
                            <br>
                            <p class="text-caption">Foi enviado um link para o seu email. Abra-o para activar a sua
                                conta de utilizador!</p>
                        </div>

                        <v-divider></v-divider>


                        <!-- LOGIN BUTTONS -->
                        <v-card-text class="text-center pt-0">

                            <v-row>


                                    <v-btn variant="tonal" size="large" block rounded="0"
                                        class="text-blue text-decoration-none" rel="noopener noreferrer"
                                        target="/register"
                                        @click="alert = 'log'; loginError = false; emptyFields = false;">
                                        <v-icon icon="mdi-account-star"></v-icon>&nbsp;Iniciar Sessão<v-icon
                                            icon="mdi-chevron-right"></v-icon>
                                    </v-btn>
                            </v-row>
                        </v-card-text>

                        <div class="or" style="font-size: 10pt; font-weight: 500;">OU</div>


                    </v-card>
                </div>
                <!-- <div class="or" style="font-size: 10pt; font-weight: 500;">WELCOME</div>   -->


                <!-- <br> -->
                <!-- LOGIN BUTTONS -->
                <v-card-text class="text-center pt-0">


                </v-card-text>
                <!-- 
                <div class="text-subtitle-1" style="color: white; font-size:20pt;">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                </div> -->


            </v-card>
        </div>



        <div class="d-flex align-center justify-center" style="height: 100vh;" :style="bottom - gradient"
            v-if="alert == 5">

            <!-- background-color: white; background-image:url(https://picsum.photos/1920/1080?random); background-repeat: no-repeat; background-size: cover;  -->

            <!-- <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" url="http://foo.bar/particles.json" /> -->


            <v-sheet width="600" class="ma-3 pa-3 mr-4 rounded-sm" style="opacity:0.9; background: white;"
                max-width="456" elevation="12" height="450">
                <!-- mx-auto  -->
                <!-- :lazy-src="`https://vuejs.org/images/logo.png)`" -->

                <div class="d-flex align-center justify-center pt-5">
                    <v-img src="https://vuejs.org/images/logo.png" height="40" width="40"></v-img>
                    <br>
                    <br>
                    <!-- <h2>Iniciar Sessão</h2> -->
                </div>

                <div class="d-flex align-center justify-center">

                    <br>
                    <br>
                    <h3> <v-icon icon="mdi-login"></v-icon>&nbsp;Iniciar Sessão</h3>
                    <!-- <p>{{ joke }}</p> -->
                </div>
                <br>



                <v-form fast-fail @submit.prevent="AuthLogin">
                    <v-text-field class="text-subtitle-1" :rules="[rules.required, rules.min]" variant="outlined"
                        prepend-inner-icon="mdi-account" v-model="username" label="Nome de utilizador"></v-text-field>
                    <!-- style="height: 50px; border-bottom:solid #0277BD 5px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px;" -->
                    <!-- <br> -->
                    <v-text-field class="text-subtitle-1" variant="outlined" prepend-inner-icon="mdi-lock"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[pwd.required, pwd.min]"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" hint="Pelo menos 8 caracteres" counter
                        @click:append="show1 = !show1" v-model="password" label="Palavra-passe"
                        type="password"></v-text-field>
                    <a href="#" class="text-caption font-weight-regular">Esqueceu a sua palavra-passe?9</a>

                    <v-btn type="submit" color="primary" block class="mt-2" :ripple="true" :disabled="loading"
                        :loading="loading" prepend-icon="mdi-login">Login</v-btn>
                    <!-- v-on:click="TokenStore.setToken(newToken, true);" -->
                    <!-- @click="AuthLogin();" -->

                </v-form>
                <div class="mt-2">
                    <p class="text-body-2">Não tem uma conta? <a href="/register">Subscreva0</a></p>
                </div>
            </v-sheet>


        </div>

    </v-form>
</template>


<script setup>

import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.


// useTokenStore
import { ref, onMounted } from 'vue';
import { useTokenStore } from '@/store/TokenStore';
import axios from 'axios'
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
            if (value?.length > 9 && /[0-9-]+/.test(value)) return true
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
            if (value?.length >= 9 && /[0-9-]+/.test(value)) return true
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

const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
})


const callback = (response) => {
    // console.log("Handle the response", response)
    const PayLoad = decodeJwtResponse(response.credential)
    console.log("Handle the response", PayLoad)
    // alert(PayLoad.email)
    TokenStore.setToken(response.credential, true);
    window.localStorage.setItem('username', PayLoad.name)
    window.localStorage.setItem('family_name', PayLoad.family_name)
    window.localStorage.setItem('given_name', PayLoad.given_name)
    window.localStorage.setItem('email', PayLoad.email)
    window.localStorage.setItem('myPicture', PayLoad.picture)
    window.localStorage.setItem('JwtToken', response.credential)
    window.location = '/dashboard'
}


const callbackReg = (response) => {
    // console.log("Handle the response", response)
    const PayLoad = decodeJwtResponse(response.credential)
    console.log("Handle the response", PayLoad)
    // alert(PayLoad.email)
    // TokenStore.setToken(response.credential, true);

    window.localStorage.setItem('username', PayLoad.name)
    window.localStorage.setItem('family_name', PayLoad.family_name)
    window.localStorage.setItem('given_name', PayLoad.given_name)
    window.localStorage.setItem('email', PayLoad.email)
    window.localStorage.setItem('myPicture', PayLoad.picture)

    this.regFullName = PayLoad.family_name

    Register();

    // window.localStorage.setItem('JwtToken', response.credential)
    // window.location = '/dashboard'
}

function decodeJwtResponse(token) {
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
}
// const particlesLoaded = async container => {
//     console.log("Particles container loaded", container);
// };

// import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

// createApp(App).use(Particles, {
init: async engine => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
    // },
};

onMounted(() => {
    // alert(TokenStore.tokenID) 
    // this.regFullName = window.localStorage.getItem('given_name') + ' ' + window.localStorage.getItem('family_name')
    // this.regEmail = window.localStorage.getItem('email')
    // alert(this.regEmail)

    // gapi.signin2.render('g_id_register', {
    //     onsuccess: this.Register
    // })

    if (window.localStorage.getItem('JwtToken') != null) {
        // window.location = '/dashboard'
    }
    else {
    }
});
</script>

<script>
const TokenStore = useTokenStore();
const newToken = ['ljahsdfq697e69qwerq', 'Vasco Gungui', 'Administrator']


export default {
    data: () => ({
        MainPanel: false,
        ActIncPwd: false,
        ActEmpty: false,
        ActExist: false,
        ActExistF: false,
        myInterests: ['Tecnológia', 'Portáteis', 'Telefones', 'Impressoras', 'Auriculares', 'Acessórios', 'Consumiveis', 'Comunicação', 'Web', 'Payrol', 'SMS/E-mail'],
        sexCombo: ['Homem', 'Mulher'],
        tab: null,
        bgimage: "https://www.verangola.net/va/images/cache/750x380/crop/images%7Ccms-image-000008157.jpg",
        joke: '',
        username: '',
        password: '',
        show1: false,
        show2: true,
        alert: 'log',
        resetPwd: false,
        visible: false,
        loginError: false,
        emptyFields: false,
        loading: false,
        loaded: false,
        notifyAlert: false,
        agreement: false,
        rules: {
            email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
            length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
            password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
                'Password must contain an upper case letter, a numeric character, and a special character',
            required: v => !!v || 'Este campo é obrigatório',
        },
        nameRules: [
            value => !!value || 'Campo obrigatório.'
            // min: v => v.length >= 8 || 'Min 8 carácteres',
            // emailMatch: () => (`The email and password you entered don't match`),
        ],
        pwdRules: [
            value => !!value || 'Campo obrigatório.',
            // min: v => v.length >= 8 || 'Min 8 carácteres',
            // emailMatch: () => (`The email and password you entered don't match`),
        ],
        userDetails: []

    }),

    watch: {
        loading(val) {
            if (!val) return

            setTimeout(() => (this.loading = false), 6000)
        },
    },
    setup() {
        // const router = useRouter();

        // const AuthLogin = async e => {
        //     const form = new FormData(e.target);

        //     const inputs = Object.fromEntries(form.entries());

        //     await axios.post('auth', inputs);

        //     // await router.push('/dashboard');
        // }       

    },
    methods: {
        RegComplete: function () {
            this.alert = 'done'
            if (this.notifyAlert == true) 
            {
                 alert(true) 
            }
        },
        reset() {
            // this.$refs.form.reset()
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        submit: function () {
            this.$refs.form.$el.submit();
        },

        onflicker() {
            alert(regFullName)
        },
        onSuccess(googleUser) {
            console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
        },
        onFailure(error) {
            console.log(error);
        },
        renderButton() {
            gapi.signin2.render('my-signin2', {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': onSuccess,
                'onfailure': onFailure
            });
        },
        checkInput: function () {
            window.localStorage.setItem('JwtToken', JSON.stringify(newToken));
            this.$router.push({ path: `/dashboard` })
            // window.location = '/dashboard'
            //  alert(TokenStore.tokenID);
            // alert(useModule.dialog)
            // alert(this.isOkToSubmit)
        },
        handleSubmit() {

        },
        async ShowData() {
            let config = {
                headers: {
                    'Accept': 'application/json'
                }
            }

            // const joke = await axios.get('https://icanhazdadjoke.com', config);
            // const joke = await axios.get('https://rest.bissonde.ao/api/account', config);
            const joke = await axios.get('https://localhost:7127/api/account/cubenda@gmail.com', config);
            console.log(joke.data);
        },
        AuthLogin: async function () {
            document.getElementById('topProgress').style.display = "block"

            // alert(this.alert)
            this.notifyAlert = false;
            this.ActIncPwd = false;

            if (this.alert == 'log') {

                //LOGIN
                var LGU = document.getElementById('LGU').value
                var LPW = document.getElementById('LPW').value

                if ((LGU == '' || LPW == '')) {
                    this.loginError = false
                    this.emptyFields = true
                    return
                }
                else {

                }

                let config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer'
                    }

                }

                let auth = {
                    username: this.username, //this.username,
                    password: this.password //this.password
                };

                var acc = JSON.stringify(auth);

                const joke = await axios.post('auth?username=' + LGU + '&password=' + LPW, config, acc)

                    // const newToken = ['ljahsdfq697e69qwerq', 'Vasco Gungui', 'Administrator']

                    .then(
                        (response) => {
                            // console.log(response.data), 
                            //SET USER DATA

                            //  alert(response.data.token)
                            if (response.data.token != undefined) {
                                this.loginError = false;
                                this.emptyFields = false;

                                // setTimeout(() => (
                                TokenStore.setToken(response.data, true),
                                    window.localStorage.setItem('username', LGU),
                                    // window.localStorage.setItem('JwtToken', response.data.token)

                                    // window.localStorage.setItem('username', response.data.name)
                                    // window.localStorage.setItem('family_name', response.data.family_name)
                                    // window.localStorage.setItem('given_name', response.data.given_name)
                                    // window.localStorage.setItem('email', response.data.email)

                                    // if (response.data.picture == null) {
                                    // if(response.data.sex == '0'){
                                    window.localStorage.setItem('myPicture', "https://media.istockphoto.com/id/513501731/pt/vetorial/silhueta-de-uma-mulher-cabe%C3%A7a.jpg?s=612x612&w=0&k=20&c=LF6Sto6AB8taV1HGAZaqJ5rubniAXPyeSxQ-fgxa12w="),
                                    // }
                                    // else{
                                    // window.localStorage.setItem('myPicture', "https://media.istockphoto.com/id/512044369/pt/vetorial/homem-com-cabe%C3%A7a-de-silhueta-isolado.jpg?s=612x612&w=0&k=20&c=TG1sJNJBrNox7bCG4-jlrCgzG2uR4ZV-tOtwWBPzZaI=")
                                    // }
                                    // }
                                    window.localStorage.setItem('JwtToken', response.credential),
                                    // alert(response.data.token)
                                    // alert(response.token)

                                    // if (response.data.token != undefined) {
                                    window.localStorage.setItem('JwtToken', response.data.token),
                                    // }
                                    // else
                                    // {
                                    //     window.localStorage.setItem('JwtToken', response.token)
                                    // }
                                    window.location = '/dashboard'

                                // ), 1000)
                            }
                        }
                    )
                    .catch((err) => {
                        // console.log(err.response)
                        this.emptyFields = false
                        this.loginError = true
                    });

            }
            else if (this.alert == 'reg') {
                //REGISTER
                var RFN = document.getElementById('RFN').value
                var REM = document.getElementById('REM').value
                var RPH = document.getElementById('RPH').value
                var RPWD1 = document.getElementById('RPWD1').value
                var RPWD2 = document.getElementById('RPWD2').value
                var RTAC = document.getElementById('RTAC').checked
                // var RPWD2 = document.getElementById('RPWD2').value
                // var RHT = document.getElementById('RHT').value
                // var RSEX = document.getElementById('RSEX').value
                // var RDOB = document.getElementById('RDOB').value
                // var RLK = document.getElementById('RLK').value

                // alert(RPWD1)


                if (RPWD1 == null) {
                    RPWD1 = '';
                }

                if (RPWD1 != RPWD2) {
                    this.ActIncPwd = true;
                    this.ActEmpty = true;
                    return;
                }


                if (RFN == "" || RPWD1 == "" || RPWD2 == "" || REM == "" || RPH == "" || RTAC == false) {
                    this.ActExist = false;
                    this.ActEmpty = true;
                    return;
                }

                let config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem('JwtToken')
                    }
                }

                let auth = {
                    username: RFN, //this.username,
                    password: RPWD1, //this.password
                    email: REM,
                    tel: RPH,
                    // hint: this.RHT,
                    // dob: this.RDOB,
                    // sex: this.RSEX,
                    // likes: this.RLK
                };

                var acc = JSON.stringify(auth);
                const joke = await axios.post('auth?username=admin&password=auth', config, acc)
                    .then(
                        (response) => {


                            this.notifyAlert = false
                            this.ActExistF = false
                            this.ActExist = false

                            //SAVE TOKEN
                            setTimeout(() => (
                                TokenStore.setToken(response.data, true),
                                window.localStorage.setItem('username', LGU),
                                window.localStorage.setItem('myPicture', "https://media.istockphoto.com/id/513501731/pt/vetorial/silhueta-de-uma-mulher-cabe%C3%A7a.jpg?s=612x612&w=0&k=20&c=LF6Sto6AB8taV1HGAZaqJ5rubniAXPyeSxQ-fgxa12w="),

                                window.localStorage.setItem('JwtToken', response.credential),

                                window.localStorage.setItem('JwtToken', response.data.token)
                            ))


                            if (response.data.token != undefined) {
                                this.loginError = false;
                                this.emptyFields = false;


                                let config = {
                                    headers: {
                                        'Accept': 'application/json',
                                        'Authorization': 'Bearer ' + response.data.token
                                    }
                                }

                                let authx = {
                                    Username: RFN, //this.username,
                                    Pass: RPWD1, //this.password
                                    Email: REM,
                                    Tel: RPH,
                                    // hint: this.RHT,
                                    // dob: this.RDOB,
                                    // sex: this.RSEX,
                                    // likes: this.RLK
                                };

                                var today = new Date();
                                var year = today.getFullYear();
                                var month = (today.getMonth() + 1)
                                var day = today.getDate()
                                var time = today.getHours() + today.getMinutes() + today.getSeconds();
                                var NOW = year + '' + month + '' + day + '' + time

                                // alert(year + '' + month + '' + day + '' + time)



                                var act = JSON.stringify(authx);
                                const joke = axios.post('Account',
                                    {
                                        Username: RFN, //this.username,
                                        Pass: RPWD1, //this.password
                                        Email: REM,
                                        Tel: RPH,
                                        Ask: 'N/A',
                                        Domain: 'donvidado',
                                        ID: NOW,
                                        quest: 'N/A',
                                        user: REM
                                    })
                                    .then(
                                        (response) => {
                                            // window.location = '/profile'
                                            // alert(response.request.status)
                                            // console.log(response.request.status)


                                            if (response.request.status == '400') {
                                                // this.ActExist = true;
                                                if (response.request.response == "Username already exists") {

                                                    this.ActEmpty = false;
                                                    this.ActExist = true;
                                                }
                                            }
                                            if (response.request.status == '200') {
                                                    document.getElementById('dvToolbar').style.display = "none"
                                                    document.getElementById('dvReg').style.display = "none"
                                                document.getElementById('topProgress').style.display = "none"
                                                    document.getElementById('dvDone').style.display = "block"
                                                
                                                // RegComplete();
                                                if (RFN & RPWD1 & REM & RPH) {
                                                    this.ActEmpty = false;
                                                    this.notifyAlert = true;


                                                }
                                                else {
                                                    this.ActEmpty = false;
                                                    this.notifyAlert = true
                                                }
                                            }
                                        }
                                    )
                                    .catch(
                                        (error) => {

                                            if (error.response) {
                                                console.log(error.response.data);
                                                console.log(error.response.status);
                                                console.log(error.response.headers);
                                                console.log(error.toJSON)
                                            }
                                            return error.response;
                                        }
                                    )
                            }
                        }
                    )
                    .catch((err) => {
                        // console.log(err.response)
                        if ((LGU == '' || LPW == '')) {
                            this.loginError = false
                            this.emptyFields = true
                        }
                        else {
                            this.emptyFields = false
                            this.loginError = true
                        }
                    });
            }
            

            // const URL = 'https://localhost:7127/api/auth';

            // let config = {
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // }
            // let auth = {
            //     username: 'cubenda@gmail.com', //this.username,
            //     password: '123' //this.password
            // };

            // axios.post(URL, auth, config)
            //     .then(function (response) {
            //         // console.log(response);
            //     })
            //     .catch(function (error) {
            //         // console.log(error)
            //     });




            // const joke = await axios.get('https://icanhazdadjoke.com', config);
            // console.log(joke.data);

            // try{
            //     const response = await axios.get(
            //         'https://localhost:7127/api/auth',
            //         {
            //             auth:{
            //                username: this.username,
            //                 password: this.password,
            //             },
            //         },
            //     );

            //     return response.data;
            // }
            // catch(err){
            //     console.log(err.message)
            //     console.log(err.response.status)
            // }

            // this.login().then(data => {
            //     console.log(data);
            // });

            // Your login logic here
            // axios.get('https://jsonplaceholder.typicode.com/posts/1')
            // alert(this.username)
            // axios.get('http://rest.bissonde.ao/api/Account/' + this.username)

            //  axios.get('https://rest.bissonde.ao/api/Account/' + this.username)






            // const auth = {
            //     username: this.username,
            //     password: this.password
            // };
            // // console.log(data1);

            // await axios.post('https://localhost:7127/api/auth', auth)
            // .then(
            //     res => {
            //         console.log(res)
            //     }
            // ).catch(
            //     err => {
            //         console.log(err)
            //     }
            // )







            //  axios.get('https://localhost:7127/api/Account/' + this.username)
            //         .then(function(response)
            //         {
            //            console.log(response.data.email + ' ' + response.data.pass + ' ' + response.data.ask)
            //         }) 

            // axios.get('https://rest.bissonde.ao/api/Account/' + this.username,
            // )
            //     .then(function (response) {
            // console.log(response.data.email + ' ' + response.data.pass + ' ' + response.data.ask)



            //    {
            //     console.log(response.data)
            //    })

            // const AxiosHeaders = {
            //     'Content-Type': 'application/json; charset=UTF-8',
            // };

            // const url = 'https://localhost:7127/api/Account/cubenda@gmail.com';

            // axios.get(url, { AxiosHeaders })
            // .then(response => this.userDetails = console.log(response.data))
            // .then((data) => loadTableData(data))
        },

        Register() {
            // this.regFullName = window.localStorage.getItem('given_name') + ' ' + window.localStorage.getItem('family_name')
            // this.regEmail = window.localStorage.getItem('email')
            // alert(this.regEmail)

            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.loaded = true
                this.AuthLogin()
            }, 500)
        },

        load() {
            // if (this.emptyFields === false) {
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.loaded = true
                this.AuthLogin()
            }, 500)
            // }

        },

        async validate() {
            const { valid } = await this.$refs.form.validate()
            alert(valid)
        }
    },
    computed: {

    },
    validations() {
        return {
            fullname: { required },
            email: { required },
            phone: { required },
            password: { required }
        }
    }
}
</script>


<style lang="css" scoped>
.circular {
    width: 100%;
    height: 100%;
    background-size: cover;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
}

.h2 {
    font-size: 1.8em;
}

.v-text-field:deep() {
    font-size: 12px;
    height: 25%;
}

.or {
    text-align: center;
    font-size: 20px;
    background:
        linear-gradient(#000 0 0) left,
        linear-gradient(#000 0 0) right;
    background-size: 40% 1px;
    background-repeat: no-repeat;
}
</style>