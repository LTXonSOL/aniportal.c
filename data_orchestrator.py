class DataOrchestrator:
    def __init__(self):
        self.session = None
        self.tasks = []

    def start_session(self):
        self.session = "active"

    def enqueue_task(self, task_name):
        self.tasks.append(task_name)

    def shutdown(self):
        self.session = None
        self.tasks.clear()

if __name__ == "__main__":
    do = DataOrchestrator()
    do.start_session()
    do.enqueue_task("LoadStream")
    do.shutdown()
