import {NgModule} from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../../shared/shared.module";
import {
  DashboardCustomerContainerComponent
} from "./container/dashboard-customer-container/dashboard-customer-container.component";
import {FavoritesComponent} from './components/favorites/favorites/favorites.component';
import {MatListModule} from "@angular/material/list";
import {ProfileDataComponent} from '../../shared/profile-edit/profile-data/profile-data.component';
import {
  ProfileCustomerContainerComponent
} from './container/profile-customer-container/profile-customer-container.component';
import {MatTabsModule} from "@angular/material/tabs";
import {CreditCardComponent} from "./components/profile/credit-card/credit-card.component";
import {
  CustomersUpcomingRidesComponent
} from './components/customers-upcoming-rides/customers-upcoming-rides.component';
import {
  CustomerRatingsDashboardComponent
} from './components/customer-ratings-dashboard/customer-ratings-dashboard.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RateDialogComponent} from './components/rate-dialog/rate-dialog.component';
import {NgxPayPalModule} from "ngx-paypal";
import {PaymentComponent} from "./components/payment/payment.component";

@NgModule({
  declarations: [
    DashboardCustomerContainerComponent,
    FavoritesComponent,
    ProfileCustomerContainerComponent,
    CreditCardComponent,
    CustomersUpcomingRidesComponent,
    CustomerRatingsDashboardComponent,
    RateDialogComponent,
    PaymentComponent,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatMenuModule,
    SharedModule,
    MatListModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    NgxPayPalModule,
  ],
  exports: [
    DashboardCustomerContainerComponent,
    ProfileDataComponent,
    ProfileCustomerContainerComponent,
    PaymentComponent,
  ],
})
export class CustomerModule {
}
