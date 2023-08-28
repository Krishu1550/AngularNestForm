import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignTypeComponent } from "./design-type.component";

const routes: Routes = [
  {
    path: "",
    component: DesignTypeComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignTypeRoutingModule {}
