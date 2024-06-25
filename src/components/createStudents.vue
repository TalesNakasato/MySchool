<template>
    <v-app id="app" :theme="$store.getters.getMode">
        <navBar @changeStyle="changeStyle" />
        <v-container class="infos">
            <v-form class="new-stud-form">
                <h1 class="title">Register New Student</h1>
                <v-text-field prepend-inner-icon="mdi mdi-account-school" class="text-field" label="Name" v-model="studentName">
                </v-text-field>
                <v-text-field prepend-inner-icon="mdi mdi-email" class="text-field" label="Email" v-model="studentEmail">
                </v-text-field>
                <v-container class="tools">
                    <v-container class="actions">
                        <v-tooltip class="mdi-information" location="left" color="red"
                            text="This student will automatically be an active student">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" color="red" icon="mdi mdi-information" class="icon-info" center></v-icon>
                            </template>
                        </v-tooltip>
                    </v-container>
                    <v-btn @click="registerStudent" class="btn" color="red">Register</v-btn>
                    <v-btn @click="clearFields" class="btn" color="yellow">Clear fields</v-btn>
                </v-container>
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
            studentName: "",
            studentEmail: "",
            alertColor: "",
            showAlert: false,
            alertText: "",
            alertIcon: "",
            alertTitle: "",
        }
    },
    methods: {
        changeStyle() {

        },
        clearFields() {
            this.studentName = "";
            this.studentEmail = "";
        },
        registerStudent() {

            if (this.studentName === "" || this.studentEmail === "" || this.studentName === null || this.studentEmail === null) {
                this.alertColor = "error";
                this.alertIcon = "$error";
                this.alertTitle = "Error";
                this.alertText = "Name and email must be filled"
                this.showAlert = true;

                setTimeout(this.closeAlert, 2000);


            } else {

                const newStudent = {
                    method: 'POST',
                    url: "http://localhost:9000/students",
                    data: {
                        name: this.studentName,
                        email: this.studentEmail,
                        active: true
                    },
                }

                axios(newStudent)
                    .then((res) => {
                        console.log(res.data);
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
            this.alertText = "The student has been succesfuly registered!!"
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

.title {
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