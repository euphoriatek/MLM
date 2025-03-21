import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent {
  @Input() data: any;
  ngOnInit(): void {
  console.log(this.data);
  }
}
