import ChatItem from "../Components/Chat/ChatItem.vue";
import Conversation from "../Components/Chat/Conversation.vue";
import NoChatSelected from "../Components/Chat/NoChatSelected.vue";
import LazyImage from "../Components/LazyImage.vue";
import ChatSkeleton from "../Components/Skeletons/ChatSkeleton.vue";
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState(["chats", "chats_next_page_url"]),
    },
    methods: {
        loadMoreChats() {
            this.$store.dispatch("loadChatsNextPage").then(() => {
                this.loadingNextChats = false;
            });
        },
        loadMoreConnections() {
            this.connections_loading = true;
            axios
                .post(this.connections_next_page, { q: this.searchInput })
                .then((response) => {
                    let data = response.data;
                    this.connections = data.connections.data;
                    this.connections_next_page = data.connections.next_page_url;
                })
                .catch((err) => {
                    console.log(err);
                })
                .then(() => {
                    this.connections_loading = false;
                });
        },
        onNewMessage(event) {
            let message = event.detail.message;
            if (this.selectedChat != null && message.conversation_id == this.selectedChat.id) {
                this.$refs.conversationElem.addMessage(message);
            } else {
                this.loadChats(true);
            }
        },
        loadChats(repeat = false) {
            this.$store
                .dispatch("loadChats")
                .catch((err) => {
                    if (repeat) {
                        this.loadChats(true);
                    } else {
                        this.error = true;
                    }
                })
                .then(() => {
                    this.loading = false;
                });
        },
        selectChat(chat) {
            this.selectedChat = chat;
        },
        chatSubtitle(chat) {
            return chat.type == "private" ? chat.user.short_bio : "";
        },
        chatTitle(chat) {
            return chat.type == "private" ? chat.user.first_name + " " + chat.user.last_name : chat.title;
        },
    },
    watch: {
        searchInput() {
            this.searchLoading = true;
            clearTimeout(this.searchTimeout);
            if (this.searchInput != null && this.searchInput.length > 0) {
                this.searchTimeout = setTimeout(() => {
                    axios
                        .post("/chats/search", { q: this.searchInput })
                        .then((response) => {
                            let data = response.data;
                            this.$store.commit("setChats", data.conversations.data);
                            this.connections = data.connections.data;
                            this.connections_next_page = data.connections.next_page_url;
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .then(() => {
                            this.searchLoading = false;
                        });

                }, 1000);
            } else {
                this.connections = [];
                this.connections_next_page = null;
                this.loadChats();
            }
        },
    },
    data() {
        return {
            connections: [],
            connections_next_page: null,
            connections_loading: null,

            loadingNextChats: false,

            loading: false,
            searchInput: null,
            searchLoading: false,

            selectedChat: null,

            searchCancelToken: null,
            searchCancelSource: null,

            onEsc: (e) => {
                if (e.key === "Escape") {
                    this.selectedChat = null;
                }
            },
        };
    },
    mounted() {
        this.loading = true;
        this.loadChats(true);
        document.addEventListener("message:new", this.onNewMessage);
        window.addEventListener("keydown", this.onEsc);
    },
    destroyed() {
        window.removeEventListener("keydown", this.onEsc);
        window.removeEventListener("message:new", this.onNewMessage);
    },
    components: { LazyImage, ChatItem, Conversation, NoChatSelected, ChatSkeleton },
};
