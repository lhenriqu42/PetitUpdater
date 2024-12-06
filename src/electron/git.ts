import { LogResult, PullResult, SimpleGit, simpleGit } from 'simple-git';
import { exec } from "child_process";
import path from "path";

enum EType {
  api = 'api',
  web = 'web',
}

export const checkUpdates = async (repo: string): Promise<LogResult> => {
  const git = simpleGit(repo);
  try {
    await switchToBranch(git, 'production');
    await git.fetch();

    const logs = await git.log(['HEAD..remotes/origin/production']);

    return logs;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const gitPull = async (repo: string): Promise<PullResult> => {
  const git = simpleGit(repo);

  try {
    await switchToBranch(git, 'production');
    const pullResult = await git.pull();

    return pullResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const reCompile = async (repo: string, type: EType): Promise<string> => {
  try {
    const commandline = type === EType.api ? "yarn" : "yarn build";
    const repoPath = path.resolve(repo);

    const result = await executeCommand(commandline, repoPath);
    console.log(`command executed: ${commandline}\nresult: ${result}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const executeCommand = (command: string, cwd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      } else if (stderr) {
        reject(`Stderr: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

const switchToBranch = async (git: SimpleGit, branch: string) => {
  try {
    const branchSummary = await git.branch();

    // Verifica se a branch existe localmente
    console.log(branchSummary.all, branchSummary.all.includes(branch));
    if (!branchSummary.all.includes(branch)) {
      console.log(`Branch '${branch}' não encontrada localmente. Tentando buscar do remoto...`);

      // Atualiza informações do repositório remoto
      await git.fetch();

      const remoteBranch = `remotes/origin/${branch}`;

      // Verifica se a branch existe remotamente
      if (branchSummary.all.includes(remoteBranch)) {
        console.log(`Branch '${branch}' encontrada no remoto. Criando localmente...`);
        await git.checkoutBranch(branch, remoteBranch);
      } else {
        throw new Error(`Branch '${branch}' não encontrada localmente nem no remoto.`);
      }
    } else {
      console.log(`Alternando para a branch '${branch}'...`);
      await git.checkout(branch);
    }

    console.log(`Agora na branch: ${branch}`);
  } catch (error) {
    console.error(`Erro ao alternar para a branch '${branch}':`, error);
    throw error;
  }
};
