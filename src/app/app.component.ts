import { Component, OnInit } from '@angular/core';
import { HearthstoneService } from './hearthstone.service';
import { logoUrl } from './hearthstone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartas: any[] = [];
  public logoUrl = logoUrl;

  constructor(private hearthstoneService: HearthstoneService) {}

  ngOnInit() {
    const page = 1; // Define el número de página que deseas cargar inicialmente
    const limit = 8; // Define la cantidad de cartas por página
    this.hearthstoneService.getCartas(page, limit).subscribe(
      (data) => {
        this.cartas = data.cards;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
