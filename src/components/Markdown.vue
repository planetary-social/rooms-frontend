<template>
  <p>
    <span v-html="rawHtml"></span>
  </p>
</template>

<script>
 import linkifyRegex from '@planetary-ssb/remark-linkify-regex'
import remarkParse from 'remark-parse'
import ref from 'ssb-ref'

import {unified} from 'unified'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

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
  computed: {
    rawHtml () {
      return unified()
        .use(linkifySsbSigilFeeds)
        .use(linkifySsbSigilMsgs)
        // TODO: need get this working with blobs
        // .use(cidToUrl(blobId => {
        //     // if (mentionedBlobs.includes(blobId)) {
        //     //     return null
        //     // }

        //     return (PUB_URL + '/get/' +
        //         encodeURIComponent(blobId))
        // }))
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .processSync(this.text)
    }
  }
}
</script>
