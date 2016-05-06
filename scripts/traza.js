//----------------------------------------------------------------------
//Point
//----------------------------------------------------------------------

var Traza = function(point)
    {
    this.point      = point;
    this.max_length = 2500;
    this.traza      = [];
    this.plot_traza = 1;
    this.save_traza = 1;
    this.del        = 0; 

    Mundo.trazas.push(this);
    }
//----------------------------------------------------------------------

Traza.prototype.simulate=function()
    {
        
    if (this.save_traza==1)
        {
        if (this.traza.length==0) this.traza.push(this.point.position);
        
        else
          {
          var pos1 = this.point.position;
          var pos2 = this.traza[this.traza.length-1];
          
          if ((pos1.x-pos2.x)*(pos1.x-pos2.x)+(pos1.y-pos2.y)*(pos1.y-pos2.y)>1) 
              this.traza.push(pos1);
          
          if (this.traza.length>this.max_length) 
              this.traza.shift();//borra el primero
          }
        
        }

    };
    
//----------------------------------------------------------------------

Traza.prototype.draw=function()
    {
    if (this.plot_traza==1)
        {
        context.fillStyle   = 'rgba(256, 256, 256, 1)';
        context.strokeStyle = 'rgba(256, 256, 256, 1)';
        
        if (this.traza.length>1)
            {
            first_point=this.traza[0]
            for(var i=1, il=(this.traza.length-1); i<il; i++)
               {
               var pos=this.traza[i]
               
               context.beginPath();
               context.moveTo(first_point.x, first_point.y);
               context.lineTo(pos.x, pos.y);
               context.stroke();
               
               first_point=pos;
               }
            }
        }
    }
    
//----------------------------------------------------------------------
    
    
    

