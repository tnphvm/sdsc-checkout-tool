/* Event listener for form submit. Validation checks will occur and will stop
* default submit actions if invalid entries are found. Otherwise, data is retrieved
* and the page will be redirected to the success page.
*/
$('#formRequest').submit(function(event) {
   console.log("Submit function");

   let forms = document.getElementsByClassName('needs-validation');
   let allValid = true;

   let validation = Array.prototype.filter.call(forms, function(form) {
      console.log("Executed");

      if (form.checkValidity() === false) {
         // console.log("Bad input");
         alert("Invalid input(s). Please double check marked field(s).");
         allValid = false;
         event.preventDefault();
         event.stopPropagation();
         $(window).scrollTop(0);
      }

      form.classList.add('was-validated');
      console.log("Post-validation");

      if (allValid) {
         event.preventDefault();
         retrieveData();
         // window.location.replace("./success-page.html");
         console.log("Submission success!");
      }
      else
         return false;
   });
});


/* The following are event listeners for the radio buttons pertaining to Account Options.
*  When the user have selected, "Yes," for any of the option below Account Options,
*  its respective input field will be marked as required for the user to fill out. 
*/
$('[name="inputVault"]').click(function() {
   let $vaultInput = $("#inputVaultDest");

   if ($("#vaultYes").prop("checked"))
      $vaultInput.attr("required", "");
   else
      $vaultInput.removeAttr("required");
});


$('[name="inputForwardEmail"]').click(function() {
   let $forwardInput = $("#inputForwardDest");

   if ($("#forwardYes").prop("checked"))
      $forwardInput.attr("required", "");
   else
      $forwardInput.removeAttr("required");
});


$('[name="inputKeepUnix"]').click(function() {
   let $unixDate = $("#inputUnixDate");
   let $unixIndex = $('#inputUnixIndex');

   if ($("#unixYes").prop("checked")) {
      $unixDate.attr("required", "");
      $unixIndex.attr("required", "");
   }
   else {
      $unixDate.removeAttr("required");
      $unixIndex.removeAttr("required");
   }
});


$('[name="inputKeepAd"]').click(function() {
   let $adDate = $("#inputAdDate");
   let $adIndex = $('#inputAdIndex');

   if ($("#adYes").prop("checked")) {
      $adDate.attr("required", "");
      $adIndex.attr("required", "");
   }
   else {
      $adDate.removeAttr("required");
      $adIndex.removeAttr("required");
   }
});


/* Function to help retrieve all form data and organize the information
*  into a readable block.
*/
function retrieveData() {
   'use strict';

   let $input = $(".form-control:visible");
   let $label = $("label:visible").not(".form-check-label");
   let $radioButtons = $(".form-check-input:checked");
   let dataBody = "";

   if (($input.length + $radioButtons.length) != $label.length) {
      console.log("Lengths are different.");
      return;
   }

   // Submission guarantees all 5 radio buttons to be checked and in the order
   // it's shown on the form
   let transferAns = $radioButtons[0].value;
   let adAccAns = $radioButtons[1].value;
   let unixAns = $radioButtons[2].value;
   let forwardEmailAns = $radioButtons[3].value;
   let vaultAns = $radioButtons[4].value;

   // Retrieve all input values
   let lastInputCounter = 0;

   for (let i = 0; i < $label.length; i++) {
      let inputVal;

      if ($label[i].getAttribute("for") == "inputTransfer")
         inputVal = transferAns;
      else if ($label[i].getAttribute("for") == "inputKeepAd")
         inputVal = adAccAns;
      else if ($label[i].getAttribute("for") == "inputKeepUnix")
         inputVal = unixAns;
      else if ($label[i].getAttribute("for") == "inputForwardEmail")
         inputVal = forwardEmailAns;
      else if ($label[i].getAttribute("for") == "inputVault")
         inputVal = vaultAns;
      else {
         inputVal = $input[lastInputCounter].value;
         ++lastInputCounter;
      
         if (!inputVal)
            inputVal = "N/A";
      }

      let inputLine = $label[i].textContent + ": " + inputVal;
      dataBody += inputLine;

      if (i != ($label.length - 1))
         dataBody += "\n";
   }

   console.log(dataBody);
}
