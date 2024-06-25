<template>
    <v-app id="app" :theme="$store.getters.getMode">
        <navBar @changeStyle="changeStyle" />
        <v-label class="infos title">
            <h1>Infos of student {{ student.id }} </h1>
        </v-label>
        <v-container class="infos">
            <v-form class="new-stud-form">
                <v-text-field class="text-field" label="Register Number" v-model="student.id" readonly>
                </v-text-field>
                <v-text-field class="text-field" label="Name" v-model="student.name">
                </v-text-field>
                <v-text-field class="text-field" label="Email" v-model="student.email">
                </v-text-field>
                <v-select class="text-field" label="Active" v-model="student.active" :items="activeOptions">
                </v-select>
                <v-container class="tools">
                    <v-container class="actions">
                        <v-tooltip class="mdi-information" color="red"
                            text="By choosing active as 'false' this student will not appear in some searchs.">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" icon="mdi mdi-information" class="icon-info"></v-icon>
                            </template>
                        </v-tooltip>
                    </v-container>
                    <v-btn @click="updateInfos" class="btn" color="success">Save</v-btn>
                    <v-btn @click="deleteStudent" class="btn" color="red">Delete</v-btn>
                </v-container>
            </v-form>
        </v-container>
        <div class="alert-modal" v-if="showAlert">
            <v-alert class="alert" :color="alertColor" :icon="alertIcon" :title="alertTitle" :text="alertText"></v-alert>
        </div>
    </v-app>
</template>

<script>
import navBar from './navBar.vue';

import axios from 'axios';

export default {
    name: 'editStudent',
    components: { navBar },
    data() {
        return {
            student: "",
            selectedStudent: '',
            activeOptions: ['true', 'false'],
            active: '',
            studentID: '',
            alertColor: '',
            showAlert: false,
            alertText: "",
            alertIcon: "",
            alertTitle: "",
            updatedStudent: "",
        }
    },
    methods: {
        getStudent() {
            const students = {
                method: 'POST',
                url: "http://localhost:9000/students/:id",
                data: { id: this.$store.getters.getStudID }
            };

            axios(students)
                .then((res) => {
                    this.student = res.data;
                })
                .catch((error) => {
                    this.onError(error);
                })
        },
        updateInfos() {
            this.updatedStudent = this.student

            if (this.updatedStudent.name === "" || this.updatedStudent.email === "" || this.updatedStudent.name === null || this.updatedStudent.email === null) {
                this.alertColor = "error";
                this.alertIcon = "$error";
                this.alertTitle = "Error";
                this.alertText = "Name and email must be filled"
                this.showAlert = true;

                setTimeout(this.closeAlert, 2000);
            } else {

                const newInfo = {
                    method: 'PUT',
                    url: "http://localhost:9000/students/edit/:id",
                    data: {
                        id: this.student.id,
                        name: this.student.name,
                        email: this.student.email,
                        active: this.student.active
                    }
                };

                axios(newInfo)
                    .then(() => {
                        this.getStudent();;
                    })
                    .catch((error) => {
                        this.onError(error);
                    })
            }
        },
        deleteStudent() {
            const studentDeleted = {
                method: 'DELETE',
                data: { id: this.student.id },
                url: `http://localhost:9000/students/:id`,
            }

            axios(studentDeleted)
                .then((res) => {
                    console.log(res.data)
                    alert(`student ${this.student.id}  deleted`);

                    this.$router.push("/students")
                })
                .catch((error) => {
                    this.onError(error);
                })
        },
        onError(error) {
            this.alertColor = "error";
            this.alertIcon = "$error";
            this.alertTitle = "Error";
            this.alertText = error.message
            this.showAlert = true;

            setTimeout(this.closeAlert, 2000);
        },
    },
    created() {
        this.getStudent();
    }
}
</script>

<style scoped>
.title {
    overflow: hidden;
}

.infos {
    display: flex;
    justify-content: center;
}

.new-stud-form {
    width: 80%;
    margin-top: 3%;
    margin-left: 4%;
}

.text-field {
    font-size: 20px;
    margin-bottom: 3%;
}

.tools {
    justify-content: center;
}

.actions {
    padding-left: 0;
}

.icon-info {
    color: red;
    margin-left: 49.5%;
}

.btn {
    width: 47%;
    margin-left: 2%;
}
</style>