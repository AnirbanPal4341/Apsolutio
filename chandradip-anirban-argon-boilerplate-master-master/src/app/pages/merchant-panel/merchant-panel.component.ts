import { Component, OnInit, Inject } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer , SafeResourceUrl } from "@angular/platform-browser";
import { MerchantService } from 'src/app/merchant.service';


@Component({
  selector: 'app-merchant-panel',
  templateUrl: './merchant-panel.component.html',
  styleUrls: ['./merchant-panel.component.css']
})
export class MerchantPanelComponent implements OnInit {



  public mySrc="http://www.africau.edu/images/default/sample.pdf";
  GenuinePdfUrl : SafeResourceUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.mySrc);

  closeResult = '';
  public static status= 'false' ;
  a:number = -1;
  modalContent:any;
  public employees: any[] = [] ;


  constructor(private modalService: NgbModal , @Inject(DOCUMENT) document ,
  private sanitizer: DomSanitizer , private _merchantService: MerchantService) {}
  ngOnInit(): void {
    this._merchantService.getMerchant()
      .subscribe(data => this.employees = data);


  }

 public myButtons: any []=[]

 /* employees: any [] = [
    { 'UserType': '001', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['../assets/myPdf/pdf1.pdf' , 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' ]},
    { 'UserType': '002', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['http://www.orimi.com/pdf-test.pdf']},
    { 'UserType': '003', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['https://s1.q4cdn.com/806093406/files/doc_downloads/test.pdf' , 'https://drive.google.com/file/d/1T7XfiknGhPDQYLpgvexMy_ZN7FM1pGFx/preview' ]},
    { 'UserType': '004', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['https://drive.google.com/file/d/1iCXloNL_7GRj9S-Z1P70zFnHLGLMpxKD/preview']},
    { 'UserType': '005', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['https://drive.google.com/file/d/1194z7hsdIgZBlvpx29bcTBTqO2jAm1wB/preview' , 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' ]},
  ];*/






createPdf(emp){
  if(this.myButtons.length!=0){
    this.myButtons=[];
  }

  var i=1;
  for(let items in emp.PdfLinks){
    this.myButtons.push({'id':'0'+i,'name':'pdf'+i,'pdfSrc':emp.PdfLinks[i-1]});
    i=i+1;
  }
  console.log(this.myButtons);

}

  open(content, emp) {
    this.modalContent = emp
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' , size: 'lg'});
    this.createPdf(emp);
  }




  public selectedName:any;



  viewPdf(bt){
    document.getElementById("drop1").style.display='block';
    this.mySrc=bt.pdfSrc;
    this.GenuinePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mySrc);

  }

  updatestatus(status:string){
    console.log('status updating');
    this.modalContent.CurrentStatus = status;
    this._merchantService.updateMerchant(this.modalContent).subscribe();
  }



}
