<template>
    <v-app id="app" :theme="$store.getters.getMode">
        <navBar @changeStyle="changeStyle" />
        <v-container class="students-view" :style="formStyle">
            <v-table class="students-table" hover>
                <thead>
                    <tr>
                        <th class="text-center text"><v-icon class="mdi mdi-account-school"></v-icon>
                            Name
                        </th>
                        <th class="text-center text"><v-icon class="mdi mdi-email"></v-icon>
                            Email
                        </th>
                        <th class="text-center text"><v-icon class="mdi mdi-book-open-page-variant"></v-icon>
                            Subject
                        </th>
                        <th class="text-center text"><v-icon class="mdi mdi-format-list-numbered"></v-icon>
                            Reg. Number
                        </th>
                        <th class="text-center text"><v-icon class="mdi mdi-file-edit"></v-icon>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="teacher in teachers" :key="teacher.id">
                        <td class="text-center">{{ teacher.name }}</td>
                        <td class="text-center">{{ teacher.email }}</td>
                        <td class="text-center">{{ teacher.subject }}</td>
                        <td class="text-center">{{ teacher.id }}</td>
                        <td class="text-center">
                            <v-btn title="Edit teacher info" icon="mdi mdi-file-edit" elevation="5" @click="onEditClick" class="button text"
                                :id="teacher.id" color="red">
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </v-app>
</template>

<script>
//components
import navBar from './navBar.vue'

//extensions
import axios from 'axios'

export default {
    name: 'teachersView',
    components: { navBar },
    data() {
        return {
            teachers: [],
            teacherID: Number,
            formStyle: "margin-left: 14%",
            isChecked: false,
            alertColor: 'success',
            showAlert: true,
            alertText: "",
            alertIcon: "",
            alertTitle: "",
        }
    },
    methods: {
        getTeachers() {
            const teachers = {
                method: 'GET',
                url: "http://localhost:9000/teachers",
            };

            axios(teachers)
                .then((res) => {
                    this.teachers = res.data;
                })
                .catch((error => {
                    console.log(error);
                }))
        },
        changeStyle() {
            this.formStyle = "margin-left: 0; pagging: 0";
        },
        onEditClick(e) {
            this.$store.commit('setTeachID', e.target.id);
            this.$router.push('/teachers/edit');
        },
    },
    created() {
        this.getTeachers();
    },
}
</script>

<style scoped>
.students-view {
    padding: 0;
}

.students-table {
    /* background: rgb(178, 34, 34);
    background: linear-gradient(164deg, rgba(178, 34, 34, 1) 10%, rgba(250, 128, 114, 1) 100%); */
    margin-right: 10%;
    margin-left: 1%;
    margin-bottom: 1%;
}

.button {
    width: 20%;
    margin-top: 4%;
    margin-bottom: 2%;
    margin-right: 6%;
}

.v-btn .v-btn__content {
    pointer-events: none;
}

.text {
    font-size: 18px;
}

.alert-modal {
    width: 100%;
    font-size: 20px;
}

.alert {
    position: absolute;
    top: 85%;
    left: 55%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    width: 40%;
    font-size: 20px;
}

@media (max-width: 900px) {
    .students-table{
        width: 98%;
    }
}
</style>