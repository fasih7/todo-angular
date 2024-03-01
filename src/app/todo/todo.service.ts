import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'http://localhost:3000/todo';
  constructor(private http: HttpClient) {}

  async getAll() {
    return this.http.get(this.baseUrl);
  }

  async createTodo(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  async updateStatus(id: string, isCompleted: boolean) {
    return this.http.patch(`${this.baseUrl}/${id}`, { isCompleted });
  }

  async deleteTodo(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
