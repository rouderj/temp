

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getURLPars(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
//    const pid = urlParams.get('pid');
//    const sid = urlParams.get('sid');
    const pid = urlParams.get('PROLIFIC_PID');
    const sid = urlParams.get('SESSION_ID');
    return({pid: pid,sid: sid})
}

function save_data_csv(taskName,urlP) {
    let save_url = "https://specl.socsci.uci.edu/acquire/data4/lib/php/save_data.php";
    let data_dir = "/home/outside/data4/"+taskName;
    var file_name = taskName + '_p' + urlP.pid + '_s' + urlP.sid;
    jsPsych.data.addProperties({pid: urlP.pid});
    jsPsych.data.addProperties({sid: urlP.sid});
    var dat=jsPsych.data.get();
    jQuery.ajax({
        type: 'post',
        cache: false,
        async: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.csv', // the file type should be added
            exp_data: dat.csv()
        }
    });
}

function finish(){
    DOM_target = document.querySelector('#jspsych-content');
    DOM_target.innerHTML = '<p style="font-size:200%;"><strong>Thank You</strong></p>';
    jsPsych.pluginAPI.cancelAllKeyboardResponses();
    jsPsych.pluginAPI.clearAllTimeouts();
  }


function insText(ins,globals){
    let elements=[];
    elements.push({
      obj_type: 'rect',
      origin_center: true,
      startX: 0, 
      startY: 0,
      width: globals.width, 
      height: globals.height,
      line_color: 'black',
      fill_color: '#ffffff',});
    elements.push({
      obj_type: 'text',
      origin_center: true,
      startX: 0,
      startY: 0,
      content: `${ins}`,
      font: "18px 'Arial'",
      text_color: 'darkblue',
      text_space: 25});
    return({
        type: jsPsychPsychophysics,
        background_color: 'blue',
        canvas_height: globals.height,
        canvas_width: globals.width,
        stimuli: elements, 
        response_type: 'key',
        data: {task: 'inst'},
        choices: [' ']});
}



