export default {
    replaceEmojiWithAltAttribute(text) {
        return text.replaceAll(/<img draggable="false" class="emoji".*?alt="(.*?)"[^>]+>/g, '$1');
    },

    //<span class="mention-item" contenteditable="false" data-mention="soheila.nariman">@الوند اعتماد</span>
    replaceTextEditorMentions(text) {
        return text.replaceAll(/<span class="mention-item" contenteditable="false" data-mention="(\S+)">([\s\S]*?)<\/span>/g, "@$1")
            .replaceAll(/<span class="text-action tag-item" contenteditable="false" data-mention="(\S+)">([\s\S]*?)<\/span>/g, "#$1");
    },
    unescapeHtml(text) {
        return text?.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&nbsp;/g, " ")
    },
    escapeHTML(text) {
        const divEscapedHtml = document.createElement('div');
        document.body.appendChild(divEscapedHtml);
        divEscapedHtml.innerHTML = text;
        text = divEscapedHtml.innerText;
        document.body.removeChild(divEscapedHtml)
        return text;
    }
};