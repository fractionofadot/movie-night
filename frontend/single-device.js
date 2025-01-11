// crud user
// crud movie
// crud movie ranking

// all locally on one device



// function initDB(DBName) {
// 	let db;

// 	const request = window.indexedDB.open(DBName);

// 	request.onerror = (event) => {
// 	  // Do something with request.error!
// 		console.log("Could not open DB.", event.target.error);
// 	};
// 	request.onsuccess = (event) => {
// 		db = event.target.result;
// 		console.log(db);
// 		const objectStore = db.createObjectStore("users", { keyPath: "name" });
// 		db.onerror = (event) => {
//   			console.error(`Database error: ${event.target.error?.message}`);
// 		};

// 	};
// }

// let database = {users: [{name: "username", rankings: [0,1,2]}], movies: [{id: 0, title: "A Christmas Carol", score: 0}]};

function save(db) {
	window.localStorage.setItem(db);
}

function addUser(username, db) {
	let movie_ids = db.movies.map(movie => movie.id);
  if (! Object.values(db.users).includes(username) ) {
    db.users.push({name: username, rankings: movie_ids})
  } else {
  	return false;
  };
  return db;
}

function deleteUserByName(username, db) {
	if (db.users.length === 1) {
		console.log("Error: Can not delete the user. Must have at least one user.");
		return false;
	}
	for (var i = db.users.length - 1; i >= 0; i--) {
		if (db.users[i].name === username) {
			db.users.splice(i,1);
		} 
	}
	return db;
}

function changeUserName(username, new_username, db) {
	for (var i = db.users.length - 1; i >= 0; i--) {
		if (db.users[i].name === username) {
			db.users[i].name = new_username;
		} 
	}
	return db;
}

function getUserByName(username, db) {
	for (var i = db.users.length - 1; i >= 0; i--) {
		if (db.users[i].name === username) {
			return db.users[i];
		} 
	}
}

function createMovie(new_title, db) {
	let movie_titles = db.movies.map(movie => movie.title);
	let movie_ids = db.movies.map(movie => movie.id);
	let new_id;

	if (! movie_titles.includes(new_title) ) {

		for (var i = movie_ids.length; i >= 0; i--) {
			if (! movie_ids.includes(i)) {
				new_id = i;
				break;
			}
		}
	
	  db.movies.push({id: new_id, title: new_title, score: movie_ids.length});

	  // Add the new movie id to all user rankings
	  db.users.map(user => user.rankings.push(new_id));

	  return {response: "success"};
	};

	return {response: "error"};
	
}

function deleteMovieById(movie_id, db) {
	for (var i = db.movies.length - 1; i >= 0; i--) {
		if (db.movies[i].id === movie_id) {
			db.movies.splice(i,1);
			// also remove from user rankings
			for (var j = db.users.length - 1; j >= 0; j--) {
				let ranks = db.users[j].rankings;
				ranks.splice( ranks.findIndex( id => id === movie_id ), 1 );
			}
		} 
	}
	return db;
}

function changeMovieTitle(movie_id, new_title, db) {
	for (var i = db.movies.length - 1; i >= 0; i--) {
		if (db.movies[i].id === movie_id) {
			db.movies[i].title = new_title;
		} 
	}
	return db;
}

function getMovieById(movie_id, db) {
	for (var i = db.movies.length - 1; i >= 0; i--) {
		if (db.movies[i].id === parseInt(movie_id)) {
			return db.movies[i];
		}
	}
	console.log("Error: could not find movie with id", movie_id);
}

function getMovieByTitle(movie_title, db) {
	for (var i = db.movies.length - 1; i >= 0; i--) {
		if (db.movies[i].title === movie_title) {
			return db.movies[i];
		} 
	}
}

function tabulateRankings(db) {
	for (var i = db.movies.length - 1; i >= 0; i--) {
		let movie = db.movies[i];
		movie.score = 0;
		for (var j = db.users.length - 1; j >= 0; j--) {
			let rankings = db.users[j].rankings;
			movie.score = movie.score + rankings.findIndex( id => id === parseInt(movie.id) );
		}
	}
}

function updateUserRankings(username, new_rankings, db) {
	for (var i = db.users.length - 1; i >= 0; i--) {
		if (db.users[i].name === username) {
			return db.users[i].rankings = new_rankings;
		} 
	}
}

function getUserMovieRank(username, movie_id, db) {
	user = getUserByName(username, db);
	return user.rankings.findIndex( id => id === movie_id );
}



