<template>
    <div class="py-1 bg-white p-2 shadow rounded text-base text-gray-800">
        <div v-html="raw_html"></div>
    </div>
</template>

<script lang="ts">
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/color-brewer.css"
export default {
    props: {
        data: Object
    },
    data: () => {
        return {
            raw_html: ''
        }
    },
    name: "TextRender",
    mounted() {
        var md = new MarkdownIt({
            breaks: true,
            langPrefix: 'language-',
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(str, { language: lang }).value;
                    } catch (__) { }
                }

                return ''; // use external default escaping
            }
        });
        this.raw_html = (md.render(this.data.content));
    }
};
</script>