package gateway

import (
	"github.com.br/urieloliveira/eda-kafka/wallet/internal/entity"
)

type ClientGateway interface {
	Get(id string) (*entity.Client, error)
	Save(client *entity.Client) error
}
