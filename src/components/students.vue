<template>
    <v-app id="app" :theme="$store.getters.getMode">
        <navBar @changeStyle="changeStyle" />
        <div class="noOverflow">
            <v-container class="students-view" :style="formStyle">
                <v-checkbox class="checkbox" color="red" label="Show inactive students" v-model="isChecked"
                    @change="showInactives"></v-checkbox>
                <v-table class="students-table" hover>
                    <thead>
                        <tr>
                            <th class="text-center text"><v-icon class="mdi mdi-account-school"></v-icon>
                                Name
                            </th>
                            <th class="text-center text"><v-icon class="mdi mdi-email"></v-icon>
                                Email
                            </th>
                            <th class="text-center text"><v-icon class="mdi mdi-format-list-numbered"></v-icon>
                                Reg. Number
                            </th>
                            <th class="text-center text"><v-icon class="mdi mdi-account-lock-open"></v-icon>
                                Active
                            </th>
                            <th class="text-center text actions"><v-icon class="mdi mdi-file-edit"></v-icon>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in allStudents" :key="student.id">
                            <td class="text text-center">{{ student.name }}</td>
                            <td class="text text-center">{{ student.email }}</td>
                            <td class="text text-center">{{ student.id }}</td>
                            <td class="text text-center">{{ student.active }}</td>
                            <td class="text-center actions">
                                <v-btn title="Edit Students Info" icon="mdi mdi-file-edit" elevation="5" @click="onEditClick" class="button"
                                    :id="student.id" color="red" hint="Edit Students Infos">
                                </v-btn>
                                <v-btn title="Student Classes" icon="mdi mdi-google-classroom" elevation="5" @click="onClassClick" class="button"
                                    :id="student.id" color="red" hover="Edit Students Infos">
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-container>
        </div>
    </v-app>
</template>

<script>
//components
import navBar from './navBar.vue'

//extensions
import axios from 'axios'

export default {
    name: 'studentsView',
    components: { navBar },
    data() {
        return {
            allStudents: [],
            studentID: Number,
            formStyle: "margin-left: 14%",
            isChecked: false,
        }
    },
    methods: {
        getActiveStudents() {
            const students = {
                method: 'GET',
                url: "http://localhost:9000/students",
            };

            axios(students)
                .then((res) => {
                    this.allStudents = res.data;
                })
                .catch((error => {
                    console.log(error);
                }))
        },
        changeStyle() {
            this.formStyle = "margin-left: 0; pagging: 0";
        },
        onEditClick(e) {
            this.$store.commit('setStudID', e.target.id);
            this.$router.push('/students/edit');
        },
        onDeleteClick(e) {
            this.studentID = e.target.id
            this.deleteStudent(e);
        },
        deleteStudent() {
            const studentDeleted = {
                method: 'DELETE',
                data: { id: this.studentID },
                url: `http://localhost:9000/students/:id`,
            }

            axios(studentDeleted)
                .then((res) => {
                    console.log(res.data)
                    alert(`student with register ${this.studentID} deleted`);
                    this.getActiveStudents();
                })
                .catch((error) => {
                    alert(error)
                    console.log(error)
                })
        },
        getAllStudents() {
            const allStudents = {
                method: 'GET',
                url: "http://localhost:9000/students/inactive",
            };

            axios(allStudents)
                .then((res) => {
                    console.log(res.data)
                    this.allStudents = res.data;
                })
                .catch((error => {
                    console.log(error);
                }))
        },
        showInactives() {
            if (this.isChecked) {
                this.getAllStudents();
            } else {
                this.getActiveStudents();
            }
        },
        onClassClick(e){
            this.$store.commit('setStudID', e.target.id);
            this.$router.push('/students/registrations');
        },
    },
    created() {
        this.getActiveStudents();
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

.checkbox{
    width: 12%;
}

.button {
    width: 20%;
    margin-top: 4%;
    margin-bottom: 5%;
    margin-right: 6%;
}

.v-btn .v-btn__content {
    pointer-events: none;
}

.text {
    font-size: 18px;
}

@media (max-width: 900px) {
    .students-table{
        width: 98%;
    }
    .actions{
        width: 2000px;
    }
    .checkbox{
        width: 55%;
    }
}
</style>