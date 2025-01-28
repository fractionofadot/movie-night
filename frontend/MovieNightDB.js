class MovieNightDB {
  constructor() {
    this.users = {0: {
      name: "Default User", 
      scores: {0: 0} 
    } };
    this.movies = {0: {
      title: "The Princess Bride", 
      scores: {0: 0}
    } };    
    this.max_name_length = 32;
    this.max_users = 10;
    this.max_movies = 20;
    this.next_id = 1;
  }

  save() {
    window.localStorage.setItem("MDBUsers", this.users);
    window.localStorage.setItem("MDBMovies", this.movies);
  }



//// Get

  get nextId() {
    return this.next_id++;
  }

  get userIdList() {
    return Object.keys(this.users);
  }

  get movieIdList() {
    return Object.keys(this.movies);
  }

  get allUsers() {
    return this.users;
  }

  get defaultScores() {
    let user_id = Object.keys(this.users)[0]
    return this.users[user_id].scores;
  }  

  get movieIdList() {
    return Object.keys(this.movies);
  }

  get allUsers() {
    return this.users;
  }

  get defaultScores() {
    let user_id = this.userIdList[0];
    return this.users[user_id].scores;
  }

  get nextScore() {
    return Object.keys(this.defaultScores).length;
  }

  getUserById(id) {
    id = parseInt(id);
    return this.users[id];
  }

  getMovieById(id) {
    id = parseInt(id);
    return this.movies[id]
  }

  getUserScores(id) {
    id = parseInt(id);
    return this.users[id].scores;
  }

  getMovieByTitle(title) {

  }



  //// Delete

  deleteUser(id_to_delete) {
    // TODO: delete user's scores from users and movies
    this.users.delete(id_to_delete);
    console.warn("This feature not fully implemented. Scores remain.");
    
  }

  deleteMovie(id_to_delete) {
    // TODO: delete movies's scores from users and movies
    this.movies.delete(id_to_delete);
    console.warn("This feature not fully implemented. Scores remain.");
  }

  //// Add

  addMovie(movie_title) {
    if (! this.movieTitleExists(movie_title)) {
      let movie_id = this.nextId;
      let new_movie = {title: movie_title, scores: {}};
      this.movies[movie_id] = new_movie;
      this.addNewMovieScoreToUsers(movie_id);
      return movie_id;
    }
    throw "Movie title already exists";
  }

  addUser(new_username) {
    if (! this.userNameExists(new_username) ) {
      let user_id = this.nextId;
      let scores = this.defaultScores;
      let new_user = {name: new_username, scores: scores};
      this.users[user_id] = new_user;
      return user_id;
    } else {
      throw "Could not add user id!";
    }
  }

  setMovieScore(user_id, movie_id, new_score) {
    user_id = parseInt(user_id)
    movie_id = parseInt(movie_id)
    new_score = parseInt(new_score)
    this.users[user_id].scores[movie_id] = new_score;
    this.movies[movie_id].scores[user_id] = new_score;
  }

  addNewMovieScoreToUsers(movie_id) {
    movie_id = parseInt(movie_id)
    let new_score = this.nextScore;

    for (uid in this.users) {
      this.setMovieScore(uid, movie_id, new_score)
    }
  }

  //// Update

  renameUser(user_id, new_username) {

  }

  renameMovie(movie_id, new_title) {

  }

  userNameExists(username) {
    for (id in this.users) {
      if (this.users[id].name === username ) {
        return true;
      }
    }
    return false;
  }

  movieTitleExists(movie_title) {
    for (id in this.movies) {
      if (this.movies[id].name === movie_title ) {
        return true;
      }
    }
    return false;
  }



} // end Class

