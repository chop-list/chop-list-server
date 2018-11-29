const {GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLInt} = require('graphql');
const UserType = require("./types/user");
const chopListDb = require("../database/chopListDb");

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            description: "User data identified by a key",
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(obj, args, {msPool}) {
                return chopListDb(msPool).getUser(args.id);
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQueryType
});