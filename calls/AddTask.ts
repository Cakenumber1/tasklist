import { gql } from '@apollo/client';

export const AddTask = gql`
    mutation addTask($name: String!) {
        addTask(name: $name) {
            id
            name
            status
        }
    }`;
