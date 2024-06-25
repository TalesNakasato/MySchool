<template>
    <v-app id="app" :theme="$store.getters.getMode">
        <navBar @changeStyle="changeStyle" />
        <v-container class="infos">
            <v-form class="new-stud-form">
                <h1 class="title">Register New Teacher</h1>
                <v-text-field prepend-inner-icon="mdi mdi-account-tie" class="text-field" label="Name" v-model="teacherName">
                </v-text-field>
                <v-text-field prepend-inner-icon="mdi mdi-email" class="text-field" label="Email" v-model="teacherEmail">
                </v-text-field>
                <v-text-field prepend-inner-icon="mdi mdi-book-open-page-variant" :hint="subjectHint" persistent-hint class="text-field" label="Subject" v-model="teacherSubject">
                </v-text-field>
                <v-btn @click="registerStudent" class="btn" color="red">Register</v-btn>
                <v-btn @click="clearFields" class="btn" color="yellow">Clear fields</v-btn>
            </v-form>
        </v-container>
        <div class="alert-modal" v-if="showAlert">
            <v-alert class="alert" :color="alertColor" :icon="alertIcon" :title="alertTitle" :text="alertText"></v-alert>
        </div>
    </v-app>
</template>

<script>
import navBar from './navBar.vue'

import axios from 'axios'

export default {
    name: 'createStudent',
    components: { navBar },
    data() {
        return {
            teacherName: "",
            teacherEmail: "",
            teacherSubject: "",
            teacherSubject: "",
            alertColor: "error",
            showAlert: false,
            alertText: "",
            alertIcon: "",
            alertTitle: "",
            subjectHint: "By filling in teacher's subject, you'll automatically create a new subject",
        }
    },
    methods: {
        changeStyle() {

        },
        clearFields() {
            this.teacherName = "";
            this.teacherEmail = "";
            this.teacherSubject = "";
        },
        registerStudent() {

            if (this.teacherName === "" || this.teacherEmail === "" || this.teacherName === null || this.teacherEmail === null || this.teacherSubject === null || 
            this.teacherSubject === null) {
                this.alertColor = "error";
                this.alertIcon = "$error";
                this.alertTitle = "Error";
                this.alertText = "Name, email and subject must be filled"
                this.showAlert = true;

                setTimeout(this.closeAlert, 2000);


            } else {

                const newStudent = {
                    method: 'POST',
                    url: "http://localhost:9000/teachers",
                    data: {
                        name: this.teacherName,
                        email: this.teacherEmail,
                        subject: this.teacherSubject,
                    },
                }

                axios(newStudent)
                    .then(() => {
                        this.clearFields();

                        this.onSuccessAlert();
                    })
                    .catch((error) => {
                        this.onError(error);
                    })
            }
        },
        onSuccessAlert() {
            this.alertColor = "success";
            this.alertIcon = "$success";
            this.alertTitle = "Success";
            this.alertText = `Teacher has been succesfuly registered!!`;
            this.showAlert = true;

            setTimeout(this.closeAlert, 2000);
        },
        closeAlert() {
            this.showAlert = false;
        },
        onError(error) {
            this.alertColor = "error";
            this.alertIcon = "$error";
            this.alertTitle = "Error";
            this.alertText = error.message
            this.showAlert = true;

            setTimeout(this.closeAlert, 2000);
        },
    }
}
</script>

<style scoped>
.infos {
    display: flex;
    justify-content: center;
}
.title{
    margin-bottom: 3%;
}

.new-stud-form {
    width: 80%;
    margin-left: 5%;
}

.text-field {
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
</style>