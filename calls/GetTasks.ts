import { gql } from '@apollo/client';

export const GetTasks = gql`
    query getTasks($status: Boolean) {
        getTasks(status: $status) {
            id
            name
            status
        }
    }`;
