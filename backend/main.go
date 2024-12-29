package main

import (
        "fmt"
        "log"
        "net/http"

        "github.com/gorilla/mux"
)

func createSessionHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Create Session Endpoint\n")
}

func addMovieToSessionHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Add Movie to Session Endpoint\n")
}

func deleteMovieFromSessionHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Delete Movie from Session Endpoint\n")
}

func updateMovieInSessionHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Update Movie in Session Endpoint\n")
}

func listMoviesInSessionHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "List Movies in Session Endpoint\n")
}

func generateSessionReportHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Generate Session Report Endpoint\n")
}

func main() {
        r := mux.NewRouter()

        r.HandleFunc("/session/create", createSessionHandler).Methods("POST")
        r.HandleFunc("/session/movie/add", addMovieToSessionHandler).Methods("POST")
        r.HandleFunc("/session/movie/delete", deleteMovieFromSessionHandler).Methods("DELETE")
        r.HandleFunc("/session/movie/update", updateMovieInSessionHandler).Methods("PUT")
        r.HandleFunc("/session/movie/list", listMoviesInSessionHandler).Methods("GET")
        r.HandleFunc("/session/report", generateSessionReportHandler).Methods("GET")

        fmt.Println("Server listening on :8080")
        log.Fatal(http.ListenAndServe(":8080", r))
}
