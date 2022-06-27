interface ITaskDb {
  task_id: number,
  task_content: string,
  status: string,
  user_id: number,
  created_at: Date,
  updated_at: Date,
}

export default ITaskDb;
