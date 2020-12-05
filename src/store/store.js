import { firebaseAuth, firebaseDB } from "../boot/firebase";
import { Notify } from "quasar";
import vue from "vue";

const state = {
  userDetails: {},
  users: {},
  messages: {}
};

let messagesRef;

const mutations = {
  setUserDetail(state, payload) {
    state.userDetails = payload;
  },
  addUser(state, payload) {
    let { users } = state;
    let { userId, userDetails } = payload;
    vue.set(users, userId, userDetails);
  },
  updateUser(state, payload) {
    let { users } = state;
    let { userId, userDetails } = payload;
    Object.assign(users[userId], userDetails);
  },
  addMessage(state, payload) {
    vue.set(state.messages, payload.messageId, payload.messageDetails);
  },
  clearMessages(state) {
    let { messages } = state;
    messages = {};
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
        this.$router.push("/auth");
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
    firebaseDB.ref(`users/${payload.userId}`).update(payload.updates);
  },
  firebaseGetMessage({ state, commit }, payload) {
    let userId = state.userDetails.userId;
    messagesRef = firebaseDB.ref("chats/" + userId + "/" + payload);
    messagesRef.on("child_added", snap => {
      let messageDetails = snap.val();
      let messageId = snap.key;
      console.log(messageDetails, messageId);
      commit("addMessage", {
        messageDetails,
        messageId
      });
    });
  },
  firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
      messagesRef.off("child_added");
      commit("clearMessages");
    }
  },
  firebaseSendMessage({ commit }, payload) {
    console.log(payload);
    firebaseDB
      .ref("chats/" + state.userDetails.userId + "/" + payload.otherUserID)
      .push(payload.message);

    payload.message.from = "them";
    firebaseDB
      .ref("chats/" + payload.otherUserID + "/" + state.userDetails.userId)
      .push(payload.message);
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
