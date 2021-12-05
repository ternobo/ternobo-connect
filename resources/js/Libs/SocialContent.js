export default {
    template: '<component v-bind:is="transformed"></component>',
    props: ['text', 'tags'],
    methods: {
        convertHashTags: function (content, tags = []) {
            content = content.replace(/\B@(\w+)/gu, "<wire-link href='/$1' class='mention-item'>@$1</wire-link>")

            tags?.forEach((item) => {
                content = content.replace(`#${item}`, function (tag) {
                    return ` <wire-link href='/tags/${tag.replace('#', '')}' class='text-action'>${tag}</wire-link> `;
                }).replace(new RegExp(`\\[hashtag=(${item}) \\[(.*)\\] \\]`), '<wire-link href="/tags/$1">#$1 <img src="/$2" style="vertical-align: middle" width="24"/></wire-link>');
            });

            let parsedContent = new DOMParser().parseFromString(content, "text/html").body;

            const links = parsedContent.querySelectorAll("a");

            links.forEach((item) => {
                let link = item.getAttribute("href");
                item.setAttribute("target", "_blank");
                if (!link.startsWith(window.location.origin)) {
                    let redirectURL = new URL(`${window.location.origin}/redirect`);
                    redirectURL.searchParams.append("to", link)
                    item.setAttribute("href", redirectURL.toString());
                }
            })

            if (content.endsWith("...")) {
                if (parsedContent.lastChild instanceof Text) {
                    parsedContent.lastChild.appendData("...")
                } else if (parsedContent.lastChild instanceof HTMLElement) {
                    parsedContent.lastChild?.append("...");
                }
            }
            return `<pre class='post-content--text'>${parsedContent.innerHTML}</pre>`;
        }
    },
    computed: {
        transformed() {
            const template = this.convertHashTags(this.text, this.tags);
            return {
                template: template,
                props: this.$options.props
            }
        }
    }
};