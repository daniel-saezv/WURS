import { Component } from '@angular/core';
import { LoginComponent } from "../../components/login/login.component";

@Component({
  selector: 'app-main-page',
  imports: [LoginComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
