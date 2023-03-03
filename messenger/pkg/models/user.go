package models

type User struct {
	ID				int		`json:"id"`
	Email			string	`json:"email"`
	Phone			string	`json:"phone"`
	Subscribed		bool	`json:"subscribed"`
}
