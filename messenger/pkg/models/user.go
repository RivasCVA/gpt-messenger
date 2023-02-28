package models

type User struct {
	ID				int		`json:"id"`
	Email			string	`json:"email"`
	Password		string	`json:"password"`
	Phone			string	`json:"phone"`
	Subscribed		bool	`json:"subscribed"`
}
