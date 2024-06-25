<template>
    <v-app :theme="$store.getters.getMode">
        <navBar />
        <!-- <v-card class="table">
            <v-card-title justify="center">
                Registrations of student {{ studID }}
                <v-spacer style="margin-top: 2%;"></v-spacer>
            </v-card-title>
            <v-table>
                <tr>
                    <th class="text-center text"><v-icon class="mdi mdi-format-list-numbered"></v-icon>
                        N° Class
                    </th>
                    <th class="text-center text"><v-icon class="mdi mdi-google-classroom"></v-icon>
                        Class Name
                    </th>
                    <th class="text-center text"><v-icon class="mdi mdi-account-lock-open"></v-icon>
                        Status
                    </th>
                    <th class="text-center text"><v-icon class="mdi mdi-calendar-rangenp"></v-icon>
                        Register Date
                    </th>
                </tr>
                <tbody>
                    <tr v-for="registrations in classesByStudent" :key="registrations.id">
                        <td class="text text-center">{{ registrations.class_id }}</td>
                        <td class="text text-center">{{ registrations.Class.name }}</td>
                        <td class="text text-center">{{ registrations.status }}</td>
                        <td class="text text-center">{{ registrations.createdAt }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card> -->
        <v-card class="table"> 
            <v-card-title>
                Registrations of student {{ studID }}
                <v-spacer></v-spacer>
                <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Search" single-line
                    hide-details clearable></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="classesByStudent" :search="search" :loading="loading">
            </v-data-table>
        </v-card>
    </v-app>
</template>

<script>
import navBar from './navBar.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {
    name: 'studentsRegistrations',
    components: { navBar, VDataTable },
    data() {
        return {
            studID: "",
            classesByStudent: [],
            search: "",
            headers: [
                {
                    align: 'start',
                    key: 'class_id',
                    title: 'Class N°',
                },
                { key: 'Class.name', title: 'Subject' },
                { key: 'status', title: 'Status' },
                { key: 'createdAt', title: 'Register Date'},
            ],
        }
    },
    setup() {
        const store = useStore();
    },
    created() {
        this.getStudID();
        this.getClassesByStudent();
    },
    methods: {
        getStudID() {
            this.studID = this.$store.getters.getStudID;
        },
        getClassesByStudent() {

            const classes = {
                method: 'POST',
                url: "http://localhost:9000/registrations/students/:id",
                data: {
                    id: this.studID,
                }
            }

            axios(classes)
                .then((res) => {
                    this.classesByStudent = res.data;
                })
                .catch((error) => {
                    console.log(error);
                })

            this.loading = false;
        },
    },
}
</script>

<style scoped>
.table {
    width: 80%;
    margin-left: 15%;
}
</style>
