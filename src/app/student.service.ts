import { Injectable } from "@angular/core";
import { Student } from "./student";
import { HttpClient } from "@angular/common/http";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  STUDENTS: Student[] = [];

  constructor(private http: HttpClient) {}

  addStudent(newStd: Student) {
    return this.http.post(
      "https://studentinfo-8d24a-default-rtdb.firebaseio.com/" + "student.json",
      newStd
    );
  }

  getStudentData() {
    return this.http
      .get<Student[]>(
        "https://studentinfo-8d24a-default-rtdb.firebaseio.com/student.json"
      )
      .pipe(
        map(data => {
          let sArray: Student[] = [];
          for (let key in data) sArray.push(data[key]);
          return sArray;
        })
      );
  }

  clearData() {
    return this.http.delete(
      "https://studentinfo-8d24a-default-rtdb.firebaseio.com/student.json"
    );
  }
}
