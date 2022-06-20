type ITask = {
  id: string,
  name: string,
  status: boolean
};
let data:ITask[] = [];
export const resolvers = {
  Query: {
    getTasks: (_: any, params?: { status: boolean }) => {
      if (params && params.status !== undefined) {
        return data.filter((el: ITask) => el.status === params.status);
      }
      return data;
    },
  },
  Mutation: {
    setTaskDoneUndone: (_: any, params: { id: string }) => {
      const el = data.findIndex((e) => e.id === params.id);
      data[el].status = !data[el].status;
      return data[el];
    },
    addTask: (_: any, params: { name: string }) => {
      const newTask = {
        id: (+new Date()).toString(36),
        name: params.name,
        status: false,
      };
      data.push(newTask);
      return newTask;
    },
    removeDoneTasks: () => {
      data = data.filter((el: ITask) => !el.status);
      return true;
    },
  },
};
