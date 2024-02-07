import { JSX } from 'react';

import styles from '~/App.module.css';

export const App = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Hello Vite React boilerplate!</p>
    </div>
  );
};
