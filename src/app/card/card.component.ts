import { Component, OnInit } from '@angular/core';
import { HearthstoneService } from '../hearthstone.service';
import { Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cartas: any[];
  currentPage: number;
  pageSize: number;
  totalPages: number;

  constructor(private hearthstoneService: HearthstoneService, private http: HttpClient, private dialog: MatDialog) {
    this.cartas = [];
    this.currentPage = 1;
    this.pageSize = 8;
    this.totalPages = 0;
  }

  ngOnInit() {
    this.obtenerCartas(this.currentPage);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  obtenerCartas(page: number) {
    this.hearthstoneService.getCartas(page, this.pageSize).subscribe(
      (data) => {
        this.cartas = data.cards;
        this.currentPage = page;
        this.totalPages = data.pageCount;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.obtenerCartas(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.obtenerCartas(this.currentPage);
    }
  }

  crearCarta(imagenUrl: string) {
    const carta = { imagen: imagenUrl };
    
    this.hearthstoneService.crearCarta(carta).subscribe(
      () => {
        // La carta se creó con éxito
        console.log('Carta creada correctamente');
        this.mostrarDialogo('Carta creada correctamente');
      },
      error => {
        // Ocurrió un error al crear la carta
        console.error('Error al crear la carta:', error);
      }
    );
  }
  
  mostrarDialogo(mensaje: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: mensaje }
    });
  }

}
