import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonFormComponent } from '../../persons/person-form/person-form.component';
import { Person } from '../../../shared/models/task.model';
import { Observable, combineLatest } from 'rxjs';
import { addPerson, addTask, clearAddedPeople, removePerson } from '../../../shared/store/task.actions';
import { selectAddedPeople } from '../../../shared/store/task.selector';
import { map, take } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonFormComponent,
  ],
})
export class TaskFormComponent {
  taskForm: FormGroup;
  addedPeople$: Observable<Person[]>;
  isFormValid$: Observable<boolean>;
  today: string = new Date().toISOString().split('T')[0];
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.addedPeople$ = this.store.select(selectAddedPeople);
    
    this.isFormValid$ = combineLatest([this.addedPeople$, this.taskForm.statusChanges]).pipe(
      map(([addedPeople, formStatus]) => formStatus === 'VALID' && addedPeople.length > 0)
    );
  }

  ngOnInit(): void { }

  submitForm(): void {
    this.addedPeople$.pipe(take(1)).subscribe(addedPeople => {
      console.log("Added people before dispatching task:", addedPeople);
      const newTask = {
        ...this.taskForm.value,
        assignedPeople: addedPeople,
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.resetForm();
    });
  }

  onPersonAdded(newPerson: Person): void {
    this.addedPeople$.pipe(take(1)).subscribe(addedPeople => {
      console.log(addedPeople);
      const isNameDuplicated = addedPeople.some(person => person.fullName === newPerson.fullName);
      console.log(isNameDuplicated);
      if (!isNameDuplicated) {
        this.store.dispatch(addPerson({ person: newPerson }));
      } else {
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }

  removePerson(index: number): void {
    console.log("Removing person at index:", index);
    this.store.dispatch(removePerson({ index }));
  }

  private resetForm(): void {
    this.taskForm.reset();
    this.store.dispatch(clearAddedPeople());
  }
}
