const { GraphQLServer } = require('graphql-yoga')

//1



// 2
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},{
  id: 'link-1',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
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
    post:(parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link;
    },
    updateLink: (parent, args) => {
      const idx = links.findIndex(r => r.id === args.id);
      if(idx < 0) return null;
      const link = links[idx];      
      if(args.url) link.url = args.url;
      if(args.description) link.description = args.description;
      links[idx] = link;
      return link;
    }
  
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on 4000`))