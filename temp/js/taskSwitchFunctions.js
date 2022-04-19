const feedback=['<p style="color:red;font-size:24px;">Error :(</p>','<p style="color:darkgreen;font-size:24px;">Correct :)</p>'];

function ts_makeTrial(tsPar){
    let leftText;
    let rightText;
  
    if (tsPar.is5) {
      leftText='v: Less Than 5';
      rightText='n: Greater Than 5';
    } else {
      leftText='v: Odd';
      rightText='n: Even'; 
    }
    const cross = {
        obj_type: 'text',
        startX: 'center',
        startY: 'center',
        content: '+',
        font: "22px 'Arial'",
        text_color: 'white',
        text_space: 100,
        show_end_time: 1000 // disappear this text
      }
    const stim = {
        obj_type: 'text',
        startX: 'center',
        startY: 'center',
        content: tsPar.stim.toString(),
        font: "22px 'Arial'",
        text_color: 'white',
        text_space: 100,
        show_start_time: 2000 // disappear this text
      }
    const left = {
        obj_type: 'text',
        origin_center: true,
        startX: -200,
        startY: 200,
        content: leftText,
        font: "22px 'Arial'",
        text_color: 'white',
        text_space: 100
      }
    const right = {
        obj_type: 'text',
        origin_center: true,
        startX: 200,
        startY: 200,
        content: rightText,
        font: "22px 'Arial'",
        text_color: 'white',
        text_space: 100
      }
    const trial = {
          type: jsPsychPsychophysics,
          stimuli: [cross,left,right,stim],
          choices: ['v', 'n'],
          canvas_width: 1000,
          canvas_height: 500,
          data: {phase: tsPar.phase, is5: tsPar.is5, stim: tsPar.stim},
      }
    return(trial);
  }
  


function isCorrect(tsPar,isV){
  let correct;
  if (tsPar.is5){
    less5=tsPar.stim<5;
    correct= (isV==less5);
  } else{
    odd=(tsPar.stim%2==1);
    correct= (isV==odd);
  }
  return(correct)
}

function ts_makeFeedback(tsPar){
  var trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: feedback[0],
    choices: "NO_KEYS",
    trial_duration: 500,
    on_start: function(){
      isV=Number(jsPsych.data.get().last(1).values()[0].response=='v');
      cor=Number(isCorrect(tsPar,isV));
      console.log("cor  " + cor);
      console.log(tsPar);
      console.log(isV);
      jsPsych.getCurrentTrial().stimulus=feedback[cor];
    }
  }
  return(trial);
};
