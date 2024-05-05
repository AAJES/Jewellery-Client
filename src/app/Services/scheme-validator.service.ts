import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { MainService } from '../Components/main.service';

@Injectable({
  providedIn: 'root'
})
export class SchemeValidatorService {

  constructor(private mainService: MainService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((schemeName: string) => {
          if (!schemeName) {
            return of(null);
          }
          return this.mainService.checkSchemeNameAvailability(schemeName).pipe(
            map((isAvailable: boolean) => (isAvailable ? null : { schemeNameTaken: true })),
            catchError(() => of(null))
          );
        })
      );
    };
  }
}
