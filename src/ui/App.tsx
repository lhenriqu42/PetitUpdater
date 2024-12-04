import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
  const [gitLog, setGitLog] = useState(0)

  useEffect(() => {
    // window.electron.checkUpdates().then((r)=>{
    //   console.log(r);
    // });
  }, []);

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} flex={1}>
      <Button variant='contained'>
        Procurar Atualizações
      </Button>
    </Box>
  )
}

export default App