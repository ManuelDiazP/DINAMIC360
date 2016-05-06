//----------------------------------------------------------------------
//Point
//----------------------------------------------------------------------

var Point = function(x, y)
      {
      this.del=0;
      
      this.position     = new Vector(x, y);
      this.previous     = new Vector(x, y);
      this.mass         = 0.2;
      this.force        = new Vector(0, 0);
      
      this.engine=0;

      this.highlighted = 0;
      this.fixed_point = 0;
      
      this.force1 = new Vector(0,2).mul(this.mass);
      this.force2 = new Vector(0,0);
      
      Mundo.points.push(this);
      }

//----------------------------------------------------------------------

Point.prototype.simulate=function(dt)

    {
    if (this.fixed_point==1) return; //Si es un punto fijo termina

    this.force=this.force1.add(this.force2);

    //integracion

    acceleration = this.force.imul(1);    // acceleration=force/mass
    velocity     = acceleration.imul(dt); // velocity=acceleration*time
    displacement = velocity.imul(dt);     // displacement=velocity*time

    var  aux = this.position.mul(2).sub(this.previous).add(displacement);
    this.previous = this.position;
    this.position = aux;
        
    this.force.zero();
    };

//----------------------------------------------------------------------

Point.prototype.draw=function()
    {
    if (this.highlighted==0)
        {
        context.fillStyle   = 'rgba(128, 128, 128, 1)';
        context.strokeStyle = 'rgba(128, 128, 128, 1)';
        }

    if (this.highlighted==1)
        {
        context.fillStyle   = 'rgba(256, 0, 0, 1)';
        context.strokeStyle = 'rgba(256, 0, 0, 1)';
        }
        
    context.beginPath();
    context.arc(this.position.x, this.position.y, 0.8, 0, Math.PI*2, false);
    context.fill();
        
    if (this.fixed_point==1)
        {
        context.beginPath();
        context.moveTo(this.position.x-2, this.position.y+1.2);
        context.lineTo(this.position.x+2, this.position.y+1.2);
        context.stroke();
        }
    }

//----------------------------------------------------------------------
    
    
    

