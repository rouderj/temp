function flankTrial(par,globals){

    const task=['instFlank','instFlank','instFlank','flank'];
    const sx=25;
    const sy=40;  
    const adj=1.02;
    const sxa=sx*adj;
    const sya=sy*adj;
    const posX=[-sxa,0,sxa,-sxa,sxa,-sxa,0,sxa];
    const posY=[-sya,-sya,-sya,0,0,sya,sya,sya];

    function myLength(pts){
        a=(pts[0]-pts[2]);
        b=(pts[1]-pts[3]);
        return(Math.sqrt((a*a)+(b*b)))
    }

    function myAngle(pts){
        a=(pts[0]-pts[2]);
        b=(pts[1]-pts[3]);
        return(180*Math.atan(b/a)/Math.PI)
    }

    function line(ang,time){
        return({
        obj_type: 'line',
        startX: ang.startX,
        startY: ang.startY,
        line_length: ang.line_length,
        angle: ang.angle,
        line_color: "black",
        line_width: 1,
        show_start_time: time[0],
        show_end_time: time[1]
        })
    }

    function convert(pts,pos){
        return({
            startX: (pts[0]+pts[2])/2+pos[0],
            startY: (pts[1]+pts[3])/2+pos[1],
            line_length: myLength(pts),
            angle: myAngle(pts)
        })
    }

    function makeAng(p,seg,pos,adj){
        const a=p/2;
        const b=(-1/9)*a+(1/18);
        if (seg==0) out=[b*sx*adj,0,(a+b)*sx*adj,-sy*adj];
        if (seg==1) out=[(1-b)*sx*adj,0,(1-a-b)*sx*adj,-sy*adj];
        if (seg==2) out=[(b+a/2)*sx*adj,-sy*adj/2,(1-a/2-b)*sx*adj,-sy*adj/2];
        return(convert(out,pos));
    }

    const cross={
    obj_type: 'cross',        
    startX: globals.cx-100+sx/2, // location of the cross's center in the canvas
    startY: globals.cy-sy/2,
    line_length: 50,
    line_color: 'black', // You can use the HTML color name instead of the HEX color.
    show_end_time: 500, // ms after the start of the trial
    }

    const rect1={
    obj_type: 'rect',        
    startX: globals.cx-100+sx/2, // location of the cross's center in the canvas
    startY: globals.cy-sy/2,
    width: 4*sx,
    height: 3.5*sy,
    line_color: 'black', // You can use the HTML color name instead of the HEX color.
    show_end_time: 500, // ms after the start of the trial
    }

    function charAdd(elements,p,pos,adj,time){
        elements.push(line(makeAng(p,0,pos,adj),time));
        elements.push(line(makeAng(p,1,pos,adj),time));
        elements.push(line(makeAng(p,2,pos,adj),time));
        return(elements)}


  let elements=[];

  if (par.runLevel==0){
    charAdd(elements,.5,[globals.cx+100,globals.cy+sy/2],2,[0,0]);
    for (let i=0;i<8;i++){
        charAdd(elements,par.back,[globals.cx-100+posX[i],globals.cy+posY[i]],1,[0,null]);}
    charAdd(elements,par.targ,[globals.cx-100,globals.cy],1,[0,null]);
  }
  if (par.runLevel==1){
    charAdd(elements,.5,[globals.cx+100,globals.cy+sy/2],2,[0,null]);
    for (let i=0;i<8;i++){
        charAdd(elements,par.back,[globals.cx-100+posX[i],globals.cy+posY[i]],1,[0,null]);}
    charAdd(elements,par.targ,[globals.cx-100,globals.cy],1,[0,null]);
  }
  if (par.runLevel>1){  
    charAdd(elements,.5,[globals.cx+100,globals.cy+sy/2],2,[1500,null]);
    for (let i=0;i<8;i++){
        charAdd(elements,par.back,[globals.cx-100+posX[i],globals.cy+posY[i]],1,[1000,1500]);}
    charAdd(elements,par.targ,[globals.cx-100,globals.cy],1,[1000,1500]);
    elements.push(rect1);
  }
     
  return({
    type: jsPsychPsychophysics,
    canvas_height: globals.height,
    canvas_width: globals.width,
    stimuli: elements, 
    response_type: 'key',
    background_color: '#FFFFFF',
    data: {task: task[par.runLevel],back:par.back ,targ:par.targ},
    choices: [' '],
    on_start: function() {
        p=.5;},
    key_down_func: function(event){ 
        if (event.key === 'ArrowRight'){
            p+=.03;
            if (p>1) p=1;
            for (let i = 0; i < 3; i++) { 
              ang=makeAng(p,i,[globals.cx+100 ,globals.cy+sy/2],2);
              jsPsych.getCurrentTrial().stim_array[i].startX=ang.startX;
              jsPsych.getCurrentTrial().stim_array[i].startY=ang.startY;
              jsPsych.getCurrentTrial().stim_array[i].angle=ang.angle;
              jsPsych.getCurrentTrial().stim_array[i].line_length=ang.line_length;
            }
          } 
        else if (event.key === 'ArrowLeft'){
            p-=.03;
            if (p<0) p=0;
            for (let i = 0; i < 3; i++) { 
              ang=makeAng(p,i,[globals.cx+100,globals.cy+sy/2],2);
              jsPsych.getCurrentTrial().stim_array[i].startX=ang.startX;
              jsPsych.getCurrentTrial().stim_array[i].startY=ang.startY;
              jsPsych.getCurrentTrial().stim_array[i].angle=ang.angle;
              jsPsych.getCurrentTrial().stim_array[i].line_length=ang.line_length;
            }
          }
        },
    on_finish: function(data){
        data.resp=p}
  })
}

