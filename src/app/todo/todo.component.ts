import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todoForm = new FormGroup({ todoText: new FormControl('') });
  todoItems: Record<string, any>[] = [];
  todoItemsAll: Record<string, any>[] = [];

  constructor(private todoService: TodoService) {
    this.getAll();
  }

  async addTodoItem() {
    let data = {
      value: this.todoForm.value.todoText,
      isCompleted: false,
    };
    const result = await this.todoService.createTodo(data);
    result.subscribe({
      next: (res) => {
        console.log(res);
        this.todoItems.push(res);
      },
      error: (e) => console.error(e),
    });
    console.log(this.todoItems);
    this.todoForm.reset();
  }

  async getAll() {
    let t = await this.todoService.getAll();
    t.subscribe((data: any) => {
      this.todoItems = this.todoItemsAll = data;
    });
  }

  async deleteTodo(item: any) {
    let result = await this.todoService.deleteTodo(item._id);
    result.subscribe((t) => {
      this.todoItems.splice(this.todoItems.indexOf(item), 1);
    });
  }

  async changeCompleteStatus(item: any) {
    let isCompleted = !item.isCompleted;
    let result = await this.todoService.updateStatus(item._id, isCompleted);
    result.subscribe((t) => {
      item.isCompleted = isCompleted;
    });
  }

  setAll() {
    console.log('all hit');

    this.todoItems = this.todoItemsAll;
  }

  setComplete() {
    console.log('complete hit');
    this.todoItems = this.todoItemsAll.filter(
      (item) => item['isCompleted'] == true
    );
  }

  setIncomplete() {
    console.log('incomplete hit');

    this.todoItems = this.todoItemsAll.filter(
      (item) => item['isCompleted'] == true
    );
  }
}
