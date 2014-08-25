slider
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