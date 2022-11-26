import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './shared/material/material.module';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { EditEmailDialogComponent } from './profile/edit-email-dialog/edit-email-dialog.component';
import { EditPasswordDialogComponent } from './profile/edit-password-dialog/edit-password-dialog.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { CartComponent } from './cart/cart.component';
import { EditAddressDialogComponent } from './profile/edit-address-dialog/edit-address-dialog.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        StoreComponent,
        LoginComponent,
        ProfileComponent,
        EditEmailDialogComponent,
        EditPasswordDialogComponent,
        RegisterComponent,
        SuccessComponent,
        CartComponent,
        EditAddressDialogComponent,
        OrderDetailsComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MaterialModule,
        AdminModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
