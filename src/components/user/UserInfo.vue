<template>
  <div class="user-profile">
    <div class="user-profile-img">
      <img v-bind:src="profileSrc" alt="logo utilisateur" id="profile-image" />
      <img v-bind:src="badgeSrc" alt="user badge" id="profile-badge" />
    </div>
    <div class="user-info">
      <h1 class="title is-4">User name</h1>
      <h2 class="subtitle is-5">{{ userInfo.name }}</h2>
      <h1 class="title is-4">User rating</h1>
      <h2 class="subtitle is-5">{{ badgeName }} ({{ userInfo.rating }})</h2>
      <ModalDisplayUsers :is-follower="true" :id="userId" />
      <ModalDisplayUsers :is-following="true" :id="userId" />
      <div class="subscription" v-if="!isUserLocal">
        <ManageUserSubscription
          :isFollowed="isFollowingUser"
          :id="userInfo.id"
          :onFollow="onFollow"
          :onUnfollow="onUnfollow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as badge from "../../objects/Badge";
import * as api from "../../api/ufoodApi";
import CryptoJS from "crypto-js";
import ModalDisplayUsers from "./ModalDisplayUsers";
import ManageUserSubscription from "./ManageUserSubscription";

export default {
  name: "user-info",
  props: {
    isUserLocal: {
      type: Boolean
    },
    userId: {
      type: String
    }
  },
  components: {
    ModalDisplayUsers,
    ManageUserSubscription
  },
  data() {
    return {
      userInfo: {},
      badgeName: "",
      isFollowingUser: true
    };
  },
  methods: {
    async onFollow() {
      this.$root.$emit("onFollowingListChanged");
    },
    async onUnfollow() {
      this.$root.$emit("onFollowingListChanged");
    }
  },
  computed: {
    badgeSrc() {
      if (this.badgeName === badge.TIER_1_NAME) {
        return require("../../assets/badge-lettuce.png");
      } else if (this.badgeName === badge.TIER_2_NAME) {
        return require("../../assets/badge-carrot.png");
      } else if (this.badgeName === badge.TIER_3_NAME) {
        return require("../../assets/badge-burger.png");
      } else {
        return require("../../assets/badge-chicken.png");
      }
    },

    profileSrc() {
      if (this.userInfo.email) {
        const trimEmail = this.userInfo.email.trim();
        const lowerCaseEmail = trimEmail.toLowerCase();
        const encryptedEmail = CryptoJS.MD5(lowerCaseEmail).toString(); // Pour tester remplacer par "205e460b479e2e5b48aec07710c08d50"
        return `https://www.gravatar.com/avatar/${encryptedEmail}?size=300&default=mp`;
      }
      return "";
    }
  },
  async created() {
    if (this.isUserLocal) {
      this.userInfo = await api.getUserById(this.userId);
    } else {
      this.userInfo = await api.getUserById(this.userId);
    }

    this.badgeName = badge.setBadge(this.userInfo.rating);

    const actualUser = await api.getActualUser(true);
    const user = await api.getUserById(actualUser.id);
    this.isFollowingUser =
      user.following.find(user => user.id === this.userId) !== undefined;
  }
};
</script>

<style>
.user-profile {
  background-color: rgba(121, 87, 213, 0.1);
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.user-profile-img {
  position: relative;
  top: 0;
  left: 0;
}

#profile-badge {
  position: absolute;
  bottom: 0px;
  right: 30px;
}
#profile-image {
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 300px;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 50%;
}

.user-info {
  margin-top: 30px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.user-info h1 {
  padding: 10% 0;
}
</style>
