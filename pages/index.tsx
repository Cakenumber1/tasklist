import { useMutation, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { AddTask, GetTasks, RemoveDoneTasks } from '../calls';
import TableComponent from '../components/TableComponent';

const Home: NextPage = () => {
  const router = useRouter();
  const statusQuery = router.query.completed ? router.query.completed : undefined;
  const [status, setStatus] = useState(statusQuery ? statusQuery === 'true' : undefined);
  const { data, loading, refetch } = useQuery(
    GetTasks,
    { variables: { status } },
  );

  useEffect(() => {
    setStatus(statusQuery ? statusQuery === 'true' : undefined);
  }, [statusQuery]);

  useEffect(() => {
    refetch();
  }, [status]);

  const [addTask] = useMutation(AddTask);
  const [deleteCompleted] = useMutation(RemoveDoneTasks);

  const handleClick = (name: string) => {
    addTask({ variables: { name } })
      .then(() => refetch())
      .catch((er) => console.log(er));
  };
  const handleClick2 = () => {
    deleteCompleted()
      .then(() => refetch())
      .catch((er) => console.log(er));
  };
  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>, filter: boolean | undefined) => {
    e.preventDefault();
    if (filter !== undefined) {
      window.history.pushState(null, '', `/?completed=${String(filter)}`);
    } else {
      window.history.pushState(null, '', '/');
    }
    setStatus(filter);
  };

  return (
    <div>
      <TableComponent data={data ? data.getTasks : []} loading={loading} />
      <button type="button" onClick={() => handleClick('task')}>add</button>
      <button type="button" onClick={handleClick2}>delete</button>
      <button type="button" onClick={(e) => handleFilter(e, true)}>Done</button>
      <button type="button" onClick={(e) => handleFilter(e, false)}>UnDone</button>
      <button type="button" onClick={(e) => handleFilter(e, undefined)}>All</button>
    </div>
  );
};

export default Home;
