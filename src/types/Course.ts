import { DatePickerProps } from "@mui/x-date-pickers";
import { TextFieldProps } from "@mui/material";

export type Course = {
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  age: number | null;
  mixedDate: number | null;
  id?: number;
  displayDate?: string;
  date?: Date | null;
};

export class CourseProcess {
  constructor(public course: Course[]) {}

  get getCourse(): Course[] {
    let courses = this.course.map((c) => {
      if (c.mixedDate) {
        const date = new Date(c.mixedDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
        const year = date.getFullYear();
        c.displayDate = `${month}-${day}-${year}`;
        c.date = new Date(c.mixedDate);
      }
      return c;
    });
    return courses;
  }
}

export type SideBarPropType = {
  toggleDrawer: (toggle: boolean) => void;
};

export type UrlList = {
  menuName: string;
  url: string;
};

export interface FormErrors {
  name?: string;
  gender?: string;
  company?: string;
  email?: string;
  phone?: string;
  age?: string;
  date?: string;
}

// export interface FormData {
//   id?: number;
//   name: string;
//   gender: string;
//   company: string;
//   email: string;
//   phone: string;
//   age?: number | null;
//   date?: Date | null;
//   mixedDate?: number;
// }

export interface ExtendedDatePickerProps extends DatePickerProps<Date, false> {
  renderInput: (params: TextFieldProps) => React.ReactElement;
  inputFormat: string;
}
