import {
    store
} from "wire-js";
export default store({
    state: {
        search: null
    },
    mutations: {
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
        }

    }
});
