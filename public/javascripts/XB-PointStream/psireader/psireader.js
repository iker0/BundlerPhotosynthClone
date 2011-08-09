//var fileName = "Mickey_Mouse.psi";
var values, finalStr = "", chunk = "", chunkStart, chunkEnd = 0;
var tagExists, foundTag = false, rgxBgnTag, rgxEndTag, tagLen, infoStart, infoEnd;

function parseData(){
  values = xhr.responseText;
  chunkStart = chunkEnd;
  chunkEnd = values.length - 1;
  chunk = values.substring(chunkStart, chunkEnd);
  
  bgnTag = bgnLvlStr;                         // stored to use
  endTag = endLvlStr;                         // the .length property
  rgxBgnTag = new RegExp(bgnTag);
  rgxEndTag = new RegExp(endTag);
  tagExists = chunk.search(rgxBgnTag);
  infoEnd = chunk.search(rgxEndTag);
  if(tagExists !== -1){
    tagLen = bgnTag.length + 2;               // +2 for the <level= value and closing bracket
    infoStart = tagExists + tagLen;
    foundTag = true;
  }
  else if(foundTag){
    infoStart = 0;
  }
  if(infoEnd === -1){
    infoEnd = chunk.length - 1;
  }
  finalStr += chunk.substring(infoStart, infoEnd);
}

function change(){
  if(xhr.readyState === 4){
    parseData();
    document.getElementById('print').textContent = finalStr;
  }
  else if(xhr.readyState === 3){
    parseData();
  }
}

function loadPSIFile(fileName){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", fileName, true);
  xhr.onreadystatechange = change;
  xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.send(null);
}
