 <template>
	<div class="chat-widget" :class="{ open: showList }">
		<div class="widget-header" @click="showList = !showList">
			<div class="widget-info">
				<lazy-image class="profile-xsm" img-class="profile-xsm" :src="chat.user.profile"></lazy-image>
				<strong>{{ chat.user.name }}</strong>
			</div>
			<i class="material-icons-outlined text-muted" @click="$emit('close')">close</i>
		</div>
		<div class="widget-body">
			<conversation class="widget" :hideHeader="true" :chatId="chat.id" :profile="chat.user.profile" :title="chat.user.name" :subtitle="chat.user.short_bio" />
		</div>
	</div>
</template>

 <script>
import Conversation from "../Chat/Conversation.vue";
export default {
	components: { Conversation },
	data() {
		return {
			showList: true,
		};
	},
	props: ["chat"],
};
</script>

 <style>
</style>
