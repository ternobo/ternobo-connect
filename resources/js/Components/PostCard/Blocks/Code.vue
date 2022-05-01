 <template>
	<div class="code-block" :class="{ fullscreen: fullscreen }" dir="ltr">
		<i class="material-icons fullscreen-icon" v-if="showFullscreenIcon && !fullscreen" @click="showFullscreen">fullscreen</i>
		<div class="code-block-header" v-if="fullscreen">
			<button class="btn close btn-text" @click="exitFullscreen"><i class="material-icons">close</i></button>
			<strong class="text-white font-24">{{ __.get("editor.code") }}</strong>
		</div>
		<div ref="code-viewer" :data-lang="content.language" class="code-viewer py-2"></div>
	</div>
</template>
 
 <script>
import * as monaco from "monaco-editor";
export default {
	props: {
		content: {
			default: () => {
				return {
					code: "public class Main{\n \tpublic static void main(String args[]){\n\t} \n}",
					language: "java",
				};
			},
		},
	},
	data() {
		return {
			fullscreen: false,
			editor: false,

			showFullscreenIcon: false,
		};
	},
	methods: {
		exitFullscreen() {
			document.exitFullscreen();
			this.fullscreen = false;
		},
		showFullscreen() {
			this.fullscreen = true;
			this.$el.requestFullscreen();
			this.$refs["code-viewer"].style.height = `calc(100vh - 100px)`;
			this.editor.layout();
		},
	},
	destroyed() {
		this.editor.dispose();
	},
	mounted() {
		this.editor = monaco.editor.create(this.$refs["code-viewer"], {
			value: this.content.code,
			theme: "vs-dark",
			language: this.content.language,
			readOnly: true,
			formatOnType: false,
			folding: false,
			minimap: { enabled: false },
			automaticLayout: true,
			scrollBeyondLastLine: false,
		});

		this.$nextTick(() => {
			setTimeout(() => {
				const height = this.editor.getModel().getLineCount() * 19 + 16;
				this.$refs["code-viewer"].style.height = `${height}px`;
				this.editor.layout();

				if (height >= 320) {
					this.showFullscreenIcon = true;
					this.$el.addEventListener("fullscreenchange", () => {
						if (!document.fullscreenElement) {
							this.fullscreen = false;
						}
					});
				}
			}, 200);
		});
	},
};
</script>