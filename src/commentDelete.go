package main

import (
	"context"
	"strings"
)

type SourceCode struct {
	ctx context.Context
}

func NewSourceCode() *SourceCode {
	return &SourceCode{}
}

func (a *SourceCode) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *SourceCode) Delete(input string) string {
	var result []string
	lines := strings.Split(input, "\n")


	for _, line := range lines {
		if idx := strings.Index(line, ";"); idx != -1 {
			line = line[:idx]
		}
		if (line != "") {
			result = append(result, line)
		}
	}

	return strings.Join(result, "\n")
}
