package handlers

import (
	"errors"
	"net/http"
	"strings"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/constants"
	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/db"
	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/oauth"
	"github.com/gin-gonic/gin"
	gojwt "github.com/golang-jwt/jwt/v5"
)

type handler struct {
	db *db.MessengerDB
}

type authinfo struct {
	Email string
}

func New(db *db.MessengerDB) handler {
	return handler{db}
}

// Create a gin JSON message response.
func jsonMessage(message string) gin.H {
	return gin.H{"message": message}
}

// Authenticates the user of the request by processing the authorization header.
// Validates the user by the respective issuer of the authorization credentials.
func authenticateUser(header http.Header) (info *authinfo, err error) {
	jwt, err := getJWTFromHeader(header)
	if err != nil {
		return nil, err
	}

	info, err = parseJWT(jwt)
	if err != nil {
		return nil, err
	}

	return info, nil
}

// Gets the JWT Token from the authorization header of a request.
func getJWTFromHeader(header http.Header) (jwt string, err error) {
	authorization := header.Get("Authorization")

	split := strings.Split(authorization, " ")
	if len(split) != 2 {
		return "", errors.New("invalid authorization header")
	}

	scheme := split[0]
	if scheme != "Bearer" {
		return "", errors.New("authorization header must indicate Bearer scheme")
	}

	token := split[1]
	return token, nil
}

// Parses a JWT Token.
// Verifies the token from the issuer, returns an error if invalid.
func parseJWT(jwt string) (info *authinfo, err error) {
	token, _, err := new(gojwt.Parser).ParseUnverified(jwt, gojwt.MapClaims{})
	if err != nil {
		return nil, err
	}

	claimsMap, ok := token.Claims.(gojwt.MapClaims)
	if !ok {
		return nil, errors.New("error extracting claims from jwt")
	}

	issuer := claimsMap["iss"].(string)

	switch issuer {
	case constants.ISSUER_GOOGLE:
		if _, err := oauth.VerifyIDToken(jwt); err != nil {
			return nil, err
		}
	default:
		return nil, errors.New("jwt received from invalid issuer")
	}

	return &authinfo{
		Email: claimsMap["email"].(string),
	}, nil
}
