const img_file_name = ['./media/train.jpg'];
const guide=[[-325,202,0,-32],[325,175,0,-30],[-325,65,0,-32],[325,70,0,-32],[-325,-70,0,-32],[325,-75,0,-29]];



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
  
  
  function vPts(guideNum,dist,length){
    let pts=[0,0,0,0];
    let scale=1/dist;
    pts[0]=scale*guide[guideNum][0]+(1-scale)*guide[guideNum][2];
    pts[1]=scale*guide[guideNum][1]+(1-scale)*guide[guideNum][3];
    pts[2]=pts[0];
    pts[3]=pts[1]-length;
    return(pts);
  }
  
  function pz_makeTrial(par,imgStatus=true){
    let elements=[];
    if (imgStatus==true) {
        elements.push({
          obj_type: 'image',
          file: img_file_name});}
    else elements.push({
      obj_type: 'text',
      origin_center: true,
      startX: 0 ,
      startY: -200,
      content: "",
      font: "24px 'Arial'",
      text_color: '#003300'
    });
    elements.push(line(vPts(par.tGuideNum,par.tDist,par.tLength),'red'));
    elements.push(line(vPts(par.rGuideNum,par.rDist,par.rLength),'red'));
    if (imgStatus==true) {
      elements.push({
        obj_type: 'text',
        origin_center: true,
        startX: 0 ,
        startY: -200,
        content: `${par.trl} of 55`,
        font: "24px 'Arial'",
        text_color: '#003300'
    })}
    const trial = {
      type: jsPsychPsychophysics,
      canvas_height: 500,
      canvas_width: 1000,
      stimuli: elements, 
      response_type: 'key',
      //background_color: '#000000',
      choices: [' '],
      data: {phase: par.phase,guide: par.tGuideNum, targ: par.tLength},
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
  


  function feedbackText(guideNum,dist,length){
    let pts=vPts(guideNum,dist,length);
    return({
      obj_type: 'text',
      origin_center: true,
      startX: pts[0]+15,
      startY: (pts[1]+pts[3])/2,
      content: `${length}`,
      font: "12px 'Arial'",
      text_color: 'white'
    })  
  }
  
  
  function pz_makeFeedback(par){
    let elements=[];
    elements.push(line(vPts(par.tGuideNum,par.tDist,par.tLength),'red'));
    elements.push(line(vPts(par.rGuideNum,par.rDist,par.rLength),'red'));
    elements.push(feedbackText(par.tGuideNum,par.tDist,par.tLength));
    elements.push(feedbackText(par.rGuideNum,par.rDist,par.rLength));
    elements.push({
      obj_type: 'text',
      origin_center: true,
      startX: 0 ,
      startY: -200,
      content: `${par.trl} of 55`,
      font: "24px 'Arial'",
      text_color: '#003300'
    })
    const feedback = {
      type: jsPsychPsychophysics,
      canvas_height: 500,
      canvas_width: 1000,
      stimuli: elements, 
      response_type: 'key',
      background_color: '#777777',
      choices: [' '],
      on_load: function() {
        let c1=jsPsych.data.get().last(1).values()[0].targ;
        let c2=jsPsych.data.get().last(1).values()[0].resp;
        jsPsych.getCurrentTrial().stim_array[0].line_length = c1;
        jsPsych.getCurrentTrial().stim_array[1].line_length= c2;
        jsPsych.getCurrentTrial().stim_array[2].content= `${c1}`;
        jsPsych.getCurrentTrial().stim_array[3].content= `${c2}`;
      }
    };
    return(feedback);
  }


    

  function instructFrame(elements){
    return({
      type: jsPsychPsychophysics,
      canvas_height: 500,
      canvas_width: 1000,
      stimuli: elements, 
      response_type: 'key',
      choices: [' ']});
  }


  function bwText(ins,imgStatus=true){
    let elements=[];
    if (imgStatus==true) {
      elements.push({
        obj_type: 'image',
        file: img_file_name});}
    elements.push({
      obj_type: 'rect',
      origin_center: true,
      startX: -100, 
      startY: -170,
      width: 500, 
      height: 90,
      line_color: '#ffffff',
      fill_color: '#ffffff',});
    elements.push({
      obj_type: 'text',
      origin_center: true,
      startX: -100,
      startY: -170,
      content: `${ins}`,
      font: "18px 'Arial'",
      text_color: 'blue',
      text_space: 25});
    return(elements);
  }
  
  function instructFrame(elements){
    return({
      type: jsPsychPsychophysics,
      canvas_height: 500,
      canvas_width: 1000,
      stimuli: elements, 
      response_type: 'key',
      choices: [' ']});
  }
  

function pz_Instructions0(timeline){
    let el=[];
    timeline.push(instructFrame(bwText("Welcome To Part 1\n (Press Spacebar To Continue)",imgStatus=false)));
    el=bwText("We will present two red bars\n (Press Spacebar To Continue)",imgStatus=false);
    el.push(line(vPts(0,10,30),'red'));
    el.push(line(vPts(0,1.5,20),'red'));
    timeline.push(instructFrame(el));
    el=bwText("Adjust the short bar so its height\n matches the tall bar\n (Press Spacebar To Continue)",imgStatus=false);
    el.push(line(vPts(0,10,30),'red'));
    el.push(line(vPts(0,1.5,20),'red'));
    timeline.push(instructFrame(el));
    el=bwText("Up-Arrow for taller; Down-Arrow for shorter;\n\n (Press Space bar Now to Continue)",imgStatus=false);
    timeline.push(instructFrame(el));
    el=bwText("Remember: Up-Arrow for Taller, Down-Arrow for Shorter\n Always Press Space Bar To Continue\n Let's Try One",imgStatus=false);
    timeline.push(instructFrame(el));
    return(timeline);
}

function pz_Instructions0a(timeline){
    el=bwText("Great.  We are going to a series of trials just like that\n Adjust the short bar height to match the long bar\n (space bar)",imgStatus=false);
    timeline.push(instructFrame(el));  
    el=bwText("But now, there will be a background\n\n (Press Spacebar To Continue)");
    timeline.push(instructFrame(el));  
    el=bwText("We will present two red bars as before\n (Press Spacebar To Continue)");
    el.push(line(vPts(0,10,30),'red'));
    el.push(line(vPts(0,1.5,20),'red'));
    timeline.push(instructFrame(el));
    el=bwText("You do the same thing as before\n Adjust the short bar to match lengths on the screen\n while ignoring the background (Space Bar)");
    el.push(line(vPts(0,10,30),'red'));
    el.push(line(vPts(0,1.5,20),'red'));
    timeline.push(instructFrame(el));  
    el=bwText("Please use only your eyes to judge length\n\n (Space Bar)");
    el.push(line(vPts(0,10,30),'red'));
    el.push(line(vPts(0,1.5,20),'red'));
    timeline.push(instructFrame(el));      
    el=bwText("Bars can appear on tracks or bridge rails");
    el.push(line(vPts(5,5,30),'red'));
    el.push(line(vPts(5,1.2,20),'red'));
    timeline.push(instructFrame(el));
    el=bwText("We are going to do 20 adjustments in the first phase\n And 55 adjustments overall\n (Press Spacebar To Continue)");
    timeline.push(instructFrame(el));
    el=bwText("Remember: Up-Arrow for Taller, Down-Arrow for Shorter\n Remember: Ignore the Background\n Always Press Space Bar To Continue\n");
    timeline.push(instructFrame(el));
    return(timeline);
}

function pz_Instructions1(timeline){
  el=bwText("Good Work\n Now, after every adjustment, we will give you feedback\n (Spacebar to continue)");
  timeline.push(instructFrame(el));
  el=bwText("We will show you the size of the back line and your adjustment\n You can use  this information to improve your adjustments\n (Spacebar to continue)");
  timeline.push(instructFrame(el));
  el=bwText("We will do 15 of these adjustments\n Here We Go!\n (Spacebar to continue)");
  timeline.push(instructFrame(el));
  return(timeline);
}


function pz_Instructions2(timeline){
  el=bwText("Good Work\n There is no feedback for the final 20 adjustments\n (Spacebar to continue)");
  timeline.push(instructFrame(el));
  el=bwText("Even without feedback, try to match the heights\n Here We Go!\n (Spacebar to continue)");
  timeline.push(instructFrame(el));
  return(timeline);
}

function wText(ins){
  let elements=[];
  elements.push({
    obj_type: 'rect',
    origin_center: true,
    startX: 0, 
    startY: 0,
    width: 500, 
    height: 300,
    line_color: '#ffffff',
    fill_color: '#ffffff',});
  elements.push({
    obj_type: 'text',
    origin_center: true,
    startX: 0,
    startY: 0,
    content: `${ins}`,
    font: "18px 'Arial'",
    text_color: 'blue',
    text_space: 25});
  return(elements);
}