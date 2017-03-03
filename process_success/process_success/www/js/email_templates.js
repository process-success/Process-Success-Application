function generate(){
    var title = document.getElementById("types");
    var temp = title.options[title.selectedIndex].text;
    var text = document.getElementById("template");
    text.innerHTML = title.options[title.selectedIndex].value;
  }