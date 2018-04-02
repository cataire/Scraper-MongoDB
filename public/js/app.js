

// $(".note").on("click", function() {
// let headlineId = $(this).attr("data-id");
// $(".note-input").val("");
// console.log("Outside Add Note ", headlineId);
//
// $(".save-note").attr("data-id", headlineId);
//
//   $(".modal").modal();
//
//   $(".save-note").on("click", function() {
//     let headlineId = $(this).attr("data-id");
//     console.log("Inside the function: ", headlineId);
//
//     $.ajax({
//       method: "POST",
//       url: "/headlines/" + headlineId,
//       data: {
//         body: $(".note-input").val()
//       }
//     })
//       // With that done
//       .then(function(data) {
//         // Log the response
//
//         console.log("What server said after POST: ", data);
//       });
//
//   })
// })

$(".save-note").on("click", function() {
  let headlineId = $(this).attr("data-id");
  console.log("Inside the function: ", headlineId);

  $.ajax({
    method: "POST",
    url: "/headlines/" + headlineId,
    data: {
      body: $(".note-input").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response

      console.log("What server said after POST: ", data);
    });

})




$(".one").on("click", function() {
  // Empty the notes from the note section
  $(".notes").empty();
  // Save the id from the p tag
  let headlineId = $(this).attr("data-id");
  console.log("Inside One: " , headlineId);
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/headlines/" + headlineId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
        $(".notes").append(`<h1>Saved Note</h1>`);
        $(".notes").append(`<textarea class="note-input"></textarea>`);
        $(".notes").append(`<button data-id="${data._id}">Save Note</button>`);


      if (data.note) {
        console.log("There is note data", data.note.body);
      
        $(".note-input").val(data.note.body);
      }
    });
});


$(".delete-headline").on("click", function() {
  let headlineId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/saved",
    data: {
      id: headlineId
    }
  }).done(function(data) {
      // Log the response
      console.log("Deleted");
      location.reload();
    });
})



$(".save-headline").on("click", function() {
  let headlineId = $(this).attr("data-id");
  console.log(headlineId);


$.ajax({
  method: "POST",
  url: "/saved",
  data: {
    id: headlineId
  }
})
  // With that done
  .done(function(data) {
    // Log the response
    console.log(data);
    alert("Article saved. You can see it in Saved Articles");
    location.reload();
  });
})
