<template>
  <b-modal
    v-model="isActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    :can-cancel="false"
    aria-role="dialog"
    aria-modal
  >
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Create an account</p>
          <button type="button" class="delete" v-on:click="onClose" />
        </header>
        <section class="modal-card-body">
          <b-field grouped>
            <b-field label="First name" expanded>
              <b-input
                v-model="firstName"
                type="text"
                placeholder="First name"
                required
                expanded
              ></b-input>
            </b-field>
            <b-field label="Last name" expanded>
              <b-input
                v-model="lastName"
                type="text"
                placeholder="Last name"
                required
                expanded
              ></b-input>
            </b-field>
          </b-field>
          <b-field label="Email" expanded>
            <b-input
              v-model="email"
              type="email"
              placeholder="Email"
              required
              expanded
            ></b-input>
          </b-field>
          <b-field label="Password" expanded>
            <b-input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              expanded
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Cancel" v-on:click="onClose" />
          <b-button
            label="Create"
            type="is-primary"
            v-on:click="formatAccountInfo()"
          />
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "modal-create-account",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  },
  props: ["isActive", "onCreate", "onClose"],
  methods: {
    formatAccountInfo() {
      const formattedFirstName = this.firstName.trim();
      const formattedLastName = this.lastName.trim();
      const formattedEmail = this.email.trim();
      if (
        formattedFirstName.length === 0 ||
        formattedLastName.length === 0 ||
        formattedEmail.length === 0 ||
        this.password.length === 0
      )
        return;

      this.onCreate(
        `${formattedFirstName} ${formattedLastName}`,
        formattedEmail,
        this.password
      );
    }
  }
};
</script>

<style scoped></style>
