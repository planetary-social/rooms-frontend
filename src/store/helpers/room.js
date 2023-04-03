import gql from 'graphql-tag'

const GET_MY_ROOM = gql`
  query {
    room: getMyRoom {
      name
      description
      multiaddress
      url

      members {
        id
        name
        image
        description
        ssbURI
      }
    }
  }
`

const GET_ROOM_INVITE_CODE = gql`
  query {
    inviteCode: getInviteCode
  }
`

export {
  GET_MY_ROOM,
  GET_ROOM_INVITE_CODE
}