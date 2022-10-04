<template>
  <span v-html="rawMarkdownHtml"></span>
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

import { mapActions } from 'pinia'
import { useProfileStore } from '../stores/profile'

const linkifySsbSigilFeeds = linkifyRegex(ref.feedIdRegex, node => {
    return '/' + node
})

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
    ...mapActions(useProfileStore, ['getBlobUri']),
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
      // const uri = await this.getBlobUri(blobId)
      // console.log(uri)

      return `http://localhost:26835` + `/get/` + encodeURIComponent(blobId)

      // return uri
    }
  },
}
</script>
