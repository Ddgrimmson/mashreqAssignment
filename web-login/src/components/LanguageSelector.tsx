// src/components/LanguageSelector.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'th', name: 'ไทย' },
    { code: 'hn', name: 'हिन्दी' }
];

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [languageCode, setLanguageCode] = useState('en');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLanguageCode(code)
    handleClose();
  };

  return (
    <div>
      <IconButton data-testid="language-buton" color="inherit" onClick={handleOpen}>
        <LanguageIcon />
      </IconButton>
      <Modal role='dialog' open={open} onClose={handleClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 300, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography role='heading' variant="h6" component="h2">
            {t('selectLanguage')}
          </Typography>
          <List>
            {languages.map((lang) => (
              <ListItem aria-selected={lang.code === languageCode} selected={lang.code === languageCode} divider key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                <ListItemText primary={lang.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );
};

export default LanguageSelector;
