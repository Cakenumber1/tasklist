import { gql } from '@apollo/client';

export const SetTaskDoneUndone = gql`
    mutation setTaskDoneUndone($id: ID!) {
        setTaskDoneUndone(id: $id) {
            id
            name
            status
    }
}`;
