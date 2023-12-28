package main

import (
	"context"
	"fmt"
)

// App struct
type SourceCode struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewSourceCode() *SourceCode {
	return &SourceCode{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *SourceCode) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *SourceCode) Delete(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
