<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col cols="4">
        <v-text-field
          v-model="searchTerm"
          label="Search users..."
          @input="fetchUsers"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-checkbox
          v-model="includeDeleted"
          label="Include deleted users"
          @change="fetchUsers"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-table>
      <thead>
        <tr>
          <th @click="changeSorting('name')">
            Name
            <v-icon small>{{
              sortField === "name"
                ? order === "ASC"
                  ? "mdi-arrow-up"
                  : "mdi-arrow-down"
                : ""
            }}</v-icon>
          </th>
          <th @click="changeSorting('surname')">
            Surname
            <v-icon small>{{
              sortField === "surname"
                ? order === "ASC"
                  ? "mdi-arrow-up"
                  : "mdi-arrow-down"
                : ""
            }}</v-icon>
          </th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filteredUsers"
          :key="user.id"
          :class="{ 'red--text': user.deleted }"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.email }}</td>
          <td>
            <v-btn
              icon
              color="primary"
              @click="editUser(user)"
              :disabled="user.deleted"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              color="error"
              @click="deleteUser(user.id)"
              :disabled="user.deleted"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <EditUser
      v-if="editingUser"
      :user="editingUser"
      @user-updated="fetchUsers"
      @close="editingUser = null"
    />

    <v-btn color="primary" @click="createNewUser">Create New User</v-btn>
    <CreateUser
      v-if="creatingUser"
      @user-created="fetchUsers"
      @close="creatingUser = false"
    />
  </v-container>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import EditUser from "./EditUser.vue";
import CreateUser from "./CreateUser.vue";

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  deleted: boolean;
}

export default {
  components: { EditUser, CreateUser },
  setup() {
    const users = ref<User[]>([]);
    const searchTerm = ref("");
    const includeDeleted = ref(false);
    const sortField = ref("name");
    const order = ref("ASC");
    const editingUser = ref<User | null>(null);
    const creatingUser = ref(false);

    const fetchUsers = () => {
      const sort = `${sortField.value}:${order.value}`;
      fetch(
        `http://localhost:3000/users?search=${searchTerm.value}&deleted=${includeDeleted.value}&sort=${sort}`
      )
        .then((response) => response.json())
        .then((data) => {
          users.value = data.users;
        });
    };

    const changeSorting = (field: string) => {
      if (sortField.value === field) {
        order.value = order.value === "ASC" ? "DESC" : "ASC";
      } else {
        sortField.value = field;
        order.value = "ASC";
      }
      fetchUsers();
    };

    const deleteUser = (id: string) => {
      fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      }).then(() => {
        fetchUsers();
      });
    };

    const editUser = (user: User) => {
      editingUser.value = { ...user };
    };

    const createNewUser = () => {
      creatingUser.value = true;
    };

    const filteredUsers = computed(() =>
      users.value.filter(
        (user) =>
          (!searchTerm.value ||
            user.name.includes(searchTerm.value) ||
            user.surname.includes(searchTerm.value) ||
            user.email.includes(searchTerm.value)) &&
          (includeDeleted.value || !user.deleted)
      )
    );

    onMounted(fetchUsers);

    return {
      users,
      searchTerm,
      includeDeleted,
      sortField,
      order,
      editingUser,
      deleteUser,
      editUser,
      filteredUsers,
      changeSorting,
      createNewUser,
      creatingUser,
    };
  },
};
</script>
