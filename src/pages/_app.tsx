import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import '../styles/globals.css';
import App from '@/bootstrap';
import { startFontAwesome } from '@/lib';

startFontAwesome();

export default App;
