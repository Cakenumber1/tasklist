import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type  Task
    {
        id: ID!
        name: String!
        status: Boolean!
    }

    type  Query {
        getTasks(status: Boolean): [Task]
    }
    type Mutation {
        setTaskDoneUndone(id: ID!): Task!
        addTask(name: String!): Task!
        removeDoneTasks: Boolean!
    }
`;
