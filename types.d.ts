interface DefaultLogFields {
    hash: string;
    date: string;
    message: string;
    refs: string;
    body: string;
    author_name: string;
    author_email: string;
}

interface LogResult<T = DefaultLogFields> {
    all: ReadonlyArray<T & ListLogLine>;
    total: number;
    latest: (T & ListLogLine) | null;
}

interface Window {
    electron: {
        checkUpdates: (repo: string) => Promise<LogResult>;
    }
}