import dva from 'dva';
import './index.css';
import Promise from 'promise-polyfill';

if (!window.Promise) {
	window.Promise = Promise;
}

// 1. Initialize
const app = dva();

app.model(require("./models/books"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');