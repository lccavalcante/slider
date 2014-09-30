/**
  Constructor Slider
  @author: Leandro Cavalcante
  @param : ID do Slider 
  @returns: <void>

  @description: Cria um slider horizontal de 1 a N posições, seguindo uma estrutura pre-definida de HTML.

*/
function Slider (slider_id) {
  "use strict"; 

  var index   = 0,
    addEvent = function(el, evt, fn, bubbles) {
      bubbles = typeof bubbles === 'undefined' ?  true : bubbles;
      // corrige o this dentro do callback.
      function cb(e) { 
        fn.call(el, e || window.event);
      }
      if ( el.addEventListener ) {
        el.addEventListener(evt, cb, bubbles );
      } else if ( el.attachEvent ) {
        el.attachEvent(evt, cb);
      } else {
        el[evt] = cb;
      }
    },
    selector = function(selector, context) {
      var relExpr  = /^(?:(\w+)|#([\w-]+)|\.([\w-]+))$/,
          match = selector.match(relExpr);

      context = context || document;

      if ( match ) {
        if ( match[1] ) { // Tag
          return context.getElementsByTagName(match[1]);
        } else if ( match[2] ) { // #Id
          return context.getElementById(match[2]);
        } else { // .Classe
          if ( context.querySelectorAll ) {
            try {
              return context.querySelectorAll(match[0]);
            } catch(e) {}
          } else {
            return (context.getElementsByClassName || function(cName) {
              var i = 0,
                  elems = context.getElementsByTagName('*'),
                  l = elems.length,
                  results = [],
                  clExpr = new RegExp("(^|\\b)" + cName + "(\\b|$)");

              for (; i < l; i++) {
                if (clExpr.test(elems[i].className)) {
                  results.push(elems[i]);
                }
              }

              return results;
            })(match[3]);
          }
        }
      } 
    },
    slider    = selector(slider_id),
    slides    = selector('.slide', slider),
    cp_bullets  = selector('.bullets', slider)[0],
    wrapper   = selector('.mask', slider)[0],
    length    = slides.length,
    slide_w   = 988,
    slide_time  = 1000, 
    time      = 5000,
    t_name    = null,
    oldBtn    = null,
    bullet    = '';
    // definimos a largura do container que possui os slides
    wrapper.style.width = ( slide_w * length ) + 'px';
    // inserimos os bullets para marcação de quantidade. Será utilizado para alternar entre os slides
    for ( var i = 0; i < length; i +=1 ) {
      bullet += "<button class='bullet' id='b_"+i+"'>&nbsp;</button>";
    }
    // após resgatar a quantidade inserimos no html para visualização
    cp_bullets.innerHTML = bullet;

  return {  
    init: function () {
      this.actions();
      this.next();
    },    
    next: function (pos) {
      var el, bl;
      // vefificamos se temos mais itens a percorrer. Se não tiver voltamos ao início
      if ( !this.hasNext() ) {
        this.rewind();
      }             
      // verifica se é enviado o parâmetro via click definindo a posição
      if ( typeof pos !== 'undefined' ) {
        index = pos;
      } else {
        el  = slides[index];
      }
      // definimos o bullet ativo 
      bl  = cp_bullets.childNodes[index];
      // Limpamos o intervalo 
      this.clearTimer();
      // movemos o elemento para a posição desejada
      this.move( index );
      // marca o bullet ativo
      this.mark( bl );
      // incrementamos o índice para ele nevegar automaticamente para o próximo
      index = index + 1;
      // retorna o elemento - no caso slide atual
      return el;
    },
    rewind: function () {
      // volta o contador para o início
      index = 0;
    },
    hasNext: function () {
      // verifica se exite próximo item
      return index < length;
    },
    mark: function ( bullet ) { 
      // definimos um botão old para guardar a referência do último botão clicado ou marcado pelo timer do slider
      // se ele existir a classe active deve ser retirada
      if ( oldBtn != null ) {
        oldBtn.className = 'bullet';
      }
      // aqui pegamos o botão corrente para ativar 
      if ( bullet.className === 'bullet' ) {
        bullet.className = bullet.className + ' active';
      }
      // pegamos o item corrente e guardamos como a referência do último item ativado
      oldBtn = bullet;      
    },
    move: function ( pos ) {
      var newPosition = ((slide_w*pos)*-1),
        self = this;
      // animate do slider 
      $(wrapper).stop().animate({ 'marginLeft': newPosition }, slide_time, 'linear', function(){            
        self.setTimer();
      });
    },
    toggle: function() {
      var self = this;
      this.clearTimer();
      //interval 
      t_name = setInterval( function() {
        self.next();            
      } , time );
    },
    clearTimer: function () {
      clearInterval( t_name );
    },
    setTimer: function () {
      this.toggle();
    },
    click: function ( pos ) {
      this.next( pos );
    },
    actions: function () {
      var self = this;
      // adicionamos o evento de mouseenter para limpar o intervalo ao passar o mouse
      addEvent(wrapper, 'mouseenter', function() { 
        self.clearTimer();
      }, false);
      // adicionamos o evento de mouseleave para voltar com o intervalo ao retirar o mouse
      addEvent(wrapper, 'mouseleave', function() { 
        self.setTimer();
      }, false);

      addEvent(cp_bullets, 'click', function (e) {
        var src = e.target || e.srcElement;       
        // se o filho for um button nós deixamos executar a função de click
        if( src.nodeName.toLowerCase() === 'button' ) {         
          var el = src.getAttribute('id'),
            regex = /[0-9]/g,
            pos = parseInt(el.match(regex), 10);
          // envia a posição do click para marcar o bullet como ativo 
          self.mark( cp_bullets.childNodes[pos] )
          // passamos a posição desejada para a função de click
          self.click( pos );
        }

      });      
    }
  }
}
