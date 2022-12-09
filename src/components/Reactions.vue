<template>
  <div class="row">
    <div v-for="(reaction, i) in groupedReactions" :key="i" class="reaction">
      <p>
        {{ reaction.expression }} {{ reaction.count }} <!-- TODO avatars -->
      </p>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash.groupby'

export default {
  props: {
    reactions: Array
  },
  computed: {
    groupedReactions () {
      return Object.entries(
        groupBy(
          this.reactions
            .map(reaction => {
              var r = Object.assign({}, reaction)
              if (r.expression === 'Like') r.expression = '💜'
              return r
            }),
            'expression'
          )
      )
        .map(([expression, reactions]) => {
          // TODO: fix this in the backend... why is the expression null?
          if (expression === null || expression === 'null') return null

          return {
            expression,
            reactions,
            count: reactions.length
            // TODO: avatars
          }
        })
        .filter(Boolean)
    }
  }
}
</script>
<style>
.reaction {
  height: 23px;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 5px;
  /* Input--dark */
  background: #2B1D44;
  /* Cell_inset_borders--dark */
  box-shadow: 0px 1px 0px #402B65, inset 0px 1px 0px #201633;
  border-radius: 17.5px;
}
</style>