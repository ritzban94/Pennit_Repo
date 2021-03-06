import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarRef } from '@angular/material';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  collapsed_dd = false;
  constructor(public dialog:MatDialog, public authservIns: AuthService,public matsnackbar:MatSnackBar) { }

  ngOnInit() {
  }
  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  toggle_dd(): void {
    this.collapsed_dd = !this.collapsed_dd;
  }

  onlogoutclick(){
    this.toggle_dd();
    this.toggleCollapsed();
    this.dialog.closeAll();
    this.matsnackbar.openFromComponent(LogoutSnackbar,{
      duration: 1700
    });
  }

  profileclick(){
    this.toggle_dd();
    this.toggleCollapsed();
    const config = new MatDialogConfig();
    config.width = "50%";
    config.disableClose = true;
    config.hasBackdrop = true;
    this.dialog.open(ProfileComponent, config);
  }

}

@Component({
  selector: 'app-logout-snackbar',
  templateUrl: './logoutsnackbar.html'
})

export class LogoutSnackbar {
  constructor(private authserv: AuthService,private matsnackref: MatSnackBarRef<LogoutSnackbar>){
    matsnackref.afterDismissed().subscribe(
      response => {
        authserv.logout();
      }
    )
  }
}
