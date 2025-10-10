import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default  [
  
  // Base JS rules
  js.configs.recommended,

  // Frontend: React + JSX + Jest
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        test: true,
        expect: true,
        describe: true,
        it: true,
        beforeEach: true,
        afterEach: true,
        document: true,
        window: true,
        console: true,
        process: true,
        global: true
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      quotes: ['error', 'single'],
    },
  },

  // Backend: Node + Jest
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: true,
        process: true,
        __dirname: true,
        module: true,
        require: true,
        test: true,
        expect: true,
        describe: true,
        it: true,
        beforeEach: true,
        afterEach: true,
      }, 
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },
];
