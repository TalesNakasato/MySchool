<template>
  <v-app id="app" :theme="$store.getters.getMode">
    <navBar @changeStyle="changeStyle"/>
    <v-container class="text-area">
      <v-textarea class="text" readonly="true" style="white-space: pre-line;" label="Project Explanation" :model-value="explanation"></v-textarea>
    </v-container>
  </v-app>
</template>

<script>
import navBar from './navBar.vue'

export default {
  name: 'homePage',
  components: { navBar },
  data() {
    return {
      explanation: "\n Firts of all, if you are reading this text it means that you have given up of your time to see my project, thank you for that! \n" +
                   " Now i'm goint to resume the functionality of this application: \n" +
                   " - The menu on the left side is your map for your actions here. If you are using it in a cellphone, tablet or a small size screen, click in the menu icon" +
                   " and it you open a drawer menu. \n" +
                   " - By clicking on 'Students' you will have a full list of your student, and you'll be able to choose between all students or only active students. \n" +
                   "      - By clicking on the edit icon you will be able to edit this student information. \n" +
                   "      - By clicking on the class icon you will be able to see in wich classes this student is registered. \n" +
                   " - By clicking on 'New Student' you'll be able to register new students in your school. \n" +
                   " - By clicking on 'Teachers' you'll have a full list of your teachers." +
                   "      - By clicking on the edit icon you will be able to edit this teacher information. \n" +
                   " - By clicking on 'New Teacher' you'll be able to register new students in your school. \n" +
                   " - By clicking on 'Classes' you'll have a full list of your classes. \n" +
                   "      - By clicking on the button 'End Class' you will finish and remove this class from your school. \n" +
                   "      - By clicking on the button 'Register Students' you will be able to choose the students that you have registered before and register in the class.\n" +
                   " - By clicking on 'New Class' you'll be able to create new classes. \n"
    }
  },
  methods: {
    changeStyle() {
      this.formStyle = "margin-left: 0; pagging: 0";
    },
  },
  created() { }
}
</script>

<style scoped>
.text-area{
  margin-left: 14%;
  width: 85%;
}

@media (max-width: 900px){
  .text-area{
    margin-left: 2%;
    height: 500px;
  }
}
</style>
