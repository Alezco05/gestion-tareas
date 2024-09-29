import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllTasks } from '../../../shared/store/task.selector';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../../shared/models/task.model';
import { toggleTaskCompletion } from '../../../shared/store/task.actions';

@Component({
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, TaskFormComponent],
})
export class TaskListComponent {
  tasks$: Observable<any[]> = this.store.select(selectAllTasks);
  selectedFilter: string = 'all';
  filters = [
    { label: 'Todos', value: 'all' },
    { label: 'Pendientes', value: 'pending' },
    { label: 'En Proceso', value: 'inProgress' },
    { label: 'Completadas', value: 'completed' },
  ];

  constructor(private store: Store) {}

  filterTasks(status: string): void {
    this.selectedFilter = status;
  }

  get filteredTasks$(): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => {
        switch (this.selectedFilter) {
          case 'pending':
            return tasks.filter(task => !task.completed && !task.inProgress);
          case 'inProgress':
            return tasks.filter(task => !task.completed && task.inProgress);
          case 'completed':
            return tasks.filter(task => task.completed);
          default:
            return tasks;
        }
      })
    );
  }
  completeTask(taskId: number): void {
    this.store.dispatch(toggleTaskCompletion({ taskId }));
  }
}
