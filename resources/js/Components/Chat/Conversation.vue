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
			<div class="d-flex">
				<i class="material-icons clickable" @click="selectFile">attach_file</i>
				<i class="material-icons clickable" @click="recordVoice" :class="{ 'text-action': recording }">{{ recording ? "mic" : "mic_none" }}</i>
			</div>
			<input type="text" class="border-0 form-control bg-white" @keypress.enter="sendMessage" v-model="message" placeholder="پیام خود را بنویسید" />
			<i class="material-icons-outlined clickable" @click="sendMessage" style="transform: rotate(180deg)">send</i>
		</div>
	</div>
</template>

<script>
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
	components: { LoadingSpinner },
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
					const audioBlob = new Blob(audioChunks);
					this.audioData = audioBlob;
					this.mediaRecorder.stream.getAudioTracks()[0].stop();
				});
			});
		},
		selectFile() {},
		sendMessage() {},
		stopRecording() {
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

			mediaRecorder: null,
			audioData: null,

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
