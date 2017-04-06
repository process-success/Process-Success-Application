//
// var get_work_order_issues = function(work_order_name) {
//     window.frappe.call({
//             method: "process_succes.ps_core.doctype.issue.issue.get_issues_for_doctype",
//             args: {
//                 doctype: "Issue",
//                 fields: ["*"],
//                 filters: [["work_order", "=", work_order_name]]
//             },
//             callback: function (issue_docs) {
//                 var issue_p = $("#issues").find("p");
//                 var issue_list = $('ul.mylist')
//                 $.each(issue_docs, function (doc) {
//                     var li = $('<li/>')
//                         .attr('data-toggle', 'popover')
//                         .attr('title', "Issue Description")
//                         .attr('data-content', doc.issue)
//                         .text(doc.title)
//                         .appendTo(issue_list);
//                 });
//                 issue_p.append(issue_list)
//             }
//         });
//     }
//
//
