<template>
    <v-container>
        <v-layout align-center justify-space-around row fill-height/>
            <v-flex>
                <v-card class='elevation-12'>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Add Hotel</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-container grid-list-4>
                                <v-layout row wrap>
                                    <v-flex xs12 sm4 md4>
                                        <v-text-field 
                                            v-model="location"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('location')"
                                            data-vv-name="location"
                                            label="Location"></v-text-field>
                                            
                                    </v-flex>
                                     <v-flex xs12 sm4 md4>
                                        <v-text-field 
                                            v-model="budget"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('budget')"
                                            data-vv-name="budget"
                                            label="Budget"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md4>
                                        <v-menu
                                            ref="checkIn"
                                            :close-on-content-click="false"
                                            v-model="menu1"
                                            :nudge-right="40"
                                            :return-value.sync="date1"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                        >
                                            <v-text-field
                                            slot="activator"
                                            v-model="checkIn"
                                            label="Check-In Date"
                                            prepend-icon="event"
                                            readonly
                                            v-validate="'required'"
                                            :error-messages="errors.collect('checkIn')"
                                            ></v-text-field>
                                            <v-date-picker v-model="checkIn" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="$refs.checkIn.save(date1)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>


                                    <v-flex xs12 sm6 md4>
                                        <v-menu
                                            ref="checkOut"
                                            :close-on-content-click="false"
                                            v-model="menu2"
                                            :nudge-right="40"
                                            :return-value.sync="date2"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                        >
                                            <v-text-field
                                            slot="activator"
                                            v-model="checkOut"
                                            label="Check-Out Date"
                                            prepend-icon="event"
                                            readonly
                                            v-validate="'required'"
                                            :error-messages="errors.collect('checkOut')"
                                            ></v-text-field>
                                            <v-date-picker v-model="checkOut" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="$refs.checkOut.save(date2)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm4 md4>
                                        <v-text-field 
                                            v-model="guestNumber"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('guestNumber')"
                                            data-vv-name="guestNumber"
                                            label="Number of Guest"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm4 md4>
                                        <v-text-field 
                                            v-model="note"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('note')"
                                            data-vv-name="note"
                                            label="Note"></v-text-field>
                                    </v-flex>
                                    
                                    <v-card-actions>
                                    <v-flex xs12 sm6 md4>
                                    <v-btn block round color="primary" @click.native="loader = 'load'" :loading="load" :disabled="load" @click.exact="inquireHotel()">Inquire Hotel</v-btn>
                                    </v-flex>
                                    </v-card-actions>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-snackbar v-model="snackbar.isError" :color="snackbar.color" :bottom="snackbar.y" :multi-line="snackbar.mode" :right="snackbar.x" :timeout="snackbar.timeout">
                        {{snackbar.text}}
                        <v-btn flat @click="snackbar.isError = false">
                            Close
                        </v-btn>
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
                color: 'error',
            },
            location: null,
            budget: null,
            guestNumber: null,
            note: null,
            checkIn: null,
            checkOut: null,
            menu1: null,
            date1: null,
            menu2: null,
            date2: null
        };
    },

    methods: {
        inquireHotel() {
            if (this.$refs.form.validate()) {
                this.load = true;
                this.$store.dispatch('inqureHotel', {
                    location: this.location,
                    budget: this.budget,
                    guestNumber: this.guestNumber,
                    note: this.note,
                    checkIn: this.checkIn,
                    checkOut: this.checkOut,
                })
                .then((response) => {
                    this.load = false;
                    if (response.status === 201) {
                        this.snackbar.color = 'success';
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Hotel Successfully Inquired!';
                        setTimeout(()=>this.$router.push({path:'/inquiries/hotels'}),2000);
                    }
                })
                .catch((error) => {
                    if (error.status === 500) {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Sorry, we\'re slightly having a server error. Please hang on there.';
                    }
                    if (error.status === 404) {
                        this.laod = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Sorry, I\'m afraid we can\'t communicate with the server right now.';
                    } else {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = error.data.errors.errorCode + ' ' + error.data.errors.message;
                    }
                });
            }

        }
    },
    
}
</script>
