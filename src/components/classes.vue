<template>
    <v-app :theme="$store.getters.getMode">
        <navBar />
        <v-container class="container-cards">
            <div id="search" class="content">
                <v-row class="v-row-container" cols="12">
                    <v-col v-for="classs in classes" :key="classs.id" cols="12" xs="12" sm="12" md="6" lg="3" xl="3"
                        class="cards">
                        <v-card elevation="15" height="310" class="card-hover text-truncate" rounded
                            style="position: relative">
                            <v-card-text class="card-text"><v-icon class="mdi mdi-google-classroom"></v-icon>
                                <strong> Class - {{ classs.id }} </strong>
                            </v-card-text>
                            <v-card-text class="card-text"><v-icon class="mdi mdi-book-open-page-variant"></v-icon>
                                <strong> Subject: {{ classs.name }} </strong>
                            </v-card-text>
                            <v-card-text class="card-text"><v-icon class="mdi mdi-podium"></v-icon> <strong> Level: {{
                                classs.Level.level }} </strong>
                            </v-card-text>
                            <v-card-text class="card-text"> <v-icon class="mdi mdi-human-male-board"></v-icon> <strong>
                                    Teacher: {{ classs.Teacher.name }}</strong></v-card-text>
                            <v-card-text class="card-text"> <v-icon class="mdi mdi-account-school"></v-icon> <strong>
                                    HeadBoy: {{
                                        classs.Student.name }} </strong></v-card-text>
                            <v-row>
                                <div class="btn-cards"
                                    style=" justify-content: space-between !important; width: 100%; margin: 1.5% 0% 2% 2.2%; position: absolute; bottom: 0;">
                                    <v-btn elevation="8" style="color: white; width: 43%; margin-left: 4%" color="red"
                                        :id="classs.id" class="text-none" @click="onEndClick" type="button">End
                                        Class</v-btn>
                                    <v-btn elevation="8" style="width: 43%; margin-right: 4%" class="text-none"
                                        color="success" type="button" :id="classs.id" @click="onRegisterClick">Register
                                        Students
                                    </v-btn>
                                </div>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
        <v-row>
            <v-dialog v-model="dialogEnd" persistent>
                <v-card>
                    <v-card-title class="text-h5">
                        End Class?
                    </v-card-title>
                    <v-card-text>Are you sure you want to end this class? You wont be able to open this same class
                        again!!</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" variant="text" @click="dialogEnd = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green-darken-1" variant="text" @click="endClass">
                            End
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="dialogRegister" width="auto">
                <v-card>
                    <v-card-title class="text-h5">
                        Register Students
                    </v-card-title>
                    <v-card-actions>
                        <v-select variant="outlined" multiple prepend-inner-icon="mdi mdi-account-school"
                            hint="Choose the students that you want to add in this class." persistent-hint class="select "
                            :items="selectStudents" label="Students" v-model="chosenStudents"></v-select>
                        <v-spacer></v-spacer>
                        <v-btn color="error" variant="text" @click="onCancel">
                            Cancel
                        </v-btn>
                        <v-btn color="green-darken-1" variant="text" @click="registerStudentsInClass">
                            Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-app>
</template>

<script>
import navBar from './navBar.vue';

import axios from 'axios';

export default {
    name: "classesView",
    components: { navBar },
    data() {
        return {
            classes: [],
            class: "",
            level: [],
            dialogEnd: false,
            dialogRegister: false,
            classID: '',
            studentID: '',
            students: '',
            selectStudents: [],
            chosenStudents: [],
            chosenStudentsID: [],
        }
    },
    created() {
        this.getClasses();
        this.getlevels();
        this.getActiveStudents();
    },
    methods: {
        getClasses() {
            const classes = {
                method: 'GET',
                url: "http://localhost:9000/classes"
            }

            axios(classes)
                .then((res) => {
                    this.classes = res.data;
                })
                .catch((error => {
                    console.log(error);
                }))
        },
        getlevels() {
            const level = {
                method: 'GET',
                url: 'http://localhost:9000/levels'
            }

            axios(level)
                .then((res) => {
                    this.level = res.data;
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

                        const studentsSelect = this.students[i].name;

                        this.selectStudents.push(studentsSelect);
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
                })
                .catch((error => {
                    console.log(error);
                }))
        },
        onRegisterClick(e) {
            this.classID = e.target.id
            this.dialogRegister = true;
        },
        onEndClick(e) {
            this.classID = e.target.id
            this.dialogEnd = true;
        },
        endClass() {
            const classDeleted = {
                method: 'DELETE',
                data: { id: this.classID },
                url: `http://localhost:9000/classes/:id`,
            }

            axios(classDeleted)
                .then(() => {
                    this.getClasses();
                    this.afterEndClass();
                })
                .catch((error) => {
                    alert(error)
                    console.log(error)
                })
        },
        afterEndClass() {
            this.dialogEnd = false;
            alert(`the class ${this.classID} has been deleted`)
        },
        registerStudentsInClass() {

            let position = -1;

            this.getStudentID();

            this.chosenStudentsID.forEach((studentID, index) => {
                position = index;

                let student = {
                    method: 'POST',
                    url: "http://localhost:9000/registrations",
                    data: {
                        status: 'registered',
                        student_id: this.chosenStudentsID[position],
                        class_id: this.classID,

                    }
                };

                axios(student)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        console.log(error)
                    })

            })
            this.dialogRegister = false;
        },
        getStudentID() {

            let position = -1;

            let array = this.students

            let studentID = -1;

            this.chosenStudents.forEach((studentName, index) => {
                position = index;

                array.forEach((object, index) => {
                    if (studentName === object.name) {
                        position = index;

                        this.chosenStudentsID.push(this.students[position].id)
                    }
                })
            })
        },
        onCancel() {
            this.dialogRegister = false;
            this.chosenStudents = [];
        },
    },
}
</script>

<style scoped>
.container-cards {
    width: 85%;
    margin-left: 14.5%;
    margin-bottom: 7%;
}

.card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.btn-cards {
    display: flex;
}

.select{
    max-width: 300px;
    max-height: 100px;
}

@media (max-width: 900px) {
    .container-cards {
        margin-left: 0;
        width: 100%;
    }
}
</style>