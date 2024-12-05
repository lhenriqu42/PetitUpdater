import { LogResult, simpleGit } from 'simple-git';

export const checkUpdates = async (repo: string): Promise<LogResult> => {
    const git = simpleGit(repo);

    try {
        await git.fetch();

        const logs = await git.log(['HEAD..origin/main']);

        return logs;
    } catch (error) {
        console.log(error);
        throw error;
    }
}