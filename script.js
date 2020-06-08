
var record_animation = false;
var name = "image_"
var total_frames = 300;
var frame = 0;
var loop = 0;
var total_time = 4*Math.PI;
var rate = total_time/total_frames;

var get_mouse_pos = false;
var get_touch_pos = false;

var p = .0001 + 1 

var x_touch = 2;
var y_touch = 2;

var t = 0;
//var rate = 2*Math.PI/200;

var p_rate = .01;

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');




startAnimating(30);




function draw() {
  
  var W = canvas.width = 500; //window.innerWidth;
  var H = canvas.height = 500; //window.innerHeight;

  ctx.fillStyle = 'rgba(220,220,220, 0.1)';
  ctx.fillRect(0,0,W,H);

  
  let d = 18;
  let n = Math.ceil(Math.max(W,H)/d);
  

    for (let i = 0; i < n; i++) {
        for ( let j = 0; j < n; j++) {
            let x = (i - n/2);
            let y = (j - n/2);
            
            let phase_x = x_touch*x*2*Math.PI/(p*n);
            let phase_y = y_touch*y*2*Math.PI/(p*n);
            let alpha =  .2 + 0.5*(1 + Math.sin(0.005*(x*x + y*y) + t));
            ctx.fillStyle = 'rgba(200,200,200,'+alpha.toString()+')';
            ctx.fillRect(W/2 +d/2 +d*x, H/2 +d/2+d*y, 0.9*d*Math.sin(t+4*phase_x), 0.9*d*Math.cos(t+4*phase_y))
        }
    }
    
 
    t -= rate;

    p =  2 + Math.sin(t/4);
    
  
    
        canvas.addEventListener('mousedown', e => {
        get_mouse_pos = true;
        getMousePosition(canvas, e)
        });
          
        canvas.addEventListener('mouseup', e => {
        get_mouse_pos = false;
        });
      
        canvas.addEventListener('mousemove', function(e) {
          if(get_mouse_pos) {
            getMousePosition(canvas, e)
          }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
          
        canvas.addEventListener('touchend', function(e) {
            get_touch_pos = false;
        }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);


}


function getMousePosition(canvas, event) {
    x_touch = 8*(event.clientX)/canvas.width;
    y_touch = 8*(event.clientY)/canvas.height;

    
}

function getTouchPosition(canvas, event) {
    var touch = event.touches[0];
    x_touch = 8*(touch.clientX)/canvas.width;
    y_touch = 8*(touch.clientY)/canvas.height;
}

function startAnimating(fps) {
    
   fpsInterval = 1000 / fps;
   then = window.performance.now();
   startTime = then;
   
   animate();
}

function animate(newtime) {

    requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();
        
        frame = (frame+1)%total_frames;
        time = rate*frame;
        t = time;

        if(record_animation) {

            if (loop === 1) { 
            let frame_number = frame.toString().padStart(total_frames.toString().length, '0');
            let filename = name+frame_number+'.png'
                
            dataURL = canvas.toDataURL();
            var element = document.createElement('a');
            element.setAttribute('href', dataURL);
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            }

            if (frame + 1 === total_frames) {
                loop += 1;
            }

            if (loop === 2) { stop_animation = true }
        }
    }
}
