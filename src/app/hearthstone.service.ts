import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HearthstoneService {
  private baseUrl = 'https://us.api.blizzard.com/hearthstone';
  private authToken = 'EU3QqDQrdleWpZ2Yb8K5aGI9jeFOO74aSj';
  private backendUrl = 'http://localhost:8080/api';
  logoUrl!: SafeResourceUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getCartas(page: number, limit: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    const params = {
      region: 'Europe',
      locale: 'es_ES',
      set: 'standard',
      page: page.toString(), // Convertir a cadena
      pageSize: limit.toString() // Convertir a cadena
    };
    return this.http.get<any>(`${this.baseUrl}/cards`, { headers, params });
  }
  
  crearCarta(carta: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.backendUrl}/cartas`, JSON.stringify(carta), { headers });
  }
  
  getCartasGuardadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/cartas`);
  }

  eliminarCarta(id: string): Observable<any> {
    const url = `${this.backendUrl}/cartas/${id}`;
    return this.http.delete(url);
  }
  
  ngOnInit() {
    this.fetchLogoUrl();
  }

  fetchLogoUrl() {
    const url = 'https://hearthstone.blizzard.com/es-es';
    this.http.get(url, { responseType: 'text' }).subscribe((response) => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(response, 'text/html');
      const logoElement = htmlDoc.querySelector('.Header__Logo-sc-1rkcrpr-9.NKRIX');
      if (logoElement) {
        const logoUrl = logoElement.getAttribute('src');
        this.logoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(logoUrl!);
      } else {
        // Si el elemento no se encuentra, puedes asignar una URL alternativa o realizar alguna otra acción
      }
    });
  }
}

export const logoUrl = 'https://images.blz-contentstack.com/v3/assets/bltc965041283bac56c/blt470e26b6af0f160f/63da9ecbc353a8764532d410/HS_Logo_2023.png';

