export default {
    replaceEmojiWithAltAttribute(text) {
        return text.replace(/<img draggable="false" class="emoji".*?alt="(.*?)"[^>]+>/g, '$1');
    },
    unescapeHtml(text) {
        return text
            .replace(/&amp;/g, '&')
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