var rows_per_page = {{pages}}
  var pager = new Pager('tablepaging', rows_per_page);
  pager.init();
  pager.showPageNav('pager', 'pageNavPosition');
  pager.showPage(1);


  function find(){
      var new_tbody = document.createElement('tbody');

      var filter = document.getElementById("find").value;
      {% for cont in rowContent:%}
        var all = [];
        all.push("{{cont['work_order']}}");
        all.push("{{cont['description']}}");
        all.push("{{cont['status']}}");
        all.push("{{cont['vineyard name']}}");
        all.push("{{cont['employee_name']}}");

        var found = false;
        for (var i=0; i<all.length; i++){
          found = found || (all[i].indexOf(filter) !== -1);
        }

        if (found){
          row = document.createElement("tr");
          cell1= document.createElement("td");
          createNewCell(cell1,"{{cont['work_order']}}");
          row.appendChild(cell1);

          cell1= document.createElement("td");
          createNewCell(cell1, "{{cont['description']}}");
          row.appendChild(cell1);

          cell1= document.createElement("td");
          createNewCell(cell1, "{{cont['status']}}");
          row.appendChild(cell1);

          cell1= document.createElement("td");
          createNewCell(cell1, "{{cont['vineyard name']}}");
          row.appendChild(cell1);

          cell1= document.createElement("td");
          createNewCell(cell1, "{{cont['employee_name']}}");
          row.appendChild(cell1);

          
          new_tbody.appendChild(row);
        }
         
      {% endfor %}

      var old_tbody = document.getElementsByTagName("tbody").item(0);
      old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
      var rows_per_page = {{pages}}
      var pager = new Pager('tablepaging', rows_per_page);
      pager.init();
      pager.showPageNav('pager', 'pageNavPosition');
      pager.showPage(1);
  }

  function createNewCell(cell1, content_cell){
    textNode1 = document.createTextNode(content_cell);
    cell1.appendChild(textNode1);
  }



  function Pager(tableName, itemsPerPage) {

    this.tableName = tableName;

    this.itemsPerPage = itemsPerPage;

    this.currentPage = 1;

    this.pages = 0;

    this.inited = false;

    this.showRecords = function(from, to) {

    var rows = document.getElementById(tableName).rows;

    // i starts from 1 to skip table header row

    for (var i = 1; i < rows.length; i++) {

      if (i < from || i > to)

        rows[i].style.display = 'none';

      else

        rows[i].style.display = '';

    }

  }

this.showPage = function(pageNumber) {

  if (! this.inited) {

    alert("not inited");

    return;

  }

  var oldPageAnchor = document.getElementById('pg'+this.currentPage);

  oldPageAnchor.className = 'pg-normal';

  this.currentPage = pageNumber;

  var newPageAnchor = document.getElementById('pg'+this.currentPage);

  newPageAnchor.className = 'pg-selected';

  var from = (pageNumber - 1) * itemsPerPage + 1;

  var to = from + itemsPerPage - 1;

  this.showRecords(from, to);

}

this.prev = function() {

  if (this.currentPage > 1)

  this.showPage(this.currentPage - 1);

}

this.next = function() {

  if (this.currentPage < this.pages) {

  this.showPage(this.currentPage + 1);

  }

}

this.init = function() {

  var rows = document.getElementById(tableName).rows;

  var records = (rows.length - 1);

  this.pages = Math.ceil(records / itemsPerPage);

  this.inited = true;

}

this.showPageNav = function(pagerName, positionId) {

  if (! this.inited) {

    alert("not inited");

    return;

  }

  var element = document.getElementById(positionId);

  var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal"> « Prev </span> ';

  for (var page = 1; page <= this.pages; page++)

  pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> ';

  pagerHtml += '<span onclick="'+pagerName+'.next();" class="pg-normal"> Next »</span>';

  element.innerHTML = pagerHtml;

}

}
