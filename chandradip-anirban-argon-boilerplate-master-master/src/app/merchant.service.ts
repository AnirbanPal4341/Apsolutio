import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployee } from './merchant';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {


 /* getMerchant(){
    return [
      { 'UserType': '001', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['../assets/myPdf/pdf1.pdf' , 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' ]},
    { 'UserType': '002', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['http://www.orimi.com/pdf-test.pdf']},
    { 'UserType': '003', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['https://s1.q4cdn.com/806093406/files/doc_downloads/test.pdf' , 'https://drive.google.com/file/d/1T7XfiknGhPDQYLpgvexMy_ZN7FM1pGFx/preview' ]},
    { 'UserType': '004', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['https://drive.google.com/file/d/1iCXloNL_7GRj9S-Z1P70zFnHLGLMpxKD/preview']},
    { 'UserType': '005', 'MerchantName': 'Alpha', 'BranchName': '05/17/2015', 'Location': 37, 'CurrentStatus': 37 ,
     'PdfLinks': ['https://drive.google.com/file/d/1194z7hsdIgZBlvpx29bcTBTqO2jAm1wB/preview' , 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' ]}
    ]
  }*/

  private _getUrl = "/Merchant";
  private _putUrl = "/status";
  httpOptions = {
    headers:new HttpHeaders({
      "Content-Type":"application/json"
    })
  };

  constructor(private http: HttpClient) { }

    getMerchant(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(environment.apiBaseURL + this._getUrl);
  }

  updateMerchant(merchants:IEmployee){
    console.log('updating in merchant service');
    return this.http.put(environment.apiBaseURL + this._putUrl + merchants._id, merchants, this.httpOptions);
  }



}

