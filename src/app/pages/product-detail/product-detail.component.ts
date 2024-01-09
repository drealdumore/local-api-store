import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { tap, catchError, EMPTY } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor() {}
  private titleService = Inject(Title);
  private productService = Inject(ProductService);

  detail$ = this.productService.product$.pipe(
    tap((data) => console.log(data)),
    catchError(() => {
      return EMPTY;
    })
  );

  ngOnInit(): void {
    this.titleService.setTitle('Swiftcart | Product Detail');
  }


  // displayPlaylistItems() {
  //   this.route.params
  //     .pipe(
  //       //get the id from routes first
  //       switchMap((params: Params) => {
  //         const playlistId = params['id'];

  //         if (playlistId) {
  //           // if id, get token
  //           return this.spotifyService.getToken().pipe(
              
  //             switchMap((tokenResponse) => {
  //               const token = tokenResponse.access_token;
  //               // use the token and playlstId to get playlist
  //               return this.spotifyService.getPlaylist(playlistId, token).pipe(
  //                 //hide loader if data
  //                 tap((data) => {
  //                   this.loaderService.hideLoader();
  //                 }),
  //                 switchMap((currentPlaylist) => {
  //                   // use the token and playlstId to get playlist songs
  //                   this.currentPlaylist = currentPlaylist;
  //                   return this.spotifyService.getPlaylistsItems(
  //                     playlistId,
  //                     token
  //                   );
  //                 })
  //               );
  //             })
  //           );
  //         }
  //         throw new Error('Playlist ID not found in route parameters.');
  //       })
  //     )
  //     .subscribe(
  //       (playlist) => {
  //         this.playlistSongs = playlist.items;
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //       }
  //     );
  // }

}
