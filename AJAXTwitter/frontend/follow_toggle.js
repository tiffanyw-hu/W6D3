const APIUtils = require('./apiutil');

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.attr("data-user-id");
    this.followState = this.$el.attr("data-initial-follow-state");
    this.disabled = false;
    if (this.followState === "false") {
      this.followState = false;
    } else {
      this.followState = true;
    }
    this.$el.on('click', (e) => this.handleClick(e));
    this.render();
  }

  render() {
    console.log(this.followState === false);
    if (this.followState === false) {
      this.$el.text('Follow!');
    } else {
      this.$el.text('Unfollow!');
    }
    this.$el.prop('disabled', this.disabled);
  }

  async handleClick(e) {
    e.preventDefault();
    this.disabled = true;
    this.render();
    if (this.followState) {
    await  APIUtils.unfollowUser(this.userId);
    } else {
    await  APIUtils.followUser(this.userId);
    }
    this.followState = !this.followState;
    this.disabled = false;
    this.render();
  }

}


module.exports = FollowToggle;
