 <template>
	<div class="chat-widget" :class="{ open: showList }">
		<div class="widget-header" @click="showList = !showList">
			<div class="widget-info">
				<lazy-image class="profile-xsm" img-class="profile-xsm" :src="$store.state.user.profile"></lazy-image>
				<strong>گفتگو</strong>
			</div>
			<i class="material-icons-outlined text-muted">textsms</i>
		</div>
		<div class="widget-body">
			<div class="chats-list">
				<div class="search-container">
					<MaterialTextField v-model="searchInput" class="d-flex align-items-center material--transparent material--sm" input-class="w-100 pl-4" input-placeholder="جستجو">
						<div style="position: absolute; left: 0">
							<loading-spinner style="width: 20px; height: 20px" v-if="searchLoading"></loading-spinner>
							<i v-else-if="searchInput != null" @click="searchInput = null" class="material-icons text-superlight clickable hover-dark">close</i>
							<i v-else class="material-icons text-superlight">search</i>
						</div>
					</MaterialTextField>
				</div>
				<div class="chats" v-if="loading">
					<chat-skeleton v-for="x in 10" :key="x"></chat-skeleton>
				</div>
				<div class="chats" v-else ref="chatsElem">
					<chat-item v-for="(chat, index) in chats" :key="'chat_id_' + chat.id" @click.native="selectChat(chat)" :chat.sync="chats[index]"></chat-item>
					<div class="d-flex justify-content-center w-100" v-if="chats_next_page_url != null" v-reached="loadMoreChats">
						<loading-spinner></loading-spinner>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

 <script>
import ChatMixin from "../../Mixins/ChatMixin";
export default {
	methods: {
		selectChat(chat) {
			this.$emit("selectChat", chat);
		},
	},

	mixins: [ChatMixin],
	data() {
		return {
			showList: false,
		};
	},
};
</script>

 <style>
</style>
