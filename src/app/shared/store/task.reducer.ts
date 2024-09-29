import { createReducer, on } from '@ngrx/store';
import { addTask, toggleTaskCompletion, addPerson, removePerson, clearAddedPeople } from './task.actions';
import { Person, Task } from '../models/task.model';

export interface TaskState {
  tasks: Task[];
  addedPeople: Person[];
}

export const initialState: TaskState = {
  tasks: [],
  addedPeople: [],
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => {
    console.log(task)
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  }
  ),
  on(toggleTaskCompletion, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ),
  })),
  on(addPerson, (state, { person }) => ({
    ...state,
    addedPeople: [...state.addedPeople, person],
  })),
  on(removePerson, (state, { index }) => {
    console.log('Estado antes de la eliminación:', state.addedPeople); 
    const newAddedPeople = state.addedPeople.filter((_, i) => i !== index); 
    console.log('New added people after removal:', newAddedPeople); 
    return {
      ...state,
      addedPeople: newAddedPeople,
    };
  }),

  on(clearAddedPeople, (state) => ({
    ...state,
    addedPeople: [],
  }))
);
