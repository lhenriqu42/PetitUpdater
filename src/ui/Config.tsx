import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';

const ConfigPage: React.FC = () => {
  const [config, setConfig] = useState<Config>({ APIPath: '', WEBPath: '', showCompileButton: false });

  useEffect(() => {
    (async () => {
      setConfig(await window.electron.getConfig());
    })();
  }, []);

  const handleUpdateConfig = (key: keyof typeof config, value: unknown) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
  };

  const handleSave = () => {
    window.electron.saveConfig(config);
    window.electron.closeConfigWindow();
  };

  return (
    <Box px={2} py={1}>
      <Typography variant="h4" mb={1}>Configurações</Typography>
      <Box border={1} borderRadius={1} padding={1.5} gap={2} display={'flex'} flexDirection={'column'}>
        <Typography variant='subtitle1'>Repositórios</Typography>
        <TextField label={'API'} value={config.APIPath} fullWidth onChange={(e) => handleUpdateConfig('APIPath', e.target.value)} size='small' />
        <TextField label={'REACT'} value={config.WEBPath} fullWidth onChange={(e) => handleUpdateConfig('WEBPath', e.target.value)} size='small' />
      </Box>
      <Box border={1} borderRadius={1} py={0.5} px={2} gap={1} display={'flex'} flexDirection={'column'} mt={1}>
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
      <Button variant='contained' onClick={handleSave} sx={{ mt: 1 }} >
        Salvar
      </Button>
    </Box>
  );
};

export default ConfigPage;
