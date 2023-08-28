import { Component, OnInit } from "@angular/core";
import { TypeDefinitionService } from "../../Service/type-definition.service";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { RequestDefinition } from "../../models/RequestDefinition";

@Component({
  selector: "app-request-type",
  templateUrl: "./request-type.component.html",
  styleUrls: ["./request-type.component.scss"],
})
export class RequestTypeComponent implements OnInit {
  requestTypes: RequestDefinition[] = [];
  requestTypeForm: FormGroup;
  isEnable = true;
  constructor(
    private userType: TypeDefinitionService,
    private fb: FormBuilder
  ) {
    this.requestTypeForm = this.fb.group({
      classes: this.fb.array([]),
    });
    this.requestTypeForm
      .get("classes")
      .patchValue(this.userType.getRequestDefinition);
    console.log(this.requestTypeForm);
  }

  addNewClass() {
    const classesArray = this.requestTypeForm.get("classes") as FormArray;
    classesArray.push(
      this.fb.group({
        className: "",
        properties: this.fb.array([]),
      })
    );
  }
  addNewProperty(classIndex: number) {
    const classesArray = this.requestTypeForm.get("classes") as FormArray;
    const propertiesArray = classesArray
      .at(classIndex)
      .get("properties") as FormArray;
    propertiesArray.push(
      this.fb.group({
        propertyName: "",
        propertyType: "",
      })
    );
  }

  removeClass(classIndex: number) {
    const classesArray = this.requestTypeForm.get("classes") as FormArray;
    classesArray.removeAt(classIndex);
  }

  removeProperty(classIndex: number, propertyIndex: number) {
    const classesArray = this.requestTypeForm.get("classes") as FormArray;
    const propertiesArray = classesArray
      .at(classIndex)
      .get("properties") as FormArray;
    propertiesArray.removeAt(propertyIndex);
  }

  onSubmit() {
    // Access the form data when it is submitted
    if (this.requestTypeForm.valid) {
      const formData = this.requestTypeForm.value;
      this.requestTypes = formData;
      this.isEnable = false;
      // Save data into userDefinedType
      this.userType.setRequestDefinition(formData.classes);
    }
  }
  enterEditMode() {
    this.isEnable = true;
  }
  ngOnInit(): void {
    console.log(this.userType.getRequestDefinition);
    this.initializeForm(this.userType.getRequestDefinition);
  }

  initializeForm(requestDefinition: RequestDefinition[] | null): void {
    // Initialize the form controls with default values
    this.requestTypeForm = this.fb.group({
      classes: this.fb.array([]),
    });

    if (requestDefinition) {
      if (Array.isArray(requestDefinition)) {
        // Handle array of RequestDefinition
        requestDefinition.forEach((requestDef) => {
          this.patchForm(requestDef);
        });
      } else {
        // Patch the form value with the data from the service
        this.patchForm(requestDefinition);
      }
    }
  }

  patchForm(requestDefinition: RequestDefinition): void {
    // Get the classes FormArray
    const classesFormArray = this.requestTypeForm.get("classes") as FormArray;

    // Create a new class FormGroup
    const classFormGroup = this.fb.group({
      className: requestDefinition.className,
      properties: this.fb.array([]),
    });

    // Get the properties FormArray for the current class
    const propertiesFormArray = classFormGroup.get("properties") as FormArray;

    // Patch the properties FormArray with data from the service
    requestDefinition.properties.forEach((propertyData) => {
      const propertyFormGroup = this.fb.group({
        propertyName: propertyData.propertyName,
        propertyType: propertyData.propertyType,
      });
      propertiesFormArray.push(propertyFormGroup);
    });

    // Push the class FormGroup to the classes FormArray
    classesFormArray.push(classFormGroup);
  }
}
