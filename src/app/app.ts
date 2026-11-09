import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  styleUrl: './app.scss', 
  templateUrl: './app.html',
  host:{
    '(document:keyup.Escape)':'closePopup()',
    '(document:keyup.ArrowRight)':'nextImg()',
    '(document:keyup.ArrowLeft)':'prevImg()',
    '(document:keyup)':'keyboardInductors($event)',

  }
})
export class App {
  protected readonly title = signal('project');

  images=[
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg",
    "img7.jpg",
    "img8.jpg",
    "img9.jpg",
    "img10.jpg",
    "img11.jpg",
    "img12.jpg"
  ];

  // properties

  popupEle!:HTMLElement ;
  popupImg!:HTMLImageElement ;
  indexofCurrentImg!:number;

  // methods

  openPopup(popupEle:HTMLElement, popupImg:HTMLImageElement, currentImgSrc:string , indexofCurrentImg:number){
    this.popupEle=popupEle;
    this.popupImg=popupImg;
    this.indexofCurrentImg=indexofCurrentImg;

    popupEle.classList.add("active");
    setTimeout(function(){
      popupEle.classList.add("show");
    },1);    

    this.updateImg(currentImgSrc);
  };

  closePopup(){
    this.popupEle?.classList.remove("show");
    setTimeout(()=>{
      this.popupEle?.classList.remove("active");
    },500)
  };

  stopPro(e : Event){
    e.stopPropagation();
  };

  updateImg(src:string){
    this.popupImg.src=`/assets/images/${src}`;
  };

  nextImg(){

    (this.indexofCurrentImg != ((this.images.length)-1))? this.indexofCurrentImg++ : this.indexofCurrentImg=0 ;
     
    let src=this.images[(this.indexofCurrentImg)];
    this.updateImg(src);
  };

  prevImg(){

    (this.indexofCurrentImg != 0)? this.indexofCurrentImg-- : this.indexofCurrentImg=((this.images.length)-1) ;
     
    let src=this.images[(this.indexofCurrentImg)];
    this.updateImg(src);
  };

  inductors(index:number){
    console.log(index);
    let src=this.images[index];
    this.updateImg(src);
    // to update active of lis
    this.indexofCurrentImg=this.images.indexOf(src);
  };

  key:string="";
  lastTimeout:ReturnType<typeof setTimeout>| undefined;
  keyboardInductors(e : KeyboardEvent){
    this.key+=Number(e.key);
    console.log(this.key);
    clearTimeout(this.lastTimeout);
    this.lastTimeout=setTimeout( ()=>{
      if( (Number(this.key)) > 0 && (Number(this.key)) <=(this.images.length)){
        this.inductors(Number(this.key)-1);
      }
      this.key="";
      this.lastTimeout= undefined; 
    },300)
  };

}
