import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  typesOfShoes: Record<string, any>[] = [{ value: 0 }];

  add(event: any) {
    event.value += 1;
    console.log;
  }

  remove(item: any) {
    item.value -= 1;
  }

  addItem() {
    this.typesOfShoes.push({ value: 0 });
  }

  delete(item: any) {
    this.typesOfShoes.splice(this.typesOfShoes.indexOf(item), 1);
  }
}
