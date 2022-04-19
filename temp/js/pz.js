function pzTrial(par,globals){

  const img_file_name = './media/train.jpg';
  const guide=[-325,202,0,-32];
  const tDist=10;
  const rDist=1.5;
  var rLength=15;

  const txt=[
    'There are two lines.\n They have the same size.\n\n(Spacebar to continue)',
    'These two lines have different sizes.\n  Adjust the left line so they have the same size\n Use Up/Down Arrow Keys\nSpace bar when done adjusting',
    'Please do one more for practice\nAdjust the left line to make the lines have the same size\nSpace bar when done adjusting',
    'Now the two lines are on top of a picture.\n Your job is the same. Ignore the picure and\n adjust the  left bar so the lines have the same size\n just as before',
    ''];
  const task=['instPz','instPz','instPz','instPz','pz'];

  const textBox= {
    obj_type: 'text',
    origin_center: true,
    startX: globals.cx*.5,
    startY: globals.cy*.1,
    content: `${txt[par.runLevel]}`,
    font: "18px 'Arial'",
    text_color: 'darkblue',
    text_space: 25
  };

  const blankBox={
    obj_type: 'rect',
    origin_center: true,
    startX: globals.cx*.5,
    startY: globals.cy*.1,
    width: globals.cx*.82,
    height: globals.cy*.5,
    fill_color: '#ffffff',
    line_color: 'darkblue'
  }

  function line(pts,color){
      return({
        obj_type: 'line',
        origin_center: true,
        x1: pts[0],
        y1: pts[1],
        x2: pts[2],
        y2: pts[3],
        line_color: color,
        line_width: 2
      })
    }
    
  function vPts(dist,length){
    let pts=[0,0,0,0];
    let scale=1/dist;
    pts[0]=scale*guide[0]+(1-scale)*guide[2];
    pts[1]=scale*guide[1]+(1-scale)*guide[3];
    pts[2]=pts[0];
    pts[3]=pts[1]-length;
    return(pts);
  }
  
  let elements=[];
  
  
  if (par.runLevel>2) {
    elements.push({
          obj_type: 'image',
          file: img_file_name});}
  else {
    elements.push({
      obj_type: 'text',
      origin_center: true,
      startX: 0 ,
      startY: 0,
      content: "",
      font: "24px 'Arial'",
      text_color: '#003300'
    });
  }
  if (par.runLevel==0) {rLength=par.targ};

  elements.push(line(vPts(tDist,par.targ),'red'));
  elements.push(line(vPts(rDist,rLength),'red'));
  if (par.runLevel==3) elements.push(blankBox);
  elements.push(textBox);

  const trial = {
    type: jsPsychPsychophysics,
    canvas_height: globals.height,
    canvas_width: globals.width,
    stimuli: elements, 
    response_type: 'key',
    background_color: '#FFFFFF',
    choices: [' '],
    data: {task: task[par.runLevel],targ: par.targ},
    on_start: function() {
        current=10;},
    key_down_func: function(event){ 
      if (event.key === 'ArrowUp'){
          jsPsych.getCurrentTrial().stim_array[2].line_length += 1;
          jsPsych.getCurrentTrial().stim_array[2].startY -= .5;
        } 
      else if (event.key === 'ArrowDown'){
          jsPsych.getCurrentTrial().stim_array[2].line_length -= 1;
          jsPsych.getCurrentTrial().stim_array[2].startY += .5;
        }
    },
    on_finish: function(data){
        data.resp=jsPsych.getCurrentTrial().stim_array[2].line_length}  
    };
    return(trial);
  }
  
