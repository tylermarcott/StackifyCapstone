<template>
    <div class="right-panel-spacer">
        <router-link :to="{name: 'Home'}"><i class="mdi mdi-home home-button"></i></router-link>
    </div>
    <img class="img-fluid profile-picture" :src="profile.picture" alt="account-picture">
    <h2 class="account-text">{{ profile.name }}</h2>
    <router-link :to="{name: 'Account'}"><h2 class="account-text">Account Settings</h2></router-link>
    <h2 class="account-text">Invite Collaborator</h2>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";

export default {
    setup(){
    return { 
      profile: computed(() => AppState.account)
     }
    }
};
</script>


<style lang="scss" scoped>
.right-panel-spacer {
  height: 5vh;
}

.profile-picture {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid #EA94FF;
  margin: 5vh 0vh;
}

.account-text {
  color: #EA94FF;
  font-size: 1.2rem;
  padding: .5rem;
  transition: .3s;
}

.account-text:hover {
  color: #63FAAA;
}

.home-button {
  font-size: 2rem;
  color: #eeeeee;
}
</style>