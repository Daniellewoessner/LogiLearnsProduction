import React, { useContext, useState } from 'react';
import { DyslexiaSettingsContext } from '../App';
import { DyslexiaSettings, FontFamily, FontSize, LineSpacing, ColorTheme } from '../types';
import '../styles/settingpage.css'

const SettingsPage: React.FC = () => {
  const dyslexiaSettings = useContext(DyslexiaSettingsContext);
  const [settings, setSettings] = useState<DyslexiaSettings>({
    fontFamily: dyslexiaSettings.fontFamily as FontFamily,
    fontSize: dyslexiaSettings.fontSize as FontSize,
    lineSpacing: dyslexiaSettings.lineSpacing as LineSpacing,
    colorTheme: dyslexiaSettings.colorTheme as ColorTheme
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Font family options
  const fontFamilyOptions: { value: FontFamily; label: string }[] = [
    { value: 'OpenDyslexic', label: 'OpenDyslexic (Recommended for dyslexia)' },
    { value: 'Comic Sans', label: 'Comic Sans' },
    { value: 'Arial', label: 'Arial' }
  ];

  // Font size options
  const fontSizeOptions: { value: FontSize; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  // Line spacing options
  const lineSpacingOptions: { value: LineSpacing; label: string }[] = [
    { value: 'tight', label: 'Tight' },
    { value: 'normal', label: 'Normal' },
    { value: 'wide', label: 'Wide' }
  ];

  // Color theme options
  const colorThemeOptions: { value: ColorTheme; label: string; bgColor: string; textColor: string }[] = [
    { value: 'neutral', label: 'Neutral', bgColor: '#ffffff', textColor: '#333333' },
    { value: 'cream', label: 'Cream', bgColor: '#f8f5e4', textColor: '#333333' },
    { value: 'dark', label: 'Dark', bgColor: '#222222', textColor: '#f0f0f0' },
    { value: 'blue', label: 'Blue', bgColor: '#e8f4fc', textColor: '#333333' }
  ];

  const handleSettingChange = (settingName: keyof DyslexiaSettings, value: any) => {
    setSettings({
      ...settings,
      [settingName]: value
    });
    setSettingsSaved(false);
  };

  const handleSaveSettings = () => {
    dyslexiaSettings.updateSettings(settings);
    setSettingsSaved(true);
    
    // Reset the flag after 3 seconds
    setTimeout(() => {
      setSettingsSaved(false);
    }, 3000);
  };

  const handleResetToDefaults = () => {
    const defaultSettings: DyslexiaSettings = {
      fontFamily: 'OpenDyslexic',
      fontSize: 'medium',
      lineSpacing: 'normal',
      colorTheme: 'neutral'
    };
    
    setSettings(defaultSettings);
    dyslexiaSettings.updateSettings(defaultSettings);
    setSettingsSaved(true);
    
    // Reset the flag after 3 seconds
    setTimeout(() => {
      setSettingsSaved(false);
    }, 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Customize how Logi Learns looks and feels</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Reading Settings</h2>
          <p>Adjust these settings to make reading easier</p>

          {/* Font Family Settings */}
          <div className="setting-group">
            <h3>Font</h3>
            <p className="setting-description">Choose a font that's easiest for you to read</p>
            
            <div className="font-options">
              {fontFamilyOptions.map(option => (
                <div 
                  key={option.value}
                  className={`font-option ${settings.fontFamily === option.value ? 'selected' : ''}`}
                  onClick={() => handleSettingChange('fontFamily', option.value)}
                  style={{ 
                    fontFamily: option.value === 'OpenDyslexic' ? 'OpenDyslexic, sans-serif' : 
                               option.value === 'Comic Sans' ? 'Comic Sans MS, sans-serif' : 
                               'Arial, sans-serif'
                  }}
                >
                  <div className="option-sample">Aa Bb Cc</div>
                  <div className="option-label">{option.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Font Size Settings */}
          <div className="setting-group">
            <h3>Text Size</h3>
            <p className="setting-description">Adjust how big the text appears</p>
            
            <div className="size-options">
              {fontSizeOptions.map(option => (
                <div 
                  key={option.value}
                  className={`size-option ${settings.fontSize === option.value ? 'selected' : ''}`}
                  onClick={() => handleSettingChange('fontSize', option.value)}
                >
                  <div 
                    className="size-sample"
                    style={{ 
                      fontSize: option.value === 'small' ? '14px' : 
                               option.value === 'medium' ? '18px' : '22px' 
                    }}
                  >
                    Aa
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Line Spacing Settings */}
          <div className="setting-group">
            <h3>Line Spacing</h3>
            <p className="setting-description">Adjust the space between lines of text</p>
            
            <div className="spacing-options">
              {lineSpacingOptions.map(option => (
                <div 
                  key={option.value}
                  className={`spacing-option ${settings.lineSpacing === option.value ? 'selected' : ''}`}
                  onClick={() => handleSettingChange('lineSpacing', option.value)}
                >
                  <div 
                    className="spacing-sample"
                    style={{ 
                      lineHeight: option.value === 'tight' ? '1.2' : 
                                  option.value === 'normal' ? '1.5' : '1.8' 
                    }}
                  >
                    <p>Line one</p>
                    <p>Line two</p>
                    <p>Line three</p>
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Theme Settings */}
          <div className="setting-group">
            <h3>Color Theme</h3>
            <p className="setting-description">Choose colors that are easiest on your eyes</p>
            
            <div className="color-options">
              {colorThemeOptions.map(option => (
                <div 
                  key={option.value}
                  className={`color-option ${settings.colorTheme === option.value ? 'selected' : ''}`}
                  onClick={() => handleSettingChange('colorTheme', option.value)}
                >
                  <div 
                    className="color-sample"
                    style={{ 
                      backgroundColor: option.bgColor,
                      color: option.textColor
                    }}
                  >
                    Aa
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-section">
          <h2>Preview</h2>
          <div 
            className="settings-preview"
            style={{ 
              fontFamily: settings.fontFamily === 'OpenDyslexic' ? 'OpenDyslexic, sans-serif' : 
                        settings.fontFamily === 'Comic Sans' ? 'Comic Sans MS, sans-serif' : 
                        'Arial, sans-serif',
              fontSize: settings.fontSize === 'small' ? '14px' : 
                        settings.fontSize === 'medium' ? '16px' : '18px',
              lineHeight: settings.lineSpacing === 'tight' ? '1.2' : 
                          settings.lineSpacing === 'normal' ? '1.5' : '1.8',
              backgroundColor: settings.colorTheme === 'neutral' ? '#ffffff' : 
                               settings.colorTheme === 'cream' ? '#f8f5e4' : 
                               settings.colorTheme === 'dark' ? '#222222' : '#e8f4fc',
              color: settings.colorTheme === 'dark' ? '#f0f0f0' : '#333333'
            }}
          >
            <h3>Sample Text</h3>
            <p>This is how text will look with your current settings. Is it easy to read?</p>
            <p>The quick brown fox jumps over the lazy dog.</p>
            <p>Reading should be fun and easy!</p>
          </div>
        </div>

        <div className="settings-actions">
          <button 
            className="save-settings-button"
            onClick={handleSaveSettings}
          >
            Save Settings
          </button>
          <button 
            className="reset-settings-button"
            onClick={handleResetToDefaults}
          >
            Reset to Default
          </button>
          
          {settingsSaved && (
            <div className="settings-saved-message">
              Settings saved!
            </div>
          )}
        </div>
      </div>

      <div className="settings-help">
        <h3>Need Help?</h3>
        <p>If you need assistance with settings, ask a parent or teacher for help!</p>
      </div>
    </div>
  );
};

export default SettingsPage;