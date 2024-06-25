<template>
    <div class="alert-modal" v-if="showAlert">
        <v-alert class="alert" :color="alertColor" :icon="alertIcon" :title="alertTitle" :text="alertText"></v-alert>
    </div>
</template>

<script>
export default {
    name: 'alertMessage',
    props: { alertInfos: Object },
    data() {
        return {
            alertColor: 'success',
            showAlert: true,
            alertText: "",
            alertIcon: "",
            alertTitle: "",
        }
    },
    methods: {
        turnOnAlert() {
            this.alertColor = alertInfos.color;
            this.alertIcon = alertInfos.icon;
            this.alertTitle = alertInfos.title;
            this.alertText = alertInfos.text;

            setTimeout(this.showAlert = false, 1800)
        }
    },
    watch: {
        alertInfos(newValue, oldValue){
            console.log(newValue);
        }

        // alert(this.alertColor = alertInfos.color)
        // this.alertIcon = alertInfos.icon;
        // this.alertTitle = alertInfos.title;
        // this.alertText = alertInfos.text;
    }
}
</script>

<style scoped>
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

.v-application__wrap {
    justify-content: center;
}
</style>