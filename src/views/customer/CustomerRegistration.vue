<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register Customer</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="submit()" v-model="valid">
              <v-container grid-list-4>
                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      v-model="firstName"
                      v-validate="'required'"
                      :error-messages="errors.collect('First Name')"
                      data-vv-name="First Name"
                      label="First Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      v-model="middleName"
                      v-validate="'required'"
                      :error-messages="errors.collect('Middle Name')"
                      data-vv-name="Middle Name"
                      label="Middle Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      v-model="lastName"
                      v-validate="'required'"
                      :error-messages="errors.collect('Last Name')"
                      data-vv-name="Last Name"
                      label="Last Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="email"
                      v-validate="'required'"
                      :error-messages="errors.collect('Email')"
                      data-vv-name="Email"
                      label="Email"
                    ></v-text-field>
                  </v-flex>
                  <!--<v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="username"
                      v-validate="'required'"
                      :error-messages="errors.collect('Username')"
                      data-vv-name="Username"
                      label="Username"
                    ></v-text-field>
                  </v-flex> -->
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      v-validate="'required|min:8'"
                      ref="password"
                      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                      :type="showPassword ? 'text' : 'password'"
                      counter
                      :error-messages="errors.collect('Password')"
                      data-vv-name="Password"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="confirmPassword"
                      label="Confirm Password"
                      v-validate="'required|confirmed:password'"
                      :append-icon="showConfirm ? 'visibility_off' : 'visibility'"
                      :type="showConfirm ? 'text' : 'password'"
                      :error-messages="errors.collect('Confirm Password')"
                      data-vv-name="Confirm Password"
                      data-vv-as="password"
                      @click:append="showConfirm = !showConfirm"
                    ></v-text-field>
                  </v-flex>
                  <v-card-actions>
                    <v-flex xs4 offset-xs4>
                      <vue-recaptcha 
                          ref="recaptcha"
                          size="invisible"
                          sitekey="6Leqo5UUAAAAAK3fhKWC3cPIDQMPgNP3P5OV-52B"
                          @verify="onCaptchaVerified"
                          @expired="onExpired"
                        >
                        <v-btn
                          block
                          @click.native="loader = 'load'"
                          :loading="load"
                          round
                          :disabled="load"
                          color="primary"
                          type="submit"
                          @click.exact="submit()"
                        >Register</v-btn>
                      </vue-recaptcha>
                    </v-flex>
                  </v-card-actions>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-snackbar
            v-model="snackbar.isError"
            :auto-height="true"
            :color="snackbar.color"
            :bottom="snackbar.y"
            :multi-line="snackbar.mode"
            :right="snackbar.x"
            :timeout="snackbar.timeout"
          >
            {{snackbar.text}}
            <ul>
              <li
                v-for="errorMessage in snackbar.errorMessages"
                :key="errorMessage"
              >{{errorMessage}}</li>
            </ul>
            <v-btn flat @click="snackbar.isError = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
li {
  list-style: none;
}
</style>


<script>
import VueRecaptcha from "vue-recaptcha";
import { register } from 'register-service-worker';
export default {
  components: { VueRecaptcha },
  name: "registerCustomer",
  data() {
    return {
      valid: false,
      loader: null,
      load: false,
      snackbar: {
        isError: false,
        y: true,
        x: true,
        mode: true,
        timeout: 6000,
        text: null,
        errorMessages: [],
        color: "error"
      },
      showPassword: false,
      showConfirm: false,
      firstName: null,
      middleName: null,
      lastName: null,
      email: null,
      // username: null,
      password: null,
      confirmPassword: null,
      role: "CU"
    };
  },
  mounted(){
    let recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit');
    document.head.appendChild(recaptchaScript);
  },
  methods: {

    submit(){
      this.$refs.recaptcha.reset()
    },
    onCaptchaVerified: function(recaptchaToken){
      this.register();
      
    },
    onExpired: function () {
      console.log('Expired');
    },
    resetRecaptcha () {
      this.$refs.recaptcha.reset() // Direct call reset method
    },
    async register() {
      await this.$validator.validateAll().then(valid => {
        if (valid) {
          this.load = true;
          this.$store
            .dispatch("registerEmployee", {
              firstName: this.firstName,
              middleName: this.middleName,
              lastName: this.lastName,
              email: this.email,
              // username: this.username,
              password: this.password,
              role: this.role
            })
            .then(response => {
              this.load = false;
              if (response.status === 201) {
                this.snackbar.color = "success";
                this.snackbar.isError = true;
                this.snackbar.text = "Successfully Registered!";
                // this.$router.push({name: 'login'});
              }
            })
            .catch(error => {
              console.log(error);
              if (error.status === 400) {
                this.load = false;
                this.snackbar.isError = true;
                this.snackbar.text = error.data.errors.errorCode;
                this.snackbar.errorMessages = error.data.errors.message;
              }
              if (error.status === 500) {
                this.load = false;
                this.snackbar.isError = true;
                this.snackbar.text =
                  "Sorry, we're slightly having a server error. Please hang on there.";
              }
              if (error.status === 404 || error === "Network Error") {
                this.load = false;
                this.snackbar.isError = true;
                this.snackbar.text =
                  "Sorry, I'm afraid we can't communicate with the server right now.";
              } else {
                this.snackbar.isError = true;
                this.snackbar.text =
                  "Session Ended Please Relogin. Will logout in 3 Seconds";
                setTimeout(this.$router.push("logout"), 4000);
              }
            });
        }
      });
    }
  }
};
</script>