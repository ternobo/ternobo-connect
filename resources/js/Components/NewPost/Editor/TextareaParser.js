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
            .replace(/&#039;/g, "'");
    },
    escapeHTML(text) {
        const divEscapedHtml = document.createElement('div');
        const escapedHtmlTextNode = divEscapedHtml.appendChild(
            document.createTextNode(text)
        );

        const escapedHtml = escapedHtmlTextNode.parentNode;
        const escapedHtmlContent = escapedHtml.innerText;

        escapedHtml.removeChild(escapedHtmlTextNode);
        divEscapedHtml.parentNode?.removeChild(divEscapedHtml);

        // eslint-disable-next-line
        return escapedHtmlContent;
    }
};