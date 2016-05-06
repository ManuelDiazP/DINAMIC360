//----------------------------------------------------------------------
//Engine
//----------------------------------------------------------------------

var Engine = function(point1, point2)
    {
    this.point1 = point1;
    this.point2 = point2;
    
    this.length = point1.position.distance(point2.position);
    
    this.highlighted = 0;
    
    this.target = point1.position.distance(point2.position);
    
    this.mass   = 0;
    this.perp   = 0;

    this.limite_elastico = 0.5;
    this.del = 0;
      
    this.point1.mass=0;
    this.point2.mass=0;
 
    this.point1.force1 = new Vector(0,0);
    this.point1.force2 = new Vector(0,0);

    this.point2.force1 = new Vector(0,0);
    this.point2.force1 = new Vector(0,0);
    this.point2.engine = 1;
        
    var pos1 = this.point1.position;
    var pos2 = this.point2.position;
    var direction = pos2.sub(pos1);
    
    this.momentum =150;
    this.speed    =0.1;
    
    this.point2.force2 = direction.perpendicular().normalize().mul(this.momentum);
 
    Mundo.engines.push(this);
    }

//----------------------------------------------------------------------

Engine.prototype.simulate=function(dt)
    {
    //The resolve method of a constraint tries to apply the forces
    //after Hooke's law

    var pos1 = this.point1.position;
    var pos2 = this.point2.position;

    var direction = pos2.sub(pos1);
        
    //aplica momento
        
    this.point2.force2 = direction.perpendicular().normalize().mul(this.momentum);
        
    //limita velocidad

    v1=this.point2.previous.sub(this.point1.previous);
    v2=this.point2.position.sub(this.point1.position);

    num       = v1.x*v2.x+v1.y*v2.y;
    den       = Math.sqrt((v1.x*v1.x+v1.y*v1.y)*(v2.x*v2.x+v2.y*v2.y));
    angle     = Math.acos(num/den);
    velocidad = angle/dt;
        
    lim=0.01*this.speed;
    
    k=(lim-velocidad)/lim;
        
    if (velocidad>lim)
        {
        this.point2.force2.imul(0);
        //this.point2.force2.imul((lim-velocidad)/lim);
        }


    var original_length=this.target;

    var length = direction.length();

    var factor = (length-original_length)/(length);
        
    var aceleracion    = factor      * 100;
    var velocidad      = aceleracion * dt;
    var desplazamiento = velocidad   * dt;
        
    var correction = direction.mul(factor);

    if (this.point1.fixed_point!=1)
        {
        this.point1.position.iadd(correction);
        }

    if (this.point2.fixed_point!=1)
        {
        this.point2.position.isub(correction);
        }
    };

//----------------------------------------------------------------------

Engine.prototype.draw=function()
    {
    var pos1 = this.point1.position;
    var pos2 = this.point2.position;

    context.strokeStyle = 'rgba(0, 128, 0, 1)';

    context.beginPath();
    context.moveTo(pos1.x, pos1.y);
    context.lineTo(pos2.x, pos2.y);
    context.stroke();
    };

//----------------------------------------------------------------------


