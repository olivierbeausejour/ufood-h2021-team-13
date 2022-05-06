<template>
  <div class="subscription-modal" :key="isFollowed">
    <b-button
      v-if="!isFollowed"
      class="button is-primary is-small"
      @click="followUser()"
    >
      Follow
    </b-button>
    <b-button
      v-if="isFollowed"
      class="button is-primary is-small"
      @click="isComponentModalActive = true"
    >
      Unfollow
    </b-button>
    <b-modal
      v-if="isFollowed"
      :active.sync="isComponentModalActive"
      has-modal-card
      class="modal-card-container"
      scroll="clip"
    >
      <div class="modal-card" style="width: auto">
        <section class="modal-card-body">
          <img
            v-bind:src="profileSrc"
            alt="logo utilisateur"
            id="profil-image"
          />
          <p style="color: black">
            do you really want to unfollow the user ?
          </p>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button"
            type="button"
            @click="
              unfollowUser();
              isComponentModalActive = false;
            "
            style="color: #ff0000;width: 100%;margin:0;padding: 25px"
          >
            Unfollow
          </button>
          <button
            style="width: 100%;margin:0;padding: 25px"
            class="button"
            type="button"
            @click="isComponentModalActive = false"
          >
            Cancel
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import * as api from "../../api/ufoodApi";
import CryptoJS from "crypto-js";
export default {
  name: "ManageUserSubscription",
  props: ["isFollowed", "id", "onFollow", "onUnfollow"],
  data() {
    return {
      isComponentModalActive: false,
      userInfo: {}
    };
  },
  async created() {
    this.userInfo = await api.getUserById(this.id);
  },
  methods: {
    async followUser() {
      try {
        await api.followUser(this.id);
        this.onFollow(this.id);
        this.$buefy.toast.open({
          message: "User Followed",
          type: "is-success"
        });
        this.isFollowed = true;
      } catch (e) {
        this.errorToast();
      }
    },
    async unfollowUser() {
      try {
        await api.unfollowUser(this.id);
        this.onUnfollow(this.id);
        this.$buefy.toast.open({
          message: "User Unfollowed!",
          type: "is-success"
        });
        this.isFollowed = false;
      } catch (e) {
        this.errorToast();
      }
    },
    errorToast() {
      this.$buefy.toast.open({
        duration: 5000,
        message: "An error occured, please try again later.",
        type: "is-danger"
      });
    }
  },
  computed: {
    profileSrc() {
      if (this.userInfo.email) {
        const trimEmail = this.userInfo.email.trim();
        const lowerCaseEmail = trimEmail.toLowerCase();
        const encryptedEmail = CryptoJS.MD5(lowerCaseEmail).toString(); // Pour tester remplacer par "205e460b479e2e5b48aec07710c08d50"
        return `https://www.gravatar.com/avatar/${encryptedEmail}?size=300&default=mp`;
      }
      return "";
    }
  }
};
</script>

<style scoped>
#profil-image {
  width: 100px;
  height: 100px;
  margin-left: 1px;
  margin-right: 10px;
  border-radius: 50%;
  margin-bottom: 10%;
  max-height: 6rem !important;
}

.modal-card {
  height: 300px !important;
  width: 400px !important;
  border-radius: 5%;
  scroll-behavior: unset;
}

.modal-card-foot {
  display: flex;
  flex-direction: column;
  padding: 0;
}
.modal-card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
