class MovieNightDB {
  constructor() {
    this.db = {users: [{id: 0, name: "defaultUser", scores: {0: 0}}], movies: [{id: 0, title: "The Princess Bride"}]};
    this.max_name_length = 32;
    this.max_users = 10;
    this.max_movies = 20;
  }

  addUser(new_username) {
    if (! this.userNameExists(new_username) ) {
      let user_id = this.createNewUserId();
      let scores = this.createDefaultScores();
      let new_user = {id: user_id, name: new_username, scores: scores};
      this.db.users.push(new_user);
      return true;
    } else {
      return false; 
    }
  }

  removeUser(id_to_remove) {

  }

  addMovie(movie_title) {
    if (! this.movieTitleExists(movie_title)) {
      let movie_id = this.createNewMovieId();
      let new_movie = {id: movie_id, title: movie_title};
      this.db.movies.push(new_movie);
      this.addNewMovieScoreToUsers(movie_id);
      return true;
    }
    return false;
  }

  removeMovie(id_to_remove) {

  }

  renameUser(user_id, new_username) {

  }

  renameMovie(movie_id, new_title) {

  }

  userIdList() {
    return this.db.users.map(user => user.id);
  }

  movieIdList() {
    return this.db.movies.map(movie => movie.id);
  }

  userNameExists(username) {
    return Object.values(this.db.users).includes(username);
  }

  movieTitleExists(movie_title) {
    return Object.values(this.db.movies).includes(movie_title);
  }

  createNewUserId() {
    for (var i = this.db.users.length; i >= 0; i--) {
      if (! Object.values(this.userIdList).includes(i)) {
        return i;
      }
    }
    return this.db.users.length;
  }

  createNewMovieId() {
    for (var i = this.db.movies.length - 1; i >= 0; i--) {
      if (! Object.values(this.movieIdList()).includes(i)) {
        return i;
      }
    }
    return this.db.movies.length;
  }

  createDefaultScores() {
    return this.db.users[0].scores;
  }

  addNewMovieScoreToUsers(movie_id) {
    for (var i = this.db.users.length - 1; i >= 0; i--) {
      let new_score = keys(this.db.users[i].scores).length;
      this.db.users[i].scores[movie_id] = new_score;
    }
  }

} // end Class

