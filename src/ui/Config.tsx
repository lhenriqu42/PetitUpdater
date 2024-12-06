import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';

const ConfigPage: React.FC = () => {
  const [config, setConfig] = useState<Config>({ APIPath: '', WEBPath: '', showCompileButton: true });

  useEffect(() => {
    (async () => {
      setConfig(await window.electron.getConfig());
    })();
  }, []);

  const handleUpdateConfig = (key: keyof typeof config, value: unknown) => {
    const newConfig = { ...config, [key]: value };
    window.electron.saveConfig(newConfig);
    setConfig(newConfig);
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" mb={2}>Configurações</Typography>
      <Box border={1} borderRadius={1} padding={1.5} gap={2} display={'flex'} flexDirection={'column'}>
        <Typography variant='subtitle1'>Repositórios</Typography>
        <TextField label={'API'} value={config.APIPath} fullWidth onChange={(e) => handleUpdateConfig('APIPath', e.target.value)} size='small' />
        <TextField label={'REACT'} value={config.WEBPath} fullWidth onChange={(e) => handleUpdateConfig('WEBPath', e.target.value)} size='small' />
      </Box>
      <Box border={1} borderRadius={1} padding={1.5} gap={1} display={'flex'} flexDirection={'column'} mt={1}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={config.showCompileButton}
                onChange={() => {
                  handleUpdateConfig('showCompileButton', !config.showCompileButton);
                }}
              />
            }
            label="Mostrar o botão 'COMPILAR'."
          />
        </FormGroup>
      </Box>
    </Box>
  );
};

export default ConfigPage;
