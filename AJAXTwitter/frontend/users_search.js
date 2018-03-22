class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $(`${el} > label > input`);
    console.log(this.$input);
    console.log("working");
  }
}
module.exports = UsersSearch;
