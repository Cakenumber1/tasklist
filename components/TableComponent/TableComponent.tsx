import { useMutation } from '@apollo/client';
import {
  Box,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

import { SetTaskDoneUndone } from 'calls';
import { useStyles } from './style';

type ITask = {
  id: string,
  name: string,
  status: boolean,
};

type Props = {
  data: ITask[] | undefined,
  loading: boolean
};

const TableComponent: React.FC<Props> = ({
  data, loading,
}) => {
  const [newTask] = useMutation(SetTaskDoneUndone);
  const classes = useStyles();
  const tasks = data;
  const handleClick = (id: string) => {
    newTask({ variables: { id } })
      .then((r) => console.log(r))
      .catch((er) => console.log(er));
  };
  return (
    <TableContainer className={classes.tableContainer} component={Box}>
      <Table aria-label="table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.headTableCell} align="center">
              {'>'}
            </TableCell>
            <TableCell className={classes.headTableCell} sx={{ width: '100%' }} align="center">
              What needs to be done?
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.length && !loading ? tasks!.map((post) => (
            <TableRow
              key={post.id}
            >
              <TableCell className={classes.tableCell}>
                <Checkbox checked={post.status} onClick={() => handleClick(post.id)} />
              </TableCell>
              <TableCell className={classes.tableCell}>{post.name}</TableCell>
            </TableRow>
          )) : <TableRow />}
        </TableBody>
      </Table>
      {loading && <CircularProgress sx={{ width: '100%', height: '100%' }} />}
      {!tasks?.length && !loading && <Box sx={{ width: '100%', textAlign: 'center' }}>Nothing</Box>}
    </TableContainer>
  );
};

export default TableComponent;
