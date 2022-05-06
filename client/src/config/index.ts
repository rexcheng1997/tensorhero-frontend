const ML_SERVER: { [key: string]: string } = {
  ipAddress: '',
  createJob: '/createJob',
};

Object.keys(ML_SERVER).forEach((key) => {
  if (key === 'ipAddress') return;
  ML_SERVER[key] = ML_SERVER.ipAddress + ML_SERVER[key];
});

export {
  ML_SERVER as const,
};
