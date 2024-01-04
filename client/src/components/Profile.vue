<!-- <template>
  <div class="right-panel-spacer">
      <router-link :to="{name: 'Home'}"><i class="mdi mdi-home home-button" title="Go to Home Page"></i></router-link>
  </div>
  <div v-if="profile.name">
    <router-link :to="{name: 'Account'}">
    <img class="img-fluid profile-picture" :src="profile.picture" alt="account-picture" title="Go to Account Page">
  </router-link>
    <h2 class="account-text">{{ profile.name }}</h2>
  </div>
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
  height: 15vh;
  width: 15vh;
  object-fit: cover;
  background-position: center;
  border-radius: 50%;
  border: 1px solid #EA94FF;
  margin: 5vh 0vh;
  overflow: hidden;
}

.profile-picture:hover{
  transform: scale(1.05);
}

.account-text {
  color: #EA94FF;
  font-size: 1.2rem;
  padding: .5rem;
  transition: .3s;
}

.home-button {
  font-size: 2rem;
  color: #eeeeee;
}
</style> -->





<template>
  <section v-if="account.name" class="row account-wrapper justify-content-center rounded">
    <div class="col-12">
      <section class="row py-2 text-center justify-content-center">
        <div class="col-10  about">
          <div class="right-panel-spacer">
              <router-link :to="{ name: 'Home' }"><i class="mdi mdi-home home-button" title="Go to Home Page"></i></router-link>
          </div>
          <h2 class="welcome-text">{{ account.name }}</h2>
          <img class="rounded" :src="account.picture" alt="" />
          <p class="email-text">{{ account.email.substring(0, 10 ) + "..." }}</p>
          <button type="button" @click="toggleCollapseForm()" class="connect-button elevation-3"><b>Edit
              Account</b></button>
          <section class="row" id="edit-form" hidden>
            <form @submit.prevent="editAccount()">
              <div class="col-12 my-5">
                <label for="name" class="label-text"><b>Name</b></label>
                <input name="name" class="w-100 rounded my-1" type="text" v-model="formData.name" id="name">
              </div>
              <div class="col-12 my-5">
                <label for="imgUrl" class="label-text"><b>Image Url</b></label>
                <input name="picture" class="w-100 rounded my-1" type="url" v-model="formData.picture" id="imgUrl">
                <button type="submit" class="connect-button submit-button"><b>Submit</b></button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
    <!-- Modal -->
    <div class="col-10 event-list">
      <h2 class="text-center event-category-text">Events</h2>
      <div v-for="event in myEvents" :key="event.id">
        <section class="row m-1">
          <div class="text-center event-card elevation-5" :event="event">
            <!-- //FIXME - change to function, remove router link should be set-active copy from dropdown on left side  -->
            <router-link :to="{ name: 'Application', params: { application: 'application' } }" class="">
              <h2 class="col-12 event-title selectable text-center">{{ event.title }}</h2>
            </router-link>
            <p class="col-12">{{ event.eventType }}</p>
            <div class="col-12 no-play">
            </div>
            <div class="col-12 d-flex justify-content-center my-3">
              <button @click="deleteEvent(event.id)" class="btn btn-danger">
                <i class="mdi mdi-delete"></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- <div class="col-6 event-list">
          <h2 class="text-center event-category-text">Your Spotify Playlists</h2>
          <div v-for="playlist in playlists" :key="playlist.id">
            <section class="row m-1" >
            <div class="text-center event-card elevation-5" :playlist="playlist">
              <div class="col-12 event-title">
                <b>{{ playlist.name }}</b>
              </div>
              <div class="col-12">
                <p>Songs: {{ playlist.trackCount }}</p>
                <p>{{ playlist.description }}</p>
              </div>
            </div>
            </section>
          </div>
        </div> -->
  </section>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { accountService } from "../services/AccountService";
import { eventsService } from "../services/EventsService";
export default {
  setup() {
    const formData = ref({})
    // async function getUserPlaylists() {
    //   try {
    //     logger.log('Fetching User Playlists')
    //     await spotifyPlaylistService.getUserPlaylists()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    async function getMyEvents() {
      try {
        if (!AppState.account.id) {
          return
        }
        await eventsService.getMyEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    watchEffect(() => {
      // getUserPlaylists()
      getMyEvents()
    })
    return {
      formData,
      account: computed(() => AppState.account),
      playlists: computed(() => AppState.playlists),
      myEvents: computed(() => AppState.events),
      toggleCollapseForm() {
        let form = document.getElementById('edit-form')
        if (form.attributes.hidden) {
          form.removeAttribute('hidden')

        }
        else {
          form.setAttribute('hidden', '')
        }
      },
      async editAccount() {
        try {
          this.toggleCollapseForm()
          await accountService.editAccount(formData.value)
        } catch (error) {
          Pop.error(error)
        }
      },

      async deleteEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this event..?')) {
            await eventsService.deleteEvent(eventId)
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.landing-navigation {
  height: 15vh;
  /* background-color: #4f4f4f; */
  background-image: url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
  border-radius: 15px;
  border: solid 5px #2f2f2f;

}

.account-wrapper {
  background-image: url('https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg');
  overflow-y: auto;
  max-height: 98vh;
    /* ... other styles ... */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  scrollbar-width: none; /* For Firefox */
}

.account-wrapper::-webkit-scrollbar {
  width: 0; /* Hide vertical scrollbar */
  height: 0; /* Hide horizontal scrollbar */
}

.modal-wrapper {
  background-color: #4f4f4f;
  width: 100%;
}

#edit-form {
  transition: .5s;
}

img {
  max-width: 100px;
}

.home-button {
  font-size: 2rem;
  color: #eeeeee;
}

.email-text {
  font-size: 1rem;
  margin: 2rem 1rem;
  color: #eeeeee;
}

.connect-button {
  color: #4f4f4f;
  background-color: #EA94FF;
  transition: .5s;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.submit-button {
  background-color: #63FAAA;
  margin-bottom: 0px;
}

.label-text {
  color: #eeeeee;
}

.connect-button:hover {
  color: #4f4f4f;
  background-color: #63FAF5;
}

.about {
  border: solid 2px #2f2f2f;
  background-image: url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
  background-size: cover;
  background-position: top;
  border-radius: 15px;
  margin: 0px;
}

.settings-title {
  font-size: 3rem;
  color: #eeeeee;
}

.event-card {
  /* background-color: #eeeeee; */
  background-image: url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
  background-size: cover;
  background-position: top;
  border-radius: 8px;
  margin: .5rem 0px;
  padding: 0px;
  border: solid 2px #2f2f2f;
  color: #eeeeee;
}

.event-title {
  background-color: #EA94FF;
  color: #2f2f2f;
  font-size: 1.5rem;
  padding: .5rem;
  border-radius: 3px;
}

.welcome-text {
  font-size: 2rem;
  color: #eeeeee;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.event-category-text {
  color: #eeeeee;
  margin: 2rem 0rem;
  font-size: 2rem;
}

.event-list {
  border: solid 2px #2f2f2f;
  /* background-color: #4f4f4f; */
  background-image: url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
  border-radius: 15px;
}





/* NOTE: AUSTIN HERE IS YOUR CODE FROM MERGE CONFLICT


.home-button:hover{
  font-size: 2.1rem;
  color: #63FAAA;
}

@media screen and (max-width: 768px){
    .right-panel-spacer{
      height: fit-content;
    }
}


*/


</style>
