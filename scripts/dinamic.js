//----------------------------------------------------------------------

var World = function()
    {
    this.points      =[];
    this.constraints =[];
    this.engines     =[];
    this.trazas      =[];
    
    this.gravity=new Vector(0,2);
    
    this.run=1;
    
    this.flag_estado ="edit"
    this.flag_edit ="none"

    this.point_highlighted = null;
    
    this.beg_constraint = null;
    this.end_constraint = null;
    
    this.beg_engine = null;
    this.end_engine = null;
    }
    
    
//----------------------------------------------------------------------

World.prototype = 
    {
    draw: function()
      {

      for(var i=0, il=this.engines.length; i<il; i++)
          {
          this.engines[i].draw();
          }

      for(var i=0, il=this.constraints.length; i<il; i++)
          {
          this.constraints[i].draw();
          }

      for(var i=0, il=this.points.length; i<il; i++)
          {
          this.points[i].draw();
          }
          
      for(var i=0, il=this.trazas.length; i<il; i++)
          {
          this.trazas[i].draw();
          }
      },

//----------------------------------------------------------------------

    add_point_canvas: function(x,y)
        {
        var p = new Point(x,y);
        },

    add_fixed_point_canvas: function(x,y)
        {
        var p = new Point(x,y);
        p.fixed_point = 1;
        },
        
    add_constraint_canvas: function(p1,p2)
        {
        var c = new Constraint(p1,p2);
        },
        
    add_traza_canvas: function(p1)
        {
        var t = new Traza(p1);
        },

    add_engine_canvas: function(p1,p2)
        {
        var e = new Engine(p1, p2);
        e.speed=12;
        },

//----------------------------------------------------------------------

    highlight_points_canvas: function(position)
        {
        this.point_highlighted = null;
        
        cur_pos=position;

        mindistance=40
        ph=0 //puntero al ultimo punto higligted
        
        for(var i=0; i<this.points.length; i++)
            {
            var point = this.points[i];
            point.highlighted = 0;
            
            var p = point.position;
            
            var x = p.x - position.x;
            if  (x>mindistance) continue;
            
            var y = p.y - position.y;
            if  (y>mindistance) continue;

            var distance = x*x + y*y;

            if(distance < mindistance)
                {
                this.points[ph].highlighted  = 0; //apaga el anterior
                point.highlighted            = 1; //enciende el actual
                ph=i
                
                this.point_highlighted = point;
                mindistance            = distance;
                }
            }
        },

//----------------------------------------------------------------------

    make_bridge: function(x,y,l,segments)
        {
//----------------------------------------------------------------------

        var z1 = new Point(500, 500);
        
        z1.fixed_point = 1;
        
        var z2 = new Point(550, 550);
        var z3 = new Point(580, 580);
        
        mm1=new Engine(z1, z2);
        mm1.speed=12;
        
        mm2=new Engine(z2, z3);
        mm2.speed=12;

//----------------------------------------------------------------------

        var m1 = new Point(100, 100);
        var m2 = new Point(80, 80);
        m1.fixed_point = 1;
        new Engine(m1, m2);
        
        var p1    = new Point(100, 50);
        var p2    = new Point(90,  90);
        
        p2.fixed_point = 1;
        
        new Constraint(m2,p1);
        new Constraint(p1,p2);
        
        var p3 = new Point(100,100);
        
        new Constraint(p1,p3);
        new Constraint(p3,m2);
        
        var p7 = new Point(80,80);
        
        new Constraint(p3,p7);
        
        var p8 = new Point(90,80);
        
        new Constraint(p7,p8);
        
        p8.save_traza=1;
        p8.plot_traza=1;
      
//----------------------------------------------------------------------

        var m1 = new Point(300, 100);
        var m2 = new Point(300, 115);
        m1.fixed_point = 1;
        new Engine(m1, m2);
        
        var p1    = new Point(300,  90);
        var p2    = new Point(280,  80);
        
        p2.fixed_point = 1;
        
        new Constraint(m2,p1);
        new Constraint(p1,p2);
        
        var p3 = new Point(350,110);

        new Constraint(p1,p3);
        new Constraint(p3,m2);
        
        p3.save_traza=1;
        p3.plot_traza=1;
      
//----------------------------------------------------------------------

        var top    = new Point(x, y);
        var bottom = new Point(x, y+l);
        
        top.fixed_point = 1;
        bottom.fixed_point = 1;
        
        for(var i=1; i<segments; i++)
            {
            new_top    = new Point(x+i*l, y);
            new_bottom = new Point(x+i*l, y+l);
            
            new Constraint(top, new_top);
            new Constraint(bottom, new_bottom);
            new Constraint(new_top, new_bottom);
            new Constraint(top, new_bottom);
            
            top    = new_top;
            bottom = new_bottom;
            }

//----------------------------------------------------------------------
        },

//----------------------------------------------------------------------

    clean: function()
        {
        for(var i=0, il=this.points.length; i<il; i++)
            {
            if (this.points[i].del==1)
                {
                for(var k=0, kl=this.constraints.length; k<kl; k++)
                    {
                    if (this.constraints[k].point1==this.points[i])
                        this.constraints[k].del=1;

                    if (this.constraints[k].point2==this.points[i])
                        this.constraints[k].del=1;
                    }
                this.points.splice(i,1);
                il--;
                }
            }

        for(var i=0, il=this.constraints.length; i<il; i++)
            {
            if (this.constraints[i].del==1)
                {
                this.constraints.splice(i,1);
                il--;
                }
            }
        },

//----------------------------------------------------------------------

    simulate: function()
        {
        var steps = 400;
        var dt    = 1/steps;

        for(var j=0; j<steps; j++)
            {
            for(var i=0, il=this.engines.length; i<il; i++)
                this.engines[i].simulate(dt);

            for(var i=0, il=this.constraints.length; i<il; i++)
                this.constraints[i].simulate(dt);

            for(var i=0, il=this.points.length; i<il; i++)
                this.points[i].simulate(dt);
                
            for(var i=0, il=this.trazas.length; i<il; i++)
                this.trazas[i].simulate();
            }
        },

//----------------------------------------------------------------------
        
    }

//----------------------------------------------------------------------
//Draw Canvas
//----------------------------------------------------------------------

function draw()
    {
    context.fillStyle = "black"; 
    context.fillRect(originx,originy,$("#canvas").width()/scale,$("#canvas").height()/scale);

    if (Mundo.run==1) Mundo.simulate();
    
    Mundo.clean();
    Mundo.draw();
    }
    
//----------------------------------------------------------------------
//Zoom onmousewheel
//----------------------------------------------------------------------

canvas.onmousewheel = function (event)
    {
    var mousex = event.clientX - canvas.offsetLeft;
    var mousey = event.clientY - canvas.offsetTop;
    
    var wheel  = event.wheelDelta/120;
    var zoom   = 1 + wheel/10;

    context.translate (originx,originy);

    context.scale(zoom,zoom);

    context.translate (-( mousex / scale + originx - mousex / ( scale * zoom ) ),-( mousey / scale + originy - mousey / ( scale * zoom ) ) );

    originx = ( mousex / scale + originx - mousex / ( scale * zoom ) );
    originy = ( mousey / scale + originy - mousey / ( scale * zoom ) );
    
    scale *= zoom;
    }

//----------------------------------------------------------------------

canvas.onclick  = function (event)
    {

//----------------------------------------------------------------------

    var mousex = (event.clientX - canvas.offsetLeft)/scale+originx;
    var mousey = (event.clientY - canvas.offsetTop)/scale+originy;
    
//----------------------------------------------------------------------

    if (Mundo.flag_edit=="add_point")
        {
        Mundo.add_point_canvas(mousex,mousey);
        Mundo.flag_edit="none";
        }
        
//----------------------------------------------------------------------

    if (Mundo.flag_edit=="add_fixed_point")
        {
        Mundo.add_fixed_point_canvas(mousex,mousey);
        Mundo.flag_edit="none";
        return;
        }
        
//----------------------------------------------------------------------

    if (Mundo.flag_edit=="add_traza")
        {
        if (Mundo.point_highlighted != null)
            {
            Mundo.add_traza_canvas(Mundo.point_highlighted);
            Mundo.flag_edit="none";
            }
        return;
        }

//----------------------------------------------------------------------

    if (Mundo.flag_edit=="moving")
        {
        p=Mundo.flag_move_ini
                    
        p.position.x=mousex;
        p.position.y=mousey;
                
        p.previous.x=mousex;
        p.previous.y=mousey;
                
        p.force.x=0;
        p.force.y=0;
                            
        p.previous.x=mousex;
        p.previous.y=mousey;

        for(var i=0, il=Mundo.constraints.length; i<il; i++)
            {
            c=Mundo.constraints[i];

            c.length      = c.point1.position.distance(c.point2.position);
            c.highlighted = 0;
    
            c.target = c.point1.position.distance(c.point2.position);
            c.mass   = c.point1.position.distance(c.point2.position);
    
            c.limite_elastico=0.5;
            c.del=0;
      
            c.point1.mass+=c.mass/2;
            c.point2.mass+=c.mass/2;
            }
            
        Mundo.flag_edit="none";
        return;
        }
        
//----------------------------------------------------------------------
        
    if (Mundo.flag_edit=="beg_move")
        {
        
        if (Mundo.point_highlighted != null)
            {
            Mundo.flag_move_ini=Mundo.point_highlighted;
            Mundo.flag_edit="moving";
            }
        return;
        }

//----------------------------------------------------------------------
//Add Constrain
//----------------------------------------------------------------------

        
    if (Mundo.flag_edit=="beg_constraint")
        {
        if (Mundo.point_highlighted != null)
            {
            Mundo.beg_constraint = Mundo.point_highlighted;
            Mundo.flag_edit="end_constrain";
            }
        return;
        }

//----------------------------------------------------------------------
        
    if (Mundo.flag_edit=="end_constrain")
        {
        if (Mundo.point_highlighted != Mundo.beg_constraint)
        if (Mundo.point_highlighted != null)
            {
            Mundo.add_constraint_canvas(Mundo.point_highlighted,Mundo.beg_constraint);
            Mundo.flag_edit="none";
            }
        return;
        }
        
//----------------------------------------------------------------------
//Add Engine
//----------------------------------------------------------------------
        
    if (Mundo.flag_edit=="beg_engine")
        {
        if (Mundo.point_highlighted != null)
            {
            Mundo.beg_engine = Mundo.point_highlighted;
            Mundo.flag_edit="end_engine";
            }
        return;
        }

    if (Mundo.flag_edit=="end_engine")
        {
        if (Mundo.point_highlighted != Mundo.beg_engine)
        if (Mundo.point_highlighted != null)
            {
            Mundo.add_engine_canvas(Mundo.point_highlighted,Mundo.beg_engine);
            Mundo.flag_edit="none";
            }
        return;
        }

//----------------------------------------------------------------------

    }

//----------------------------------------------------------------------

canvas.ondblclick = function (event)
    {
    Mundo.run=0;
    
    if (Mundo.point_highlighted != null)
        {
        Mundo.point_highlighted.del=1;
        }
    }

//----------------------------------------------------------------------

canvas.onmousemove = function (event)
    {
    var mousex = (event.clientX - canvas.offsetLeft)/scale+originx;
    var mousey = (event.clientY - canvas.offsetTop)/scale+originy;

    var position = new Vector(mousex,mousey);
    

    if (Mundo.flag_edit=="moving")
        {

        p=Mundo.flag_move_ini
                    
        p.position.x=mousex;
        p.position.y=mousey;
                
        p.previous.x=mousex;
        p.previous.y=mousey;
                
        p.force.x=0;
        p.force.y=0;
                            
        p.previous.x=mousex;
        p.previous.y=mousey;

        for(var i=0, il=Mundo.constraints.length; i<il; i++)
            {
            c=Mundo.constraints[i];

            c.length      = c.point1.position.distance(c.point2.position);
            c.highlighted = 0;
    
            c.target = c.point1.position.distance(c.point2.position);
            c.mass   = c.point1.position.distance(c.point2.position);
    
            c.limite_elastico=0.5;
            c.del=0;
      
            c.point1.mass+=c.mass/2;
            c.point2.mass+=c.mass/2;
            }
        }
        
    Mundo.highlight_points_canvas(position);
    }

//----------------------------------------------------------------------
//Init
//----------------------------------------------------------------------

function init_canvas()
    {
    setInterval(draw,40);
    }
    
function init_world()
    {
    Mundo.make_bridge(20,20,20,20);
    }
    
//----------------------------------------------------------------------





















