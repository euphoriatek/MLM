import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/admin/services/api.service';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/services/toster.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm: any;
  isSubmitted = false;
  showAddSales: boolean = false;
  salesData: any;
  products: any[] = [];
  imageUrl: any | null = null;
  @ViewChild('dt') dt: Table | undefined;
  constructor(public route: Router, public fb: FormBuilder, public api: ApiService, public spinner: NgxSpinnerService, public toaster: ToasterService) {

  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      pv: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      category: ['1', Validators.required],
      description: ['', Validators.required],
      image:['', Validators.required],
    });
    this.getProduct();
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.spinner.show();
    const formData = new FormData();
    formData.append('name', this.productForm.get('name').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('dp', this.productForm.get('dp').value);
    formData.append('pv', this.productForm.get('pv').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('description', this.productForm.get('description').value);
    if (this.productForm.get('image').value) {
      formData.append('image', this.productForm.get('image').value);
    }
    this.api.addProduct(formData).subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.route.navigate(['/admin/product_list']);
          this.toaster.success("Successfully added product");
          this.spinner.hide();
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.isSubmitted = false;
        console.error(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        image: file
      });
      this.previewFile(file);
    }
  }

    // Method to preview the file (image)
    previewFile(file: File): void {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

  resetForm() {
    this.productForm.reset();
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  addSales() {
    this.showAddSales = true;
  }
  
  getProduct() {
    this.api.getProduct().subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.products = response.data;
          console.log(response);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
