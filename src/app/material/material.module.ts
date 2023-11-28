import { NgModule } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs';
import { MatNativeDateModule, MatOption, MatOptionModule, MatPseudoCheckbox } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import {MatStepperModule} from '@angular/material/stepper';
import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCard, MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

const MaterialComponents= [
  MatTabsModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  MatStepperModule,
  MatExpansionModule,
  MatCardModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatMenuModule,
  MatOptionModule,
  MatSelectModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }

