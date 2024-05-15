import app from './shared/infra/http/app';

export default app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(
    `🚀 Server listening on port ${process.env.SERVER_PORT || 4000}.`
  );
});
