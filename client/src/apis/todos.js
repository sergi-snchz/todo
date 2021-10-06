import axios from 'axios';

// export default axios.create({
//   baseURL: 'https://sergi-snchz-todo.herokuapp.com/api/v1/todos/'
// });

export default axios.create({
  baseURL: '/api/v1/todos/'
});
