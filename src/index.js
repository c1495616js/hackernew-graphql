const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
//1



// 2
// let links = [{
//   id: 'link-0',
//   url: 'www.howtographql.com',
//   description: 'Fullstack tutorial for GraphQL'
// },{
//   id: 'link-1',
//   url: 'www.howtographql.com',
//   description: 'Fullstack tutorial for GraphQL'
// }]

// let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
    link: (parent, {id}) => {
      return links.find(r => r.id === id)
    }
  },
  // 3
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
    // updateLink: (parent, args) => {
    //   const idx = links.findIndex(r => r.id === args.id);
    //   if(idx < 0) return null;
    //   const link = links[idx];      
    //   if(args.url) link.url = args.url;
    //   if(args.description) link.description = args.description;
    //   links[idx] = link;
    //   return link;
    // }
  
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {prisma}
})

server.start(() => console.log(`Server is running on 4000`))