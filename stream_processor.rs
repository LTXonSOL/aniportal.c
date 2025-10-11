pub struct StreamProcessor {
    pub active_stream: Option<String>,
    pub buffer_size: usize,
}

impl StreamProcessor {
    pub fn new() -> StreamProcessor {
        StreamProcessor {
            active_stream: None,
            buffer_size: 1024,
        }
    }

    pub fn init_stream(&mut self, url: &str) {
        self.active_stream = Some(url.to_string());
    }

    pub fn flush_buffer(&self) {}

    pub fn terminate(&mut self) {
        self.active_stream = None;
    }
}

fn main() {
    let mut sp = StreamProcessor::new();
    sp.init_stream("https://example.com/stream");
    sp.flush_buffer();
    sp.terminate();
}
