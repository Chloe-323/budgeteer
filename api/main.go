package main

import (
	"fmt"
	"log"
	"net/http"
)

func logging(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.Path)
		f(w, r)
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Index page")
}

func login(w http.ResponseWriter, r *http.Request) {
	var username = r.FormValue("username")
	var password = r.FormValue("password")
	fmt.Fprintln(w, "Log in as", username, "with password", password)
}

func register(w http.ResponseWriter, r *http.Request) {
	var username = r.FormValue("username")
	var password = r.FormValue("password")
	fmt.Fprintln(w, "Register as", username, "with password", password)
}

func createBudget(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Create Budget")
}

func listBudgets(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "List Budgets")
}

func view(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "View Budgets")
}

func createCategory(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Create Category")
}

func addTransaction(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Add Transaction")
}

func main() {
	http.HandleFunc("/", logging(index))
	http.HandleFunc("/login", logging(login))
	http.HandleFunc("/register", logging(register))
	http.HandleFunc("/createbudget", logging(createBudget))
	http.HandleFunc("/listbudgets", logging(listBudgets))
	http.HandleFunc("/view", logging(view))
	http.HandleFunc("/createcategory", logging(createCategory))
	http.HandleFunc("/addtransaction", logging(addTransaction))

	http.ListenAndServe(":80", nil)
}
