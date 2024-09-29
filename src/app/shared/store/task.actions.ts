import { createAction, props } from '@ngrx/store';
import { Person, Task } from '../models/task.model';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const toggleTaskCompletion = createAction(
  '[Task] Toggle Task Completion',
  props<{ taskId: number }>()
);

export const removePerson = createAction(
  '[Task] Remove Person',
  props<{ index: number }>()
);


export const clearAddedPeople = createAction('[Task] Clear Added People');

export const addPerson = createAction(
  '[Task] Add Person',
  props<{ person: Person }>()
);
