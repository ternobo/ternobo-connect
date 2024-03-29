<template>
	<div class="conversation-container">
		<user-share-modal :show.sync="showShareUser" :user="user"></user-share-modal>
		<send-file-modal v-if="selectedFile != null" :file="selectedFile" @send="sendMessage" @canceled="selectedFile = null" :caption.sync="textCaption" :show.sync="showFileModal"></send-file-modal>
		<div class="conversation-header" v-if="!hideHeader">
			<div class="pageinfo clickable" @click="showMedia = true">
				<lazy-image :src="image" class="profile-sm mb-0 me-2" img-class="profile-sm" />
				<div class="d-flex flex-column">
					<strong class="">{{ title }} <i class="verificationcheck" v-if="isVerified">check_circle</i></strong>
					<span class="text-action font-12" v-if="typing">درحال تایپ</span>
					<small v-else>{{ subtitle }}</small>
				</div>
			</div>
			<div>
				<i v-if="showMedia" class="material-icons clickable" @click="showMedia = false">close</i>
				<b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret v-else>
					<template v-slot:button-content>
						<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
					</template>
					<wire-link role="presentation" as="li" :href="'/' + profile"><strong class="dropdown-item clickable" role="menuitem">مشاهده پروفایل</strong></wire-link>
					<b-dropdown-item @click="toggleNotification">{{ conversation.muted ? "فعال کردن اطلاعیه" : "غیرفعال کردن اطلاعیه" }}</b-dropdown-item>
					<li role="presentation" @click="showShareUser = true"><strong class="dropdown-item clickable" role="menuitem">اشتراک گذاری این کاربر</strong></li>
					<!-- <li role="presentation"><strong class="dropdown-item clickable" role="menuitem">خروجی گرفتن از گفتگو</strong></li> -->
				</b-dropdown>
			</div>
		</div>
		<media-viewer :chat-id="chatId" v-if="showMedia"></media-viewer>
		<div v-else class="conversation-chat-container">
			<div class="loadingMessages" v-if="next_page_url != null && loadingNextPage">
				<loading-spinner></loading-spinner>
			</div>
			<div class="conversation-messages" :class="{ 'd-flex justify-content-center aling-items-center': error || loading }">
				<div class="d-flex w-100 flex-column align-items-center justify-content-center" v-if="error || loading">
					<loading-spinner v-if="loading"></loading-spinner>
					<div v-if="error" class="text-center">
						<p class="text-muted">خطا در بارگذاری اطلاعات</p>
						<span class="text-action clickable" @click="loadMessages"> <i class="material-icons">refresh</i> تلاش مجدد </span>
					</div>
				</div>
				<div class="d-flex align-items-center justify-content-center flex-column w-100 h-100" style="min-height: 360px" v-else-if="messages.length < 1">
					<i class="material-icons-outlined text-superlight font-32 me-2">sentiment_dissatisfied</i>
					<span class="text-superlight font-16 no-chat-selected">گفتگویی صورت نگرفته</span>
				</div>
				<div v-else class="messages-list" ref="messagesList">
					<message v-for="(message, index) in messages" :key="'msg_id_' + message.id" :message.sync="messages[index]" :hide-profile="checkPreviosMessages(index)"></message>
				</div>
			</div>
			<div class="conversation-footer">
				<div v-if="voiceData != null && !recording" style="width: 60%" class="d-flex align-items-center">
					<i class="material-icons clickable text-superlight font-20 hover-dark" @click="voiceData = null">close</i>
					<voice-preview class="w-100" :src="voiceUrl"></voice-preview>
				</div>
				<div v-else>
					<div class="d-flex align-items-center recording" style="gap: 20px" v-if="recording">
						<i class="material-icons text-success recoording-icon">mic_none</i>
						<countup-timer class="recording-timer"></countup-timer>
						<i class="material-icons clickable text-superlight hover-dark" @click="stopRecording(true)">close</i>
						<i class="material-icons clickable save-recording hover-dark" @click="stopRecording(false)">check</i>
					</div>
					<div class="d-flex" v-if="!recording">
						<i class="material-icons clickable" @click="selectFile">attach_file</i>
						<i class="material-icons clickable" @click="recordVoice">mic_none</i>
					</div>
				</div>
				<textarea-content ref="messageInput" v-model="messageText" editableClass="form-control bg-transparent border-0" class="border-0 form-control bg-white" v-show="!recording && voiceData == null" @keypress.enter="keydownHandle" />
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
import TextareaContent from "../inputs/TextareaContent.vue";

export default {
	watch: {
		chatId(newVal) {
			this.conversation_id = newVal;
		},
		conversation_id() {
			this.loadMessages();
			if (this.conversation_id != null) {
				this.chatChannel = Echo.private("ternobo-chat.typing." + this.conversation_id);
				this.chatChannel.listenForWhisper("typing", (e) => {
					this.typing = true;
				});
				this.chatChannel.listenForWhisper("endTyping", (e) => {
					this.typing = false;
				});
			}
		},

		messageText() {
			this.textCaption = this.messageText;
			this.chatChannel.whisper("typing", {});
			clearTimeout(this.typingTimeout);
			this.typingTimeout = setTimeout(() => {
				this.chatChannel.whisper("endTyping", {});
			}, 1000);
		},
	},
	components: { LoadingSpinner, CountupTimer, VoicePreview, Message, SendFileModal, TextareaAutosize, UserShareModal, MediaViewer, TextareaContent },
	computed: {
		inputContent() {
			return this.messageText == null || this.messageText == "" ? "<span class='text-superlight'>پیام خود را بنویسید</span>" : this.messageText;
		},
		voiceUrl() {
			return URL.createObjectURL(this.voiceData);
		},
		canSend() {
			return (!this.recording && this.messageText != null && this.messageText.trim().length > 0) || (!this.recording && this.voiceData != null) || this.selectedFile != null;
		},
	},
	methods: {
		onTextInput(e) {
			this.messageText = e.target.innerText;
		},
		toggleNotification() {
			axios.post("/chats/conversations/" + this.chatId + "/mute").then((response) => {
				if (response.data.result) {
					this.conversation.muted = response.data.muted;
					this.$store.dispatch("loadChats");
				}
			});
		},
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

					fileType = fileType == "video" || fileType == "image" || fileType == "audio" ? fileType : "document";

					message.meta = {
						filename: file.name,
						filesize: file.size,
					};

					message.type = fileType;
					message.media = [file];
					message.text = this.textCaption;
				} else {
					message.type = "text";
					message.text = this.messageText;
				}
				this.messageText = null;
				this.$refs.messageInput.clear();
				this.messages.unshift(message);
			}
		},
		addMessage(message) {
			this.$refs.messagesList.scrollTop = this.$refs.messagesList.scrollHeight;
			this.messages.unshift(message);
		},

		onNewMessage(event) {
			let message = event.detail.message;
			if (message.conversation_id == this.chatId) {
				this.addMessage(message);
			}
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
			axios
				.post("/chats/conversations/" + this.conversation_id, {}, { cancelToken: axiosSource.token })
				.then((response) => {
					this.conversation = response.data.conversation;
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
					this.$nextTick(() => {
						if (this.$refs.messagesList) {
							this.$refs.messagesList.onscroll = (e) => {
								let el = e.target;

								if (el.scrollTop + el.scrollHeight - 700 <= 4) {
									this.loadMore();
								}
							};
						}
					});
				});
		},
		loadMore() {
			if (this.next_page_url != null && !this.loadingNextPage) {
				this.loadingNextPage = true;
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
						this.loadingNextPage = false;
					});
			}
		},
	},
	mounted() {
		this.conversation_id = this.chatId;
		document.addEventListener("message:new", this.onNewMessage);
	},
	destroyed() {
		window.removeEventListener("message:new", this.onNewMessage);
	},
	beforeDestroy() {
		this.request.cancel();
	},
	data() {
		return {
			textCaption: null,

			loadingNextPage: false,

			chatChannel: null,
			typing: false,

			showMedia: false,

			showShareUser: false,

			request: null,

			conversation_id: null,
			conversation: {},

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

			user: {},

			typingTimeout: null,
		};
	},
	props: ["chatId", "userId", "title", "subtitle", "profile", "image", "isVerified", "hideHeader"],
};
</script>

<style>
</style>
