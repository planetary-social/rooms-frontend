import gql from 'graphql-tag'

const THREAD_ATTRS = gql`
fragment ThreadAttrs on Thread {
  id
  text
  timestamp
  author {
    id
    image
    name
  }
  votes {
    expression
    author {
      id
      image
      name
    }
  }
}
`

const GET_THREAD = gql`
  # fragment
  ${THREAD_ATTRS}
  
  query($msgId: ID!) {
    getThread(msgId: $msgId) {
      ...ThreadAttrs

      root {
        ...ThreadAttrs
      }
      replies {
        ...ThreadAttrs
      }
    }
  }
`

const GET_ROOM_THREADS = gql`
  # fragment
  ${THREAD_ATTRS}

  query($cursor: String, $limit: Int) {
    getThreads(limit: $limit, cursor: $cursor) {
      ...ThreadAttrs

      # TODO: check if the full thread is needed here
      root {
        ...ThreadAttrs
      }

      replies {
        ...ThreadAttrs
      }
    }
  }
`

const GET_PROFILE_THREADS = gql`
  # fragment
  ${THREAD_ATTRS}

  query($feedId: ID, $limit: Int, $cursor: String) {
    getThreads(feedId: $feedId, limit: $limit, cursor: $cursor) {
      ...ThreadAttrs

      root {
        ...ThreadAttrs
      }

      replies {
        ...ThreadAttrs
      }
    }
  }
`

export {
  GET_ROOM_THREADS,
  GET_THREAD,
  GET_PROFILE_THREADS
}
