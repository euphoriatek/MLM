import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/admin/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/services/toster.service';
import { ConfirmDialogComponent } from 'src/app/admin/services/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  // BaseUrl = 'https://sklife.in/sk-portal/backend/public/storage/';
  BaseUrl = environment.FilebasePath;
  products: any[] = [];
  UserEditForm!: FormGroup;
  imageUrl: any | null = null;
  visible: boolean = false;
  @ViewChild('dt') dt: Table | undefined;
  constructor(public fb: FormBuilder, public api: ApiService, public spinner: NgxSpinnerService, private toaster: ToasterService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.UserEditForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]],
      dp: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]],
      // pv: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]],
      // category: ['1', Validators.required],
      description: [''],
      // image:['', Validators.required],
    });
    this.getProduct();
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getProduct() {
    this.spinner.show();
    this.api.getProduct().subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.products = [response.data];
          this.spinner.hide();
        }else{
          this.spinner.hide();
        }
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
      }
    });
  }
  resetForm() {
    this.UserEditForm.reset();
  }
  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.UserEditForm.patchValue({
  //       image: file
  //     });
  //     this.previewFile(file);
  //   }
  // }

  // Method to preview the file (image)
  // previewFile(file: File): void {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageUrl = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }
  openEditDialog(data: any): void {

    this.UserEditForm.patchValue({
      id: data.id,
      name: data.name,
      price: parseInt(data.price),
      dp: parseInt(data.dp),
      // pv: parseInt(data.pv),
      description: data.description,
    });
    this.visible = true;

  }

  EditProduct(): void {
    console.log(this.UserEditForm.value);
    if (this.UserEditForm.invalid) {
      this.UserEditForm.markAllAsTouched();
      return;
    }
    if (this.UserEditForm.valid) {
      this.spinner.show();
      const data = this.UserEditForm.value;
      console.log(data);
      this.api.updateProduct(data).subscribe({
        next: (response: any) => {
          if (response.status === true) {
            this.visible = false;
            this.UserEditForm.reset();
            this.getProduct();
            this.toaster.success("Successfully updated product");
          }
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          console.error(err);
        }
      });
    }
  }

  // Delete user
  deleteRow(data: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete?'
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.spinner.show();
        this.api.deleteProduct(data.id).subscribe({
          next: (response: any) => {
            if (response.status) {
              this.getProduct();
              this.toaster.success("Successfully delete product");
            } else {
              this.toaster.success("Successfully delete product");
            }
            this.spinner.hide();
          },
          error: (err) => {
            this.spinner.hide();
            this.toaster.success("Successfully delete product");
            console.error(err);
          }
        });
      }
    });
  }
}
