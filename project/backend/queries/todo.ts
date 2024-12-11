export const addTodoQuery = (text: string) =>
  `INSERT INTO todo (text) VALUES ('${text}') RETURNING *;`

export const getAllTodosQuery = () => `SELECT * FROM todo;`
