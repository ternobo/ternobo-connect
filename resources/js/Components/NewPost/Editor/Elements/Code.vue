 <template>
	<div class="code-block">
		<div class="d-flex align-items-center mb-3 justify-content-between">
			<tselect class="tselect-sm language-select" :search="true" placeholder="Search For Language" direction="ltr" v-model="language" :items="languages"></tselect>

			<button class="btn close btn-text" v-if="fullscreen" @click="exitFullscreen"><i class="material-icons">close</i></button>
			<i class="material-icons text-white" v-if="showFullscreenIcon && !fullscreen" @click="showFullscreen">fullscreen</i>
		</div>
		<div class="code-block--textarea" dir="ltr">
			<div ref="textarea" :style="{ height: height, maxHeight: '450px' }"></div>
		</div>
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
	watch: {
		language() {
			let code = this.editor.getValue();
			this.editor.dispose();
			this.$nextTick(() => {
				this.renderCodeEditor(this.language, code);
			});
		},
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

		renderCodeEditor(language = "java", code = "public class Main{\n \tpublic static void main(String args[]){\n\t} \n}") {
			setTimeout(() => {
				this.editor = monaco.editor.create(this.$refs.textarea, {
					value: code,
					language: language,
					theme: "vs-dark",
					automaticLayout: true,
					scrollBeyondLastLine: false,
				});
				this.$nextTick(() => {
					this.editor.onDidBlurEditorText(() => {
						this.$emit("update:content", { code: this.editor.getValue(), language: this.language });
					});

					this.editor.onDidChangeModelContent(() => {
						const height = this.editor.getModel().getLineCount() * 19 + 16;
						this.height = `${height}px`;
						this.editor.layout();
					});
				});
			}, 700);
		},
	},
	data() {
		return {
			language: "java",
			height: "111px",
			languages: [
				"abap",
				"apex",
				"azcli",
				"bat",
				"bicep",
				"cameligo",
				"clojure",
				"coffee",
				"cpp",
				"csharp",
				"csp",
				"css",
				"dart",
				"dockerfile",
				"ecl",
				"elixir",
				"fsharp",
				"go",
				"graphql",
				"handlebars",
				"hcl",
				"html",
				"ini",
				"java",
				"javascript",
				"json",
				"julia",
				"kotlin",
				"less",
				"lexon",
				"liquid",
				"lua",
				"m3",
				"markdown",
				"mips",
				"msdax",
				"mysql",
				"objective-c",
				"pascal",
				"pascaligo",
				"perl",
				"pgsql",
				"php",
				"postiats",
				"powerquery",
				"powershell",
				"pug",
				"python",
				"qsharp",
				"r",
				"razor",
				"redis",
				"redshift",
				"restructuredtext",
				"ruby",
				"rust",
				"sb",
				"scala",
				"scheme",
				"scss",
				"shell",
				"solidity",
				"sophia",
				"sparql",
				"sql",
				"st",
				"swift",
				"systemverilog",
				"tcl",
				"twig",
				"typescript",
				"vb",
				"xml",
				"yaml",
			],

			fullscreen: false,
			showFullscreenIcon: true,
		};
	},
	beforeDestroy() {
		this.editor.dispose();
	},
	mounted() {
		const content = typeof this.content == "string" ? JSON.parse(this.content) : this.content;
		this.renderCodeEditor(content.language, content.code);
	},
};
</script>