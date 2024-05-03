import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'portfolio';

  todoList: { id: number, name: string }[] = []
  todoText: string = '';
  editMode: boolean = false;
  todoId: number = 0;
  colors = [
    '#fb5607',
    '#3a86ff',
    '#ff006e',
    '#b2ff2e',
    '#ff2eb2',
    '#77e4ff',
    '#8338ec',
    '#ffbe0b',
  ]

  ngOnInit(): void {
    let todoList = localStorage.getItem('todoList');
    if (todoList) {
      this.todoList = JSON.parse(todoList);
    }
  }
  addTodoItem() {
    if (this.todoText) {
      let todoItem = { id: this.todoList.length + 1, name: this.todoText };
      if (this.editMode) {
        let findItem = this.todoList.findIndex((item) => item.id == this.todoId);
        console.log(findItem, this.todoList);
        this.todoList[findItem].name = this.todoText;
        this.editMode = false;
      } else {
        this.todoList.push(todoItem);
      }
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    } else {
      alert('Please enter task');
    }
    this.todoText = '';
  }

  editTodoItem(itemId: number) {
    this.editMode = true;
    this.todoId = itemId;
    this.todoText = this.todoList[this.todoId - 1].name;
  }

  deleteTodoItem(itemId: number) {
    let findItem = this.todoList.findIndex((item) => item.id == itemId);
    this.todoList.splice(findItem, 1);
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
