 <template>
	<div class="code-block" dir="ltr">
		<div ref="code-viewer" :data-lang="content.language" style="height: 400px; background: #1e1e1e" class="py-2"></div>
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
			scrollBeyondLastLine: false,
		});
	},
};
</script>