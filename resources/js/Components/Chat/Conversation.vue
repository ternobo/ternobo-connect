<template>
	<div class="conversation-container">
		<user-share-modal :show.sync="showShareUser" :user="user"></user-share-modal>
		<send-file-modal v-if="selectedFile != null" :file="selectedFile" @send="sendMessage" @canceled="selectedFile = null" :caption.sync="messageText" :show.sync="showFileModal"></send-file-modal>
		<div class="conversation-header" v-if="!hideHeader">
			<div class="pageinfo clickable" @click="showMedia = true">
				<lazy-image :src="profile" class="profile-sm mb-0 ml-2" img-class="profile-sm" />
				<div class="d-flex flex-column">
					<strong class="">{{ title }}</strong>
					<small>{{ subtitle }}</small>
				</div>
			</div>
			<div>
				<i v-if="showMedia" class="material-icons clickable" @click="showMedia = false">close</i>
				<b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret v-else>
					<template v-slot:button-content>
						<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
					</template>
					<wire-link role="presentation" as="li" :href="'/' + profile"><strong class="dropdown-item clickable" role="menuitem">مشاهده پروفایل</strong></wire-link>
					<li role="presentation"><strong class="dropdown-item clickable" role="menuitem">غیرفعال کردن اطلاعیه</strong></li>
					<li role="presentation" @click="showShareUser = true"><strong class="dropdown-item clickable" role="menuitem">اشتراک گذاری کاربر</strong></li>
					<li role="presentation"><strong class="dropdown-item clickable" role="menuitem">خروجی گرفتن از گفتگو</strong></li>
				</b-dropdown>
			</div>
		</div>
		<media-viewer :chat-id="chatId" v-if="showMedia"></media-viewer>
		<div v-else class="conversation-chat-container">
			<div class="conversation-messages" :class="{ 'd-flex justify-content-center aling-items-center': error || loading }">
				<div class="d-flex w-100 flex-column align-items-center justify-content-center" v-if="error || loading">
					<loading-spinner v-if="loading"></loading-spinner>
					<div v-if="error" class="text-center">
						<p class="text-muted">خطا در بارگذاری اطلاعات</p>
						<span class="text-action clickable" @click="loadMessages"> <i class="material-icons">refresh</i> تلاش مجدد </span>
					</div>
				</div>
				<div v-else class="messages-list">
					<message v-for="(message, index) in messages" :key="'msg_id_' + message.id" :message.sync="messages[index]" :hide-profile="checkPreviosMessages(index)"></message>
					<div class="d-flex justify-content-center w-100" v-if="next_page_url != null" v-reached="loadMore">
						<loading-spinner></loading-spinner>
					</div>
				</div>
			</div>
			<div class="conversation-footer">
				<voice-preview v-if="voiceData != null && !recording" style="width: 60%" :src="voiceUrl"></voice-preview>
				<div v-else>
					<div class="d-flex align-items-center recording" style="gap: 20px" v-if="recording">
						<i class="material-icons text-success recoording-icon">mic_none</i>
						<countup-timer class="recording-timer"></countup-timer>
						<i class="material-icons clickable text-superlight" @click="stopRecording(true)">close</i>
						<i class="material-icons clickable save-recording" @click="stopRecording(false)">check</i>
					</div>
					<div class="d-flex" v-if="!recording">
						<i class="material-icons clickable" @click="selectFile">attach_file</i>
						<i class="material-icons clickable" @click="recordVoice">mic_none</i>
					</div>
				</div>
				<textarea-autosize row="1" :minHeight="40" @keydown.enter.native="keydownHandle" type="text" class="border-0 form-control bg-white" v-show="!recording && voiceData == null" @keypress.enter="sendMessage" v-model="messageText" placeholder="پیام خود را بنویسید" />
				<i class="material-icons-outlined clickable" :class="{ disabled: !canSend }" @click="sendMessage" style="transform: rotate(180deg)">send</i>
			</div>
		</div>
	</div>
</template>

<script>
import CountupTimer from "../CountupTimer.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import Message from "./Message/Message.vue";
import VoicePreview from "./VoicePreview.vue";
import { v4 as uuidv4 } from "uuid";
import SendFileModal from "./SendFileModal.vue";
import TextareaAutosize from "../inputs/TextareaAutosize.vue";
import UserShareModal from "./UserShareModal.vue";
import MediaViewer from "./MediaViewer/MediaViewer";

export default {
	watch: {
		chatId(newVal) {
			this.conversation_id = newVal;
		},
		conversation_id() {
			this.loadMessages();
		},
	},
	components: { LoadingSpinner, CountupTimer, VoicePreview, Message, SendFileModal, TextareaAutosize, UserShareModal, MediaViewer },
	computed: {
		voiceUrl() {
			return URL.createObjectURL(this.voiceData);
		},
		canSend() {
			return (!this.recording && this.messageText != null && this.messageText.trim().length > 0) || (!this.recording && this.voiceData != null) || this.selectedFile != null;
		},
	},
	methods: {
		keydownHandle(e) {
			if (e.key == "Enter" && !e.shiftKey) {
				// prevent default behavior
				e.preventDefault();
				this.sendMessage();
			}
		},
		checkPreviosMessages(index) {
			let list = this.messages;
			if (list[index + 1] && list[index + 1].sender.id == list[index].sender.id && list[index + 1].type == list[index].type) {
				return true;
			}
			return false;
		},

		recordVoice() {
			let audioContext = new (window.AudioContext || window.webkitAudioContext)();
			if (this.recording) {
				return this.stopRecording();
			}
			navigator.mediaDevices.getUserMedia({ audio: { noiseSuppression: true, volume: 2.25 } }).then((stream) => {
				let source = audioContext.createMediaStreamSource(stream);
				let noiseGate = new NoiseGate(audioContext);
				source.connect(noiseGate);

				this.mediaRecorder = new MediaRecorder(stream);
				this.mediaRecorder.start();
				this.recording = true;

				const audioChunks = [];

				this.mediaRecorder.addEventListener("dataavailable", (event) => {
					audioChunks.push(event.data);
				});

				this.mediaRecorder.addEventListener("stop", () => {
					if (!this.recordCanceled) {
						const audioBlob = new Blob(audioChunks, {
							type: "audio/webm",
						});
						this.voiceData = audioBlob;
					}
					this.mediaRecorder.stream
						.getTracks() // get all tracks from the MediaStream
						.forEach((track) => track.stop());
				});
			});
		},
		selectFile() {
			let fileChooser = document.createElement("input");
			fileChooser.type = "file";

			fileChooser.onchange = (e) => {
				let file = e.target.files[0];
				let fileType = file.type;
				fileType = fileType.substr(0, fileType.lastIndexOf("/"));
				this.selectedFile = file;
				this.showFileModal = true;
			};
			fileChooser.click();
		},
		sendMessage() {
			if (this.canSend) {
				let message = {
					id: uuidv4(),
					created_at: new Date().toISOString(),
					sender: this.$store.state.user,
					shouldSend: true,
					conversation_id: this.conversation_id,
				};

				if (this.sendDisabled) {
					return;
				}
				if (this.voiceData != null) {
					message.type = "voice";
					message.media = [this.voiceData];
					this.voiceData = null;
				} else if (this.selectedFile != null) {
					let file = this.selectedFile;
					let fileType = file.type;
					fileType = fileType.substr(0, fileType.lastIndexOf("/"));

					fileType = fileType == "application" ? "document" : fileType;

					message.meta = {
						filename: file.name,
						filesize: file.size,
					};

					message.type = fileType;
					message.media = [file];
					message.text = this.messageText;
				} else {
					message.type = "text";
					message.text = this.messageText;
				}
				this.messageText = null;
				this.messages.unshift(message);
			}
		},
		addMessage(message) {
			this.messages.unshift(message);
		},
		stopRecording(recordCanceled = false) {
			this.recordCanceled = recordCanceled;
			if (this.mediaRecorder != null) {
				this.mediaRecorder.stop();
				this.recording = false;
			}
		},
		loadMessages() {
			// Cancel Previous Request
			if (this.request) {
				this.request.cancel();
			}
			this.messages = [];

			const axiosSource = axios.CancelToken.source();
			this.request = { cancel: axiosSource.cancel };
			this.loading = true;
			if (this.conversation_id) {
				axios
					.post("/chats/conversations/" + this.conversation_id, {}, { cancelToken: axiosSource.token })
					.then((response) => {
						this.messages = response.data.messages.data;
						this.next_page_url = response.data.messages.next_page_url;
						this.user = response.data.conversation.user;
					})
					.catch((err) => {
						if (axios.isCancel(err)) {
							this.loading = true;
						} else {
							this.error = true;
						}
					})
					.then(() => {
						this.loading = false;
					});
			} else {
				axios
					.post("/chats/conversation/create/" + this.userId, {}, { cancelToken: axiosSource.token })
					.then((response) => {
						this.conversation_id = response.data.conversation_id;
					})
					.catch((err) => {
						this.error = true;
					})
					.then(() => {
						this.loading = false;
					});
			}
		},
		loadMore() {
			if (this.next_page_url != null) {
				axios
					.post(this.next_page_url)
					.then((response) => {
						this.messages = this.messages.concat(response.data.messages.data);
						this.next_page_url = response.data.messages.next_page_url;
					})
					.catch((err) => {
						this.error = true;
					})
					.then(() => {
						this.loading = false;
					});
			}
		},
	},
	mounted() {
		this.conversation_id = this.chatId;
	},
	beforeDestroy() {
		this.request.cancel();
	},
	data() {
		return {
			showMedia: false,

			showShareUser: false,

			request: null,

			conversation_id: null,

			recording: false,
			recordCanceled: false,
			sendDisabled: false,
			showFileModal: false,
			mediaRecorder: null,

			voiceData: null,
			selectedFile: null,
			messageText: null,

			loading: false,
			error: false,

			messages: [],
			next_page_url: null,

			user: null,
		};
	},
	props: ["chatId", "userId", "title", "subtitle", "profile", "hideHeader"],
};
</script>

<style>
</style>
