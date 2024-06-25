<template>
    <div class="menu">
        <div>
            <v-icon class="mdi mdi-menu" @click="turnOnNav" :color="menuColor" size="50"></v-icon>
        </div>
        <div>
            <v-navigation-drawer v-model="navOn" :temporary="temporary" :color="$store.getters.getNavBarColor"
                class="navbar">
                <v-list style="margin-left: 5%;">
                    <v-list-item @click="$router.push('/')" class="navbar-itens">
                        <h1>My School</h1>
                    </v-list-item>
                    <v-divider class="dividers"></v-divider>
                    <v-list-item @click="goToHomePage" class="navbar-itens" prepend-icon="mdi mdi-home"
                        value="home">Home</v-list-item>
                    <v-divider class="dividers"></v-divider>
                    <v-list>
                        <v-label class="menu-label">Students</v-label>
                        <v-list density="compact" nav>
                            <v-list-item @click="$router.push('/students')" class="navbar-itens"
                                prepend-icon="mdi mdi-account-school" value="students">Students</v-list-item>
                            <v-list-item @click="$router.push('/students/create-students')" class="navbar-itens"
                                prepend-icon="mdi mdi-account-plus" value="newStudent">New
                                Student</v-list-item>
                        </v-list>
                    </v-list>
                    <v-divider class="dividers"></v-divider>
                    <v-list>
                        <v-label class="menu-label">Teachers</v-label>
                        <v-list density="compact" nav>
                            <v-list-item @click="this.$router.push('/teachers')" class="navbar-itens"
                                prepend-icon="mdi mdi-human-male-board" value="teachers">Teachers</v-list-item>
                            <v-list-item @click="this.$router.push('/teachers/create-teacher')" class="navbar-itens"
                                prepend-icon="mdi mdi-account-plus" value="newTeacher">New
                                Teacher</v-list-item>
                        </v-list>
                    </v-list>
                    <v-divider class="dividers"></v-divider>
                    <v-list>
                        <v-label class="menu-label">Classes</v-label>
                        <v-list density="compact" nav>
                            <v-list-item @click="this.$router.push('/classes')" class="navbar-itens"
                                prepend-icon="mdi mdi-google-classroom" value="classes">Classes</v-list-item>
                            <v-list-item @click="this.$router.push('/create-classes')" class="navbar-itens"
                                prepend-icon="mdi mdi-book-plus-multiple" value="newClass">New
                                Class</v-list-item>
                        </v-list>
                    </v-list>
                    <v-divider class="dividers"></v-divider>
                    <v-list style="margin-top: 75%; padding: 0;">
                        <v-list density="compact" nav>
                            <v-list-item @click="changeMode" class="navbar-itens"
                                prepend-icon="mdi mdi-theme-light-dark">Dark Mode</v-list-item>
                        </v-list>
                    </v-list>
                </v-list>
            </v-navigation-drawer>
        </div>
    </div>
</template>

<script>

export default {
    name: 'navBar',
    data() {
        return {
            navOn: true,
            temporary: false,
            navBarColor: '#B22222',
        }
    },
    methods: {
        getDevice() {
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                this.temporary = false;
                this.turnOffNav();
            } else {
                // Code for desktops
            }
        },
        turnOnNav() {
            this.navOn = true;
        },
        turnOffNav() {
            this.navOn = false;
            this.$emit('changeStyle')
        },
        goToHomePage() {
            this.$router.push('/')
        },
        changeMode() {
            if (this.$store.getters.getMode == 'light') {
                this.$store.commit('changeMode', 'dark');
            } else {
                this.$store.commit('changeMode', 'light');
            }

            if (this.$store.getters.getMode == 'light') {
                this.$store.commit('setNavBarColor', 'red')
            } else {
                this.$store.commit('setNavBarColor', '#212121')
            }
        },
    },
    created() {
        this.getDevice()
    }
}
</script>

<style scoped>
.menu {
    margin-left: .3%;
}

.menu-label {
    font-size: 22px;
    font-weight: bold;
    color: white;
}

.navbar-itens {
    color: white;
    font-size: 18px;
}

.dividers {
    margin-bottom: 5%;
    margin-top: 5%;
}
</style>
