<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex x12 sm8 md4>
               <v-card class='elevation-12'>
                    <v-toolbar dark color="primary">
                         <v-toolbar-title>OBRS-FCTH</v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-container>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        Welcome!
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
};
</script>
