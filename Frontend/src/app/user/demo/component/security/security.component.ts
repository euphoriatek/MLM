import { Component, ViewChild } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Table } from 'primeng/table';
@Component({
  selector: "app-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.scss"],
})
export class SecurityComponent {
  changePasswordform: FormGroup;
  loginHistory: any[] = [];
  form: FormGroup;
  filteredHistory: any[] = [];

  @ViewChild('dt') dt: Table | undefined;

  constructor(private fb: FormBuilder, private api: ApiService, public toaster: ToasterService, public spinner: NgxSpinnerService) { 
    this.form = this.fb.group({
      fromDate: [null],
      toDate: [null]
    });
  }

  ngOnInit(): void {
    this.changePasswordform = this.fb.group(
      {
        password: ['', [Validators.required]],
        new_password: [ "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$"),
          ],
        ],
        confirm_password: ["", Validators.required],
      },
      { validators: passwordMatchValidator() }
    );
    this.getLoginHistory();
  }
  changePassword() {
    if (this.changePasswordform.invalid) {
      this.changePasswordform.markAllAsTouched();
      return;
    }

    this.spinner.show();
    const data = this.changePasswordform.value;

    this.api.verifyOldPassword(data).subscribe({
      next: (response: any) => {
        this.spinner.hide();
        if (response.status) {
          this.toaster.success(response.message);
          this.changePasswordform.reset();
        } else {
          this.toaster.error(response.message);
        }
      },
      error: (err) => {
        this.toaster.error(err.error.message);
        this.spinner.hide();
      }
    });
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getLoginHistory() {
    const fromDate = this.form.value.fromDate ? new Date(this.form.value.fromDate).toISOString().split('T')[0] : null;
    const toDate = this.form.value.toDate ? new Date(this.form.value.toDate).toISOString().split('T')[0] : null;
  
    this.api.getLoginHistory(fromDate, toDate).subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.loginHistory = response.data;
          this.filteredHistory = [...this.loginHistory];
          
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
  filterByDate() {
    this.getLoginHistory();

    const from = this.form.value.fromDate ? new Date(this.form.value.fromDate).setHours(0, 0, 0, 0) : null;
    const to = this.form.value.toDate ? new Date(this.form.value.toDate).setHours(23, 59, 59, 999) : null;

    if (!from && !to) {
      this.filteredHistory = [...this.loginHistory];
      return;
    }

    this.filteredHistory = this.loginHistory.filter(record => {
      const recordDate = new Date(record.date).setHours(0, 0, 0, 0);
      return (!from || recordDate >= from) && (!to || recordDate <= to);
    });
  }
  resetForm() {
    this.form.reset();
    this.getLoginHistory();
  }
}

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get("new_password")?.value;
    const confirmPassword = control.get("confirm_password")?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      control.get("confirm_password")?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  };
}
