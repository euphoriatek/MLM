import { Component, OnInit ,ElementRef} from '@angular/core';
import { TreeNode, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/user/services/api.service';
import $ from "jquery";
import { ChangeDetectorRef } from '@angular/core';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { Renderer2 } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  data:any;
  users:any;
  user:any;
  SearchForm!: FormGroup;
  fullScreenVisible: boolean;
  constructor(
    private messageService: MessageService,
    public api: ApiService,
    private cdRef: ChangeDetectorRef,
    public UserCookies:UserCookiesService,
    private renderer: Renderer2,
    public spinner:NgxSpinnerService,
    public fb:FormBuilder,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.user = this.UserCookies.getCookie('CurrentUser');
    this.SearchForm = this.fb.group({
      search: ['', [Validators.required]]
    });
  }
  ngAfterViewInit(): void {
    $(document).ready(() => {
      $(".showchield").first().trigger("click");
    });
    $(document).on("click", ".showchield", (event) => {
      this.spinner.show();
      const component = this;
      let $clickedElement = $(event.target);
      var regno = $clickedElement.attr('id');
      
      // Check if api is defined before calling the method
      if (component.api) {
        component.api.getTreeUser(regno).subscribe({
          next: (response: any) => {
            this.users = response.data;
            var data = response.data;
            $(event.currentTarget).focus().scrollTop = 999999;
            component.renderer.addClass($clickedElement[0], 'openmainh');
            component.renderer.removeClass($clickedElement[0], 'showchield');
            component.cdRef.detectChanges();
            component.cdRef.markForCheck();
            var crntclk = $clickedElement;
            var ICount = 1;
    
            // Section for adding dynamic colspan
            var ParentColSpan = (data.length * 2);
            $(crntclk).parent('div').parent('td').attr('colspan', ParentColSpan);
            $(crntclk).parent('div').find('div.addcolspan').attr('colspan', ParentColSpan);
            $(crntclk).parent('div').parent('td').parent('tr').next('tr').find('td').attr('colspan', ParentColSpan);
    
            // Clear and append new rows for child nodes
            $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').find('tr.trcontainer').html('');
            $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').find('tr.trspace').html('');
            $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').append("<tr><td colspan='" + ParentColSpan + "'><div class='line down'></div></td></tr>");
            $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').append("<tr class='trspace'></tr>");
            $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').append("<tr class='trcontainer'></tr>");
    
            // Loop through each child node and append HTML
            $.each(data, function (key, value) {
              var ForAppend = '<td class="node-container" colspan="2"><table id="tree_div" cellpadding="0" cellspacing="0" border="0" align="center">';
              
              var ImageName = "./assets/images/redimage.png";
              var color = "green";
    
              if (value.Downlinecount > 0) {
                ForAppend += '<tr class="node-cells">' +
                  '<td class="node-cell" colspan="2">' +
                  '<div class="node" style="cursor: default;">' +
                  '<a style="display:block" class="showchield" id="' + value.id + '">' +
                  '<img style="pointer-events: none;" class="tree_icon" style="border: 2px solid ' + color + ' !important;" src="' + ImageName + '" alt="' + value.mobile_no + '" id="userlink_' + value.mobile_no + '" style="background-color: white;border: 2px solid #454552 !important;" title="">' +
                  '<span style="pointer-events: none;" class="imgdowns" title="View Downline"><img src="./assets/images/down_arrowtree.svg"></span>' +
                  '</a>' +
                  '<div colspan="2" class="line down"></div>' +
                  '<div class="username" title="' + value.mobile_no + '" style="background: #454552 !important;cursor:pointer"><img style="pointer-events: none;" src="./assets/images/info-tree.svg" class="info-icon-tree"><span style="pointer-events: none;">' + value.mobile_no + '</span></div>' +
                  '</div></td></tr>';
              }
  
              // For nodes without downlines
              if (value.Downlinecount == 0) {
                ForAppend += '<tr class="node-cells">' +
                  '<td class="node-cell" colspan="2">' +
                  '<div class="node" style="cursor: default;">' +
                  '<a style="display:block" class="showchield" id="' + value.id + '">' +
                  '<img style="pointer-events: none;" class="tree_icon" style="border: 2px solid ' + color + ' !important;" src="' + ImageName + '" alt="' + value.mobile_no + '" id="userlink_' + value.mobile_no + '" style="background-color: white;border: 2px solid #454552 !important;" title="">' +
                  '</a>' +
                  '<div colspan="2" class="line down"></div>' +
                  '<div class="username" title="' + value.mobile_no + '" style="background: #454552 !important;cursor:pointer"><img style="pointer-events: none;" src="./assets/images/info-tree.svg" class="info-icon-tree"><span style="pointer-events: none;">' + value.mobile_no + '</span></div>' +
                  '</div></td></tr>';
              }
    
              $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').find('tr.trcontainer').append(ForAppend);
    
              var SpaceAddContent = "";
              if (ICount == 1 && data.length == 1) {
                SpaceAddContent = '<td class="line left">&nbsp;</td>';
                SpaceAddContent += '<td class="line right">&nbsp;</td>';
              } else if (ICount == 1) {
                SpaceAddContent = '<td class="line left">&nbsp;</td>';
                SpaceAddContent += '<td class="line right top">&nbsp;</td>';
              } else if (ICount == data.length && ICount != 1) {
                SpaceAddContent = '<td class="line left top">&nbsp;</td>';
                SpaceAddContent += '<td class="line right">&nbsp;</td>';
              } else {
                SpaceAddContent = '<td class="line left top">&nbsp;</td>';
                SpaceAddContent += '<td class="line right top">&nbsp;</td>';
              }
    
              $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').find('tr.trspace').append(SpaceAddContent);
              ICount = ICount + 1;
            });

            component.cdRef.detectChanges();
            this.spinner.hide();
          },
          error: (err) => {
            console.error("Error fetching tree data:", err);
            this.spinner.hide();
          }
        });
      } else {
        console.error("API service is undefined.");
        this.spinner.hide();
      }
    });
    $(document).on("click", ".username", (event) => {
      this.spinner.show();
      let $clickedElement = $(event.target);
      var contact = $clickedElement.attr('title');
      if(contact){
        this.api.UserDetails(contact).subscribe({
          next: (response: any) => {
            if (response.status) {
              this.spinner.hide();
              this.node_data = response.data;
              console.log(this.node_data);
              
              this.visible = true;
            }else{
              this.spinner.hide();
            }
          },
          error: (err) => {
            console.error(err);
          }
        });
      }else{
        this.spinner.hide();
      }
    });
  }

  openFullScreen() {
    this.fullScreenVisible = true;
    this.renderer.addClass(this.el.nativeElement, 'fullscreen');
    setTimeout(() => {
      this.cdRef.detectChanges();
      $(".showchield").first().trigger("click");
    }, 200);
  }
  removeFullScreen(){
    this.fullScreenVisible = false;
    this.renderer.removeClass(this.el.nativeElement, 'fullscreen');
  }
  Search() {
    if (this.SearchForm.valid) {
      this.spinner.show();
      this.api.searchTreeUser(this.SearchForm.value.search.trim()).subscribe({
        next: (response: any) => {
          this.spinner.hide();
  
          if (response && response.status) {
            this.user = response.user;
            const mobile_no = (this.user.mobile_no || "").trim();
  
            // Clear the tree div before adding the new search result
            $('#tree_div').empty(); 
  
            // Append the main user node
            const existingUserNode = $('#tree_div').find(`#userlink_${mobile_no}`);
            if (existingUserNode.length === 0) {
              let searchUserHtml = `
                <tr class="node-cells">
                  <td class="node-cell" colspan="2">
                    <div class="node" style="cursor: default;">
                      <a style="display:block" class="showchield" id="${this.user.id}">
                        <img class="tree_icon" src="https://login.progressfashion.com/images/redimage.png" 
                        alt="${mobile_no}" id="userlink_${mobile_no}" title="">
                      </a>
                      <div colspan="2" class="line down"></div>
                      <div class="username" title="${mobile_no}" style="background: #454552 !important;cursor:pointer">
                        <img src="https://login.progressfashion.com/images/info-tree.svg" class="info-icon-tree">
                        <span>${mobile_no}</span>
                      </div>
                    </div>
                  </td>
                </tr>`;
  
              // Append the search result (main user node)
              $('#tree_div').append(searchUserHtml);
            }
  
            // Process child nodes if available
            if (response.data && response.data.length > 0) {
              let ICount = 1;
              $.each(response.data, (key, value) => {
                const childMobileNo = (value.mobile_no || "").trim();
                // Ensure the child node doesn't duplicate
                const existingChildNode = $('#tree_div').find(`#userlink_${childMobileNo}`);
                if (existingChildNode.length === 0) {
                  let ForAppend = `<tr class="node-cells">
                                    <td class="node-cell" colspan="2">
                                      <div class="node" style="cursor: default;">
                                        <a style="display:block" class="showchield" id="${value.id}">
                                          <img style="pointer-events: none;" class="tree_icon" 
                                          src="https://login.progressfashion.com/images/redimage.png" 
                                          alt="${value.mobile_no}" id="userlink_${value.mobile_no}" title="">
                                        </a>
                                        <div colspan="2" class="line down"></div>
                                        <div class="username" title="${value.mobile_no}" style="background: #454552 !important;cursor:pointer">
                                          <img style="pointer-events: none;" 
                                          src="https://login.progressfashion.com/images/info-tree.svg" 
                                          class="info-icon-tree">
                                          <span style="pointer-events: none;">${value.mobile_no}</span>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>`;
                  // Append child nodes to the container
                  $('#tree_div').find('tbody').append(ForAppend);
                }
  
                // Now check if the current user has child nodes (nested records)
                if (value.data && value.data.length > 0) {
                  // Create a nested table for the child nodes
                  let nestedTableHtml = `<tr><td colspan="2"><div class="line down addcolspan"></div></td></tr>
                                         <tr class="trspace"><td class="line left">&nbsp;</td><td class="line right">&nbsp;</td></tr>
                                         <tr class="trcontainer">
                                           <td class="node-container" colspan="2">
                                             <table id="tree_div" cellpadding="0" cellspacing="0" border="0" align="center">
                                               <tbody></tbody>
                                             </table>
                                           </td>
                                         </tr>`;
  
                  // Append nested table to the parent row
                  $('#tree_div').find('.trcontainer').last().find('tbody').append(nestedTableHtml);
  
                  // Recursively append child nodes of this current node
                  $.each(value.data, (childKey, childValue) => {
                    const childMobileNo = (childValue.mobile_no || "").trim();
                    const existingNestedChildNode = $('#tree_div').find(`#userlink_${childMobileNo}`);
                    if (existingNestedChildNode.length === 0) {
                      let nestedChildHtml = `<tr class="node-cells">
                                              <td class="node-cell" colspan="2">
                                                <div class="node" style="cursor: default;">
                                                  <a style="display:block" class="showchield" id="${childValue.id}">
                                                    <img style="pointer-events: none;" class="tree_icon" 
                                                    src="https://login.progressfashion.com/images/redimage.png" 
                                                    alt="${childValue.mobile_no}" id="userlink_${childValue.mobile_no}" title="">
                                                  </a>
                                                  <div colspan="2" class="line down"></div>
                                                  <div class="username" title="${childValue.mobile_no}" 
                                                   style="background: #454552 !important;cursor:pointer">
                                                    <img style="pointer-events: none;" 
                                                    src="https://login.progressfashion.com/images/info-tree.svg" 
                                                    class="info-icon-tree">
                                                    <span style="pointer-events: none;">${childValue.mobile_no}</span>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>`;
                      // Append nested child node to the nested table
                      $('#tree_div').find('.trcontainer').last().find('tbody').append(nestedChildHtml);
                    }
                  });
                }
  
                ICount++;
              });
            }
          }
        },
        error: (err) => {
          this.spinner.hide();
          console.error(err);
        }
      });
    }
  }


}
