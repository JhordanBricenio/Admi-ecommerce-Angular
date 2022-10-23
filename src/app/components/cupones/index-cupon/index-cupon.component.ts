import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cupon } from 'src/app/models/cupon';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast: any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public cupones:Cupon[]=[];

  constructor(private cuponService:CuponService, private router:Router ) { }

  ngOnInit(): void {
    this.cuponService.getCupones().subscribe(
      response=>{
        this.cupones=response;
      },
      error=>{
        console.log(error);
      }
    )


  }

  delete(cupon: Cupon): void {
    this.cuponService.delete(cupon.id).subscribe(
      response => {
        this.cupones = this.cupones.filter((cli) => cli !== cupon);
        this.router.navigate(['/cupones']);
        iziToast.show({
          title: 'success',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: `El cupón ${cupon.codigo} ha sido eliminado con éxito`,
        });

      });
  }

}
