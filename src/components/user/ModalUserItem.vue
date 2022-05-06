<template>
  <div class="main-profile">
    <span v-if="!userItem">Nothing to display</span>
    <div class="user-profile" v-on:click="onUserClick">
      <img
        src="https://www.gravatar.com/avatar/50b918079b928d9288fdaeee7d6238ec?size=50&default=mp"
        alt="user default image profil"
        id="profil-image"
      />
      <p class="main-paragraph">
        {{ userItem.name }}
        <br />
        {{ userItem.email }}
      </p>
    </div>
    <div class="subscription">
      <ManageUserSubscription
        v-if="userItem.id !== actualUser.id"
        :isFollowed="isFollowingUser"
        :id="userItem.id"
        :onFollow="onFollow"
        :onUnfollow="onUnfollow"
      />
    </div>
  </div>
</template>

<script>
import ManageUserSubscription from "./ManageUserSubscription";
import * as api from "@/api/ufoodApi";
export default {
  name: "ModalUserItem",
  components: {
    ManageUserSubscription
  },
  data() {
    return {
      actualUser: { id: "" },
      isFollowingUser: true
    };
  },
  async created() {
    this.actualUser = await api.getActualUser(true);
    const user = await api.getUserById(this.actualUser.id);
    this.isFollowingUser =
      user.following.find(user => user.id === this.userItem.id) !== undefined;
  },
  props: ["userItem", "onClick", "followingList", "onFollow", "onUnfollow"],
  methods: {
    onUserClick() {
      this.onClick();
      this.$router.push({
        name: "user",
        params: { id: this.userItem.id }
      });
    }
  }
};
</script>

<style scoped>
.user-profile {
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  background-color: transparent;
  cursor: pointer;
}
.main-profile {
  display: flex;
  justify-content: space-between;
}
#profil-image {
  width: 50px;
  height: 50px;
  margin-left: 1px;
  margin-right: 10px;
  border-radius: 50%;
  max-height: 3rem !important;
}

.main-paragraph {
  max-width: 400px;
  word-wrap: break-word;
  color: #7957d5 !important;
}
.subscription {
  margin: auto 0;
}
</style>
