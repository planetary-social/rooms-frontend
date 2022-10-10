<template>
  <span class="markup" v-html="rawMarkdownHtml"></span>
</template>

<script>
import linkifyRegex from '@planetary-ssb/remark-linkify-regex'
// import cidToUrl from 'remark-image-cid-to-url/browser'

import ref from 'ssb-ref'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import withImages from 'remark-with-images'

const linkifySsbSigilFeeds = linkifyRegex(ref.feedIdRegex, node => {
    return '/' + node
})

// TODO: open a thread or message
const linkifySsbSigilMsgs = linkifyRegex(ref.msgIdRegex, node => {
    return '/' + encodeURIComponent(node)
})
 
export default {
  name: 'Markdown',
  props: {
    text: String
  },
  data () {
    return {
      rawMarkdownHtml: null
    }
  },
  async mounted () {
    this.rawMarkdownHtml = await this.getRawHtmlMarkdown()
  },
  methods: {
    async getRawHtmlMarkdown () {
      return unified()
        .use(linkifySsbSigilFeeds)
        .use(linkifySsbSigilMsgs)
        .use(remarkParse, { commonmark: true })
        .use(withImages, { replace: this.replaceBlobIdWithUrl })
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(this.text)
    },
    async replaceBlobIdWithUrl (blobId) {
      const { protocol, hostname } = window.location

      // TODO: put the port in an environment var
      const url = `${protocol}//${hostname}:26835` + `/get/` + encodeURIComponent(blobId)

      return url
    }
  },
}
</script>

<style lang="scss">

@import '../styles/quasar.variables.scss';

.markup {
    align-self: stretch;
    padding: 1.5rem;
    overflow: hidden;

    h1, h2, h3, h4, h5, h6 {
        font-family: sans-serif;
        font-weight: 400;
    }

    a {
        text-decoration: none;
        color: $highlight;

        &:hover {
            text-decoration: underline;
        }
    }

    h1 {font-size: 1.7rem;}
    h2 {font-size: 1.5rem;}
    h3 {font-size: 1.3rem;}
    h4 {font-size: 1.2rem;}

    p {
        line-height: 1.4rem;
        margin: 0;
        margin-bottom: 0.6em;
        text-align: left;
        color: $pText;
        word-wrap: break-word;
        overflow: hidden;

        img {
            margin: 1.5rem 0;
            border-radius: 0.6rem;
            width: 100%;
            display: block;
        }

        a {
            text-decoration: none;
            color: $highlight;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    pre {
        background-color: #221B2E;
        padding: 1.5rem;
        margin: 1.5rem 0;
        word-break: break-word; 
        border-radius: 0.3rem;
        white-space: pre-wrap;

        code {
            color: #8e7eaf;
            line-height: 1.4rem;
        }
    }

    ol, ul {
        padding-left: 1.5rem;
        // margin: 1rem 0;

        li {
            margin: 1rem 0;
            color: #c0bdc5;

            strong {color: $pText;}
        }
    }

    blockquote {
        margin: 0 0 1.5rem;
        padding: 3.5rem 1.5rem 1.5rem;
        border-radius: 0.3rem;
        background-color: #b59ae121;
        position: relative;

        &::before {
            content: '“';
            color: #D64082;
            font-family: serif;
            font-size: 3rem;
            position: absolute;
            top: 1rem;
            left: 1.5rem;
        }
    }
}
</style>