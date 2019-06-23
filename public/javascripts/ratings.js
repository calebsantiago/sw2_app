var ratings = [];
function addRatings(rate) {
  this.ratings.push(rate);
}
document.addEventListener('DOMContentLoaded', getRatings);
function getRatings() {
  for (rating in ratings) {
    var starPercentage = (ratings[rating] / 5) * 100;
    var starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    document.querySelector(`.stars-inner`).style.width = starPercentageRounded;
  }
}