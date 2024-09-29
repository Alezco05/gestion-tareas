export interface Skill {
    name: string;
  }
  
  export interface Person {
    fullName: string;
    age: number;
    skills: Skill[];
  }
  
  export interface Task {
    id: number;
    inProgress: any;
    title: string;
    dueDate: string;
    completed: boolean;
    people: Person[];
    assignedPeople: any[];
  }
  