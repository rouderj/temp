function pogTrial(par,globals){
    var elements=[];
    var task=['instPog','instPog','instPog','pog'];
    var txt=["Move the Right Piece Up and Down\n To Make A Single Straight Line\nPress Up/Down Arrow Keys\n When The Line is Straight, Press Space Bar",
            "Now, the grey piece is missing.\nYour job is the same. Move the right piece so that\n if the missing grey piece was there, there would be a single, straight line.","Do the same while ignore the vertical lines\n Please use only your eyes",""]

    const textBox= {
            obj_type: 'text',
            origin_center: true,
            startX: -globals.cx*.5,
            startY: -globals.cy*.5,
            content: `${txt[par.runLevel]}`,
            font: "18px 'Arial'",
            text_color: 'darkblue',
            text_space: 25
    };

    function convert(pts,pos){
        a=(pts[0]-pts[2]);
        b=(pts[1]-pts[3]);
        return({
            startX: (pts[0]+pts[2])/2+pos[0],
            startY: (pts[1]+pts[3])/2+pos[1],
            line_length: Math.sqrt((a*a)+(b*b)),
            angle: 180*Math.atan(b/a)/Math.PI
        })
    }


    function line(ang,color){
        return({
          obj_type: 'line',
          startX: ang.startX,
          startY: ang.startY,
          line_length: ang.line_length,
          angle: ang.angle,
          line_color: color,
          line_width: 2
        })
    }

    function makePts(x,y){
        pts=[0,0,0,0];
        pts[0]=x;
        pts[1]=y;
        if (x<0) {
            pts[2]=x-100;
            pts[3]=y+100;}
        else {
            pts[2]=x+100;
            pts[3]=y-100;}
        return(pts);
    }

    
    elements.push(line(convert(makePts(40,-40),[globals.cx,globals.cy]),'red'));
    if (par.runLevel<3) {
        par.targ=-30;
    }
    if (par.runLevel==0) {
        elements.push(line(convert([-40,40,40,-40],[globals.cx,globals.cy+par.targ]),color='grey'));
    }
    if (par.runLevel>1) {
        elements.push(line(convert([-40,-200,-40,200],[globals.cx,globals.cy]),'red'));
        elements.push(line(convert([40,-200,40,200],[globals.cx,globals.cy]),'red'));}
    elements.push(line(convert(makePts(-40,40),[globals.cx,globals.cy+par.targ]),'red'))
    elements.push(textBox);

    var targY=convert(makePts(40,-40),[globals.cx,globals.cy+par.targ]).startY;

    const trial = {
        type: jsPsychPsychophysics,
        canvas_height: globals.height,
        canvas_width: globals.width,
        stimuli: elements, 
        response_type: 'key',
        background_color: '#FFFFFF',
        choices: [' '],
        data: {task: task[par.runLevel], targ:targY},
        key_down_func: function(event){ 
            if (event.key === 'ArrowUp'){
                jsPsych.getCurrentTrial().stim_array[0].startY-=1;
            } 
            else if (event.key === 'ArrowDown'){
                jsPsych.getCurrentTrial().stim_array[0].startY+=1;
            }
        },
        on_finish: function(data){
            data.resp=jsPsych.getCurrentTrial().stim_array[0].startY;
        }
    }
    return(trial);
}