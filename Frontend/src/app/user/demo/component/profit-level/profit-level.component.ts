import { Component ,ViewChild} from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-profit-level',
  templateUrl: './profit-level.component.html',
  styleUrls: ['./profit-level.component.scss']
})
export class ProfitLevelComponent {
  mlmLevel: any;
  @ViewChild('dt') dt: Table | undefined;
  constructor(private api: ApiService, public toaster: ToasterService, public spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.getProfitLevel();
  }
  getProfitLevel(): void {
    this.spinner.show();
    this.api.getProfitLevel().subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.mlmLevel = response.data;
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
