package models

type UserInfo struct {
	Email			string	`json:"email"`
	Phone			string	`json:"phone"`
	Subscribed		bool	`json:"subscribed"`
}
