var Vector = function(x, y){
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    isub: function(other){
        this.x -= other.x;
        this.y -= other.y;
        return this;
    },
    sub: function(other){
        return new Vector(
            this.x - other.x,
            this.y - other.y
        );
    },
    iadd: function(other){
        this.x += other.x;
        this.y += other.y;
        return this;
    },
    add: function(other){
        return new Vector(
            this.x + other.x,
            this.y + other.y
        );
    },

    imul: function(scalar){
        this.x *= scalar;
        this.y *= scalar;
        return this;
    },
    mul: function(scalar){
        return new Vector(
            this.x * scalar,
            this.y * scalar
        )
    },
    idiv: function(scalar){
        this.x /= scalar;
        this.y /= scalar;
        return this;
    },
    div: function(scalar){
        return new Vector(
            this.x / scalar,
            this.y / scalar
        )
    },

    normalized: function(){
        var x=this.x, y=this.y;
        var length = Math.sqrt(x*x + y*y);
        if(length > 0){
            return new Vector(x/length, y/length);
        }
        else{
            return new Vector(0, 0);
        }
    },
    normalize: function(){
        var x=this.x, y=this.y;
        var length = Math.sqrt(x*x + y*y);
        if(length > 0){
            this.x = x/length;
            this.y = y/length;
        }
        return this;
    },

    length: function(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    },

    distance: function(other){
        var x = this.x - other.x;
        var y = this.y - other.y;
        return Math.sqrt(x*x + y*y);
    },

    copy: function(){
        return new Vector(this.x, this.y);
    },
    
    zero: function(){
        this.x = 0;
        this.y = 0;
    },

//----------------------------------------------------------------------

    iperpendicular: function()
        {
        var a=this.x,
            b=this.y;
        this.x=-b;
        this.y= a;
        
        return this;
        },

    perpendicular: function()
        {
        var x=this.x,
            y=this.y;
        return new Vector(-y,x);
        },

/*    angle: function(v2){
    return  Math.acos((this.x*v2.x+this.y*v2.y)/(Math.sqrt((this.x*this.x+this.y*this.y)*(v2.x*v2.x+v2.y*v2.y)))
    )
*/


//angle(v1, v2) = acos( (v1x * v2x + v1y * v2y) / (sqrt(v1x^2+v1y^2) * sqrt(v2x^2+v2y^2)) ) 


    irotate: function(angle)
        {
        if(angle !== 0)
            {
            var c = Math.cos(angle),
                s = Math.sin(angle),
                x = this.x,
                y = this.y;
            this.x = c*x -s*y;
            this.y = s*x +c*y;
            return this;
            } 
        },

    rotate: function(angle)
        {
        if(angle !== 0)
            {
            var c = Math.cos(angle),
                s = Math.sin(angle),
                x = this.x,
                y = this.y;
            return new Vector(c*x-s*y,s*x +c*y)
            } 
        },

}


//----------------------------------------------------------------------
/*
angle(v1,v2) 
    {
    return (Math.acos( (v1.x * v2.x + v1.y * v2.y) / (Math.sqrt(v1.x*v1.x+v1.y*v1.y) * sqrt(v2.x*v2.x+v2.y*v2.y)) ) );
    }

*/





