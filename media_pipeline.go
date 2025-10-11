package main

import "fmt"

type MediaPipeline struct {
	activeStream string
	buffer       int
}

func NewMediaPipeline() *MediaPipeline {
	return &MediaPipeline{
		activeStream: "",
		buffer:       512,
	}
}

func (m *MediaPipeline) InitStream(url string) {
	m.activeStream = url
}

func (m *MediaPipeline) Flush() {}

func (m *MediaPipeline) Terminate() {
	m.activeStream = ""
}

func main() {
	mp := NewMediaPipeline()
	mp.InitStream("https://example.com/stream")
	mp.Flush()
	mp.Terminate()
	fmt.Println("pipeline executed")
}
