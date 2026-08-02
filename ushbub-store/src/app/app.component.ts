import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Ushbub';
  subtitle = 'Discover curated essentials for your everyday style.';
  products: Product[] = [];
  cartCount = 0;
  apiStatus = 'Connecting to API...';

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Unable to load products');
      }
      this.products = await response.json();
      this.apiStatus = 'Connected to Ushbub API';
    } catch (error) {
      this.apiStatus = 'API offline — showing demo catalog';
      this.products = [
        {
          id: 1,
          name: 'Aurora Headphones',
          price: 129,
          description: 'Immersive sound with noise cancellation for daily focus.',
          category: 'Audio',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 2,
          name: 'Luma Smart Watch',
          price: 199,
          description: 'Track your goals with a sleek, all-day wearable.',
          category: 'Wearables',
          image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 3,
          name: 'Nova Backpack',
          price: 89,
          description: 'A versatile travel companion built for modern routines.',
          category: 'Lifestyle',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
        }
      ];
    }
  }

  addToCart(): void {
    this.cartCount += 1;
  }
}
