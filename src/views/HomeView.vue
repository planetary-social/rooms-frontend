<template>
  <h2>Hello {{ result?.getProfile?.name ?? 'world' }}</h2>
</template>

<script setup>
  import { useQuery } from '@vue/apollo-composable'
  import gql from 'graphql-tag'

  const mixId = '@DIoOBMaI1f0mJg+5tUzZ7vgzCeeHh8+zGta4pOjc+k0=.ed25519'
 
  const { result } = useQuery(gql`
    query {
      getProfile(id: "${mixId}") {
        id
        name
      }
    }
  `)
</script>