interface ITask {
  taskId: number,
  taskContent: string,
  status: string,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
}

export default ITask;
