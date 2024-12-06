import Store from 'electron-store';

export interface Config {
  showCompileButton: boolean;
  APIPath: string;
  WEBPath: string;
}

const schema = {
  showCompileButton: { type: 'boolean', default: false },
  APIPath: { type: 'string', default: '' },
  WEBPath: { type: 'string', default: '' },
};

const store = new Store<Config>({ schema });

const getConfig = () => store.store;

const updateConfig = (newConfig: Partial<Config>) => {
  store.set(newConfig);
};

export const ConfigProvider = { getConfig, updateConfig };
