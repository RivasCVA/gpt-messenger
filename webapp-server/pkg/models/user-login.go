package models

type UserLogin struct {
	Status	bool	`json:"status"`
	Email	string	`json:"email"`
}
