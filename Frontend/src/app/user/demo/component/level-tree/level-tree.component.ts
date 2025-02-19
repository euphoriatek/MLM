// import { Component, OnInit } from '@angular/core';
// import { TreeNode, MessageService } from 'primeng/api';
// import { ApiService } from 'src/app/user/services/api.service';

// @Component({
//   selector: 'app-level-tree',
//   templateUrl: './level-tree.component.html',
//   styleUrls: ['./level-tree.component.scss'],
//   providers: [MessageService]
// })
// export class LevelTreeComponent implements OnInit {
//   selectedNode: TreeNode | null = null;
//   visible: boolean = false;
//   node_data: any = {}; 
//   data: TreeNode[] = []; // Variable to store tree data

//   constructor(
//     private messageService: MessageService,
//     public api: ApiService
//   ) {}

//   ngOnInit(): void {
//     this.getProduct();
//   }
//   // Fetching tree data from the API
//   getProduct() {
//     this.api.getTreeUser().subscribe({
//       next: (response: any) => {
//         if (response && response.length) {
//           this.data = this.formatTree(response);
//           console.log('Formatted Tree Data:', this.data);
//         }
//       },
//       error: (err) => {
//         console.error('Error fetching tree data:', err);
//       }
//     });
//   }

//   // Format the tree structure
//   formatTree(nodes: any[]): TreeNode[] {
//     return nodes.map((node) => ({
//       label: node.data.full_name,
//       data: node.data,
//       children: node.children ? this.formatTree(node.children) : []
//     }));
//   }

//   // When a node is selected in the tree
//   onNodeSelect(event: { node: TreeNode }) {
//     this.messageService.add({
//       severity: 'success',
//       summary: 'Node Selected',
//       detail: event.node.label
//     });
//   }

//   // Handle node click to display data in the dialog
//   onNodeClick(node: any) {
//     this.node_data = node.data;
//     this.visible = true;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { TreeNode, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/user/services/api.service';

@Component({
  selector: 'app-level-tree',
  templateUrl: './level-tree.component.html',
  styleUrls: ['./level-tree.component.scss'],
  providers: [MessageService]
})
export class LevelTreeComponent implements OnInit {
  selectedNode: TreeNode | null = null;
  visible: boolean = false;
  node_data: any = {}; 
  data: TreeNode[] = []; // Variable to store tree data

  constructor(
    private messageService: MessageService,
    public api: ApiService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  // Fetching tree data from the API
  getProduct() {
    this.api.getTreeUser().subscribe({
      next: (response: any) => {
        if (response && response.length) {
          this.data = this.formatTree(response);
          console.log('Formatted Tree Data:', this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching tree data:', err);
      }
    });
  }

  // Format the tree structure
  formatTree(nodes: any[]): TreeNode[] {
    return nodes.map((node) => ({
      label: node.data.full_name,
      data: node.data,
      children: node.children ? this.formatTree(node.children) : []
    }));
  }

  // When a node is selected in the tree
  onNodeSelect(event: { node: TreeNode }) {
    this.messageService.add({
      severity: 'success',
      summary: 'Node Selected',
      detail: event.node.label
    });
  }

  // Handle node click to display data in the dialog
  onNodeClick(node: any) {
    this.node_data = node.data;
    this.visible = true;
  }
}
