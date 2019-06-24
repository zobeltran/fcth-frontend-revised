<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register Employee</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="register()" v-model="valid">
              <v-container grid-list-4>
                <v-layout row wrap>
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
                      <v-btn
                        block
                        round
                        color="primary"
                        type="submit"
                        @click.native="loader = 'load'"
                        :loading="load"
                        :disabled="load"
                        @click.exact="register()"
                      >Verify</v-btn>
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
export default {
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
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
    async register() {
      await this.$validator.validateAll().then(valid => {
        if (valid) {
          this.load = true;
          // console.log(this.$route.params.id);
          this.$store
            .dispatch("verifyEmployee", {
              id: this.$route.params.id,
              password: this.password,
            })
            .then(response => {
              this.load = false;
              if (response.status === 200) {
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
              else if (error.status === 500) {
                this.load = false;
                this.snackbar.isError = true;
                this.snackbar.text =
                  "Sorry, we're slightly having a server error. Please hang on there.";
              }
              else if (error.status === 404 || error === "Network Error") {
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
