import axios from "axios";
import {
    store
} from "ternobowire-js";
export default store({
    state: {
        search: null,
        chats: [],
        chats_next_page_url: null,

        connections: [],
        connections_next_page_url: null,

        url: window.location.pathname,
    },
    actions: {
        loadChats({ commit }) {
            return axios
                .post("/chats")
                .then((response) => {
                    let data = response.data;
                    commit("setChats", data.chats.data);
                    commit("setChatsNextPage", data.chats.next_page_url)
                });
        },
        loadConnectionsNextPage({ commit, state }) {
            if (state.connections_next_page_url != null) {
                let connections = state.connections;
                return axios
                    .post(state.connections_next_page_url)
                    .then((response) => {
                        connections = connections.concat(response.data.connections.data);
                        commit("setConnections", data.connections.data);
                        commit("setConnectionsNextPage", data.connections.next_page_url)
                    });
            }
        },
        loadChatsNextPage({ commit, state }) {
            if (state.chats_next_page_url != null) {
                let chats = state.chats;
                return axios
                    .post(state.chats_next_page_url)
                    .then((response) => {
                        chats = chats.concat(response.data.chats.data);
                        commit("setChatsNextPage", response.data.chats.next_page_url)
                        commit("setChats", chats);
                    });
            }
        },
        sortChats(context) {
            let chats = context.state.chats;
            chats.sort((a, b) => {
                return new Date(b.last_message.created_at) - new Date(a.last_message.created_at)
            });
            context.commit("setChats", chats);
        }
    },
    mutations: {
        setConnections(state, payload) {
            state.connections = payload;
        },
        setConnectionsNextPage(state, payload) {
            state.connections_next_page_url = payload;
        },


        updateUrl(state) {
            state.url = window.location.pathname;
        },

        // Chats Mutations - Start
        setChats(state, payload) {
            state.chats = payload;
        },
        setChatsNextPage(state, payload) {
            state.chats_next_page_url = payload;
        },
        setChatLastMessage(state, { id, message }) {
            state.chats.forEach((item) => {
                if (item.id == id) {
                    item.updated_at = message.created_at;
                    item.last_message = message;
                }
            });
        },
        // Chats Mutations - End

        setSearch(state, payload) {
            state.search = payload;
        },
        // Followings Mutations
        addFollower(state, payload) {
            state.shared.followings.push(payload);
        },
        unfollow(state, payload) {
            state.shared.followings.splice(payload, 1);
        },
        // Connections Mutations
        addWaitingConnection(state, payload) {
            state.shared.waitingConnections.push(payload);
        },
        addConnection(state, payload) {
            state.shared.connectedPeople.push(payload);
        },
        removeWaitingConnection(state, payload) {
            state.shared.waitingConnections.splice(payload, 1);
        },
        disconnect(state, payload) {
            state.shared.connectedPeople.splice(payload, 1);
        },

        // Categories Mutations
        addCategory(state, payload) {
            state.shared.currentPage.categories.push(payload);
        },


        addUnreadMessage(state) {
            state.shared.unread_messages_count++;
        },
        addUnreadNotification(state) {
            state.shared.notifications_count++;
        },

    }
});
