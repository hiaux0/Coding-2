package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	createTable("saying")
	showDbs()
}

func dbConn() (db *sql.DB) {
	dbDriver := "mysql"
	dbUser := "naem"
	dbPass := "pass"
	dbName := "nn"

	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err)
	}

	return db
}

func createTable(tableName string) {
	db := dbConn()
	// createTable, err := db.Prepare("CREATE TABLE ?")
	// if err != nil {
	// 	panic(err)
	// }

	// createTable.Exec(tableName)
	// log.Println(tableName)
	// defer db.Close()

	_, err := db.Exec("CREATE TABLE example ( id integer, data varchar(32) )")
	if err != nil {
		panic(err)
	}
	defer db.Close()
}

// showDbs : show all databases
func showDbs() {
	db := dbConn()
	showDbs, err := db.Query("SHOW DATABASES")
	if err != nil {
		panic(err)
	}

	for showDbs.Next() {
		var name string
		err = showDbs.Scan(&name)
		if err != nil {
			panic(err)
		}
		log.Println(name)
	}
}
