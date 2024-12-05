import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { Result } from './Result';

function App() {
  const [gitLog, setGitLog] = useState<LogResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const checkUpdatesManually = async () => {
    try {
      setLoading(true);
      const API = await window.electron.checkUpdates('C:/Users/User/Documents/GitHub/Petit_API');
      const FRONT = await window.electron.checkUpdates('C:/Users/User/Desktop/Petit_API');
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
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={15}>
          <Result gitLog={gitLog[0]} title='PetitAPI' />
          <Result gitLog={gitLog[1]} title='PetitWEB' />
        </Box>
      )}
    </Box>
  );
}

export default App;
