import java.util.ArrayList;

public class NeuralStreamManager {
    private String currentStream;
    private ArrayList<String> tasks;

    public NeuralStreamManager() {
        this.currentStream = "";
        this.tasks = new ArrayList<>();
    }

    public void startStream(String stream) {
        this.currentStream = stream;
    }

    public void queueTask(String task) {
        tasks.add(task);
    }

    public void terminateStream() {
        this.currentStream = "";
        tasks.clear();
    }

    public static void main(String[] args) {
        NeuralStreamManager nsm = new NeuralStreamManager();
        nsm.startStream("https://example.com/stream");
        nsm.queueTask("BufferInit");
        nsm.terminateStream();
    }
}
