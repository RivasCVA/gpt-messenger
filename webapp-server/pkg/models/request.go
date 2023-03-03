package models

type Request struct {
	JWT 	string	`json:"jwt"`
	Source	string	`json:"source"`
}
