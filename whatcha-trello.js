/*

Gets a list of cards based on the example from Trello.

*/


var onAuthorize = function() {
    updateLoggedIn();
    $("#output").empty();
    getMe();
    getCards();

};

var getMe = function() {
  Trello.members.get("me", function(member){
    $("#fullName").text(member.fullName);
  });

};

var getCards = function() {
  var $cards = $("<div>")
      .text("Loading Cards...")
      .appendTo("#output");

  // Output a list of all of the cards that the member
  // is assigned to
  Trello.get("members/me/cards", function(cards) {
      console.log(cards);
      $cards.empty();
      $.each(cards, function(ix, card) {
          $("<a>")
          .attr({href: card.url, target: "trello"})
          .addClass("card")
          .text(card.name)
          .appendTo($cards);
      });
  });
};

var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);
};

var logout = function() {
    Trello.deauthorize();
    updateLoggedIn();
};

Trello.authorize({
    interactive:false,
    success: onAuthorize
});

$("#connectLink")
.click(function(){
  console.log('click')
    Trello.authorize({
        type: "popup",
        success: onAuthorize
    })
});

$("#disconnect").click(logout);
