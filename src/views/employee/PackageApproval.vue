<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg4
        v-for="package_alias in viewPackagesForApproval"
        :key="package_alias"
      >
        <v-container>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{package_alias.name}}</h3>
                <div>
                  Itenerary: {{package_alias.details.itinerary}}
                  <br>
                  Inclusions: {{package_alias.details.inclusions}}
                  <br>
                  Days: {{package_alias.details.days}}
                  <br>
                  Price: {{package_alias.price}}
                  <br>
                  Flight Ticket: {{package_alias.ticket.flightNo}} ({{package_alias.ticket.origin}} - {{package_alias.ticket.destination}})
                  <br>
                  Hotel: {{package_alias.hotel.name}}
                  <br>
                  Slots Available: {{package_alias.remainingSlots}}
                  <br>
                  Departure Date: {{package_alias.departureDate}}
                  <br>
                  Expiration Date: {{package_alias.expirationDate}}
                  <br>
                  Note: {{package_alias.details.notes}}
                  <br>
                </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn
                fab
                dark
                small
                color="green"
                class="btn btn-info btn-block"
                @click="approvePackage(package_alias.id)"
              >
                <v-icon>check_circle</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="red"
                class="btn btn-danger"
                @click="deletePackage(package_alias.id)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>
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
          <li v-for="errorMessage in snackbar.errorMessages" :key="errorMessage">{{errorMessage}}</li>
        </ul>
        <v-btn flat @click="snackbar.isError = false">Close</v-btn>
      </v-snackbar>
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
  name: "packages",
  data() {
    return {
      viewPackagesForApproval: [],
      snackbar: {
        isError: false,
        y: true,
        x: true,
        mode: true,
        timeout: 6000,
        text: null,
        errorMessages: [],
        color: "error"
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    deletePackage(id) {
      this.$store
        .dispatch("deletePackage", { id: id })
        .then(response => {
          this.fetchData();
          if (response.status === 200) {
            this.snackbar.color = "success";
            this.snackbar.isError = true;
            this.snackbar.text = "Successfully Deleted!";
          }
        })
        .catch(error => {
          if (error.status === 400) {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
          if (error.status === 500) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, we're slightly having a server error. Please hang on there.";
          }
          if (error.status === 404) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, I'm afraid we can't communicate with the server right now.";
          } else {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Session Ended Please Relogin. Will logout in 3 Seconds";
            setTimeout(this.$router.push("logout"), 3000);
          }
        });
    },
    approvePackage(id) {
      this.$store
        .dispatch("approvePackage", { id: id, isApproved: true })
        .then(response => {
          this.fetchData();
          if (response.status === 200) {
            this.snackbar.color = "success";
            this.snackbar.isError = true;
            this.snackbar.errorMessages = [];
            this.snackbar.text = "Approved Package";
          }
        })
        .catch(error => {
          console.log(error)
          if (error.status === 400) {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
          else if (error.status === 500) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, we're slightly having a server error. Please hang on there.";
          }
          else if (error.status === 404) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, I'm afraid we can't communicate with the server right now.";
          } else {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Session Ended Please Relogin. Will logout in 3 Seconds";
            setTimeout(this.$router.push("logout"), 3000);
          }
        });
    },
    fetchData() {
      this.$store
        .dispatch("viewPackagesForApproval")
        .then(response => {
          this.viewPackagesForApproval = response.data.packages;
        })
        .catch(response => {
          if (error.status === 400) {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
          if (error.status === 500) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, we're slightly having a server error. Please hang on there.";
          }
          if (error.status === 404) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Sorry, I'm afraid we can't communicate with the server right now.";
          }
          if (error.status === 401) {
            this.snackbar.isError = true;
            this.snackbar.text =
              "Session Ended Please Relogin. Will logout in 3 Seconds";
            setTimeout(this.$router.push("logout"), 3000);
          } else {
            this.snackbar.isError = true;
            this.snackbar.text = error.data.errors.errorCode;
            this.snackbar.errorMessages = error.data.errors.message;
          }
        });
    }
  }
};
</script>