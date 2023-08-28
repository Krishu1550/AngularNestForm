import { Component, Input, OnInit } from "@angular/core";
import { ResponseDefinition } from "../../models/ResponseDefinition";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-response-type",
  templateUrl: "./response-type.component.html",
  styleUrls: ["./response-type.component.scss"],
})
export class ResponseTypeComponent implements OnInit {
  @Input() responseType: ResponseDefinition = {
    className: "",
    properties: [],
    nestedClass: [],
  };
  isList = false;
  submittedResponseType: ResponseDefinition | null = null;
  isEnable: boolean = true;
  @Input() isNested!: boolean;

  requestTypeForm: FormGroup;
  constructor() {}
  ngOnInit(): void {
    console.log("Hello");
    if (this.isList) {
      this.responseType.className = "List." + this.responseType.className;
    }
  }

  addProperty() {
    this.responseType.properties.push({
      propertyName: "",
      propertyType: "",
    });
  }

  addNestedClass() {
    this.responseType.nestedClass.push({
      className: "",
      properties: [],
      nestedClass: [],
    });
  }

  isClassEmpty(classData: ResponseDefinition): boolean {
    return (
      classData.className.trim() === "" ||
      classData.properties.some(
        (property) =>
          property.propertyName.trim() === "" ||
          property.propertyType.trim() === ""
      )
    );
  }

  onSubmit() {
    if (!this.isClassEmpty(this.responseType)) {
      const json = JSON.stringify(this.responseType, null, 2);
      this.submittedResponseType = this.responseType;
      this.isEnable = false;
      console.log(json);
    }
  }

  removeNestedClass(index: number) {
    this.responseType.nestedClass.splice(index, 1);
  }

  removeProperty(index: number) {
    this.responseType.properties.splice(index, 1);
  }
  onIsList() {
    console.log(!this.isList);
    if (!this.isList) {
      this.responseType.className = "List." + this.responseType.className;
    }
  }
  enterEditMode() {
    this.isEnable = true;
    if (this.submittedResponseType) {
    }
  }
}
