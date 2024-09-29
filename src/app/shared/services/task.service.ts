import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Task {
  inProgress: any;
  id: number;
  name: string;
  deadline: string;
  completed: boolean;
  people: Person[];
}


interface Person {
  fullName: string;
  age: number;
  skills: string[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: Task) {
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...tasks, task]);
  }

  toggleTaskCompletion(taskId: number) {
    const tasks = this.tasksSubject.getValue().map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    this.tasksSubject.next(tasks);
  }

}
