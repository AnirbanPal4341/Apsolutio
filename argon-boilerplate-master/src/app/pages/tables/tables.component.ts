import { Component, OnInit } from '@angular/core';
import { MatDialog ,MatDialogRef} from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  constructor(public dialog:MatDialog ) { }

  openDialog(){
    this.dialog.open(DialogboxComponent);
  }

}
