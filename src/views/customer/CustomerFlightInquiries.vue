<template>
  <v-container>
    <v-layout align-center justify-space-around row fill-height/>
    <v-flex>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Inquire Flight</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container grid-list-6>
              <v-layout row wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="flightNo"
                    v-validate="'required'"
                    :error-messages="errors.collect('flightNo')"
                    data-vv-name="flightNo"
                    label="Flight Number"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="origin"
                    v-validate="'required'"
                    :error-messages="errors.collect('origin')"
                    data-vv-name="origin"
                    label="Origin"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="departure"
                    v-validate="'required'"
                    :error-messages="errors.collect('departure')"
                    data-vv-name="departure"
                    label="Departure"
                  ></v-text-field>
                </v-flex>                
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="price"
                    v-validate="'passenger'"
                    :error-messages="errors.collect('passenger')"
                    data-vv-name="passenger"
                    label="Passenger"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="note"
                    v-validate="'note'"
                    :error-messages="errors.collect('note')"
                    data-vv-name="note"
                    label="note"
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
                      @click.exact="InquireFlight()"
                    >Inquire</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-layout>
            </v-container>
          </v-form>
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
          <v-btn flat @click="snackbar.isError = false"></v-btn>
        </v-snackbar>
      </v-card>
    </v-flex>
  </v-container>
</template>

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
        color: "error"
      },
      origin: null,
      departure: null,
      passenger: null,
      note: null,
      
    };
  },

  methods: {
    InquireFlight() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.$store
          .dispatch("InquireFlight", {
            origin: this.origin,
            departure: this.departure,
            passenger: this.passenger,
            note: this.note
          })
          .then(response => {
            this.load = false;
            if (response.status === 201) {
              this.snackbar.color = "success";
              this.snackbar.isError = true;
              this.snackbar.text = "Inquiry Successfully Added!";
              setTimeout(
                () => this.$router.push({ path: "/inquiries/tickets" }),
                2000
              );
            }
          })
          .catch(error => {
            if (error.status === 500) {
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
