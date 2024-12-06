import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { Result } from './Result';

enum ERepo {
  api = 'C:/Users/User/Documents/GitHub/Petit_API',
  web = 'C:/Users/User/Desktop/Petit_API',
}

function App() {
  const [gitLog, setGitLog] = useState<LogResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const checkUpdatesManually = async () => {
    try {
      setLoading(true);
      const API = await window.electron.checkUpdates(ERepo.api);
      const FRONT = await window.electron.checkUpdates(ERepo.web);
      setGitLog([API, FRONT]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      height={window.innerHeight - 20}
    >
      {loading &&
        <Typography>
          <CircularProgress size={40} />
        </Typography>
      }
      {
        !gitLog && !loading &&
        <Button variant='contained' onClick={checkUpdatesManually}>
          Procurar Atualizações
        </Button>
      }
      {gitLog && gitLog[0] && gitLog[1] && (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3}>
          <Result gitLog={gitLog[0]} title='PetitAPI' repo={ERepo.api} type='api' callback={checkUpdatesManually}/>
          <Result gitLog={gitLog[1]} title='PetitWEB' repo={ERepo.web} type='web' callback={checkUpdatesManually}/>
        </Box>
      )}
    </Box>
  );
}

export default App;
