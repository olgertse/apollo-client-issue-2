import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const macPro = {
  id: 1,
  name: 'Mac Pro',
  vendor: 'Apple',
  cpu: {
    model: 'Intel Xeon',
    clockSpeed: 3500
  }
}

const ProcessorType = new GraphQLObjectType({
  name: 'ProcessorType',
  fields: {
    model: {
      type: GraphQLString,
    },
    clockSpeed: {
      type: GraphQLInt,
    }
  }
})

const ComputerType = new GraphQLObjectType({
  name: 'ComputerType',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    cpu: {
      type: ProcessorType,
    }
  }
})

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    computer: {
      type: ComputerType,
      resolve() { return macPro }
    }
  }
});

export const schema = new GraphQLSchema({ query: QueryType });
