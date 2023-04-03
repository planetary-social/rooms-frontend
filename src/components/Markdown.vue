<template>
  <span class="markup" v-html="rawMarkdownHtml"></span>
</template>

<script>
import ref from 'ssb-ref'
import renderer from 'ssb-markdown'
import querystring from 'querystring'
import { mapActions } from 'pinia'
import { useProfileStore } from '../store/profile'

export default {
  name: 'Markdown',
  props: {
    text: String,
    preview: Boolean
  },
  data () {
    return {
      rawMarkdownHtml: null
    }
  },
  async mounted () {
    this.rawMarkdownHtml = await this.getRawHtmlMarkdown()

    setTimeout(() => this.replaceAnchors())
  },
  computed: {
    lines () {
      if (!this.preview) return this.text

      // this reduces the number of lines when preview is true
      // it needs to be done before the text is passed to the renderer
      // because for some reason, updating the css didnt work...
      return this.text
        .split('\n')
        .slice(0, 2)
        .map(line => line === '' ? '\n' : line + '\n')
        .join('')
    },
    isDevelopment () {
      return process.env.NODE_ENV === 'development'
    }
  },
  methods: {
    ...mapActions(useProfileStore, ['getMinimalProfile']),
    async getRawHtmlMarkdown () {
      const typeLookup = {}

      return renderer.block(this.lines, {
        toUrl: (id) => {
          const link = ref.parseLink(id)
          if (link && ref.isBlob(link.link)) {
            return (
              this.replaceBlobIdWithUrl(link.link)+
              '?' +
              this.getQueryString(link, typeLookup)
            )
          } else if (link && ref.isFeedId(link.link)) { // handle URL for mentions
            return link.link
          } else if (link && ref.isMsgId(link.link)) {
            return this.replaceMsgIdWithUrl(link.link)
          }else if (link || id.startsWith('#') || id.startsWith('?')) {
            // TODO: map to messages matching hashtag
            return id
          }

          return false
        },
        imageLink: (id) => id
      })
    },
    replaceBlobIdWithUrl (blobId) {
      return  import.meta.env.VITE_BLOB_URL + '/' + encodeURIComponent(blobId)
    },
    replaceMsgIdWithUrl (msgId) {
      return this.formatUrl(`${window.location.origin}/thread/${encodeURI(msgId)}`)
    },
    formatUrl (url) {
      return url.concat(this.isDevelopment ? '/' : '')
    },
    getQueryString (link, typeLookup) {
      const query = {}

      if (link.query && link.query.unbox) query.unbox = link.query.unbox
      if (typeLookup[link.link]) query.contentType = typeLookup[link.link]

      return querystring.stringify(query)
    },
    replaceAnchors () {

      // TODO: this is a hack to replace anchor hrefs to use
      // vue-router

      const anchors = this.$el.getElementsByTagName('a')
      
      Array.from(anchors).forEach(a => {
        const href = a.attributes.href.value
        
        if (href.startsWith('http')) return

        if (href.startsWith('#') || href.startsWith('%')) {
          // TODO: this disables hashtags and message links for now, remove this when they are added in
          a.setAttribute('href', 'javascript:void(0)')
          a.className = 'disabled-ref'
          return
        }

        if (!ref.isFeedId(href)) return

        a.addEventListener('click', async (e) => {
          e.preventDefault()

          const feedId = a.attributes.href.value
          // check their is a profile before attempting to load it
          const profile = await this.getMinimalProfile(feedId)
          if (!profile) {
            alert('Couldnt load the profile mentioned')
            return
          }

          // TODO: might need encoding
          this.$router.push({ name: 'profile', params: { feedId } })
        })
      })
    }
  }
}
</script>

<style lang="scss">

@import '../styles/quasar.variables.scss';

.disabled-ref {
  text-decoration: none;
  cursor: none;
  pointer-events: none;
}


.markup {
    align-self: stretch;
    padding-left: 23.3px;
    padding-right: 23.3px;
    overflow: hidden;
    font-family: 'SF Pro Text';

    h1, h2, h3, h4, h5, h6 {
        font-family: 'SF Pro Text';
        font-weight: 400;
        line-height: 2rem;
    }

    a {
        text-decoration: none;
        color: $accent;
        font-family: 'SF Pro Text';

        &:hover {
            text-decoration: underline;
        }
    }

    h1 {font-size: 1.7rem;}
    h2 {font-size: 1.5rem;}
    h3 {font-size: 1.3rem;}
    h4 {font-size: 1.2rem;}

    p {
        word-wrap: break-word;
        overflow: hidden;

        font-size: 20px;
        font-weight: 400;
        line-height: 31px;
        letter-spacing: 0px;
        text-align: left;
        font-family: 'SF Pro Text';

        img {
            // margin: 0.5rem 0;
            border-radius: 0.6rem;
            width: 100%;
            display: block;
        }

        a {
            text-decoration: none;
            color: $accent;

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
            margin: 5px;

            font-family: 'SF Pro Text';
            font-size: 20px;
            font-weight: 400;
            line-height: 31px;
            letter-spacing: 0px;
            text-align: left;

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
            font-family: 'SF Pro Text';
            font-size: 3rem;
            position: absolute;
            top: 1rem;
            left: 1.5rem;
        }
    }
}
</style>