import { defineConfig, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        'font-size': '1.2rem',
      },
    }),
  ],
});
