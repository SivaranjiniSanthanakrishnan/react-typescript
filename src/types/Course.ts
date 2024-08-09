export type Course = {
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: number;
  age: number;
  mixedDate: number;
  id: number;
  date?: Date;
};

export class CourseProcess {
  constructor(public course: Course[]) {}

  get getCourse(): Course[] {
    let courses = this.course.map((c) => {
      c.date = new Date(c.mixedDate);
      return c;
    });
    return courses;
  }
}
