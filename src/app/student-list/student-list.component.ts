
import { Component, OnInit} from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit{

  studentList: Student[] = [];
  nextID: number = 0;
  sName: string;
  sAge: number

  constructor(private stdService: StudentService){
  }

  ngOnInit(){
   this.fetchData();//calling helper method.
  }

  addNewStudent(){
    const newStudent: Student = {
      id: ++this.nextID,
      name: this.sName,
      age: this.sAge
    }
    this.stdService.addStudent(newStudent).subscribe(
      data => this.fetchData() //refetching data to reset studentList
    );

  }

  onClearData(){
   this.stdService.clearData().subscribe(
     data => {
       this.fetchData(); //refetch the data to reset studentList
       this.nextID = 0; //reset the nextID
     }
   );
  }

  //helper method
  fetchData(){
    this.stdService.getStudentData().subscribe(
      data => this.studentList = data
    );
  }
}
