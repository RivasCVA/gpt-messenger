package db

import "github.com/RivasCVA/gpt-messenger/webapp-server/pkg/models"

func (db MessengerDB) GetUser(email string) (usr *models.User, err error) {
	var user models.User

	if err := db.Model(&user).Where("email = ?", email).First(); err != nil {
		return nil, err
	}

	return &user, nil
}
