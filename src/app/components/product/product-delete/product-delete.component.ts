import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readerById(id)
      .subscribe((produto: Product) => {
        this.product = produto
        console.log(this.product);

      })
  }

  deleteProduct() {
    this.productService.delete(this.product.id)
      .subscribe(() => {
        this.productService.showMessage('Produto excluido com sucesso!')
        this.router.navigate(['/products'])
      })
  }

  cancelarProduct() {
    this.router.navigate(['/products'])
  }

}
