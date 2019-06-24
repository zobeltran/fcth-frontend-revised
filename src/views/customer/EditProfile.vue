<template>
  <v-container>
    <v-layout align-center justify-space-around row fill-height/>
    <v-flex>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Update Profile</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
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
                  <!-- <v-flex xs12 sm6 md6>
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
                      :type="password"
                      counter
                      :error-messages="errors.collect('Password')"
                      data-vv-name="Password"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="confirmPassword"
                      label="Confirm Password"
                      v-validate="'required|confirmed:password'"
                      :type="password"
                      :error-messages="errors.collect('Confirm Password')"
                      data-vv-name="Confirm Password"
                      data-vv-as="password"
                    ></v-text-field>
                  </v-flex>

                <v-card-actions>
                  <v-flex xs12 sm6 md4>
                    <v-btn
                      block
                      round
                      color="primary"
                      @click.native="loader = 'load'"
                      :loading="load"
                      :disabled="load"
                      @click.exact="updateUser()"
                    >Update</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-layout>
            </v-container>
        </v-card-text>
        <v-snackbar
          v-model="snackbar.isError"
          :color="snackbar.color"
          :bottom="snackbar.y"
          :multi-line="snackbar.mode"
          :right="snackbar.x"
          :timeout="snackbar.timeout"
        >
          {{snackbar.text}}
          <v-btn flat @click="snackbar.isError = false">Close</v-btn>
        </v-snackbar>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
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
        color: "error"
      },
      id: localStorage.getItem("userID"),
      firstName: null,
      middleName: null,
      lastName: null,
      email: null,
      // username: null,
      password: null,
      confirmPassword: null
    };
  },
  created() {
    //console.log(this.id)
    // axios
    //   .get(process.env.VUE_APP_ROOT_API + "api/v1/users/id=" + this.id)
    //   .then(response => {
    //     console.log(response);
    //     this.firstName = response.data.user.firstName;
    //     this.middleName = response.data.user.middleName;
    //     this.lastName = response.data.user.lastName;
    //     this.email = response.data.user.email;
    //     // this.username = response.data.user.username;
    //     this.password = response.data.user.password;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$store
        .dispatch("viewUserId", {
          id: this.id
        })
        .then(response => {
          this.firstName = response.data.userDetails.firstName;
          this.middleName = response.data.userDetails.middleName;
          this.lastName = response.data.userDetails.lastName;
          this.email = response.data.userDetails.email;
          this.username = response.data.userDetails.username;
          this.password = response.data.userDetails.password;
        });
    },
    updateUser() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.$store
          .dispatch("updateUser", {
            id: this.id,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            email: this.email,
            username: this.username,
            password: this.password
          })
          .then(response => {
            this.load = false;
            if (response.status === 200) {
              this.snackbar.color = "success";
              this.snackbar.isError = true;
              this.snackbar.text = "User Successfully Updated!";
              setTimeout(
                () => this.$router.push({ path: "/users/customerview" }),
                2000
              );
            }
          })
          .catch(error => {
            console.log(JSON.stringify(error.response.status));
            if (error.response.status === 500) {
              this.load = false;
              this.snackbar.isError = true;
              this.snackbar.text =
                "Sorry, we're slightly having a server error. Please hang on there.";
            }
            if (error.status === 404) {
              this.laod = false;
              this.snackbar.isError = true;
              this.snackbar.text =
                "Sorry, I'm afraid we can't communicate with the server right now.";
            }
            if (error.status === 401) {
              this.snackbar.isError = true;
              this.snackbar.text =
                "Session Ended Please Relogin. Will logout in 3 Seconds";
              this.$router.push("logout");
            } else {
              this.load = false;
              this.snackbar.isError = true;
              this.snackbar.text =
                error.data.errors.errorCode + " " + error.data.errors.message;
            }
          });
      }
    }
  }
};
</script>
