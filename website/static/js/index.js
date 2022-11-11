var submit_button = document.getElementById("submit");

function create_budget_and_show_id(){
    var budget_name = document.getElementById("name").value;
    var budget_amount = document.getElementById("amount").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/api/create_budget", false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({"budget_name": budget_name, "budget_amount": budget_amount}));
    var budget_id = request.responseText;
    alert("Budget created with id: " + budget_id);
}

submit_button.addEventListener("click", create_budget_and_show_id);
