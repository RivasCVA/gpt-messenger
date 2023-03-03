package db

import "github.com/RivasCVA/gpt-messenger/webapp-server/pkg/models"

func (db MessengerDB) UserExists(email string) (exists bool, err error) {
	var user models.User
	exists, err = db.Model(&user).Where("email = ?", email).Exists()
	return
}

func (db MessengerDB) GetUser(email string) (usr *models.User, err error) {
	var user models.User

	if err := db.Model(&user).Where("email = ?", email).First(); err != nil {
		return nil, err
	}

	return &user, nil
}

func (db MessengerDB) CreateUser(email string, phone string) (usr *models.User, err error) {
	user := models.User{
		Email: email,
		Phone: phone,
		Subscribed: false,
	}

	if _, err := db.Model(&user).Insert(); err != nil {
		return nil, err
	}

	return &user, nil
}
