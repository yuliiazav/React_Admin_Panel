import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const USERS_KEY = "users";

const loadUsersFromLocalStorage = () => {
  try {
    const serializedUsers = localStorage.getItem(USERS_KEY);
    return serializedUsers ? JSON.parse(serializedUsers) : [];
  } catch (error) {
    console.error("Error loading users from localStorage:", error);
    return [];
  }
};

const initialUsers = [
  { id: uuidv4(), name: "John", pass: "121345", email: "john@gmail.com" },
  {
    id: uuidv4(),
    name: "Jul",
    pass: "121315454545",
    email: "julBaker@gmail.com",
  },
  { id: uuidv4(), name: "Derek", pass: "1544cdwd55", email: "der@gmail.com" },
  { id: uuidv4(), name: "Ice", pass: "dddd", email: "iceeer@gmail.com" },
  { id: uuidv4(), name: "admin", pass: "Admin12345", email: "admin@gmail.com" },
  { id: uuidv4(), name: "Jane", pass: "ddd5635353d", email: "jane@gmail.com" },
  { id: uuidv4(), name: "Prue", pass: "dd56565dd", email: "pru@gmail.com" },
  { id: uuidv4(), name: "Fly", pass: "dddd65dd", email: "fly@gmail.com" },
  {
    id: uuidv4(),
    name: "Barbi",
    pass: "barbi56565dd",
    email: "barbi@gmail.com",
  },
  {
    id: uuidv4(),
    name: "Sarahe",
    pass: "dd565sraahdd",
    email: "sarau@gmail.com",
  },

  {
    id: uuidv4(),
    name: "Piper",
    pass: "dddddgffdsgdd",
    email: "piper@gmail.com",
  },
  {
    id: uuidv4(),
    name: "Cillian",
    pass: "dddcillied",
    email: "cillian@gmail.com",
  },
  { id: uuidv4(), name: "Tom", pass: "dddd", email: "ihardyr@gmail.com" },
  { id: uuidv4(), name: "Brad", pass: "ddpitdd", email: "piter@gmail.com" },
  { id: uuidv4(), name: "Spike", pass: "dfdfdfdddd", email: "Spier@gmail.com" },
  { id: uuidv4(), name: "Josefe", pass: "dddd", email: "josefe@gmail.com" },
  { id: uuidv4(), name: "March", pass: "dddd", email: "springer@gmail.com" },
  { id: uuidv4(), name: "Herda", pass: "dddd", email: "iceeer@gmail.com" },
];

const initialState = {
  users:
    loadUsersFromLocalStorage().length > 0
      ? loadUsersFromLocalStorage()
      : initialUsers,
  status: "idle",
  error: null,
};

const saveUsersToLocalStorage = (users) => {
  try {
    const serializedUsers = JSON.stringify(users);
    localStorage.setItem(USERS_KEY, serializedUsers);
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.unshift({ id: uuidv4(), ...action.payload });
      saveUsersToLocalStorage(state.users);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      saveUsersToLocalStorage(state.users);
    },
    editUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
        saveUsersToLocalStorage(state.users);
      }
    },
  },
});

export const { addUser, removeUser, editUser } = usersSlice.actions;
export const selectAllUsers = (state) => state.users.users;

export default usersSlice.reducer;
