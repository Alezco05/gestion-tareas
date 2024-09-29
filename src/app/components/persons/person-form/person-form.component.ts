import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PersonFormComponent {
  personForm: FormGroup;
  @Output() personAdded = new EventEmitter<any>(); 

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("^[a-zA-ZÀ-ÿ' ]+$"),
        ],
      ],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      skills: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  get skills() {
    return this.personForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  submitForm() {
    if (this.personForm.valid) {
      const newPerson = this.personForm.value;
      this.personAdded.emit(newPerson);

      this.personForm.reset();
      this.skills.clear();
      this.addSkill();
    }
  }

  isFormValid() {
    return this.personForm.valid && this.skills.length > 0;
  }
}
