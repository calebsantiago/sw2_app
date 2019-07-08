var ratings = [];
class Rating {
  constructor(id, rate) {
      this.id = id;
      this.rate = rate;
  }
}
function addRatings(id, rate) {
  if (rate == null) {
    rate = 0;
  }
  var rating = new Rating(id, rate);
  this.ratings.push(rating);
}
document.addEventListener('DOMContentLoaded', getRatings);
function getRatings() {
  for (rating in ratings) {
    var starPercentage = (ratings[rating].rate / 5) * 100;
    var starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    document.getElementById(ratings[rating].id).style.width = starPercentageRounded;
  }
}