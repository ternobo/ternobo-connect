<template>
	<div class="conversation-container">
		<div class="conversation-header">
			<div class="pageinfo clickable">
				<lazy-image src="/images/man-profile.png" class="profile-sm mb-0 ml-2" img-class="profile-sm" />
				<div class="d-flex flex-column">
					<strong class="">{{ title }}</strong>
					<small>{{ subtitle }}</small>
				</div>
			</div>
			<div>
				<b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
					<template v-slot:button-content>
						<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
					</template>
					<wire-link role="presentation" as="li" :href="'/' + profile"><strong class="dropdown-item clickable" role="menuitem">مشاهده پروفایل</strong></wire-link>
				</b-dropdown>
			</div>
		</div>
		<div class="conversation-messages" :class="{ 'd-flex justify-content-center aling-items-center': error || loading }">
			<div class="d-flex w-100 flex-column align-items-center justify-content-center">
				<loading-spinner v-if="loading"></loading-spinner>
				<div v-if="error" class="text-center">
					<p class="text-muted">خطا در بارگذاری اطلاعات</p>
					<span class="text-action clickable" @click="loadMessagess"> <i class="material-icons">refresh</i> تلاش مجدد </span>
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
			<input type="text" class="border-0 form-control bg-white" v-show="!recording && voiceData == null" @keypress.enter="sendMessage" v-model="message" placeholder="پیام خود را بنویسید" />
			<i class="material-icons-outlined clickable" :class="{ disabled: recording }" @click="sendMessage" style="transform: rotate(180deg)">send</i>
		</div>
	</div>
</template>

<script>
import CountupTimer from "../CountupTimer.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import VoicePreview from "./VoicePreview.vue";
export default {
	components: { LoadingSpinner, CountupTimer, VoicePreview },
	computed: {
		voiceUrl() {
			return URL.createObjectURL(this.voiceData);
		},
	},
	methods: {
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
		selectFile() {},
		sendMessage() {
			if (this.sendDisabled) {
				return;
			}
			if (this.voiceData != null) {
				let formData = new FormData();
				formData.append("voice", this.voiceData);
				formData.append("type", "voice");
				axios.post("/chats/send-message", formData).then((response) => {
					console.log(response.data);
				});
			}
		},
		stopRecording(recordCanceled = false) {
			this.recordCanceled = recordCanceled;
			if (this.mediaRecorder != null) {
				this.mediaRecorder.stop();
				this.recording = false;
			}
		},
		loadMessagess() {
			this.loading = true;
			axios
				.post("/chats/conversations/" + this.chatId)
				.then((response) => {
					this.messages = response.data.messages;
				})
				.catch((err) => {
					this.error = true;
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
	mounted() {
		this.loadMessagess();
	},
	data() {
		return {
			message: null,
			recording: false,
			recordCanceled: false,
			sendDisabled: false,

			mediaRecorder: null,
			voiceData: null,

			loading: false,
			error: false,

			messages: {},
		};
	},
	props: ["chatId", "title", "subtitle", "profile"],
};
</script>

<style>
</style>
