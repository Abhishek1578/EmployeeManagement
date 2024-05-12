import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddComponent } from './emp-add/emp-add.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title='BookManagementSystem'
  displayedColumns: string[] = [
  'id',
   'firstName',
   'lastName',
   'email', 
   'dateOfBirth',
   'gender',
   'education',
   'companyName',
   'experience',
   'packageAmount',
   'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,private _serEmp:EmployeeService){}

  openAddEditEmpForm(){
    const dialogRef=this._dialog.open(EmpAddComponent);
    dialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.getEmployeeData();
      }
    });
  }

  ngOnInit(): void {
      this.getEmployeeData();
  }
  getEmployeeData(){
    return this._serEmp.getEmployee().subscribe(response=>{
      this.dataSource=new MatTableDataSource(response);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;


    },error=>{
      console.log("error during get data from json server"+error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
    this._serEmp.deleteEmployee(id).subscribe(res=>{
      alert("Employee deleted!!");
      this.getEmployeeData();
    },error=>{
      console.error("error during deleted employee"+error);
    })
  }
  openEditForm(data:any){
    const dialogRef=this._dialog.open(EmpAddComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.getEmployeeData();
      }
    });
  }
}
