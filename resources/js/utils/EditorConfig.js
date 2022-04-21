import Mention from "@tiptap/extension-mention";
import Suggestion from "../Components/Mention/Suggestion";

export default [
    Mention.configure({
        HTMLAttributes: {
            class: 'mention',
        },
        suggestion: Suggestion,
    }),
]