package db

import (
	"github.com/RivasCVA/gpt-messenger/messenger/pkg/constants"
	"github.com/RivasCVA/gpt-messenger/messenger/pkg/models"
)

// Verify if the user has trial messages remaining.
// If the phone is unrecognized, then a new trial account will be created for the phone number.
func (db MessengerDB) IsUserInTrial(phone string) (inTrial bool, newUser bool, err error) {
	var trial models.Trial

	newUser = false
	query := db.Model(&trial).Where("phone = ?", phone)

	exists, err := query.Exists()
	if err != nil {
		return false, newUser, err
	} else if !exists {
		// Create a new trial account for the phone number
		trial = models.Trial{
			Phone: phone,
			TextsRemaining: constants.NUM_TRIAL_TEXTS,
		}
		if _, err := db.Model(&trial).Insert(); err != nil {
			return false, newUser, err
		}
		newUser = true
	} else if err := query.First(); err != nil {
		return false, newUser, err
	}

	if trial.TextsRemaining > 0 {
		// Update the remaining trial texts for the user
		trial.TextsRemaining--
		if _, err := query.Update(); err != nil {
			return false, newUser, err
		}
		return true, newUser, nil
	}
	return false, newUser, nil
}

// Verify if the user is subscribed for unlimited access.
func (db MessengerDB) IsUserSubscribed(phone string) (subscribed bool, err error) {
	var user models.User

	query := db.Model(&user).Where("phone = ?", phone)

	exists, err := query.Exists()
	if err != nil {
		return false, err
	} else if !exists {
		return false, nil
	} else if err := query.First(); err != nil {
		return false, err
	}

	return user.Subscribed, nil
}
