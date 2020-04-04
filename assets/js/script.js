/* MARK TASK AS COMPLETE/DONE  --> change style*/
    function MarkComplete(){

    }

/* VIEW COMMENTS */
    //displays comment div
    function ViewComments(){
        document.getElementById("view-comments-div").style.display = "block";}

    function closebtn(){
        document.getElementById("view-comments-div").style.display = "none";}

        /* ADD COMMENT */

/* EDIT TASK */
    function EditTask(){
        document.getElementById("edit-task-div").style.display = "block"; }

    function cancel(){
        document.getElementById("edit-task-div").style.display = "none"; }

        /* UPDATE TASK */

/* DELETE TASK --> add warning */
    function Delete(){
            if (confirm("Are you sure you want to delete the task?")) {
                //remove from list
            }
            else { //canceled
                // do nothing
            }
      
    }
