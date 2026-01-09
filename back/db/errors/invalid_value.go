package dberrors

import "fmt"

type InvalidValueError struct {
	FieldName string
}

func (err InvalidValueError) Error() string {
	return fmt.Sprintf(
		"'%s' has an invalid value",
		err.FieldName,
	)
}
