import { Component, OnInit } from '@angular/core';
import { Carta } from '../carta.model';
import { HearthstoneService } from '../hearthstone.service';

@Component({
  selector: 'app-cartas-guardadas',
  templateUrl: './cartas-guardadas.component.html',
  styleUrls: ['./cartas-guardadas.component.css']
})
export class CartasGuardadasComponent implements OnInit {
  constructor(private hearthstoneService: HearthstoneService) { }
  cartas: any[] = [];

  ngOnInit() {
    this.hearthstoneService.getCartasGuardadas().subscribe(
      (response: any) => {
        this.cartas = response._embedded.cartas;
  
        for (const carta of this.cartas) {
          const id = carta.id;
          const imagenUrl = carta.imagen;
  
          // Aquí puedes hacer lo que necesites con el ID y la URL de la imagen de cada carta
          console.log('ID de la carta:', id);
          console.log('URL de la imagen:', imagenUrl);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

obtenerCartasGuardadas() {
  this.hearthstoneService.getCartasGuardadas().subscribe(
    (cartas: Carta[]) => {
      console.log('Cartas recibidas:', cartas);
      this.cartas = cartas;
    },
    (error) => {
      console.error('Error al obtener las cartas guardadas:', error);
    }
  );
}


eliminarCarta(id: string): void {
  if (id) {
    this.hearthstoneService.eliminarCarta(id).subscribe(
      () => {
        console.log('Carta eliminada correctamente');
        this.obtenerCartasGuardadas();
      },
      (error) => {
        console.error('Error al eliminar la carta:', error);
      }
    );
  } else {
    console.error('ID de carta no válido');
  }
}
  
  
}
