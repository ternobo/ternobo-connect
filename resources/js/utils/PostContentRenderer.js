import { ContentRenderer } from "@ternobo/ternobo-editor";
import Mention from "@tiptap/extension-mention";
import Suggestion from "../Components/Mention/Suggestion";

const renderer = new ContentRenderer([
    Mention.configure({
        HTMLAttributes: {
            class: 'mention',
        },
        Suggestion,
    }),
], { forceFallbackImages: true });

const simpleRenderer = new ContentRenderer([
    Mention.configure({
        HTMLAttributes: {
            class: 'mention',
        },
        Suggestion,
    }),
]);

window.renderHeadingContent = (content) => {
    const htmlContent = simpleRenderer.render(content);
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const textContent = doc.body.textContent;
    return textContent;
}
window.ContentRenderer = renderer;
export default renderer;
