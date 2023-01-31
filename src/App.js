import Container from 'components/Container';
import React, { Component } from 'react';
// import Counter from './components/Counter';
// import Dropdown from './components/Dropdown';
// import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
// import Form from 'components/Form';
import initialTodos from './todos.json';

import shortid from 'shortid';

import TodoEditor from 'components/TodoEditor';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

class App extends Component {
  state = {
    todos: initialTodos,
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  // todo варіант 1.
  toggleCompleted = todoId => {
    console.log(todoId);

    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       console.log('Нашли тот туду который нужно!');
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    // todo варіант 2. Через тернарний оператор
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  render() {
    const { todos } = this.state;

    // TODO: рефакторинг вычисляемых данных в методы
    const totalTodoCount = todos.length;
    const completedTodoCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );

    return (
      <Container>
        <div>
          <p>Всего заметок: {totalTodoCount}</p>
          <p>Выполнено: {completedTodoCount}</p>
        </div>
        <TodoEditor onSubmit={this.addTodo} />
        {/* <Form onSubmit={this.formSubmitHandler} /> */}

        {/* <ColorPicker options={colorPickerOptions} /> */}
        {/* <Form onSubmit={this.formSubmitHandler} /> */}
        {/* <Counter initialValue={10} /> */}

        {/* TODO: Вынести в отдельный компонент */}

        <TodoList
          todos={todos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;

//  1.19.00
