package oauth

import (
	"context"
	"os"

	"google.golang.org/api/idtoken"
)

func VerifyIDToken(IDToken string) (info map[string]interface{}, err error) {
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	payload, err := idtoken.Validate(context.Background(), IDToken, clientID)
	if err != nil {
		return nil, err
	}
	return payload.Claims, nil
}
