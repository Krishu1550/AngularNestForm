import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TypeDefinitionService } from "../Service/type-definition.service";
import { ResponseDefinition } from "../models/ResponseDefinition";

@Component({
  selector: "app-design-type",
  templateUrl: "./design-type.component.html",
  styleUrls: ["./design-type.component.scss"],
})
export class DesignTypeComponent implements OnInit {
  capablityForm: FormGroup;
  reponseType: ResponseDefinition;
  isRequestTypeVisible = false;
  isResponseTypeVisible = false;
  isSubmit = false;
  errorMessage = "";
  constructor(
    private fb: FormBuilder,
    private userTypeService: TypeDefinitionService
  ) {
    this.capablityForm = this.fb.group({
      capablity: ["", Validators.required],
    });
    this.capablityForm
      .get("capablity")
      .patchValue(userTypeService.getCapability);
  }

  ngOnInit(): void {
    this.reponseType = this.userTypeService.getResponseDefinition;
    console.log(this.userTypeService.IsUserDefinedTypeEmpty);
    this.isSubmit = this.userTypeService.IsUserDefinedTypeEmpty;
  }
  onValidComponent() {
    console.log("Change in component");
    console.log(this.userTypeService.IsUserDefinedTypeEmpty);
    this.isSubmit = this.userTypeService.IsUserDefinedTypeEmpty;
  }
  onChange() {
    this.userTypeService.setCapability(
      this.capablityForm.get("capablity").value
    );
  }
  onSubmit() {
    this.errorMessage = "";
    if (this.capablityForm.valid) {
      console.log(this.userTypeService.IsUserDefinedTypeEmpty);
      this.userTypeService.onSubmitUserDefinedType().subscribe((response) => {
        console.log(response);
      });
    }
    this.errorMessage += "Invalid Capablity";
  }
}
