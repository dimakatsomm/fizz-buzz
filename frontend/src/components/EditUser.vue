<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>Edit User</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateUser">
          <v-text-field
            v-model="userDetails.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="userDetails.surname"
            label="Surname"
            required
          ></v-text-field>
          <v-text-field
            v-model="userDetails.email"
            label="Email"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="updateUser">Save</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export default defineComponent({
  props: {
    user: {
      type: Object as () => IUser,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(true);
    const userDetails = ref<IUser>({ ...props.user });

    const updateUser = () => {
      fetch(`http://localhost:3000/users/${userDetails.value.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails.value),
      }).then(() => {
        emit("user-updated");
        emit("close");
      });
    };

    watch(
      () => props.user,
      (newUser) => {
        userDetails.value = { ...newUser };
      }
    );

    return {
      dialog,
      userDetails,
      updateUser,
    };
  },
});
</script>
