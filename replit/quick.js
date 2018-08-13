"Say Hello".includes("hello") /*?*/

$('.dd_entry_table').click(function (ev) {




$('#6536e1f380ef14ebfbf39962292803b4828cf5f7vp_vp').click(function (ev) {
  console.log(ev)
  // ev.stopPropagation();
})

0  canvas#570ed5c150367a28059fe8698a393d5f6fe49e3cvp_vp
1  div#570ed5c150367a28059fe8698a393d5f6fe49e3cvp
2  td
3  tr
4  table
5  div#570ed5c150367a28059fe8698a393d5f6fe49e3c.au-target.gc-no-user-select
6  div.table-preview-component.au-target
7  div.table-element-component.au-target
8  table-element.au-target
9  div.dd_entry_cell_wrapper.bootstrap
10  div#container_938302_4.dd_entry_cell.el-type-4.dditem_938302.ui-draggable.dd_entry_table_element
11  div.dd_entry_row    // xxxx
12  div.dd_entry_table
13  div.epb_content_container // xxx
14  div.epb_content_wrap  
15  div#epb_entry_938302.epb_entry.ng-scope.rendered /// xxx         .rendered xxx 
16  div.ng-scope // ooo
17  div#epb_container     // ooo
18  div#eln_project_content.eln_project_content.eln_row.eln_scroll-y.ng-scope   //
19  div#ng-app.ng-scope
20  body.froala-editor.entry-scroll-not-bottom.entry-scroll-top
21  html
22  document

html.addEventListener('mousedown', function (event) {
  window.addEventListener('click', function (event) {
    console.log('​event', event);
    console.log(this)
    event.stopPropagation();
  }, true);

  // document.getElementsByTagName('body')[0].addEventListener('mousedown', function (event) {
    document.getElementById('epb_container').addEventListener('mousedown', function (event) {
  document.getElementsByClassName('rendered')[0].addEventListener('mousedown', function (event) {
    console.log('​event', event);
    console.log(this)
    event.stopPropagation();
  }, true);