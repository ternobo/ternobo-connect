 <template>
	<div class="code-block">
		<tselect direction="ltr" valueOption="mime" labelOption="name" v-model="language" :items="languages"></tselect>
		<div ref="textarea" class="code-block--textarea"></div>
	</div>
</template>
 
 <script>
import CodeMirror from "codemirror";
import Languages from "@/Libs/CodeMirrorLangs";
require("codemirror/mode/meta");
export default {
	data() {
		return {
			language: { name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"] },
		};
	},
	watch: {
		language() {
			import(`codemirror/mode/${this.language.mode}/${this.language.mode}.js`).then(() => {
				this.codeMirror.setOption("mode", this.language.mime);
			});
		},
	},
	mounted() {
		this.codeMirror = CodeMirror(this.$refs.textarea, {
			theme: "moxer",
			autofocus: true,
			lineNumbers: "true",
		});
	},
	computed: {
		languages() {
			return Languages;
		},
	},
};
</script>

<style lang="scss">
@import "codemirror/lib/codemirror.css";
@import "codemirror/theme/moxer.css";
</style>