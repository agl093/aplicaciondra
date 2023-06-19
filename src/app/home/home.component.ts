import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { logoUrl } from '../hearthstone.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public logoUrl = logoUrl;


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

