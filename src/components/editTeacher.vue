<template>
    <v-app id="app" :theme="$store.getters.getMode">
        <navBar @changeStyle="changeStyle" />
        <v-label class="infos title">
            <h1>Infos of teacher {{ teacher.id }} </h1>
        </v-label>
        <v-container class="infos">
            <v-form class="new-stud-form">
                <v-text-field class="text-field" label="Register Number" v-model="teacher.id" readonly>
                </v-text-field>
                <v-text-field class="text-field" label="Name" v-model="teacher.name">
                </v-text-field>
                <v-text-field class="text-field" label="Email" v-model="teacher.email">
                </v-text-field>
                <v-text-field class="text-field" label="Subject" v-model="teacher.subject">
                </v-text-field>
                <v-btn @click="updateInfos" class="btn" color="success">Save</v-btn>
                <v-btn append-icon="mdi mdi-delete" @click="deleteTeacher" class="btn" color="red">Delete</v-btn>
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
    name: 'editTeacher',
    components: { navBar },
    data() {
        return {
            teacher: "",
            selectedTeacher: '',
            studentID: '',
            alertColor: '',
            showAlert: false,
            alertText: "",
            alertIcon: "",
            alertTitle: "",
            updatedTeacher: "",
        }
    },
    methods: {
        getTeacher() {
            const teacher = {
                method: 'POST',
                url: "http://localhost:9000/teachers/:id",
                data: { id: this.$store.getters.getTeachID }
            };

            axios(teacher)
                .then((res) => {
                    this.teacher = res.data;
                })
                .catch((error) => {
                    this.onError(error);
                })
        },
        updateInfos() {

            if (this.teacher.name === "" || this.teacher.email === "" || this.teacher.name === null || this.teacher.email === null || this.teacher.subject === ""
                || this.teacher.subject === null) {
                this.alertColor = "error";
                this.alertIcon = "$error";
                this.alertTitle = "Error";
                this.alertText = "Name, email and subject must be filled"
                this.showAlert = true;

                setTimeout(this.closeAlert, 2000);
            } else {

                const newInfo = {
                    method: 'PUT',
                    url: "http://localhost:9000/teachers/edit/:id",
                    data: {
                        id: this.teacher.id,
                        name: this.teacher.name,
                        email: this.teacher.email,
                        active: this.teacher.subject
                    }
                };

                axios(newInfo)
                    .then(() => {
                        this.getTeacher();;
                    })
                    .catch((error) => {
                        this.onError(error);
                    })
            }
        },
        deleteTeacher() {
            const teacherDeleted = {
                method: 'DELETE',
                data: { id: this.teacher.id },
                url: `http://localhost:9000/teachers/:id`,
            }

            axios(teacherDeleted)
                .then(() => {
                    this.onDeletedTeacher();
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
        onDeletedTeacher(){
            this.alertColor = "success";
            this.alertIcon = "$success";
            this.alertTitle = "Success";
            this.alertText = `The teacher ${this.teacher.name} has been deleted succesfuly`
            this.showAlert = true;

            setTimeout(this.closeAlert, 1500);
            setTimeout(this.backToTeacher, 1500)
        },
        closeAlert() {
            this.showAlert = false;
        },
        backToTeacher(){
            this.$router.push('/teachers')
        },
    },
    created() {
        this.getTeacher();
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