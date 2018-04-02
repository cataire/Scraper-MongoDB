$(".note").on("click", function() {
let headlineId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/headlines/" + headlineId,
    data: {
      // Value taken from note textarea
      body: $(".note-input").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log("What server said: ", data);
    });


  $(".modal").modal();

  $(".save-note").on("click", function() {
    console.log("Inside the function:", headlineId);

    $.ajax({
      method: "POST",
      url: "/headlines/" + headlineId,
      data: {
        // Value taken from note textarea
        body: $(".note-input").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log("What server said: ", data);
      });

  })
})

// $(".save-note").on("click", function() {
//   let headlineId = $(this).attr("data-id");
//
//
//   $.ajax({
//     method: "POST",
//     url: "/headlines/" + headlineId,
//     data: {
//       // Value taken from note textarea
//       body: $(".note-input").val()
//     }
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log("What server said: ", data);
//     });
//
// })


$(".one").on("click", function() {
  // Empty the notes from the note section
  $(".notes").empty();
  // Save the id from the p tag
  var headlineId = $(this).attr("data-id");
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/headlines/" + headlineId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $(".notes").append("<h2>Saved Note</h2>");
      // A textarea to add a new note body
      $(".notes").append("<p class='note-area' name='body'></p>");
      // If there's a note in the article
      if (data.note) {
        console.log("There is note data", data.note.body);
        // Place the body of the note in the body textarea
        $(".note-area").text(data.note.body);
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


// $(".one").on("click", function() {
//   let headlineId = $(this).attr("data-id");
//   console.log(headlineId);
//
//
// $.ajax({
//   method: "GET",
//   url: "/headlines/" + headlineId,
//   data: {
//     id: headlineId
//   }
// })
//   // With that done
//   .then(function(data) {
//     // Log the response
//     console.log(data);
//   });
// })

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
    location.reload();
  });
})
