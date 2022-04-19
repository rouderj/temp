
function mlTrial(runLevel,globals){

    function line(par){
        par.obj_type='line';
        par.line_width=2;
        return(par);
    }

    let task=['instMl','instMl','ml'];
    let txt=["Move the Middle Piece To Divide The Line in Half\n Press Left/Right Arrow Keys To Move Middle Piece\n When The Line is Cut in Half, Press Space Bar",
    "Let's do another.\n  We know that you can use your fingers to help find the half way point.\n Please don't do this.  Instead, please use only your eyes to make the judgment",""]
    var elements=[];
    const wingLen=30;
    const mainLen=2*getRandomInt(75,125);
    let start=getRandomInt(-mainLen*1/4,mainLen*1/4)
    const x=getRandomInt(-30,30);
    const y=getRandomInt(-30,30)

    if (runLevel<2) {start=-mainLen/6;}

    const textBox= {
        obj_type: 'text',
        origin_center: true,
        startX: 0,
        startY: -globals.cy*.5,
        content: `${txt[runLevel]}`,
        font: "18px 'Arial'",
        text_color: 'darkblue',
        text_space: 25
    };

    const t1={
        startX : globals.cx+wingLen/2+x+start,
        startY : globals.cy-wingLen/2+y,
        line_length : Math.SQRT2*wingLen,
        angle : -45
    };

    const t2={
        startX : globals.cx+wingLen/2+x+start,
        startY : globals.cy+wingLen/2+y,
        line_length : Math.SQRT2*wingLen,
        angle : 45
    };

    const m={
        startX : globals.cx+x,
        startY : globals.cy+y,
        line_length : mainLen,
        angle : 0
    };

    const left1={
        startX : globals.cx-mainLen/2-wingLen/2+x,
        startY : globals.cy-wingLen/2+y,
        line_length : Math.SQRT2*wingLen,
        angle : 45
    };

    const left2={
        startX : globals.cx-mainLen/2-wingLen/2+x,
        startY : globals.cy+wingLen/2+y,
        line_length : Math.SQRT2*wingLen,
        angle : -45
    };

    const right1={
        startX : globals.cx+mainLen/2-wingLen/2+x,
        startY : globals.cy-wingLen/2+y,
        line_length : Math.SQRT2*wingLen,
        angle : 45
    };

    right2={
        startX : globals.cx+mainLen/2-wingLen/2+x,
        startY : globals.cy+wingLen/2+y,
        line_length : Math.SQRT2*wingLen,
        angle : -45
    };

    elements.push(line(t1));    
    elements.push(line(t2));    
    elements.push(line(m));
    elements.push(line(left1));
    elements.push(line(left2));
    elements.push(line(right1));
    elements.push(line(right2));
    elements.push(textBox);
  



    const trial = {
        type: jsPsychPsychophysics,
        canvas_height: globals.height,
        canvas_width: globals.width,
        stimuli: elements, 
        response_type: 'key',
        background_color: '#FFFFFF',
        choices: [' '],
        data: {task: task[runLevel], ml_len: mainLen, ml_start: start, ml_x:x, ml_y:y},
        key_down_func: function(event){ 
            if (event.key === 'ArrowLeft'){
                jsPsych.getCurrentTrial().stim_array[0].startX-=1;
                jsPsych.getCurrentTrial().stim_array[1].startX-=1;
            } 
            else if (event.key === 'ArrowRight'){
                jsPsych.getCurrentTrial().stim_array[0].startX+=1;
                jsPsych.getCurrentTrial().stim_array[1].startX+=1;
            }
        },
        on_finish: function(data){
            data.resp=jsPsych.getCurrentTrial().stim_array[0].startX-wingLen/2-globals.cx-x}
    };
    return(trial)
}

