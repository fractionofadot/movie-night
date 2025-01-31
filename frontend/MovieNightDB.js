class MovieNightDB {
  constructor() {
    this.users = {0: {
      name: "Me", 
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
    this.usersStorageId = "MDBUsers";
    this.moviesStorageId = "MDBMovies";
  }

////// Helpers

  save() {
    window.localStorage.setItem(this.usersStorageId, this.users);
    window.localStorage.setItem(this.moviesStorageId, this.movies);
  }

  load() {
    this.users = window.localStorage.getItem(this.usersStorageId);
    this.movies = window.localStorage.getItem(this.moviesStorageId);
  }

  userNameExists(username) {
    for (let id in this.users) {
      if (this.users[id].name === username ) {
        return true;
      }
    }
    return false;
  }

  movieTitleExists(movie_title) {
    for (let id in this.movies) {
      if (this.movies[id].title === movie_title ) {
        return true;
      }
    }
    return false;
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

  getUserScoreList(id) {
    id = parseInt(id);
    const scores = this.users[id].scores;
    let length = Object.keys(scores).length;
    let scoreArray = new Array(length);
    for (let sid in scores) {
      scoreArray[scores[sid]] = parseInt(sid);
    }
    return scoreArray;
  }

  getMovieByTitle(title) {
    for (let id in this.movieIdList) {
      if (this.movies[id].title === title) {
        return this.movies[id];        
      }
    }
  }

  getScore(movie_id) {
    const scores = Array.from(Object.values(this.movies[movie_id].scores));
    let total = 0;
    return scores.reduce( (a,b) => a + b, total);
  }

  get scores() {
    let totalScores = {};
    for (let id in this.movies) {
      totalScores[id] = this.getScore(id);
    }
    return totalScores;
  }

  //// Delete

  deleteUser(id_to_delete) {
    if (this.userIdList.length === 1) { return false }
    for (let id in this.movieIdList) {
      delete this.movies[id].scores[id_to_delete];
    }
    delete this.users[id_to_delete];
    return true;
  }

  deleteMovie(id_to_delete) {
    for (let id in this.userIdList) {
      delete this.users[id].scores[id_to_delete];
    }
    delete this.movies[id_to_delete];
    return true;
  }

  //// Add

  addMovie(movie_title) {
    if (! this.movieTitleExists(movie_title)) {
      let movie_id = this.nextId;
      let new_movie = {title: movie_title, scores: {}};
      this.movies[movie_id] = new_movie;

      // get the last place score and add it to the movie and all users
      let new_score = this.nextScore;

      for (let id in this.users) {
        this.setMovieScore(id, movie_id, new_score)
      }

      return movie_id;
    }

    console.warn("Title already exists.");
    return false;
  }

  addUser(new_username) {
    if (! this.userNameExists(new_username) ) {
      let user_id = this.nextId;
      
      // generate a set of scores for user and add to each movie
      let scores = {};
      let i = 0;
      for (let id in this.movies) {
        scores[id] = i;
        this.movies[id].scores[user_id] = i;
        i = i + 1;
      }

      let new_user = {name: new_username, scores: scores};
      this.users[user_id] = new_user;

      return user_id;
    } 

    console.warn("User name already exists.");
    return false;
  }

  //// Update

  setMovieScore(user_id, movie_id, new_score) {
    user_id = parseInt(user_id)
    movie_id = parseInt(movie_id)
    new_score = parseInt(new_score)

    this.users[user_id].scores[movie_id] = new_score;
    this.movies[movie_id].scores[user_id] = new_score;
  }

  renameUser(user_id, new_username) {
    for (let id in this.users) {
      if (id === user_id) { continue; }
      if (this.users[id].name === new_username) {
        console.warn("User name already exists.");        
        return false;
      }
    }
    this.users[user_id].name = new_username;
  }

  renameMovie(movie_id, new_title) {
    for (let id in this.movies) {
      if (id === movie_id) { continue; }
      if (this.movies[id].title === new_title) {
        console.warn("Movie title already exists.");
        return false;        
      }
    }
    this.movies[movie_id].title = new_title;
  }

 



} // end Class

