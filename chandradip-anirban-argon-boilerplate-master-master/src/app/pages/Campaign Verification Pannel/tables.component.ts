import { Component, OnInit , OnDestroy } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { campaign } from "./campaign.model";
import { PostsService } from "./campaign.services";
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy{

  closeResult = '';
  public posts: campaign[] = [];
  public selectedRow;
  private postsSub: Subscription;
  public editable=[];
  constructor(private modalService: NgbModal , public postsService: PostsService) {}
  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: campaign[]) => {
        this.posts = posts;
        console.log("In Component" , this.posts);
      });
    
  }
  open(content , tableRow) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.selectedRow = {
       _id:tableRow._id ,
       cname:tableRow.cname,
       cdescription: tableRow.cdescription,
       ctgender:tableRow.ctgender, 
       ctlocation:tableRow.ctlocation,
       ctagegroup:tableRow.ctagegroup ,
       ctfav:tableRow.ctfav,
       ctcustier:tableRow.ctcustier,
       ctincomegroup:tableRow.ctincomegroup,
       cexpdate:tableRow.cexpdate,
       coupon:tableRow.coupon,
       bicon:tableRow.bicon, 
       cstatus:tableRow.cstatus,
      };
    console.log("In popup" , this.selectedRow);
  }
  
  onAccept(confirmation){
    confirmation.cstatus = "Accepted";
    this.editable=[];
    this.postsService.updatePost(
      confirmation._id,
      confirmation.cname,
      confirmation.cdescription,
      confirmation.ctgender,
      confirmation.ctlocation,
      confirmation.ctagegroup,
      confirmation.ctfav,
      confirmation.ctcustier,
      confirmation.ctincomegroup,
      confirmation.cexpdate,
      confirmation.coupon,
      confirmation.cstatus,
      confirmation.bicon,
      this.editable
    );  
      console.log("onAccept" , confirmation);
  }
  Refresh(){
    window.location.reload();
    this.editable=[];
  }
  onReject(confirmation){
    confirmation.cstatus = "Rejected";
    this.postsService.updatePost(
      confirmation._id,
      confirmation.cname,
      confirmation.cdescription,
      confirmation.ctgender,
      confirmation.ctlocation,
      confirmation.ctagegroup,
      confirmation.ctfav,
      confirmation.ctcustier,
      confirmation.ctincomegroup,
      confirmation.cexpdate,
      confirmation.coupon,
      confirmation.cstatus,
      confirmation.bicon,
      this.editable
    );
    
      console.log("onReject" , confirmation);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  onNativeChange(e ,p:string) { // here e is a native event
    if(e.target.checked){
      this.editable.push(p);
      console.log("In Edit",this.editable);
    }
    else{
      //this.editable.pop();
      this.editable = this.editable.filter(item => item !== p);
      console.log("In Edit",this.editable);
    }
  }

  ngOnDestroy() {
    
  }
  
}
