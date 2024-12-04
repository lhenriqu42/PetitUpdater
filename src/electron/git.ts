import { LogResult, simpleGit } from 'simple-git';

export const checkUpdates = async (): Promise<LogResult> => {
    const git = simpleGit('C:/Users/User/Desktop/Petit_API');

    try {
        await git.fetch();

        const logs = await git.log(['HEAD..origin/main']);

        return logs;
    } catch (error) {
        console.log(error);
        throw error;
    }
}