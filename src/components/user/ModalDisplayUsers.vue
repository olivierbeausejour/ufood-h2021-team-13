<template>
  <div class="users-modal">
    <section>
      <a v-if="isFollower"
        ><h1 class="title is-4" @click="isComponentModalActive = true">
          {{ this.followersList.length }} Followers
        </h1></a
      >
      <a v-else-if="isFollowing"
        ><h1 class="title is-4" @click="isComponentModalActive = true">
          {{ this.followingList.length }} Following
        </h1></a
      >
      <b-button
        v-else-if="isUser"
        class="button is-primary"
        @click="isComponentModalActive = true"
      >
        Users
      </b-button>
      <b-modal
        :active.sync="isComponentModalActive"
        has-modal-card
        class="modal-card-container"
      >
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p v-if="isUser" class="modal-card-title" style="text-align:center">
              Users
            </p>
            <p
              v-if="isFollower"
              class="modal-card-title"
              style="text-align:center"
            >
              Followers
            </p>
            <p
              v-if="isFollowing"
              class="modal-card-title"
              style="text-align:center"
            >
              Followings
            </p>
          </header>
          <section class="modal-card-body">
            <b-input
              class="mb-3"
              v-model="searchedUserName"
              v-on:input="filterUsers"
              icon="magnify"
              placeholder="Search a user..."
            ></b-input>
            <div v-if="isUser">
              <span
                v-if="usersList.length === 0"
                style="width: 100%;text-align: center"
                >Nothing to show right now</span
              >
              <b-field v-else v-for="user in usersList" :key="user.id">
                <ModalUserItem
                  :userItem="user"
                  :onClick="closeModal"
                  :followingList="followingList"
                  :onFollow="onFollow"
                  :onUnfollow="onUnfollow"
                />
              </b-field>
            </div>
            <div v-if="isFollower">
              <span
                v-if="followersList.length === 0"
                style="width: 100%;text-align: center"
                >Nothing to show. Try to get some followers.</span
              >
              <b-field
                v-else
                v-for="user in filteredFollowersList"
                :key="user.id"
              >
                <ModalUserItem
                  :userItem="user"
                  :onClick="closeModal"
                  :followingList="followingList"
                  :onFollow="onFollow"
                  :onUnfollow="onUnfollow"
                />
              </b-field>
            </div>
            <div v-if="isFollowing">
              <span
                v-if="followingList.length === 0"
                style="width: 100%;text-align: center"
                >Nothing to show. Try to follow people.</span
              >
              <b-field v-for="user in filteredFollowingList" :key="user.id">
                <ModalUserItem
                  :userItem="user"
                  :onClick="closeModal"
                  :followingList="followingList"
                  :onFollow="onFollow"
                  :onUnfollow="onUnfollow"
                />
              </b-field>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button
              v-if="isUser"
              class="button"
              type="button"
              @click="incrementUsers"
            >
              View more users
            </button>
            <button
              class="button"
              type="button"
              @click="isComponentModalActive = false"
            >
              Close
            </button>
          </footer>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
import * as api from "../../api/ufoodApi";
import ModalUserItem from "./ModalUserItem";
export default {
  name: "ModalDisplayUsers",
  data() {
    return {
      isComponentModalActive: false,
      usersList: [],
      followersList: [],
      followingList: [],
      filteredFollowersList: [],
      filteredFollowingList: [],
      searchedUserName: ""
    };
  },
  props: {
    isFollower: {
      type: Boolean,
      default: false
    },
    isFollowing: {
      type: Boolean,
      default: false
    },
    isUser: {
      type: Boolean,
      default: false
    },
    id: {
      required: false
    }
  },
  computed: {
    usersListNames() {
      return this.usersList.map(user => user.name);
    }
  },
  async created() {
    const users = await api.getUsers();

    const actualUserInfo = await api.getUserById(this.id);
    this.followersList = this.filteredFollowersList = actualUserInfo.followers;
    this.followingList = this.filteredFollowingList = actualUserInfo.following;
    this.usersList = users.items;

    this.$root.$on("onFollowingListChanged", async () => {
      const actualUserInfo = await api.getUserById(this.id);
      this.followingList = actualUserInfo.following;
    });
  },
  methods: {
    async filterUsers() {
      if (this.isUser) {
        const users = await api.getUsers(this.searchedUserName);
        this.usersList = users.items;
      } else if (this.isFollower) {
        this.filteredFollowersList = this.followersList.filter(
          user =>
            this.searchedUserName.length <= 0 ||
            user.name
              .toLowerCase()
              .includes(this.searchedUserName.toLowerCase())
        );
      } else if (this.isFollowing) {
        this.filteredFollowingList = this.followingList.filter(
          user =>
            this.searchedUserName.length <= 0 ||
            user.name
              .toLowerCase()
              .includes(this.searchedUserName.toLowerCase())
        );
      }
    },
    async incrementUsers() {
      api.incrementUsersListLimit();
      const users = await api.getUsers();
      this.usersList = users.items;
    },
    closeModal() {
      this.isComponentModalActive = false;
    },
    async onFollow() {
      this.$root.$emit("onFollowingListChanged");
    },
    async onUnfollow() {
      this.$root.$emit("onFollowingListChanged");
    }
  },
  components: {
    ModalUserItem
  }
};
</script>

<style scoped>
.modal-card {
  height: 50%;
  margin-top: auto;
  margin-bottom: auto;
}

.modal-card-foot {
  display: flex;
  justify-content: space-between;
}
.modal-card {
  height: 400px !important;
  width: 600px !important;
}
</style>
