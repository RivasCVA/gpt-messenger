package models

type UserNotFound struct {
	NotFound	bool	`json:"not_found"`
	Email		string	`json:"email"`
}
