$(".note").on("click", function() {
  let headlineId = $(this).attr("data-id");

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

$(".save-headline").on("click", function() {
  $.ajax({
    method: "GET",
    url: "/saved"
    }).then(function(data) {
        // Log the response
        console.log(data);
        location.reload();
      })
});

$(".delete-headline").on("click", function() {
  let headlineId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/saved",
    data: {
      id: headlineId
    }
  })
    // With that done
    .then(function() {
      // Log the response
      console.log("Deleted");
      location.reload();
    });
})


$(".one").on("click", function() {
  let headlineId = $(this).attr("data-id");
  console.log(headlineId);


$.ajax({
  method: "GET",
  url: "/headlines/" + headlineId,
  data: {
    id: headlineId
  }
})
  // With that done
  .then(function(data) {
    // Log the response
    console.log(data); 
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
  .then(function(data) {
    // Log the response
    console.log(data);
  });
})
