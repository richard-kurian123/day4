import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {

  public empForm!:FormGroup;

  public localData:any;

  public combRes:any=[];

  public projects:any=[];
  public employees:any=[];
  public employeeProject:any=[];
  public employeeDetails:any=[];

  public EmpData:any=[];

  constructor(private formBuilder:FormBuilder,private dataService:DataService) { }

  ngOnInit(): void {

    this.getEmpForm();

    this.gettingData();

    // this.datMan();
    // console.log('printing new',this.employees);
    this.gettingOne();
    console.log("emp data second time",this.EmpData);

    this.localData;

  }


  public getEmpForm(){

    this.empForm =  this.formBuilder.group({
      name:['',[Validators.required]],
      designation:['',[Validators.required]],
  
      department:['',[Validators.required]],

        project:this.formBuilder.array([
          new FormControl(null,[Validators.required])
        ]),


      })
  }

  addProject(){

    const control = new FormControl(null,[Validators.required]);
    (<FormArray>this.empForm.get('project')).push(control);
  }

  get  projectControls(){
    return (<FormArray>this.empForm.get('project')).controls;
  }

  public onSubmit(){
    const formValues = this.empForm.value;

    console.log(formValues);

  //   localStorage.setItem(this.empForm.controls['name'].value,JSON.stringify(formValues));

  //  this.localData = localStorage.getItem(this.empForm.controls['name'].value);
  //  console.log("local strorage retrieve",this.localData)


  this.employees.forEach((item:any)=>{

    if(item.name===this.empForm.controls['name'].value){
      
      Object.assign(item,{designation:this.empForm.controls['designation'].value,
          
      department:this.empForm.controls['department'].value,

      projects:this.empForm.controls['project'].value
    
    })
    }

  })

  console.log("after object. assign",this.employees);
      localStorage.setItem(this.empForm.controls['name'].value,JSON.stringify(this.employees));
         this.localData = localStorage.getItem(this.empForm.controls['name'].value);
          //  console.log("local strorage retrieve",this.localData)
      

  }

  public gettingOne(){
    this.dataService.getOne().subscribe((data:any)=>{

      // this.EmpData.push(data);

      this.EmpData=[...data]
      
      console.log("EMp data",this.EmpData)

    })
  }

  public gettingData(){

    this.dataService.getData().subscribe((results:any)=>{
      this.employees=results[0];

      this.employees=this.employees.employees;
      this.projects=results[1];
      this.projects=this.projects.projects;
      this.employeeProject=results[2];
      this.employeeProject= this.employeeProject.employeeProject
      this.employeeDetails=results[3];

      this.employeeDetails=this.employeeDetails.employeeDetails;

      this.combRes =results;

      console.log("combined res",this.combRes);
      console.log("employees",this.employees);
      console.log("projects",this.projects);
      console.log("employee Projects",this.employeeProject);
      console.log("employee details",this.employeeDetails);
    })

  }

  // public datMan(){
  //   // this.employees.forEach((item:any)=>{
  //   //   console.log("individual item",item.name);
  //   // })
  //   console.log('printing new',this.employees)
  // }


}
