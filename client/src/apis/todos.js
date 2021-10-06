import axios from 'axios';

// export default axios.create({
//   baseURL: 'https://sergi-snchz-todo.herokuapp.com/api/v1/todos/'
// });

export default axios.create({
  baseURL: 'http://localhost:5000/api/v1/todos/'
});
