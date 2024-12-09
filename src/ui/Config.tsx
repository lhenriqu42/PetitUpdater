import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import SourceIcon from '@mui/icons-material/Source';

const ConfigPage: React.FC = () => {
  const [config, setConfig] = useState<Config>({ APIPath: '', WEBPath: '', showCompileButton: false });

  useEffect(() => {
    (async () => {
      setConfig(await window.electron.getConfig());
    })();
  }, []);

  const handleUpdateConfig = (key: keyof typeof config, value: string | boolean) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
  };

  const handleSave = () => {
    window.electron.saveConfig(config);
    window.electron.closeConfigWindow();
  };

  const handleSelectPath = async (key: keyof typeof config) => {
    const selectedPath = await window.electron.selectDirectory();
    if (selectedPath.canceled === false) {
      handleUpdateConfig(key, selectedPath.filePaths[0]);
    }
  };

  return (
    <Box px={2} py={1}>
      <Typography variant="h4" mb={1}>Configurações</Typography>
      <Box border={1} borderRadius={1} padding={1.5} gap={2} display={'flex'} flexDirection={'column'}>
        <Typography variant='subtitle1'>Repositórios</Typography>
        <Box display={'flex'} gap={1}>
          <TextField label={'API'} value={config.APIPath} fullWidth size='small' />
          <Button variant="outlined" onClick={() => handleSelectPath('APIPath')}><SourceIcon /></Button>
        </Box>
        <Box display={'flex'} gap={1}>
          <TextField label={'REACT'} value={config.WEBPath} fullWidth size='small' />
          <Button variant="outlined" onClick={() => handleSelectPath('WEBPath')}><SourceIcon /></Button>
        </Box>
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
