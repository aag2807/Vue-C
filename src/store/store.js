import { firebaseAuth, firebaseDB } from "../boot/firebase";
import { Notify } from "quasar";
import vue from "vue";

const state = {
  userDetails: {},
  users: {}
};

const mutations = {
  setUserDetail(state, payload) {
    state.userDetails = payload;
  },
  addUser(state, payload) {
    let {users} = state;
    let { userId, userDetails } = payload;
    vue.set(users, userId, userDetails);
  },
  updateUser(state, payload){
    let {users} = state;
    let { userId, userDetails } = payload;
    Object.assign(users[userId], userDetails )
  }
};

const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        let userId = firebaseAuth.currentUser.uid;
        firebaseDB.ref(`users/${userId}`).set({
          name: payload.name,
          email: payload.email,
          online: true
        });
      })
      .catch(err => {
        Notify.create({
          message: err.message,
          caption: "Error Ocurred",
          color: "negative"
        });
        console.log(err.message);
      });
  },
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        Notify.create({
          message: err.message,
          caption: "Error Ocurred",
          color: "negative"
        });
        console.log(err.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChanged({ commit, dispatch, state }, payload) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid;
        firebaseDB.ref(`users/${userId}`).once("value", snap => {
          let userDetails = snap.val();
          commit("setUserDetail", {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          });
        });
        dispatch("firebaseUpdateUser", {
          userId: userId,
          updates: {
            online: true
          }
        });
        dispatch("firebaseGetUsers");
        this.$router.push("/");
      } else {
        dispatch("firebaseUpdateUser", {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        });
        commit("setUserDetail", {});
        this.$router.replace("/auth");
      }
    });
  },
  firebaseGetUsers({ commit }) {
    firebaseDB.ref("users").on("child_added", snap => {
      let userDetails = snap.val();
      let userId = snap.key;
      commit("addUser", {
        userId,
        userDetails
      });
    });
    firebaseDB.ref("users").on("child_changed", snap => {
      let userDetails = snap.val();
      let userId = snap.key;
      commit("updateUser", {
        userId,
        userDetails
      });
    });
  },
  firebaseUpdateUser({}, payload) {
    console.log(payload);
    firebaseDB.ref(`users/${payload.userId}`).update(payload.updates);
  }
};

const getters = {
  users: state => {
    let filteredUsers = {};
    Object.keys(state.users).forEach(user => {
      if (user !== state.userDetails.userId) {
        filteredUsers[user] = state.users[user];
      }
    });
    return filteredUsers;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
