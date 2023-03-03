package models

type NewUser struct {
	Request
	Phone	string	`json:"phone"`
}
