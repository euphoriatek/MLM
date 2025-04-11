import { Component, OnInit ,ElementRef} from '@angular/core';
import { TreeNode, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/user/services/api.service';
import $ from "jquery";
import { ChangeDetectorRef } from '@angular/core';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { Renderer2 } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/services/toster.service';
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
  currentLevel: number = 0;
  SearchForm!: FormGroup;
  fullScreenVisible: boolean;
  level = 1;
  constructor(
    private messageService: MessageService,
    public api: ApiService,
    private cdRef: ChangeDetectorRef,
    public UserCookies:UserCookiesService,
    private renderer: Renderer2,
    public spinner:NgxSpinnerService,
    public fb:FormBuilder,
    private el: ElementRef,
    public toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.user = this.UserCookies.getCookie('CurrentUser');
    this.SearchForm = this.fb.group({
      search: ['', [Validators.required]]
    });
    this.currentLevelCount();
  }

  ngOnDestroy() {
    console.log('Component destroyed');
    this.removeTreeEvents();
  }

  removeTreeEvents() {
    $(document).off("click", ".showchield");
    $(document).off("click", ".username");
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
            // $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').append("<tr><td colspan='" + ParentColSpan + "'><div class='line down'></div></td></tr>");
            $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').append(
              "<tr><td colspan='" + ParentColSpan + "'>" + (data.length > 0 ? "<div class='line down'></div>" : "") + "</td></tr>"
            );
            $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').append("<tr class='trspace'></tr>");
            $(crntclk).parent('div').parent('td').parent('tr').parent('tbody').append("<tr class='trcontainer'></tr>");
    
            // Loop through each child node and append HTML
            $.each(data, function (key, value) {
              var ForAppend = '<td class="node-container" colspan="2"><table id="tree_div" cellpadding="0" cellspacing="0" border="0" align="center">';
              
              var ImageName = "./assets/images/redimage.png";
              var color = "red";
              var nodeClass = "";
              if($clickedElement.attr('level')){
                var number = parseInt($clickedElement.attr('level'));
                number = number + 1;
                var currentImage = `./assets/images/levels/level-${number}.png`;
              }
              if (value.is_active == 1) {
                color = "green";
                ImageName = "./assets/images/greenimage.png";
                nodeClass = "activeImage";
              } else {
                nodeClass = "inactiveImage";
              }
    
              if (value.Downlinecount > 0) {
                ForAppend += '<tr class="node-cells">' +
                  '<td class="node-cell" colspan="2">' +
                  '<div class="node" style="cursor: default;">' +
                  '<a style="display:block" class="showchield" id="' + value.id + '">' +
                  '<img style="pointer-events: none;" class="tree_icon ' + nodeClass +'" style="border: 2px solid ' + color + ' !important;" src="' + currentImage + '" alt="' + value.mobile_no + '" id="userlink_' + value.mobile_no + '" style="background-color: white;border: 2px solid #454552 !important;" title="">' +
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
                  '<img style="pointer-events: none;" class="tree_icon ' + nodeClass +'" style="border: 2px solid ' + color + ' !important;" src="' + currentImage + '" alt="' + value.mobile_no + '" id="userlink_' + value.mobile_no + '" style="background-color: white;border: 2px solid #454552 !important;" title="">' +
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
            component.level++;
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
          if(response.status){
          this.user = response.user;
          $(document).off("click", ".showchield");
          $(document).off("click", ".username");
          let rows = document.querySelectorAll('#tree_div tr');
          rows.forEach((row, index) => {
              if (index > 0) {
                  row.remove();
              }
          });
          let existingAnchor = document.querySelector('#tree_div .openmainh');

          if (existingAnchor) {
              existingAnchor.classList.add('showchield');
          }
          this.ngAfterViewInit();
          }else{
            this.user = null;
            this.toaster.error(response.message);
            window.location.reload();
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
  resetSearch() {
    const searchValue = this.SearchForm.value.search;
    if (searchValue && searchValue.trim() !== '') {
      this.SearchForm.reset();
      window.location.reload();
    } else {
      this.SearchForm.reset();
    }
  }
  currentLevelCount() {
    this.spinner.show();
    this.api.currentLevelCount().subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.users = response.data;
          this.currentLevel = this.users.current_level;
        } else {
          this.spinner.hide();
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
      }
    });
  }

}
