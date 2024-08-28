<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>Create New User</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="createUser">
          <v-text-field
            v-model="user.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.surname"
            label="Surname"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="createUser">Create</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface User {
  name: string;
  surname: string;
  email: string;
}

export default defineComponent({
  setup(_, { emit }) {
    const dialog = ref(true);
    const user = ref<User>({ name: "", surname: "", email: "" });

    const createUser = () => {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.value),
      }).then(() => {
        emit("user-created");
        emit("close");
      });
    };

    return {
      dialog,
      user,
      createUser,
    };
  },
});
</script>
