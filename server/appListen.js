const app = require('./index');
const PORT = process.env.PORT || 3000;

const init = () => {
  try {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (er) {
    console.error(er);
  }
};

init();
