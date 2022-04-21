import { ContentRenderer } from "@ternobo/ternobo-editor";
import Mention from "@tiptap/extension-mention";
import Suggestion from "../Components/Mention/Suggestion";

window.ContentRenderer = new ContentRenderer([
    Mention.configure({
        HTMLAttributes: {
            class: 'mention',
        },
        Suggestion,
    }),
]);
