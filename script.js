(function() {

    function createCanvas(parent, width, height) {
        var canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || 100;
        canvas.node.height = height || 100;
        parent.appendChild(canvas.node);
        return canvas;
    }

    function init(container, width, height, fillColor) {
        var canvas = createCanvas(container, width, height);
        var ctx = canvas.context;

        ctx.fillCircle = function(x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function(fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");

        // bind mouse events
        canvas.node.onmousemove = function(e) {
            console.log('mouse touch detected');
            if (!canvas.isDrawing) {
               return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 40;
            var fillColor = '#fffff';
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, fillColor);

        };
        canvas.node.onmousedown = function(e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function(e) {
            canvas.isDrawing = false;
        };
       
        const el = document.querySelector("canvas");
        el.addEventListener("touchmove", function(e) {
            console.log('mobile touch detected');

            e.preventDefault();
        
            var x = e.touches[0].clientX - this.offsetTop;
           
            var y = e.touches[0].clientY - this.offsetTop;
            var radius = 40;
            var fillColor = '#fffff';
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, fillColor);

          
        });
      
      canvas.ontouchmove = function(e) {
        console.log('touch detected');
        e.preventDefault();
            if (!canvas.isDrawing) {
               return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 40;
            var fillColor = '#fffff';
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, fillColor);

        };


        canvas.ontouchstart = function(e) {
                  console.log('touch detected');
          e.preventDefault();
            canvas.isDrawing = true;
        };
        canvas.touchend = function(e) {
                  console.log('touch detected');
          e.preventDefault();
            canvas.isDrawing = false;
        };
      
    }

    var container = document.getElementById('canvas');
    init(container, 250, 180, '#3A81F1');

})();