import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private fireStore: Firestore) {}

  ngOnInit(): void {
    // const testCollection = collection(this.fireStore, 'test');
    // addDoc(testCollection, {text: "i love firebase"})
  }
}
