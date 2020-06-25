import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { campaign } from "./campaign.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  public posts: campaign[] = [];
 
  public postsUpdated = new Subject<campaign[]>();

  constructor(private http: HttpClient) {}
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/campaigns"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            cname: post.cname,
            cdescription: post.cdescription,
            ctgender: post.ctgender,
            ctlocation: post.ctlocation,
            ctagegroup: post.ctagegroup,
            ctfav: post.ctfav,
            ctcustier: post.ctcustier,
            ctincomegroup: post.ctincomegroup,
            cexpdate: post.cexpdate,
            coupon: post.coupon,
            cstatus: post.cstatus,
            bicon: post.bicon,
            _id: post._id,
            editable:post.editable
          };
        });
      }))
      .subscribe(transformedPosts =>{
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
        console.log("In Services" ,this.posts);
      });
  }

  updatePost( _id: string,
    cname: string,
    cdescription: string,
    ctgender: string,
    ctlocation: string,
    ctagegroup: string,
    ctfav: string,
    ctcustier: string,
    ctincomegroup: string,
    cexpdate: string,
    coupon: string,
    cstatus: string,
    bicon: string,
    editable:Array<string>) {
    const post: campaign = { 
      _id: _id,
      cname: cname,
      cdescription: cdescription,
      ctgender: ctgender,
      ctlocation: ctlocation,
      ctagegroup: ctagegroup,
      ctfav: ctfav,
      ctcustier: ctcustier,
      ctincomegroup: ctincomegroup,
      cexpdate: cexpdate,
      coupon: coupon,
      cstatus: cstatus,
      bicon: bicon,
      editable:editable};
    this.http
      .put("http://localhost:3000/api/campaigns/" + _id, post)
      .subscribe(response => console.log(response));
  }
  
}
