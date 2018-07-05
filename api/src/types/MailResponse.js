const { GraphQLObjectType, GraphQLString } = require('graphql')

const createMailResponse = t => {
  const MailResponse = new GraphQLObjectType({
    name: 'MailResponse',
    description: t('types.receipt.description'),
    fields: () => ({
      requestId: {
        type: GraphQLString,
        description: t('types.mailResponse.messageid'),
        resolve: root => root.response,
      },
      messageId: {
        type: GraphQLString,
        description: t('types.mailResponse.statusCode'),
        resolve: root => root.messageId,
      },
      errorMessage: {
        type: GraphQLString,
        description: t('types.mailResponse.errorMessage'),
        resolve: root => {
          return root.errorMessage
        },
      },
    }),
  })

  return MailResponse
}

module.exports.default = createMailResponse
