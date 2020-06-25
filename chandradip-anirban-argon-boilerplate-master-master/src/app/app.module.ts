import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthIntercepter } from './auth/auth.interceptor';
import { MerchantPanelComponent } from './pages/merchant-panel/merchant-panel.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MerchantService } from './merchant.service';
// import { ForgotComponent } from './pages/forgot/forgot.component';
// import { ResetComponent } from './pages/reset/reset.component';
// import { ChatService } from './shared/chat.service';

// import { MutualFundService } from './shared/mutual-fund.service';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { environment } from '../environments/environment';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule


  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    MerchantPanelComponent,
    // ForgotComponent,
    // ResetComponent,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepter,
    multi: true
  },AuthGuard, UserService ,MerchantService],


  bootstrap: [AppComponent]

})
export class AppModule { }
