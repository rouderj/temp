function tiltTrial(par,globals){

    var task=['instTilt','instTilt','instTilt','tilt'];
    var targImg = par.targ+10;
    var imgNames = [];
    for (let i=-10;i<11;i++){
        imgNames.push(['media/Surround-20Target'+i+'.png','media/Surround20Target'+i+'.png']);
    };

    const txt=['Focus on the inner patch.\n\n(Space bar to continue)',
            'Here is a black line\n\n(Space bar to continue)',
            'Adjust the Angle of Line\nTo Match Inner Patch\nWith Left/Right Arrows Keys\nPress Space bar when matched',''];

    var elements=[];
    
    const textBox= {
        obj_type: 'text',
        origin_center: true,
        startX: globals.cx*.5,
        startY: 0,
        content: `${txt[par.runLevel]}`,
        font: "18px 'Arial'",
        text_color: 'darkblue',
        text_space: 25
    };

    elements.push({
      obj_type: 'image',
      file: imgNames[targImg][par.back],
      startX: globals.cx-100,
      startY: globals.cy});
  
    
    if (par.runLevel>0) elements.push({
    obj_type: 'line',
    line_length: 90,
    startX: globals.cx+100,
    startY: globals.cy,
    line_color: 'black',
    line_width: 2,
    angle: 90});

    elements.push(textBox);
  
   const trial={
        type: jsPsychPsychophysics,
        canvas_height: globals.height,
        canvas_width: globals.width,
        stimuli: elements, 
        response_type: 'key',
        background_color: '#FFFFFF',
        choices: [' '],
        data: {task: task[par.runLevel],targ: par.targ, back:par.back},
        key_down_func: function(event){ 
                if (event.key === 'ArrowLeft'){
                    jsPsych.getCurrentTrial().stim_array[1].angle-=1;
                    if (jsPsych.getCurrentTrial().stim_array[1].angle<45)
                        {jsPsych.getCurrentTrial().stim_array[1].angle=45;}
                } 
                else if (event.key === 'ArrowRight'){
                    jsPsych.getCurrentTrial().stim_array[1].angle+=1;
                    if (jsPsych.getCurrentTrial().stim_array[1].angle>135)
                        {jsPsych.getCurrentTrial().stim_array[1].angle=135;}                    
                }
        },
        on_finish: function(data){
            data.resp=jsPsych.getCurrentTrial().stim_array[1].angle-90}
    }
    return(trial);
}