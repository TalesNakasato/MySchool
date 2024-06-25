<template>
    <v-app :theme="$store.getters.getMode">
        <navBar />
        <v-container class="classForm">
            <h1 class="title">Create new class</h1>
            <v-select variant="outlined" prepend-inner-icon="mdi mdi-book-open-page-variant" class="select" :items="selectSubjects" label="Subject" v-model="classSubject"></v-select>
            <v-select variant="outlined" prepend-inner-icon="mdi mdi-podium" class="select" :items="selectLevels" label="Level" v-model="classLevel"
                @update:modelValue="getLevelID"></v-select>
            <v-select variant="outlined" prepend-inner-icon="mdi mdi-human-male-board" class="select" :items="selectTeachers" label="Teacher" v-model="classTeacher"
                @update:modelValue="getTeacherID"></v-select>
            <v-select variant="outlined" prepend-inner-icon="mdi mdi-account-school" hint="Choose a student that will represent the class." persistent-hint class="select"
                :items="selectStudents" label="Head Boy" v-model="classStudent"
                @update:modelValue="getStudentID"></v-select>
        </v-container>
        <v-container class="actions">
            <v-btn @click="createClass" class="btn" color="red">Create class</v-btn>
            <v-btn @click="clearFields" class="btn" color="yellow">Clear Fields</v-btn>
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
    name: 'createClasses',
    components: { navBar },
    data() {
        return {
            subjects: '',
            levels: '',
            teacher: '',
            students: '',
            teacherID: '',
            studentID: '',
            levelID: '',
            selectSubjects: [],
            selectLevels: [],
            selectTeachers: [],
            selectStudents: [],
            classSubject: '',
            classLevel: '',
            classTeacher: '',
            classStudent: '',
            alertColor: "",
            showAlert: false,
            alertText: "",
            alertIcon: "",
            alertTitle: "",
        }
    },
    methods: {
        getSubjects() {
            const subjects = {
                method: 'GET',
                url: 'http://localhost:9000/teachers/subjects'
            }

            axios(subjects)
                .then((res) => {

                    this.subjects = res.data;

                    for (let i = 0; i < this.subjects.length; i++) {

                        const subject = this.subjects[i].subject;

                        this.selectSubjects.push(subject);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        getlevels() {
            const levels = {
                method: 'GET',
                url: 'http://localhost:9000/levels'
            }

            axios(levels)
                .then((res) => {
                    this.levels = res.data;

                    for (let i = 0; i < this.levels.length; i++) {

                        const level = this.levels[i].level;
                        this.selectLevels.push(level);
                    }
                })
        },
        getActiveStudents() {
            const students = {
                method: 'GET',
                url: "http://localhost:9000/students",
            };

            axios(students)
                .then((res) => {
                    this.students = res.data;

                    for (let i = 0; i < this.students.length; i++) {

                        const students = this.students[i].name;

                        this.selectStudents.push(students);
                    }
                })
                .catch((error => {
                    console.log(error);
                }))
        },
        getTeachers() {
            const teachers = {
                method: 'GET',
                url: "http://localhost:9000/teachers",
            };

            axios(teachers)
                .then((res) => {

                    this.teachers = res.data;

                    for (let i = 0; i < this.teachers.length; i++) {

                        const teacher = this.teachers[i].name;

                        this.selectTeachers.push(teacher);
                    }
                })
                .catch((error => {
                    console.log(error);
                }))
        },
        getTeacherID() {

            const array = this.teachers;

            const teacher = this.classTeacher;

            let position = -1;

            array.forEach((object, index) => {
                if (object.name === teacher) {

                    position = index;

                    this.teacherID = this.teachers[position].id;
                }
            })
        },
        getStudentID() {

            const array = this.students;

            const student = this.classStudent;

            let position = -1;

            array.forEach((object, index) => {
                if (object.name === student) {

                    position = index;

                    this.studentID = this.students[position].id;
                }
            })
        },
        getLevelID() {

            const array = this.levels;

            const level = this.classLevel;

            let position = -1;

            array.forEach((object, index) => {
                if (object.level === level) {

                    position = index;

                    this.levelID = this.levels[position].id;
                }
            })
        },
        clearFields() {
            alert('caiu aqui')
            this.classLevel = "";
            this.classStudent = "";
            this.classSubject = "";
            this.classTeacher = "";
        },
        createClass() {

            if (this.classLevel === "" || this.classStudent === "" || this.classSubject === "" || this.classTeacher === "" ||
                this.classLevel === null || this.classStudent === null || this.classSubject === null || this.classTeacher === null) {
                this.alertColor = "error";
                this.alertIcon = "$error";
                this.alertTitle = "Error";
                this.alertText = "You must choose an option in all fields"
                this.showAlert = true;

                setTimeout(this.closeAlert, 2000);
            } else {
                const newClass = {
                    method: 'POST',
                    url: "http://localhost:9000/classes",
                    data: {
                        name: this.classSubject,
                        teacher_id: this.teacherID,
                        student_id: this.studentID,
                        level_id: this.levelID,
                    },
                }
                axios(newClass)
                    .then((res) => {
                        console.log(res.data);
                        this.clearFields();

                        this.onSuccessAlert();
                    })
                    .catch((error) => {
                        console.log(error)
                        this.onError(error);
                    })
            }
        },
        clearFields() {
            this.classLevel = "";
            this.classStudent = "";
            this.classSubject = "";
            this.classTeacher = "";
        },
        onSuccessAlert() {
            this.alertColor = "success";
            this.alertIcon = "$success";
            this.alertTitle = "Success";
            this.alertText = "The class has been succesfuly created!!"
            this.showAlert = true;

            this.clearFields();
            setTimeout(this.closeAlert, 2000);
        },
        onError(error) {
            this.alertColor = "error";
            this.alertIcon = "$error";
            this.alertTitle = "Error";
            this.alertText = error.message
            this.showAlert = true;

            setTimeout(this.closeAlert, 2000);
        },
        closeAlert() {
            this.showAlert = false;
        },
    },
    created() {
        this.getSubjects();
        this.getlevels();
        this.getActiveStudents();
        this.getTeachers();
    },
}

</script>

<style scoped>
.title {
    margin-bottom: 4%;
}

.classForm {
    margin-left: 14%;
    width: 85%;
}

.select {
    width: 82%;
    margin-bottom: 2%;
}

.actions {
    margin-left: 14%;
    width: 85%;
}

.btn {
    width: 40%;
    margin-right: 2%
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