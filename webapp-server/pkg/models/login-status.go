package models

type LoginStatus struct {
	Exists	bool	`json:"exists"`
	Email	string	`json:"email"`
}
