import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css']
})
export class EmpAddComponent implements OnInit {

  empForm!:FormGroup;
  constructor(private _fb:FormBuilder,
    private _serEmp:EmployeeService,
    private _dialodRef:MatDialogRef<EmpAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

  ){
    this.empForm=_fb.group({
      firstName:['',[Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName:['',[Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      email:['',[Validators.required,Validators.email]],
      dateOfBirth:['',Validators.required],
      gender:['',Validators.required],
      education:['',Validators.required],
      companyName:['',Validators.required],
      experience:['',Validators.required],
      packageAmount:['',Validators.required],
    });
  }
  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._serEmp.updateEmployee(this.data.id,this.empForm.value).subscribe(respose=>{
          console.log(respose);
          alert("Employee Updated Sucessfully")
          this._dialodRef.close(true);
  
        },error=>{
          console.error("this is error for adding employee into json server"+error);
        });
      }else{
        this._serEmp.addEmployee(this.empForm.value).subscribe(respose=>{
          console.log(respose);
          alert("Employee added Sucessfully")
          this._dialodRef.close(true);
  
        },error=>{
          console.error("this is error for adding employee into json server"+error);
        });
      }
    }
  }
}
