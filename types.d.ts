interface PullResult extends PullDetail, RemoteMessageResult { }

interface DefaultLogFields {
    hash: string;
    date: string;
    message: string;
    refs: string;
    body: string;
    author_name: string;
    author_email: string;
}

interface PullDetail {
    files: string[];
    insertions: PullDetailFileChanges;
    deletions: PullDetailFileChanges;
    summary: PullDetailSummary;
    created: string[];
    deleted: string[];
}

interface RemoteMessagesObjectEnumeration {
    enumerating: number;
    counting: number;
    compressing: number;
    total: {
        count: number;
        delta: number;
    };
    reused: {
        count: number;
        delta: number;
    };
    packReused: number;
}

interface PullDetailFileChanges {
    [fileName: string]: number;
}

interface RemoteMessageResult<T extends RemoteMessages = RemoteMessages> {
    remoteMessages: T;
}

interface RemoteMessages {
    all: string[];
    objects?: RemoteMessagesObjectEnumeration;
}

interface PullDetailSummary {
    changes: number;
    insertions: number;
    deletions: number;
}

interface LogResult<T = DefaultLogFields> {
    all: ReadonlyArray<T & ListLogLine>;
    total: number;
    latest: (T & ListLogLine) | null;
}

interface Config {
    showCompileButton: boolean;
    APIPath: string;
    WEBPath: string;
}

interface Window {
    electron: {
        checkUpdates: (repo: string) => Promise<LogResult>;
        gitPull: (repo: string) => Promise<PullResult>;
        reCompile: (repo: string, type: string) => Promise<string>;
        reloadMainWindow: () => void;
        getConfig: () => Promise<Config>;
        saveConfig: (config: Config) => void;
        closeConfigWindow: () => void;
    }
}