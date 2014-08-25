Slider
======

Slider em JavaScript de 1 a N posições, seguindo uma determinada estrutura HTML.

O Padrão JavaScript adotado foi o Iterator e para a transição entre os slides está sendo usado o animate do jQuery.

Estrutura HTML padrão utilizada:

#HTML
```html
<section id='sl01' class='slider'>
	<div class='wrapper'>
		<div class='mask'>
			<div class='slide'>
				<h2>slide 1</h2>
			</div>
			<div class='slide'>
				<h2>slide 2</h2>
			</div>
			<div class='slide'>
				<h2>slide 3</h2>
			</div>
		</div>
	</div>
	<div class='bullets'></div>
</section>
```

#JAVASCRIPT
```html
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="js/slider.js"></script>
<script>
	var slider = Slider('sl01');
	slider.init();
</script>
```

O modelo de CSS é simples e com a finalidade de apenas ajudar a demonstrar o funcionamento do Slider.

#CSS
```sass
.slider {
  position: relative;
  width: 988px;
  height: 400px;
  text-align: center;

  .wrapper {
    border: 1px solid #ccc;
    overflow: hidden;

    .mask {
      float: left;
      width: auto;      

      .slide {
        float: left;
        position: relative;
        width: 988px;
        height: 400px;

        img {
          position: absolute;
          left: 0;
          top: 0;
        }

        h2 {
          position: relative;
          width: 100%;
          height: 100%;
          vertical-align: middle;
          font-family: Arial;
          font-size: 140px;
          text-align: center;        
          color: #ccc;
          z-index: 1
        }
      }
    }
  }

  .bullets {
    display: inline-block;
    min-width: 100px;
    height: 10px;
    

    .bullet {
      float: left;
      width: 10px;
      height: 10px;
      margin: 10px;
      background: #ccc;
      border: none;
      cursor: pointer;


      &:hover {
        background: #666;
      }

      &.active {
        background: #666;
      }
    }
  } 
}
```
