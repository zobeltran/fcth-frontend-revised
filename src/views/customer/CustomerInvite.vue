<template>
	<v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex x12 sm8 md4>
                    <v-card class='elevation-12'>
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Invite a friend</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <br>
                        <v-card-text>
                            <v-flex xs9 offset-xs1>
                                <v-form ref="form" v-model="valid">                                    
                                    <v-text-field prepend-icon="person" v-model="email" label="E-mail" type="text" :rules="emailRules"></v-text-field>
                                </v-form>
                            </v-flex>
                        </v-card-text>
                        <v-card-actions>
                            <v-flex xs4 offset-xs4>
                                <v-btn block round color="primary" @click.native="loader = 'load'" :loading="load" :disabled="load" @click.exact="invite()">Invite</v-btn>
                            </v-flex>
                        </v-card-actions>
                        <br>
                     </v-card>
                </v-flex>
            </v-layout>
            <v-snackbar v-model="snackbar.isError" :color="snackbar.color" :bottom="snackbar.y" :multi-line="snackbar.mode" :right="snackbar.x" :timeout="snackbar.timeout">
                {{snackbar.text}}
            <v-btn flat @click="snackbar.isError = false">
                Close
            </v-btn>
            </v-snackbar>
        </v-container>
    </v-content>
</template>

<script>
export default {
    data() {
        return{
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
            valid: false,
            email: null,
            emailRules: [
                (v) => !!v || 'Email is Required',
            ]
        };
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        },
    },
    methods: { 
        invite() {
            if (this.$refs.form.validate()) {
                this.load = true;
                this.$store.dispatch('inviteAFriend', {
                    email: this.email
                })
                .then((response) => {
                    console.log( "DATA:", response.data.data )
                    this.load = false;
                    this.snackbar.color = 'success';
                    this.snackbar.isError = true;
                    this.snackbar.text = response.data.data.message
                })
                .catch((error) => {
                	console.log( 'inside exception' )
                    if (error.status === 500) {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Sorry, we\'re slightly having a server error. Please hang on there.';
                    }
                    if (error.status === 404 || error === "Network Error" ) {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = 'Sorry, I\'m afraid we can\'t communicate with the server right now.';
                    } else {
                        this.load = false;
                        this.snackbar.isError = true;
                        this.snackbar.text = error.data.errors.errorCode + ' ' + error.data.errors.message;
                    }
                });
            }
        },
    },
};
</script>