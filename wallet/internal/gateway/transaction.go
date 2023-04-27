package gateway

import "github.com.br/urieloliveira/eda-kafka/wallet/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}
