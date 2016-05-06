//----------------------------------------------------------------------
//Constraint
//----------------------------------------------------------------------

var Constraint = function(point1, point2)
    {
    this.point1      = point1;
    this.point2      = point2;
    this.length      = point1.position.distance(point2.position);
    
    this.highlighted = 0;
    
    this.target = point1.position.distance(point2.position);
    this.mass   = point1.position.distance(point2.position);

    this.limite_elastico=0.5;
    
    this.del=0;
      
    this.point1.mass+=this.mass/2;
    this.point2.mass+=this.mass/2;

    Mundo.constraints.push(this);
    }

//----------------------------------------------------------------------

Constraint.prototype.simulate=function(dt)
    {
    var original_length=this.target;
            
    var pos1 = this.point1.position;
    var pos2 = this.point2.position;
        
    var direction = pos2.sub(pos1);
    var length    = direction.length();

    var dx = length-original_length;

    var factor = dx/length;
        
    var aceleracion    = factor      * 200;
    var velocidad      = aceleracion * dt;
    var desplazamiento = velocidad   * dt;
        
    var displacement = direction.mul(desplazamiento);

    if (this.point1.fixed_point!=1)
        this.point1.position.iadd(displacement);

    if (this.point2.fixed_point!=1)
        this.point2.position.isub(displacement);
        
    var deviation = this.target - pos1.distance(pos2);
    
    if  (deviation*deviation>this.limite_elastico) this.del=1;

    };
    
//----------------------------------------------------------------------

Constraint.prototype.draw=function()
    {
    var pos1 = this.point1.position;
    var pos2 = this.point2.position;
      
    var deviation = this.target - pos1.distance(pos2);
    var color_diff = Math.round(deviation * deviation * 500);

    if (this.highlighted==0)
        context.strokeStyle= 'rgba(' + (0+color_diff) + ', ' + (0-color_diff) + ', ' + (128-color_diff) + ', 1)';

    if (this.highlighted==1)
        context.strokeStyle = 'rgba(256, 0, 0, 1)';

    context.beginPath();
    context.moveTo(pos1.x, pos1.y);
    context.lineTo(pos2.x, pos2.y);
    context.stroke();
    };

//----------------------------------------------------------------------

Constraint.prototype.del=function()
    {
    this.point1.mass-=this.mass/2;
    this.point2.mass-=this.mass/2;

    };

//----------------------------------------------------------------------
