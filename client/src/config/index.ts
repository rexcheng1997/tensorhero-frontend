type ServerEndpoints = {
  ipAddress: string,
  [key: string]: string,
}

const processServerEndpoints = (
    server: ServerEndpoints,
): ServerEndpoints => {
  Object.keys(server).forEach((key) => {
    if (key === 'ipAddress') return;
    server[key] = server.ipAddress + server[key];
  });

  return server;
};

const MASTER_SERVER: ServerEndpoints = {
  ipAddress: '/api',
  getChart: '/chart',
  getChartListing: '/chart/listing',
  publishChart: '/chart/publish',
};

const ML_SERVER: ServerEndpoints = {
  ipAddress: '/ml-server',
  createJob: '/createJob',
  getJobStatus: '/getJobStatus',
};

processServerEndpoints(MASTER_SERVER);
processServerEndpoints(ML_SERVER);

export {
  ML_SERVER,
  MASTER_SERVER,
};
