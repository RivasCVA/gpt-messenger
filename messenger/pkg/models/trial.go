package models

type Trial struct {
	ID				int		`json:"id"`
	Phone			string	`json:"phone"`
	TextsRemaining	int		`json:"texts_remaining" pg:",use_zero"`
}
