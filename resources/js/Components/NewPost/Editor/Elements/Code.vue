 <template>
	<div class="code-block">
		<tselect class="mb-3" direction="ltr" v-model="language" :items="languages"></tselect>
		<div class="code-block--textarea" dir="ltr">
			<div ref="textarea" style="height: 450px"></div>
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
		renderCodeEditor(language = "java", code = "public class Main{\n \tpublic static void main(String args[]){\n\t} \n}") {
			setTimeout(() => {
				this.editor = monaco.editor.create(this.$refs.textarea, {
					value: code,
					language: language,
					theme: "vs-dark",
				});
				this.$nextTick(() => {
					this.editor.onDidBlurEditorText(() => {
						this.$emit("update:content", { code: this.editor.getValue(), language: this.language });
					});
				});
			}, 700);
		},
	},
	data() {
		return {
			language: "java",
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
		};
	},
	beforeDestroy() {
		this.editor.dispose();
	},
	mounted() {
		this.renderCodeEditor(this.content.language, this.content.code);
	},
};
</script>